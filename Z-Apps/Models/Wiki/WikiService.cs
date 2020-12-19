using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Z_Apps.Models;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Util;

public class WikiService
{
    private readonly List<string> ExcludedWords = new List<string>
        {
            "一覧",
            "曖昧さ",
            "邾",
        };

    public async Task<IEnumerable<string>> GetAllWords(int num)
    {
        return await GetAllWordsFromSomewhere(num);
    }

    public IEnumerable<string> Exclude(IEnumerable<string> words)
    {
        return (words)
            .Where(
                word => !ExcludedWords.Any(
                    excludedWord => word.Contains(excludedWord)
                ));
    }

    private async Task<IEnumerable<string>> GetAllWordsFromSomewhere(int num)
    {
        if (num > 0)
        {
            //件数指定があれば、DBから取得
            return GetAllWordsFromDB(num);
        }

        //全件取得の場合
        IEnumerable<string> allWordsFromDB = GetAllWordsFromDB(0);
        if (allWordsFromDB.Count() > 15000)
        {
            //DBに15000件以上あれば、それを返す
            return allWordsFromDB;
        }

        // Linaual NinjaのDB側にキャッシュされているレコードが、まだ15000件未満であれば、
        // WikiNinja側からデータを取ってくる
        IEnumerable<string> allWordsFromWikiNinja = await GetAllWordsFromWikiNinja();
        if (allWordsFromWikiNinja.Count() > 15000)
        {
            // WikiNinja側が生きていれば、取得したデータを返す
            return allWordsFromWikiNinja;
        }

        // WikiNinja側が落ちているような場合は、やはりLingual NinjaのDBから持ってきたデータを用いる
        return allWordsFromDB;
    }

    private IEnumerable<string> GetAllWordsFromDB(int num)
    {
        var con = new DBCon(DBCon.DBType.wiki_db);
        var sql =
                num == 0
                    ? "select word from ZAppsDictionaryCache"
                    : "select top(@num) word from ZAppsDictionaryCache";
        sql += " where response != N'removed'";
        sql += " order by word desc;";

        var result = con.ExecuteSelect(
                sql,
                new Dictionary<string, object[]> { { "@num", new object[2] { SqlDbType.Int, num } } }
            );

        return result.Select(r => (string)r["word"]);
    }

    private async Task<IEnumerable<string>> GetAllWordsFromWikiNinja()
    {
        try
        {
            string result = "";
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetAllWords");
                result = await response.Content.ReadAsStringAsync();
            }
            return Exclude(result.Replace("\"", "").Replace("[", "").Replace("]", "").Split(","));
        }
        catch (Exception e)
        {
            return new List<string> { };
        }
    }

    [DataContract]
    class Data
    {
        [DataMember]
        public int? wordId;

        [DataMember]
        public string snippet;
    }
    class DictionaryResult
    {
        public int? wordId { get; set; }
        public string snippet { get; set; }
        public string xml { get; set; }
        public string translatedWord { get; set; }
    }
    public async Task<string> GetEnglishWordAndSnippet(string word)
    {
        Func<Task<DictionaryResult>> getDictionaryDataWithoutCache = async () =>
        {
            var storyEdit = new StoriesEditService(new DBCon());
            Data w = null;
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetWordIdAndSnippet?word=" + word);
                string json = await response.Content.ReadAsStringAsync();
                var serializer = new DataContractJsonSerializer(typeof(Data));
                using (var ms = new MemoryStream(Encoding.UTF8.GetBytes(json)))
                {
                    w = (Data)serializer.ReadObject(ms);

                    if (w == null || w.wordId == null)
                    {
                        return new DictionaryResult() { xml = "", translatedWord = "", wordId = 0, snippet = "" };
                    }

                    //英語に翻訳
                    w.snippet = (
                        await storyEdit.MakeEnglish(
                            w.snippet
                                .Replace("<bold>", "")
                                .Replace("<bold", "")
                                .Replace("<bol", "")
                                .Replace("<bo", "")
                                .Replace("<b", "")
                                .Replace("</bold>", "")
                                .Replace("</bold", "")
                                .Replace("</bol", "")
                                .Replace("</bo", "")
                                .Replace("</b", "")
                                .Replace("</", "")
                                .Replace("/bold>", "")
                                .Replace("bold>", "")
                                .Replace("old>", "")
                                .Replace("ld>", "")
                                .Replace("d>", "")
                                .Replace("#", "")
                                .Replace("?", "")
                                .Replace("&", "")
                        )
                    );
                }
            }

            string url = "http://jlp.yahooapis.jp/FuriganaService/V1/furigana";

            //文字コードを指定する
            Encoding enc =
                Encoding.GetEncoding("UTF-8");

            //POST送信する文字列を作成
            string postData =
                "sentence=" +
                System.Web.HttpUtility.UrlEncode(word, enc);
            //バイト型配列に変換
            byte[] postDataBytes = enc.GetBytes(postData);

            System.Net.WebClient wc = new System.Net.WebClient();
            //ヘッダにContent-Typeを加える
            wc.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            wc.Headers.Add("User-Agent", PrivateConsts.YAHOO_API_ID);
            //データを送信し、また受信する
            byte[] resData = wc.UploadData(url, postDataBytes);
            wc.Dispose();

            //受信したデータを表示する
            return new DictionaryResult()
            {
                xml = enc.GetString(resData),
                wordId = w.wordId,
                snippet = w.snippet,
                translatedWord = await storyEdit.MakeEnglish(word
                        .Replace("#", "")
                        .Replace("?", "")
                        .Replace("&", ""))
            };
        };


        var con = new DBCon(DBCon.DBType.wiki_db);

        //キャッシュ取得
        var cache = con.ExecuteSelect(
                        "select response from ZAppsDictionaryCache where word = @word",
                        new Dictionary<string, object[]> { { "@word", new object[2] { SqlDbType.NVarChar, word } } }
                    ).FirstOrDefault();

        if (cache != null)
        {
            //キャッシュデータあり
            return (string)cache["response"]; //jsonもしくは「removed」という文字列
        }
        else
        {
            //キャッシュデータなし
            var obj = await getDictionaryDataWithoutCache();

            string json;
            if (ExcludedWords.Any(ew => word.Contains(ew)))
            {
                //除外対象文字列を含む場合
                json = "removed";
            }
            else
            {
                //通常時
                json = JsonSerializer.Serialize(obj);
            }

            var task = Task.Run(async () =>
            {
                //5秒待って登録
                await Task.Delay(5 * 1000);

                if (obj.wordId > 0 && obj.xml.Length > 0 && obj.xml.Length > 0 && obj.translatedWord.Length > 0 && (json.Contains("wordId") || json == "removed"))
                {
                    con.ExecuteUpdate("insert into ZAppsDictionaryCache values(@word, @json);", new Dictionary<string, object[]> {
                            { "@json", new object[2] { SqlDbType.NVarChar, json } },
                            { "@word", new object[2] { SqlDbType.NVarChar, word } }
                        });
                }
            });

            //上記完了を待たずにreturn
            return json;
        }
    }
}