using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.VocabList;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class VocabQuizController : Controller
    {
        private VocabQuizService vocabQuizService;
        public VocabQuizController(VocabQuizService vocabQuizService)
        {
            this.vocabQuizService = vocabQuizService;
        }

        [HttpGet("[action]/{genreName?}")]
        public GenreAndVocab GetQuizData(string genreName)
        {

            return ApiCache.UseCache(genreName, () =>
            {

                if (!string.IsNullOrEmpty(genreName))
                {
                    return vocabQuizService.GetQuizData(genreName);
                }
                else
                {
                    return null;
                }
            });
        }
        public class GenreAndVocab
        {
            public VocabGenre vocabGenre {
                get; set;
            }
            public IEnumerable<Vocab> vocabList {
                get; set;
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Vocab> GetAllVocabs()
        {

            return ApiCache.UseCache("p", () =>
            {
                return vocabQuizService.GetAllVocabs();
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<VocabGenre> GetAllGenres()
        {

            return ApiCache.UseCache("p", () =>
            {
                return vocabQuizService.GetAllGenres();
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<VocabGenre> GetAllGenresForEdit()
        {
            return vocabQuizService.GetAllGenresForEdit();
        }
    }
}