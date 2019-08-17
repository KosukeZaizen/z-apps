using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.Stories.Sentences
{
    public class SentenceManager
    {
        private DBConnection Con;
        public SentenceManager(DBConnection con)
        {
            Con = con;
        }

        public IEnumerable<Sentence> GetSentences()
        {
            //List<Dictionary<string, Object>>型で取得
            var sentences = Con.ExecuteSelect("select * from tblSentence");

            //List<Sentence>型に変換してreturn
            var resultSentences = new List<Sentence>();
            foreach (var dicSentence in sentences)
            {
                var sentence = new Sentence();
                sentence.SentenceId = (int)dicSentence["StoryId"];
                sentence.PageNumber = (int)dicSentence["PageNumber"];
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
