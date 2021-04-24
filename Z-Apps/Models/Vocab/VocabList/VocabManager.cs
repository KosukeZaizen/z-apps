using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Models.StoriesEdit.WordsEdit;
using static Z_Apps.Controllers.VocabQuizController;

namespace Z_Apps.Models.VocabList
{
    public class VocabManager
    {
        private readonly DBCon Con;
        public VocabManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<Vocab> GetAllVocabLists()
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblVocabList";
            sql += " order by genreId, [order];";

            var vocabs = Con.ExecuteSelect(sql, null);

            var resultVocabList = new List<Vocab>();
            foreach (var dicSentence in vocabs)
            {
                var vocab = new Vocab();
                vocab.genreId = (int)dicSentence["genreId"];
                vocab.vocabId = (int)dicSentence["vocabId"];
                vocab.kanji = (string)dicSentence["kanji"];
                vocab.hiragana = (string)dicSentence["hiragana"];
                vocab.english = (string)dicSentence["english"];
                vocab.order = (int)dicSentence["order"];

                resultVocabList.Add(vocab);
            }
            return resultVocabList;
        }

        public IEnumerable<Vocab> GetVocabList(int genreId)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblVocabList";
            sql += " where genreId = @genreId";
            sql += " order by [order];";

            //List<Dictionary<string, Object>>型で取得
            var vocabs = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@genreId", new object[2] { SqlDbType.Int, genreId } } });

            var resultVocabList = new List<Vocab>();
            foreach (var dicSentence in vocabs)
            {
                var vocab = new Vocab();
                vocab.genreId = (int)dicSentence["genreId"];
                vocab.vocabId = (int)dicSentence["vocabId"];
                vocab.kanji = (string)dicSentence["kanji"];
                vocab.hiragana = (string)dicSentence["hiragana"];
                vocab.english = (string)dicSentence["english"];
                vocab.order = (int)dicSentence["order"];

                resultVocabList.Add(vocab);
            }
            return resultVocabList;
        }

        public async Task<TranslateResult> TranslateVocab(string kanji)
        {
            var result = new TranslateResult();
            var wordEditManager = new WordEditManager(Con);
            var storiesEditManager = new StoriesEditService(Con);
            var dicWord = wordEditManager.GetWordMeaning(kanji);
            if (dicWord.Count > 0)
            {
                result.hiragana = (string)dicWord["Hiragana"];
                result.english = (string)dicWord["English"];
            }
            else
            {
                var dicHiraganaKanji = storiesEditManager.MakeHiraganaAndKanji(kanji);
                dicHiraganaKanji["hiragana"] = dicHiraganaKanji["hiragana"].Replace(" ", "");
                result.hiragana = (kanji == dicHiraganaKanji["hiragana"]) ? "" : dicHiraganaKanji["hiragana"];
                string eng = await storiesEditManager.MakeEnglish(kanji);
                result.english = eng.ToLower();
            }
            return result;
        }
    }
}
