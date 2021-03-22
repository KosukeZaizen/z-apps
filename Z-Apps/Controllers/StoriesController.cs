using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.Stories;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;
using System.Data;
using Z_Apps.Models;
using System.Linq;
using static Z_Apps.Models.Stories.StoriesService;
using Z_Apps.Util;


namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesController : Controller
    {
        private StoriesService storiesService;
        public StoriesController(StoriesService storiesService)
        {
            this.storiesService = storiesService;
        }

        [HttpGet("[action]/")]
        public IEnumerable<Story> GetAllStories()
        {

            return ApiCache.UseCache("p", () =>
            {
                return storiesService.GetAllStories();
            });
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Story> GetOtherStories(int storyId)
        {
            return ApiCache.UseCache(storyId.ToString(), () =>
            {
                if (storyId > 0)
                {
                    return storiesService.GetOtherStories(storyId);
                }
                else
                {
                    return null;
                }
            });
        }

        [HttpGet("[action]/{storyName?}")]
        public Story GetPageData(string storyName)
        {

            return ApiCache.UseCache(storyName, () =>
            {
                if (!string.IsNullOrEmpty(storyName))
                {
                    return storiesService.GetPageData(storyName);
                }
                else
                {
                    return null;
                }
            });
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Sentence> GetSentences(int storyId)
        {

            return ApiCache.UseCache(storyId.ToString(), () =>
            {
                if (storyId > 0)
                {
                    return storiesService.GetSentences(storyId);
                }
                else
                {
                    return null;
                }
            });
        }

        public class OneSnetenceAndWords
        {
            public Sentence sentence
            {
                get; set;
            }
            public IEnumerable<Word> words
            {
                get; set;
            }
        }
        [HttpGet("[action]/{storyName?}/{lineNumber?}")]
        public OneSnetenceAndWords GetOneSentence(string storyName, int lineNumber)
        {

            return ApiCache.UseCache(storyName + lineNumber, () =>
            {
                if (storyName != null && storyName.Length > 0 && lineNumber > 0)
                {
                    return storiesService.GetOneSentence(storyName, lineNumber);
                }
                else
                {
                    return null;
                }
            });
        }

        [HttpGet("[action]/{storyId?}")]
        public WordsAndArticles GetWords(int storyId)
        {

            return ApiCache.UseCache(storyId.ToString(), () =>
            {
                if (storyId > 0)
                {
                    return storiesService.GetWordsAndArticles(storyId);
                }
                else
                {
                    return null;
                }
            });
        }

        public class ExplanationResponse
        {
            public string explanation
            {
                get; set;
            }
        }
        [HttpGet("[action]/{storyName?}")]
        public ExplanationResponse GetExplanation(string storyName)
        {

            return ApiCache.UseCache(storyName, () =>
            {
                if (!string.IsNullOrEmpty(storyName))
                {

                    var con = new DBCon();
                    var result = con.ExecuteSelect(@"
SELECT articleContent
FROM tblArticles
WHERE url = @storyName and released = 1
AND title = N'folktale'
", new Dictionary<string, object[]> { { "@storyName", new object[2] { SqlDbType.NVarChar, storyName } } }
                    ).FirstOrDefault();

                    return new ExplanationResponse()
                    {
                        explanation = result == null
                                                ? ""
                                                : (string)result["articleContent"]
                    };
                }
                return null;
            });
        }
    }
}