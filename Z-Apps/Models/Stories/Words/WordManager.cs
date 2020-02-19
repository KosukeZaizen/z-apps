using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.Stories.Words
{
    public class WordManager
    {
        private IDBCon Con;
        public WordManager(IDBCon con)
        {
            Con = con;
        }

        public IEnumerable<Word> GetWords(int storyId)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblDictionary";
            sql += " where StoryId =@storyId";
            sql += " order by WordNumber;";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            //List<Sentence>型に変換してreturn
            var resultWords = new List<Word>();
            foreach (var dicWord in words)
            {
                var word = new Word();
                word.StoryId = (int)dicWord["StoryId"];
                word.LineNumber = (int)dicWord["LineNumber"];
                word.WordNumber = (int)dicWord["WordNumber"];
                word.Kanji = (string)dicWord["Kanji"];
                word.Hiragana = (string)dicWord["Hiragana"];
                word.English = (string)dicWord["English"];

                resultWords.Add(word);
            }
            return resultWords;
        }

        public string GetWordMeaning(string kanji)
        {
            //SQL文作成
            string sql = "";
            sql += "SELECT English, count(*) as cnt";
            sql += "  FROM [dbo].[tblDictionary]";
            sql += "  where Kanji like @kanji";
            sql += "  group by English";
            sql += "  having count(*) = (";
            sql += "	select max(cnt)";
            sql += "		from";
            sql += "			(";
            sql += "				select count(*) as cnt";
            sql += "				from tblDictionary";
            sql += "				where Kanji like @kanji";
            sql += "				group by English";
            sql += "			)";
            sql += "	v)";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@kanji", new object[2] { SqlDbType.NVarChar, kanji } } });

            foreach (var dicWord in words)
            {
                return (string)dicWord["English"];
            }
            return "";
        }

        public bool DeleteInsertWords(int storyId, IEnumerable<Word> words)
        {
            //SQL文作成
            string sql = "";
            sql += "delete from tblDictionary";
            sql += " where StoryId = @storyId";


            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            if (!result)
            {
                return false;
            }


            foreach (Word word in words)
            {
                //SQL文作成
                sql = "";
                sql += "insert into tblDictionary(StoryId, LineNumber, WordNumber, Kanji, Hiragana, English) ";
                sql += " values (@storyId, @lineNumber, @wordNumber, @kanji, @hiragana, @english) ";

                result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, word.StoryId } },
                    { "@lineNumber", new object[2] { SqlDbType.Int, word.LineNumber } },
                    { "@wordNumber", new object[2] { SqlDbType.Int, word.WordNumber } },
                    { "@kanji", new object[2] { SqlDbType.NVarChar, word.Kanji } },
                    { "@hiragana", new object[2] { SqlDbType.NVarChar, word.Hiragana } },
                    { "@english", new object[2] { SqlDbType.NVarChar, word.English } }
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
