using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Z_Apps.Models.Stories.Words
{
    public class WordManager
    {
        private readonly DBCon Con;
        public WordManager(DBCon con)
        {
            Con = con;
        }

        public Dictionary<int, List<Word>> GetWords(int storyId)
        {
            //SQL文作成
            string sql = @"
select * from tblDictionary
where StoryId =@storyId
order by WordNumber;
";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                { "@storyId", new object[2] { SqlDbType.Int, storyId } }
            });

            //List<Sentence>型に変換してreturn
            var resultWords = new Dictionary<int, List<Word>>();
            foreach (var dicWord in words)
            {
                var word = new Word();
                word.StoryId = (int)dicWord["StoryId"];
                word.LineNumber = (int)dicWord["LineNumber"];
                word.WordNumber = (int)dicWord["WordNumber"];
                word.Kanji = (string)dicWord["Kanji"];
                word.Hiragana = (string)dicWord["Hiragana"];
                word.English = (string)dicWord["English"];

                if (!resultWords.ContainsKey(word.LineNumber))
                {
                    resultWords.Add(word.LineNumber, new List<Word>());
                }
                resultWords[word.LineNumber].Add(word);

            }
            return resultWords;
        }

        public IEnumerable<Word> GetWordsForSentence(int storyId, int lineNumber)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblDictionary";
            sql += " where StoryId =@storyId and LineNumber = @lineNumber";
            sql += " order by WordNumber;";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                { "@storyId", new object[2] { SqlDbType.Int, storyId } },
                { "@lineNumber", new object[2] { SqlDbType.Int, lineNumber } }
            });

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

        public Dictionary<string, object> GetWordMeaning(string kanji)
        {
            //SQL文作成
            string sql = @"
            select English, Hiragana, count(*) as cnt
            from tblDictionary
            where Kanji like @kanji
            group by English, Hiragana
                having count(*) = (
            	    select max(cnt)
            		from
            			(
            				select count(*) as cnt
            				from tblDictionary
            				where Kanji like @kanji
            				group by English, Hiragana
            			)
            	v)";

            //List<Dictionary<string, Object>>型で取得
            var words = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@kanji", new object[2] { SqlDbType.NVarChar, kanji } } });

            foreach (var dicWord in words)
            {
                return dicWord;
            }
            return new Dictionary<string, object>();
        }

        public bool DeleteInsertWords(
            int storyId,
            IEnumerable<Word> words,
            Func<string, Dictionary<string, object[]>, int> execUpdate)
        {
            //SQL文作成
            string sql = @"
            delete from tblDictionary
            where StoryId = @storyId";

            int result = execUpdate(
                sql,
                new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, storyId } }
                });

            if (result < 0)
            {
                return false;
            }


            foreach (Word word in words)
            {
                //SQL文作成
                sql = @"
                insert into tblDictionary(StoryId, LineNumber, WordNumber, Kanji, Hiragana, English)
                values (@storyId, @lineNumber, @wordNumber, @kanji, @hiragana, @english)";

                result = execUpdate(sql, new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, word.StoryId } },
                    { "@lineNumber", new object[2] { SqlDbType.Int, word.LineNumber } },
                    { "@wordNumber", new object[2] { SqlDbType.Int, word.WordNumber } },
                    { "@kanji", new object[2] { SqlDbType.NVarChar, word.Kanji } },
                    { "@hiragana", new object[2] { SqlDbType.NVarChar, word.Hiragana } },
                    { "@english", new object[2] { SqlDbType.NVarChar, word.English } }
                });

                if (result != 1)
                {
                    return false;
                }
            }
            return true;
        }

    }
}
