using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class ConvertKanjiController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<ConvertedString> Convert(string kanjis)
        {
            string url = "http://jlp.yahooapis.jp/FuriganaService/V1/furigana";

            //文字コードを指定する
            System.Text.Encoding enc =
                System.Text.Encoding.GetEncoding("UTF-8");

            //POST送信する文字列を作成
            string postData =
                "sentence=" +
                System.Web.HttpUtility.UrlEncode(kanjis, enc);
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
            string resText = enc.GetString(resData);

            string[] arrFurigana1 = resText.Split("<Word>");

            string result = "";
            foreach (string str in arrFurigana1)
            {
                if (str.Contains("</Word>"))
                {
                    string strSurfaceAndFurigana = str.Split("<SubWordList>")[0].Split("</Word>")[0];
                    if (strSurfaceAndFurigana.Contains("<Furigana>"))
                    {
                        result += strSurfaceAndFurigana.Split("<Furigana>")[1].Split("</Furigana>")[0];
                    }
                    else
                    {
                        result += strSurfaceAndFurigana.Split("<Surface>")[1].Split("</Surface>")[0];
                    }
                }
            }

            return Enumerable.Range(1, 1).Select(index => new ConvertedString
            {
                ConvertedWord = result,
            });
        }

        public class ConvertedString
        {
            public string ConvertedWord { get; set; }
        }
    }
}
