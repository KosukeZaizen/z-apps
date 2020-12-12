using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using System.Data;
using System.Linq;

namespace Z_Apps.Controllers
{
    public class Article
    {
        public string url;
        public string title;
        public string description;
        public string articleContent;
    }

    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {
        [HttpGet("[action]/")]
        public Article GetArticle(string p)
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT title, description, articleContent
FROM tblArticles
WHERE url = @p
", new Dictionary<string, object[]> { { "@p", new object[2] { SqlDbType.NVarChar, p } } }
            ).FirstOrDefault();

            if (result != null)
            {
                return new Article()
                {
                    title = (string)result["title"],
                    description = (string)result["description"],
                    articleContent = (string)result["articleContent"],
                };
            }

            return null;
        }

        [HttpGet("[action]/")]
        public IEnumerable<Article> GetAllArticles()
        {
            var con = new DBCon();
            var result = con.ExecuteSelect("SELECT url, title, description FROM tblArticles WHERE released = 1", null);

            return result.Select(r => new Article()
            {
                url = (string)r["url"],
                title = (string)r["title"],
                description = (string)r["description"],
            }
            );
        }
    }
}
