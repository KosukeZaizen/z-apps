using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.Stories.Sentences {
    public class SentenceManager {
        private readonly DBCon Con;
        public SentenceManager(DBCon con) {
            Con = con;
        }

        public IEnumerable<Sentence> GetSentences(int storyId) {
            //SQL文作成
            string sql = "";
            sql += "select * from tblSentence";
            sql += " where StoryId =@storyId";
            sql += " order by LineNumber;";

            //List<Dictionary<string, Object>>型で取得
            var sentences = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            if (!sentences.Any()) {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }

            //List<Sentence>型に変換してreturn
            var resultSentences = new List<Sentence>();
            foreach (var dicSentence in sentences) {
                var sentence = new Sentence();
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

        public Sentence GetOneSentence(string storyName, int lineNumber) {
            //SQL文作成
            string sql = @"
select * from tblSentence
where StoryId = (
select StoryId from tblStoryMst where StoryName = @storyName
)
and LineNumber = @lineNumber;
";

            var dicSentence = Con.ExecuteSelect(
                sql, new Dictionary<string, object[]> {
                    { "@storyName", new object[2] { SqlDbType.NVarChar, storyName } },
                    { "@lineNumber", new object[2] { SqlDbType.Int, lineNumber } },
                })
                .FirstOrDefault();

            if (dicSentence == null) {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }

            return new Sentence() {
                StoryId = (int)dicSentence["StoryId"],
                LineNumber = (int)dicSentence["LineNumber"],
                Kanji = (string)dicSentence["Kanji"],
                Hiragana = (string)dicSentence["Hiragana"],
                Romaji = (string)dicSentence["Romaji"],
                English = (string)dicSentence["English"]
            };
        }

        public bool DeleteInsertSentences(int storyId, IEnumerable<Sentence> sentences) {
            //SQL文作成
            string sql = "";
            sql += "delete from tblSentence";
            sql += " where StoryId = @storyId";

            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            if (!result) {
                return false;
            }


            foreach (Sentence sentence in sentences) {
                //SQL文作成
                sql = "";
                sql += "insert into tblSentence(StoryId, LineNumber, Kanji, Hiragana, Romaji, English) ";
                sql += " values (@storyId, @lineNumber, @kanji, @hiragana, @romaji, @english) ";

                result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, sentence.StoryId } },
                    { "@lineNumber", new object[2] { SqlDbType.Int, sentence.LineNumber } },
                    { "@kanji", new object[2] { SqlDbType.NVarChar, sentence.Kanji } },
                    { "@hiragana", new object[2] { SqlDbType.NVarChar, sentence.Hiragana } },
                    { "@romaji", new object[2] { SqlDbType.NVarChar, sentence.Romaji } },
                    { "@english", new object[2] { SqlDbType.NVarChar, sentence.English } }
                });

                if (!result) {
                    return false;
                }
            }
            return true;
        }
    }
}
