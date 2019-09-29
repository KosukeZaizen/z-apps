using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.Stories.Sentences
{
    public class SentenceManager
    {
        private DBCon Con;
        public SentenceManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<Sentence> GetSentences(int storyId)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblSentence";
            sql += " where StoryId =@storyId";
            sql += " order by LineNumber;";

            //List<Dictionary<string, Object>>型で取得
            var sentences = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyId", new object[2] { SqlDbType.Int, storyId } } });

            //List<Sentence>型に変換してreturn
            var resultSentences = new List<Sentence>();
            foreach (var dicSentence in sentences)
            {
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
    }
}
