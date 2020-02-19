using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Words;
using static Z_Apps.Models.StoriesEdit.StoriesEditService;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Models.StoriesEdit.SentencesEdit;
using Z_Apps.Models.StoriesEdit.StoriesEdit;
using Z_Apps.Models.StoriesEdit.WordsEdit;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesEditController : Controller
    {
        private IStoriesEditService storiesEditService;
        public StoriesEditController(IStoriesEditService storiesEditService)
        {
            this.storiesEditService = storiesEditService;
        }

        [HttpGet("[action]/")]
        public IEnumerable<StoryEdit> GetAllStories()
        {
            return storiesEditService.GetAllStories();
        }

        [HttpGet("[action]/{storyName?}")]
        public StoryEdit GetPageData(string storyName)
        {
            if (!string.IsNullOrEmpty(storyName))
            {
                return storiesEditService.GetPageData(storyName);
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
                return storiesEditService.GetSentences(storyId);
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
                return storiesEditService.GetWords(storyId);
            }
            else
            {
                return null;
            }
        }

        [HttpPost("[action]")]
        public async Task<TranslationResult> Translate([FromBody] SentenceEdit sentence)
        {
            return await storiesEditService.Translate(sentence);
        }

        [HttpPost("[action]")]
        public async Task<WordEdit> TranslateWord([FromBody] WordEdit word)
        {
            return await storiesEditService.TranslateWord(word);
        }

        [HttpPost("[action]")]
        public bool Save([FromBody] DataToBeSaved data)
        {
            return storiesEditService.Save(data);
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
            return storiesEditService.Register(data);
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