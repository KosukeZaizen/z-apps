using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.Stories;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesController : Controller
    {
        private IStoriesService storyService;
        public StoriesController(IStoriesService storyService)
        {
            this.storyService = storyService;
        }

        [HttpGet("[action]/")]
        public IEnumerable<Story> GetAllStories()
        {
                var stories = storyService.GetAllStories();
                return stories;
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<Story> GetOtherStories(int storyId)
        {
            if (storyId > 0)
            {
                var stories = storyService.GetOtherStories(storyId);
                return stories;
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
                var story = storyService.GetPageData(storyName);
                return story;
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
                var sentences = storyService.GetSentences(storyId);
                return sentences;
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
                var wordList = storyService.GetWords(storyId);
                return wordList;
            }
            else
            {
                return null;
            }
        }
    }
}