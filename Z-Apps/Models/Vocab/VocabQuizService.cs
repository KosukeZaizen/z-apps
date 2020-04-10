using System.Collections.Generic;
using static Z_Apps.Controllers.VocabQuizController;

namespace Z_Apps.Models.VocabList
{
    public class VocabQuizService
    {
        private readonly VocabGenreManager vocabGenreManager;
        private readonly VocabManager vocabManager;

        public VocabQuizService(DBCon con)
        {
            vocabGenreManager = new VocabGenreManager(con);
            vocabManager = new VocabManager(con);
        }

        public GenreAndVocab GetQuizData(string genreName)
        {
            var vocabGenre = vocabGenreManager.GetVocabGenre(genreName);

            IEnumerable<Vocab> vocabList = null;
            if (vocabGenre != null)
            {
                vocabList = vocabManager.GetVocabList(vocabGenre.genreId);
            }

            return new GenreAndVocab
            {
                vocabGenre = vocabGenre,
                vocabList = vocabList
            };
        }

        public List<GenreAndVocab> GetAllVocabs()
        {
            var resultGenreAndVocabs = new List<GenreAndVocab>();

            var vocabGenres = vocabGenreManager.GetAllGenres();

            foreach (var vocabGenre in vocabGenres)
            {
                IEnumerable<Vocab> vocabList = null;
                if (vocabGenre != null)
                {
                    vocabList = vocabManager.GetVocabList(vocabGenre.genreId);
                }

                resultGenreAndVocabs.Add(
                    new GenreAndVocab
                    {
                        vocabGenre = vocabGenre,
                        vocabList = vocabList
                    });
            }
            return resultGenreAndVocabs;
        }

        public IEnumerable<VocabGenre> GetAllGenres(){
            return vocabGenreManager.GetAllGenres();
        }
    }
}
