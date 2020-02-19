using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.StoriesEdit.WordsEdit
{
    public class WordEditManager
    {
        private readonly DBCon Con;
        public WordEditManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<WordEdit> GetWords(int storyId)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblDictionaryEdit";
            sql += " where StoryId =@storyId";
            sql += " order by WordNumber;";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            //List<Sentence>型に変換してreturn
            var resultWords = new List<WordEdit>();
            foreach (var dicWord in words)
            {
                var word = new WordEdit();
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

        public Dictionary<string, object> GetWordMeaning(string kanji)
        {
            //SQL文作成
            string sql = "";
            sql += "select English, Hiragana, count(*) as cnt";
            sql += "  from tblDictionaryEdit";
            sql += "  where Kanji like @kanji";
            sql += "  group by English, Hiragana";
            sql += "  having count(*) = (";
            sql += "	select max(cnt)";
            sql += "		from";
            sql += "			(";
            sql += "				select count(*) as cnt";
            sql += "				from tblDictionaryEdit";
            sql += "				where Kanji like @kanji";
            sql += "				group by English, Hiragana";
            sql += "			)";
            sql += "	v)";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@kanji", new object[2] { SqlDbType.NVarChar, kanji } } });

            foreach (var dicWord in words)
            {
                return dicWord;
            }
            return new Dictionary<string, object>();
        }

        public bool DeleteInsertWords(int storyId, IEnumerable<WordEdit> words)
        {
            //SQL文作成
            string sql = "";
            sql += "delete from tblDictionaryEdit";
            sql += " where StoryId = @storyId";


            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            if (!result)
            {
                return false;
            }


            foreach (WordEdit word in words)
            {
                //SQL文作成
                sql = "";
                sql += "insert into tblDictionaryEdit(StoryId, LineNumber, WordNumber, Kanji, Hiragana, English) ";
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
