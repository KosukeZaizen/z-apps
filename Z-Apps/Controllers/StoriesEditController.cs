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
    public class StoriesEditController : Controller
    {
        private Service service;
        public StoriesEditController()
        {
            service = new Service(new DBCon());
        }

        [HttpGet("[action]/{storyName?}")]
        public Story GetPageData(string storyName)
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
        public IEnumerable<Sentence> GetSentences(int storyId)
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
        public IEnumerable<Word> GetWords(int storyId)
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
        public async Task<TranslationResult> Translate([FromBody] Sentence sentence)
        {
            var s = await service.Translate(sentence);


            return new TranslationResult(){ sentence = s, words = null};
        }
        public class TranslationResult
        {
            public Sentence sentence;
            public IEnumerable<Word> words;
        }
    }
}