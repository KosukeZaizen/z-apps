using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Z_Apps.Models.VocabList
{
    public class VocabGenreManager
    {
        private readonly DBCon Con;
        public VocabGenreManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<VocabGenre> GetAllGenres()
        {
            //SQL文作成
            string sql = @"
select * 
from tblVocabGenreMst 
where released = 1
order by [order]
;";

            //List<Dictionary<string, Object>>型で取得
            var genres = Con.ExecuteSelect(sql, null);

            var order = 1;
            var resultGenres = new List<VocabGenre>();
            foreach (var dicGenre in genres)
            {
                var genre = new VocabGenre();
                genre.genreId = (int)dicGenre["genreId"];
                genre.genreName = (string)dicGenre["genreName"];
                genre.order = order++;
                genre.youtube = (string)dicGenre["youtube"];
                genre.released = (bool)dicGenre["released"];

                resultGenres.Add(genre);
            }
            return resultGenres;
        }

        public IEnumerable<VocabGenre> GetAllGenresForEdit()
        {
            //SQL文作成
            string sql = @"
select * 
from tblVocabGenreMst 
order by [order]
;";

            //List<Dictionary<string, Object>>型で取得
            var genres = Con.ExecuteSelect(sql, null);

            var order = 1;
            var resultGenres = new List<VocabGenre>();
            foreach (var dicGenre in genres)
            {
                var genre = new VocabGenre();
                genre.genreId = (int)dicGenre["genreId"];
                genre.genreName = (string)dicGenre["genreName"];
                genre.order = order++;
                genre.youtube = (string)dicGenre["youtube"];
                genre.released = (bool)dicGenre["released"];

                resultGenres.Add(genre);
            }
            return resultGenres;
        }

        public VocabGenre GetVocabGenre(string genreName)
        {
            //SQL文作成
            string sql = @"
select * 
from tblVocabGenreMst 
where genreName Like @genreName
;";

            //List<Dictionary<string, Object>>型で取得
            var vocabGenre = Con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                { "@genreName", new object[2] { SqlDbType.NChar, genreName } }
            })
            .FirstOrDefault();

            if (vocabGenre == null)
            {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }


            //Story型に変換してreturn
            return new VocabGenre()
            {
                genreId = (int)vocabGenre["genreId"],
                genreName = (string)vocabGenre["genreName"],
                order = (int)vocabGenre["order"],
                youtube = (string)vocabGenre["youtube"],
                released = (bool)vocabGenre["released"]
        };
        }
    }
}
