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
        private DBCon Con;
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

        public string GetWordMeaning(string kanji)
        {
            //SQL文作成
            string sql = "";
            sql += "select English, count(*) as cnt";
            sql += "  from tblDictionaryEdit";
            sql += "  where Kanji like @kanji";
            sql += "  group by English";
            sql += "  having count(*) = (";
            sql += "	select max(cnt)";
            sql += "		from";
            sql += "			(";
            sql += "				select count(*) as cnt";
            sql += "				from tblDictionaryEdit";
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
    }
}
