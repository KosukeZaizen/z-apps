using System.Linq;
using System;
using System.Collections.Generic;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;
using Z_Apps.Util;
using System.Net.Http;
using System.Threading.Tasks;
using static Z_Apps.Controllers.StoriesEditController;

namespace Z_Apps.Models.StoriesEdit
{
    public class StoriesEditService
    {
        private readonly StoryManager storyManager;
        private readonly SentenceManager sentenceManager;
        private readonly WordManager wordManager;
        private readonly DBCon con;

        public StoriesEditService(DBCon con)
        {
            storyManager = new StoryManager(con);
            sentenceManager = new SentenceManager(con);
            wordManager = new WordManager(con);
            this.con = con;
        }

        public IEnumerable<Story> GetAllStories()
        {
            var stories = storyManager.GetAllStories(true);
            return stories;
        }

        public Story GetPageData(string storyName)
        {
            var story = storyManager.GetStory(storyName);
            return story;
        }

        public IEnumerable<Sentence> GetSentences(int storyId)
        {
            var sentences = sentenceManager.GetSentences(storyId);
            return sentences;
        }

        public IEnumerable<Word> GetWords(int storyId)
        {
            var words = wordManager.GetWords(storyId);
            foreach (var KV in words)
            {
                foreach (var word in KV.Value)
                {
                    yield return word;
                }
            }
        }

        public async Task<TranslationResult> Translate(Sentence sentence)
        {
            var dicHiraganaKanji = MakeHiraganaAndKanji(sentence.Kanji);
            sentence.Hiragana = dicHiraganaKanji["hiragana"];
            sentence.Romaji = MakeRomaji(sentence.Hiragana);
            sentence.English = await MakeEnglish(sentence.Kanji);

            sentence.Hiragana = ConvertSpecialChar(sentence.Hiragana);
            sentence.Romaji = ConvertSpecialChar(sentence.Romaji);
            sentence.Romaji = ConvertTsu(sentence.Romaji);

            var words = await GetTranslatedWordList(dicHiraganaKanji, sentence);

            return new TranslationResult() { sentence = sentence, words = words };
        }

        public class TranslationResult
        {
            public Sentence sentence { get; set; }
            public IEnumerable<Word> words { get; set; }
        }

        public async Task<IEnumerable<Word>> GetTranslatedWordList(
            Dictionary<string, string> dicHiraganaKanji,
            Sentence sentence)
        {
            var lstWords = new List<Word>();

            var arrHiragana = dicHiraganaKanji["hiragana"]
                .Replace("。", "")
                .Replace("、", "")
                .Replace("「", "")
                .Replace("」", "")
                .Replace("！", "")
                .Split(" ");

            var arrKanji = dicHiraganaKanji["kanji"]
                .Replace("。", "")
                .Replace("、", "")
                .Replace("「", "")
                .Replace("」", "")
                .Replace("！", "")
                .Split(" ");


            int j = 0;
            for (int i = 0; i < arrKanji.Length; i++)
            {
                if (arrKanji[i].Length > 0)
                {
                    j++;

                    var w = new Word();
                    w.StoryId = sentence.StoryId;
                    w.LineNumber = sentence.LineNumber;
                    w.WordNumber = j;
                    w.Kanji = arrKanji[i];

                    var dicWord = wordManager.GetWordMeaning(w.Kanji);
                    if (dicWord.Count > 0)
                    {
                        w.Hiragana = (string)dicWord["Hiragana"];
                        w.English = (string)dicWord["English"];
                    }
                    else
                    {
                        w.Hiragana = (w.Kanji == arrHiragana[i]) ? "" : arrHiragana[i];
                        var eng = await MakeEnglish(arrKanji[i]);
                        w.English = eng.ToLower();
                    }
                    lstWords.Add(w);
                }
            }
            return lstWords;
        }

        public Dictionary<string, string> MakeHiraganaAndKanji(string kanjis)
        {
            var dicResult = new Dictionary<string, string>() { { "kanji", "" }, { "hiragana", "" } };

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

            foreach (string str in arrFurigana1)
            {
                if (str.Contains("</Word>"))
                {
                    string strSurfaceAndFurigana = str.Split("<SubWordList>")[0].Split("</Word>")[0];
                    if (strSurfaceAndFurigana.Contains("<Furigana>"))
                    {
                        dicResult["hiragana"] += strSurfaceAndFurigana.Split("<Furigana>")[1].Split("</Furigana>")[0] + " ";
                    }
                    else
                    {
                        dicResult["hiragana"] += strSurfaceAndFurigana.Split("<Surface>")[1].Split("</Surface>")[0] + " ";
                    }
                    dicResult["kanji"] += strSurfaceAndFurigana.Split("<Surface>")[1].Split("</Surface>")[0] + " ";
                }
            }

            return dicResult;
        }

        private string MakeRomaji(string hiragana)
        {
            string result = hiragana;
            var dicH1 = new Dictionary<string, string>() { { "あ", "a" }, { "い", "i" }, { "う", "u" }, { "え", "e" }, { "お", "o" }, { "ぁ", "a" }, { "ぃ", "i" }, { "ぅ", "u" }, { "ぇ", "e" }, { "ぉ", "o" }, { "か", "ka" }, { "き", "ki" }, { "く", "ku" }, { "け", "ke" }, { "こ", "ko" }, { "さ", "sa" }, { "し", "shi" }, { "す", "su" }, { "せ", "se" }, { "そ", "so" }, { "た", "ta" }, { "ち", "chi" }, { "つ", "tsu" }, { "て", "te" }, { "と", "to" }, { "な", "na" }, { "に", "ni" }, { "ぬ", "nu" }, { "ね", "ne" }, { "の", "no" }, { "は", "ha" }, { "ひ", "hi" }, { "ふ", "fu" }, { "へ", "he" }, { "ほ", "ho" }, { "ま", "ma" }, { "み", "mi" }, { "む", "mu" }, { "め", "me" }, { "も", "mo" }, { "や", "ya" }, { "ゆ", "yu" }, { "よ", "yo" }, { "ら", "ra" }, { "り", "ri" }, { "る", "ru" }, { "れ", "re" }, { "ろ", "ro" }, { "わ", "wa" }, { "ゐ ", "i" }, { "ゑ", "e" }, { "を", "wo" }, { "が", "ga" }, { "ぎ", "gi" }, { "ぐ", "gu" }, { "げ", "ge" }, { "ご", "go" }, { "ざ", "za" }, { "じ", "ji" }, { "ず", "zu" }, { "ぜ", "ze" }, { "ぞ", "zo" }, { "だ", "da" }, { "ぢ", "ji" }, { "づ", "zu" }, { "で", "de" }, { "ど", "do" }, { "ば", "ba" }, { "び", "bi" }, { "ぶ", "bu" }, { "べ", "be" }, { "ぼ", "bo" }, { "ぱ", "pa" }, { "ぴ", "pi" }, { "ぷ", "pu" }, { "ぺ", "pe" }, { "ぽ", "po" }, { "ゔ", "bu" }, { "ー", "" }, { "ん", "n" } };
            var dicH2 = new Dictionary<string, string>() { { " へ ", " e " }, { " は ", " wa " }, { "きゃ", "kya" }, { "きゅ", "kyu" }, { "きょ", "kyo" }, { "しゃ", "sha" }, { "しゅ", "shu" }, { "しょ", "sho" }, { "ちゃ", "cha" }, { "ちゅ", "chu" }, { "ちょ", "cho" }, { "にゃ", "nya" }, { "にゅ", "nyu" }, { "にょ", "nyo" }, { "ひゃ", "hya" }, { "ひゅ", "hyu" }, { "ひょ", "hyo" }, { "みゃ", "mya" }, { "みゅ", "myu" }, { "みょ", "myo" }, { "りゃ", "rya" }, { "りゅ", "ryu" }, { "りょ", "ryo" }, { "ぎゃ", "gya" }, { "ぎゅ", "gyu" }, { "ぎょ", "gyo" }, { "じゃ", "ja" }, { "じゅ", "ju" }, { "じょ", "jo" }, { "びゃ", "bya" }, { "びゅ", "byu" }, { "びょ", "byo" }, { "ぴゃ", "pya" }, { "ぴゅ", "pyu" }, { "ぴょ", "pyo" }, { "じぇ", "jie" }, { "ちぇ", "chie" }, { "てぃ", "tei" }, { "でぃ", "dei" }, { "でゅ", "deyu" }, { "ふぁ", "fua" }, { "ふぃ", "fui" }, { "ふぇ", "fue" }, { "ふぉ", "fuo" }, { "ゔぁ", "bua" }, { "ゔぃ", "bui" }, { "ゔぇ", "bue" }, { "ゔぉ", "buo" }, };

            foreach (KeyValuePair<string, string> kvp in dicH2)
            {
                result = result.Replace(kvp.Key, kvp.Value + " ");
            }

            foreach (KeyValuePair<string, string> kvp in dicH1)
            {
                result = result.Replace(kvp.Key, kvp.Value + " ");
            }
            return result;
        }

        private string ConvertTsu(string romaji)
        {
            string result = romaji;
            var dicTsu = new Dictionary<string, string>() { { "っch", "t ch" }, { "ッch", "t ch" } };
            var dicTsuSpace = new Dictionary<string, string>() { { "っ ", "っ" } };

            foreach (KeyValuePair<string, string> kvp in dicTsu)
            {
                result = result.Replace(kvp.Key, kvp.Value);
            }

            foreach (KeyValuePair<string, string> kvp in dicTsuSpace)
            {
                result = result.Replace(kvp.Key, kvp.Value);
            }

            while (result.IndexOf("っ") >= 0)
            {
                var ind = result.IndexOf("っ");
                result = result.ChangeCharAt(ind, result[ind + 1] + " ");
            }
            return result;
        }


        private string ConvertSpecialChar(string hiragana)
        {
            string result = hiragana;
            var dic = new Dictionary<string, string>() { { "  ", " " }, { " 、", "、" }, { " 。", "。" }, { " ！", "！" }, { " 」", "」" }, { "「 ", "「" } };
            var dic2 = new Dictionary<string, string>() { { "、 ", "、" }, { "。 ", "。" }, { "！ ", "！" }, { "」 ", "」" }, { "「 ", "「" } };

            foreach (KeyValuePair<string, string> kvp in dic)
            {
                result = result.Replace(kvp.Key, kvp.Value);
            }
            foreach (KeyValuePair<string, string> kvp in dic2)
            {
                result = result.Replace(kvp.Key, kvp.Value);
            }
            return result;
        }


        public async Task<string> MakeEnglish(string kanji)
        {
            string url = @"https://script.google.com/macros/s/AKfycbzIEz24LNM-m92y6elzl8DCoG-uZi-HhDZ5ARQKPtMyll9w6V4/exec?text="
                + kanji + @"&source=ja&target=en";

            using (var client = new HttpClient())
            {
                var result = await client.GetStringAsync(url);
                return result;
            }
        }

        public async Task<Word> TranslateWord(Word word)
        {
            var dicWord = wordManager.GetWordMeaning(word.Kanji);
            if (dicWord.Count > 0)
            {
                word.Hiragana = (string)dicWord["Hiragana"];
                word.English = (string)dicWord["English"];
            }
            else
            {
                var dicHiraganaKanji = MakeHiraganaAndKanji(word.Kanji);
                dicHiraganaKanji["hiragana"] = dicHiraganaKanji["hiragana"].Replace(" ", "");
                word.Hiragana = (word.Kanji == dicHiraganaKanji["hiragana"]) ? "" : dicHiraganaKanji["hiragana"];
                string eng = await MakeEnglish(word.Kanji);
                word.English = eng.ToLower();
            }
            return word;
        }

        public bool Save(DataToBeSaved data)
        {
            return con.UseTransaction((execUpdate) =>
            {
                try
                {
                    if (data.token != PrivateConsts.REGISTER_PASS)
                    {
                        return false;
                    }
                    if (!storyManager.UpdateDesc(
                        data.storyDesc.StoryId,
                        data.storyDesc.StoryName,
                        data.storyDesc.Description,
                        execUpdate))
                    {
                        return false;
                    }
                    if (!sentenceManager.DeleteInsertSentences(
                        data.storyDesc.StoryId,
                        data.sentences,
                        execUpdate))
                    {
                        return false;
                    }
                    if (!wordManager.DeleteInsertWords(
                        data.storyDesc.StoryId, data.words,
                        execUpdate))
                    {
                        return false;
                    }
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            });
        }

        public bool Register(DataToBeRegistered data)
        {
            return con.UseTransaction((execUpdate) =>
            {
                try
                {
                    if (data.token != PrivateConsts.REGISTER_PASS)
                    {
                        return false;
                    }
                    if (!storyManager.UpdateDesc(
                        data.storyDesc.StoryId,
                        data.storyDesc.StoryName,
                        data.storyDesc.Description,
                        execUpdate))
                    {
                        return false;
                    }
                    if (!sentenceManager.DeleteInsertSentences(
                        data.storyDesc.StoryId,
                        data.sentences,
                        execUpdate))
                    {
                        return false;
                    }
                    if (!wordManager.DeleteInsertWords(
                        data.storyDesc.StoryId,
                        data.words,
                        execUpdate))
                    {
                        return false;
                    }
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            });
        }
    }
}

public static class String
{
    public static string ChangeCharAt(this string str, int index, string newString)
    {
        return str.Remove(index, 1).Insert(index, newString);
    }
}