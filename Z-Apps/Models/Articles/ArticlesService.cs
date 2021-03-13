using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace Z_Apps.Models.Articles
{
    public class ArticlesService
    {
        public IEnumerable<Article> GetAllArticles(bool isAboutFolktale = false)
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT url, title, description, imgPath
FROM tblArticles 
WHERE released = 1 and isAboutFolktale = @isAboutFolktale
AND title != N'folktale'
ORDER BY orderNumber DESC
",
                        new Dictionary<string, object[]> {
                            { "@isAboutFolktale", new object[2] { SqlDbType.Bit, isAboutFolktale } }
                        }
                 );

            return result.Select(r => new Article()
            {
                url = (string)r["url"],
                title = (string)r["title"],
                description = (string)r["description"],
                imgPath = (string)r["imgPath"],
            }
            );
        }
    }
}

