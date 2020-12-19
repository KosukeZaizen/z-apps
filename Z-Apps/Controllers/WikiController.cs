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
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class WikiController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<string> GetAllWords(int num)
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

        [HttpPost("[action]")]
        public void Exclude(string word, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return;
            }

            var con = new DBCon(DBCon.DBType.wiki_db);
            var sql = @"
UPDATE ZAppsDictionaryCache SET
 response = N'removed'
 where word = @word
;";

            var result = con.ExecuteSelect(
                    sql,
                    new Dictionary<string, object[]> { { "@word", new object[2] { SqlDbType.NVarChar, word } } }
                );
        }

        [HttpPost("[action]")]
        public void Register(string word, string token, string jsonText)
        {
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return;
            }

            var con = new DBCon(DBCon.DBType.wiki_db);
            var sql = @"
UPDATE ZAppsDictionaryCache SET
 response = @jsonText
 where word = @word
;";

            var result = con.ExecuteSelect(
                    sql,
                    new Dictionary<string, object[]> {
                        { "@word", new object[2] { SqlDbType.NVarChar, word } },
                        { "@jsonText", new object[2] { SqlDbType.NVarChar, jsonText } }
                    }
                );
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
        [HttpGet("[action]")]
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
                var json = JsonSerializer.Serialize(obj);

                var task = Task.Run(async () =>
                {
                    //5秒待って登録
                    await Task.Delay(5 * 1000);

                    if (obj.wordId > 0 && obj.xml.Length > 0 && obj.xml.Length > 0 && obj.translatedWord.Length > 0 && json.Contains("wordId"))
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
}
