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
using static Z_Apps.Models.StoriesEdit.EditService;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Models.StoriesEdit.SentencesEdit;
using Z_Apps.Models.StoriesEdit.StoriesEdit;
using Z_Apps.Models.StoriesEdit.WordsEdit;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesEditController : Controller
    {
        private EditService service;
        public StoriesEditController(IDBCon con)
        {
            service = new EditService(con);
        }

        [HttpGet("[action]/")]
        public IEnumerable<StoryEdit> GetAllStories()
        {
            var stories = service.GetAllStories();
            return stories;
        }

        [HttpGet("[action]/{storyName?}")]
        public StoryEdit GetPageData(string storyName)
        {
            if (!string.IsNullOrEmpty(storyName))
            {
                var story = service.GetPageData(storyName);
                return story;
            }
            else
            {
                return null;
            }
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<SentenceEdit> GetSentences(int storyId)
        {
            if (storyId > 0)
            {
                var sentences = service.GetSentences(storyId);
                return sentences;
            }
            else
            {
                return null;
            }
        }

        [HttpGet("[action]/{storyId?}")]
        public IEnumerable<WordEdit> GetWords(int storyId)
        {
            if (storyId > 0)
            {
                var wordList = service.GetWords(storyId);
                return wordList;
            }
            else
            {
                return null;
            }
        }

        [HttpPost("[action]")]
        public async Task<TranslationResult> Translate([FromBody] SentenceEdit sentence)
        {
            var result = await service.Translate(sentence);
            return result;
        }

        [HttpPost("[action]")]
        public async Task<WordEdit> TranslateWord([FromBody] WordEdit word)
        {
            var result = await service.TranslateWord(word);
            return result;
        }

        [HttpPost("[action]")]
        public bool Save([FromBody] DataToBeSaved data)
        {
            var result = service.Save(data);
            return result;
        }
        public class DataToBeSaved
        {
            public IEnumerable<WordEdit> words;
            public IEnumerable<SentenceEdit> sentences;
            public StoryEdit storyDesc;
            public string token;
        }

        [HttpPost("[action]")]
        public bool Register([FromBody] DataToBeRegistered data)
        {
            var result = service.Register(data);
            return result;
        }
        public class DataToBeRegistered
        {
            public IEnumerable<Word> words;
            public IEnumerable<Sentence> sentences;
            public Story storyDesc;
            public string token;
        }
    }
}