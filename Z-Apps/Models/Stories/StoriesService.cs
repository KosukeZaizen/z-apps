using System;
using System.Collections.Generic;
using System.Linq;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;
using static Z_Apps.Controllers.StoriesController;
using System.Data;

namespace Z_Apps.Models.Stories {
    public class StoriesService {
        private readonly StoryManager storyManager;
        private readonly SentenceManager sentenceManager;
        private readonly WordManager wordManager;

        public StoriesService(DBCon con) {
            storyManager = new StoryManager(con);
            sentenceManager = new SentenceManager(con);
            wordManager = new WordManager(con);
        }

        public IEnumerable<Story> GetAllStories() {
            var stories = storyManager.GetAllStories();
            return stories;
        }

        public IEnumerable<Story> GetOtherStories(int storyId) {
            //戻り値
            List<Story> result = new List<Story>();

            //10日に１回変わる数値を取得
            int numFor10Days = GetNumberForThe10Days();
            //ストーリーごとにも変わる数値を取得
            int numForStory = numFor10Days + storyId;
            //自分自身を除いた、全てのStory
            var stories = GetAllStories().Where(s => s.StoryId != storyId);

            if (!stories.Any()) {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }

            var storiesHistory = new List<IEnumerable<Story>>() { stories };
            for (var i = 0; i < 10; i++) {
                var newStories = storiesHistory.LastOrDefault();
                if (newStories == null)
                    return null;

                //10日に一度変わる数値から、indexを生成
                int index = numForStory % (newStories.Count());

                //上記で生成したindexの要素
                var selectedStory = newStories.ElementAt(index);
                result.Add(selectedStory);

                //選択済みのストーリーを除外したListを、次のループで使用
                storiesHistory.Add(newStories.Where(st => st.StoryId != selectedStory.StoryId));
            }
            return result;
        }

        //10日に１回変わる数値を取得
        private int GetNumberForThe10Days() {
            // 2019年1月1日からの経過日数
            double interval = (DateTime.Today - new DateTime(2019, 1, 1)).TotalDays;

            //経過日数を10で割った商の2乗
            return (int)Math.Pow((int)interval / 10, 2);
        }

        public Story GetPageData(string storyName) {
            var story = storyManager.GetStory(storyName);
            return story;
        }

        public IEnumerable<Sentence> GetSentences(int storyId) {
            var sentences = sentenceManager.GetSentences(storyId);
            return sentences;
        }

        public OneSnetenceAndWords GetOneSentence(string storyName, int lineNumber) {
            var sentence = sentenceManager.GetOneSentence(storyName, lineNumber);
            var words = wordManager.GetWordsForSentence(sentence.StoryId, lineNumber);

            return new OneSnetenceAndWords() { sentence = sentence, words = words };
        }

        public class WordsAndArticles {
            public Dictionary<int, List<Word>> words { get; set; }
            public Dictionary<int, List<ArticleUrlAndTitle>> articles { get; set; }
        }
        public class ArticleUrlAndTitle {
            public string url { get; set; }
            public string title { get; set; }
        }
        public WordsAndArticles GetWordsAndArticles(int storyId) {
            var words = wordManager.GetWords(storyId);
            var articles = GetArticles(storyId);

            return new WordsAndArticles() {
                words = words,
                articles = articles
            };
        }

        private Dictionary<int, List<ArticleUrlAndTitle>> GetArticles(int storyId) {
            var con = new DBCon();

            //SQL文作成
            string sql = @"
select s.lineNumber, s.articleUrl, a.title from
(
    select distinct lineNumber, articleUrl
    from tblArticleExampleSentenceRelation
    where storyId = @storyId
) as s
inner join tblArticles as a
on a.url = s.articleUrl
";

            //List<Dictionary<string, Object>>型で取得
            var words = con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                    { "@storyId", new object[2] { SqlDbType.Int, storyId }
                } });

            //List<Sentence>型に変換してreturn
            var resultArticles = new Dictionary<int, List<ArticleUrlAndTitle>>();
            foreach (var dicWord in words) {
                var lineNumber = (int)dicWord["lineNumber"];

                if (!resultArticles.ContainsKey(lineNumber)) {
                    resultArticles.Add(lineNumber, new List<ArticleUrlAndTitle>());
                }

                resultArticles[lineNumber].Add(
                    new ArticleUrlAndTitle() {
                        url = (string)dicWord["articleUrl"],
                        title = (string)dicWord["title"],
                    }
                );
            }
            return resultArticles;
        }
    }
}
