using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Z_Apps.Models;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class WikiController : Controller
    {
        [HttpGet("[action]")]
        public async Task<string> GetAllWords(int num)
        {
            string result = "";
            using (var client = new HttpClient())
            {
                HttpResponseMessage response;
                if (num == 0)
                {
                    response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetAllWords");
                }
                else
                {
                    response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetPartialKanjiWords?num=" + num);
                }
                result = await response.Content.ReadAsStringAsync();
            }
            return result;
        }

        [HttpGet("[action]")]
        public async Task<object> GetEnglishWord(string word)
        {
            string wordId = "";
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetWordId?word=" + word);
                wordId = await response.Content.ReadAsStringAsync();
            }

            if (wordId.Length > 0)
            {
                string url = "http://jlp.yahooapis.jp/FuriganaService/V1/furigana";

                //文字コードを指定する
                System.Text.Encoding enc =
                    System.Text.Encoding.GetEncoding("UTF-8");

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
                return new { xml = enc.GetString(resData), wordId };
            }
            else
            {
                return new { xml = "", wordId = "" };
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
        [HttpGet("[action]")]
        public async Task<object> GetEnglishWordAndSnippet(string word)
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

                    //英語に翻訳
                    w.snippet = (await storyEdit.MakeEnglish(
                        w.snippet
                            .Replace("<bold>", "").Replace("</bold>", "")
                        )
                    )
                    .Replace("<bold>", "").Replace("</bold>", "");
                }
            }

            if (w != null && w.wordId != null)
            {
                string url = "http://jlp.yahooapis.jp/FuriganaService/V1/furigana";

                //文字コードを指定する
                System.Text.Encoding enc =
                    System.Text.Encoding.GetEncoding("UTF-8");

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
                return new {
                    xml = enc.GetString(resData),
                    w?.wordId,
                    w?.snippet,
                    translatedWord = await storyEdit.MakeEnglish(word)
                };
            }
            else
            {
                return new { xml = "", translatedWord = "", wordId = "", snippet = "" };
            }
        }
    }
}
