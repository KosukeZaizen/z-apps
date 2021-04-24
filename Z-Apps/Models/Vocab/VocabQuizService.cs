using System.Collections.Generic;
using System.Threading.Tasks;
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

        public IEnumerable<Vocab> GetAllVocabs()
        {
            return vocabManager.GetAllVocabLists();
        }

        public IEnumerable<VocabGenre> GetAllGenres()
        {
            return vocabGenreManager.GetAllGenres();
        }

        public IEnumerable<VocabGenre> GetAllGenresForEdit()
        {
            return vocabGenreManager.GetAllGenresForEdit();
        }

        public bool SaveVocabGenres(IEnumerable<VocabGenre> genres)
        {
            return vocabGenreManager.SaveVocabGenres(genres);
        }

        public bool SaveVocabList(IEnumerable<Vocab> vocabList)
        {
            return vocabManager.SaveVocabList(vocabList);
        }

        public async Task<TranslateResult> TranslateVocab(string kanji)
        {
            return await vocabManager.TranslateVocab(kanji);
        }
    }
}
