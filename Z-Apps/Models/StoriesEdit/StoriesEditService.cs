using System;
using System.Collections.Generic;
using Z_Apps.Models.StoriesEdit.StoriesEdit;
using Z_Apps.Models.StoriesEdit.SentencesEdit;
using Z_Apps.Models.StoriesEdit.WordsEdit;
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

        private readonly StoryEditManager storyEditManager;
        private readonly SentenceEditManager sentenceEditManager;
        private readonly WordEditManager wordEditManager;

        public StoriesEditService(DBCon con)
        {
            storyEditManager = new StoryEditManager(con);
            sentenceEditManager = new SentenceEditManager(con);
            wordEditManager = new WordEditManager(con);

            storyManager = new StoryManager(con);
            sentenceManager = new SentenceManager(con);
            wordManager = new WordManager(con);
        }

        public IEnumerable<StoryEdit> GetAllStories()
        {
            var stories = storyEditManager.GetAllStories();
            return stories;
        }

        public StoryEdit GetPageData(string storyName)
        {
            var story = storyEditManager.GetStory(storyName);
            return story;
        }

        public IEnumerable<SentenceEdit> GetSentences(int storyId)
        {
            var sentences = sentenceEditManager.GetSentences(storyId);
            return sentences;
        }

        public IEnumerable<WordEdit> GetWords(int storyId)
        {
            var words = wordEditManager.GetWords(storyId);
            return words;
        }

        public async Task<TranslationResult> Translate(SentenceEdit sentence)
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
            public SentenceEdit sentence { get; set; }
            public IEnumerable<WordEdit> words { get; set; }
        }

        public async Task<IEnumerable<WordEdit>> GetTranslatedWordList(Dictionary<string, string> dicHiraganaKanji, SentenceEdit sentence)
        {
            var lstWords = new List<WordEdit>();

            var arrHiragana = dicHiraganaKanji["hiragana"]
                .Replace("。", "").Replace("、", "").Replace("「", "").Replace("」", "").Replace("！", "")
                .Split(" ");

            var arrKanji = dicHiraganaKanji["kanji"]
                .Replace("。", "").Replace("、", "").Replace("「", "").Replace("」", "").Replace("！", "")
                .Split(" ");


            int j = 0;
            for (int i = 0; i < arrKanji.Length; i++)
            {
                if (arrKanji[i].Length > 0)
                {
                    j++;

                    var w = new WordEdit();
                    w.StoryId = sentence.StoryId;
                    w.LineNumber = sentence.LineNumber;
                    w.WordNumber = j;
                    w.Kanji = arrKanji[i];

                    var dicWord = wordEditManager.GetWordMeaning(w.Kanji);
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

        public async Task<WordEdit> TranslateWord(WordEdit word)
        {
            var dicWord = wordEditManager.GetWordMeaning(word.Kanji);
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
            try
            {
                if (data.token == PrivateConsts.REGISTER_PASS)
                {
                    if (storyEditManager.UpdateDesc(data.storyDesc.StoryId, data.storyDesc.Description))
                    {
                        if (sentenceEditManager.DeleteInsertSentences(data.storyDesc.StoryId, data.sentences))
                        {
                            if (wordEditManager.DeleteInsertWords(data.storyDesc.StoryId, data.words))
                            {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Register(DataToBeRegistered data)
        {
            try
            {
                if (data.token == PrivateConsts.REGISTER_PASS)
                {
                    if (storyManager.UpdateDesc(data.storyDesc.StoryId, data.storyDesc.StoryName, data.storyDesc.Description))
                    {
                        if (sentenceManager.DeleteInsertSentences(data.storyDesc.StoryId, data.sentences))
                        {
                            if (wordManager.DeleteInsertWords(data.storyDesc.StoryId, data.words))
                            {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
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