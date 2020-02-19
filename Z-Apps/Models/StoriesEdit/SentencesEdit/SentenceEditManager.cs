using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.StoriesEdit.SentencesEdit
{
    public class SentenceEditManager
    {
        private readonly DBCon Con;
        public SentenceEditManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<SentenceEdit> GetSentences(int storyId)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblSentenceEdit";
            sql += " where StoryId = @storyId";
            sql += " order by LineNumber;";

            //List<Dictionary<string, Object>>型で取得
            var sentences = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            //List<Sentence>型に変換してreturn
            var resultSentences = new List<SentenceEdit>();
            foreach (var dicSentence in sentences)
            {
                var sentence = new SentenceEdit();
                sentence.StoryId = (int)dicSentence["StoryId"];
                sentence.LineNumber = (int)dicSentence["LineNumber"];
                sentence.Kanji = (string)dicSentence["Kanji"];
                sentence.Hiragana = (string)dicSentence["Hiragana"];
                sentence.Romaji = (string)dicSentence["Romaji"];
                sentence.English = (string)dicSentence["English"];

                resultSentences.Add(sentence);
            }
            return resultSentences;
        }

        public bool DeleteInsertSentences(int storyId, IEnumerable<SentenceEdit> sentences)
        {
            //SQL文作成
            string sql = "";
            sql += "delete from tblSentenceEdit";
            sql += " where StoryId = @storyId";

            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            if(!result)
            {
                return false;
            }


            foreach (SentenceEdit sentence in sentences)
            {
                //SQL文作成
                sql = "";
                sql += "insert into tblSentenceEdit(StoryId, LineNumber, Kanji, Hiragana, Romaji, English) ";
                sql += " values (@storyId, @lineNumber, @kanji, @hiragana, @romaji, @english) ";

                result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, sentence.StoryId } },
                    { "@lineNumber", new object[2] { SqlDbType.Int, sentence.LineNumber } },
                    { "@kanji", new object[2] { SqlDbType.NVarChar, sentence.Kanji } },
                    { "@hiragana", new object[2] { SqlDbType.NVarChar, sentence.Hiragana } },
                    { "@romaji", new object[2] { SqlDbType.NVarChar, sentence.Romaji } },
                    { "@english", new object[2] { SqlDbType.NVarChar, sentence.English } }
                });

                if (!result)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
