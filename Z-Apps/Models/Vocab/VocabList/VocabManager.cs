using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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

        public bool SaveVocabList(IEnumerable<Vocab> vocabList)
        {
            return Con.UseTransaction((execUpdate) =>
            {
                try
                {
                    var firstVocab = vocabList.FirstOrDefault();
                    if (firstVocab == null)
                    {
                        return false;
                    }

                    string deleteSql = @"
delete tblVocabList
where genreId = @genreId
;";
                    execUpdate(deleteSql,
                    new Dictionary<string, object[]> {
                            { "@genreId", new object[2] { SqlDbType.Int, firstVocab.genreId } },
                        }
                    );

                    int i = 1;
                    foreach (var vocab in vocabList.OrderBy(v => v.order))
                    {
                        string insertSql = @"
insert into tblVocabList
    (genreId,vocabId,hiragana,kanji,english,[order])
values
    (@genreId,@vocabId,@hiragana,@kanji,@english,@order)
;";
                        var resultCount = execUpdate(insertSql, new Dictionary<string, object[]> {
                            { "@genreId", new object[2] { SqlDbType.Int, vocab.genreId } },
                            { "@vocabId", new object[2] { SqlDbType.Int, vocab.vocabId } },
                            { "@hiragana", new object[2] { SqlDbType.NVarChar, vocab.hiragana } },
                            { "@kanji", new object[2] { SqlDbType.NVarChar, vocab.kanji } },
                            { "@english", new object[2] { SqlDbType.NVarChar, vocab.english } },
                            { "@order", new object[2] { SqlDbType.Int, i } },
                        });

                        if (resultCount != 1)
                        {
                            return false;
                        }
                        i++;
                    }
                    return true;
                }
                catch (Exception ex)
                {
                    ErrorLog.InsertErrorLog(ex.Message);
                }
                return false;
            });
        }
    }
}
