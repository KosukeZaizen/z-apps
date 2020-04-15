using System.Collections.Generic;
using System.Data;

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
    }
}
