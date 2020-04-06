using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.VocabList
{
    public class VocabGenreManager
    {
        private readonly DBCon Con;
        public VocabGenreManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<VocabGenre> GetAllGenre()
        {
            //SQL文作成
            string sql = "";
            sql += " select * from tblVocabGenreMst";
            sql += " order by [order]";

            //List<Dictionary<string, Object>>型で取得
            var genres = Con.ExecuteSelect(sql, null);

            var resultGenres = new List<VocabGenre>();
            foreach (var dicGenre in genres)
            {
                var genre = new VocabGenre();
                genre.genreId = (int)dicGenre["genreId"];
                genre.genreName = (string)dicGenre["genreName"];
                genre.order = (int)dicGenre["order"];

                resultGenres.Add(genre);
            }
            return resultGenres;
        }

        public VocabGenre GetVocabGenre(string genreName)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblVocabGenreMst";
            sql += " where genreName Like @genreName";

            //List<Dictionary<string, Object>>型で取得
            var vocabGenre = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@genreName", new object[2] { SqlDbType.NChar, genreName } } });

            //Story型に変換してreturn
            var genre = new VocabGenre();
            foreach (var dicGenre in vocabGenre)
            {
                genre.genreId = (int)dicGenre["genreId"];
                genre.genreName = (string)dicGenre["genreName"];
                genre.order = (int)dicGenre["order"];
            }
            return genre;
        }
    }
}
