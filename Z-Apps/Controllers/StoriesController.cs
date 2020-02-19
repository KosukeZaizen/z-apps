using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.Stories;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesController : Controller
    {
        private IStoriesService storiesService;
        public StoriesController(IStoriesService storiesService)
        {
            this.storiesService = storiesService;
        }

        [HttpGet("[action]/")]
        public IEnumerable<Story> GetAllStories()
        {
            return storiesService.GetAllStories();
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Story> GetOtherStories(int storyId)
        {
            if (storyId > 0)
            {
                return storiesService.GetOtherStories(storyId);
            }
            else
            {
                return null;
            }
        }

        [HttpGet("[action]/{storyName?}")]
        public Story GetPageData(string storyName)
        {
            if (!string.IsNullOrEmpty(storyName))
            {
                return storiesService.GetPageData(storyName);
            }
            else
            {
                return null;
            }
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Sentence> GetSentences(int storyId)
        {
            if (storyId > 0)
            {
                return storiesService.GetSentences(storyId);
            }
            else
            {
                return null;
            }
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Word> GetWords(int storyId)
        {
            if (storyId > 0)
            {
                return storiesService.GetWords(storyId);
            }
            else
            {
                return null;
            }
        }
    }
}