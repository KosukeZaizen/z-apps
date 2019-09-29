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
        private DBCon Con;
        public WordManager(DBCon con)
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
    }
}
