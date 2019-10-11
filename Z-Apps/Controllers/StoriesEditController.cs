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
using static Z_Apps.Models.Stories.EditService;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesEditController : Controller
    {
        private EditService service;
        public StoriesEditController()
        {
            service = new EditService(new DBCon());
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
            var result = await service.Translate(sentence);
            return result;
        }

        [HttpPost("[action]")]
        public async Task<Word> TranslateWord([FromBody] Word word)
        {
            var result = await service.TranslateWord(word);
            return result;
        }
    }
}