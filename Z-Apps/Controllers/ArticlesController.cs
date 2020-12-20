using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using System.Data;
using System.Linq;
using Z_Apps.Util;
using System;

namespace Z_Apps.Controllers
{
    public class Article
    {
        public string url;
        public string title;
        public string description;
        public string articleContent;
        public string imgPath;
    }

    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {
        [HttpGet("[action]/")]
        public Article GetArticle(string p)
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT title, description, articleContent, imgPath
FROM tblArticles
WHERE url = @p and released = 1
", new Dictionary<string, object[]> { { "@p", new object[2] { SqlDbType.NVarChar, p } } }
            ).FirstOrDefault();

            if (result != null)
            {
                return new Article()
                {
                    title = (string)result["title"],
                    description = (string)result["description"],
                    articleContent = (string)result["articleContent"],
                    imgPath = (string)result["imgPath"],
                };
            }

            return null;
        }

        [HttpGet("[action]/")]
        public IEnumerable<Article> GetAllArticles()
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT url, title, description, imgPath
FROM tblArticles 
WHERE released = 1
ORDER BY orderNumber DESC
", null);

            return result.Select(r => new Article()
            {
                url = (string)r["url"],
                title = (string)r["title"],
                description = (string)r["description"],
                imgPath = (string)r["imgPath"],
            }
            );
        }

        [HttpGet("[action]/")]
        public Article GetArticleForEdit(string p)
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
        public IEnumerable<Article> GetAllArticlesForEdit()
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT url, title, description 
FROM tblArticles
ORDER BY orderNumber DESC
", null);

            return result.Select(r => new Article()
            {
                url = (string)r["url"],
                title = (string)r["title"],
                description = (string)r["description"],
            }
            );
        }

        [HttpPost("[action]/")]
        public string AddNewUrl(string url, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS) { return "Password is wrong"; }

            if (url.Length <= 0) { return "Url is empty"; }

            try
            {
                var con = new DBCon();

                string sql = "INSERT INTO tblArticles(url) VALUES (@url);";

                bool result = con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@url", new object[2] { SqlDbType.NVarChar, url } } });

                if (!result)
                {
                    return "Failed to register";
                }
            }
            catch (Exception e)
            {
                return "Something is wrong";
            }

            return "success";
        }


        [HttpPost("[action]/")]
        public string UpdateContents(string url, string title, string description, 
            string articleContent, string imgPath, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS) { return "Password is wrong"; }

            try
            {
                var con = new DBCon();

                string sql = @"
UPDATE tblArticles
SET    title = @title,
       description = @description,
       articleContent = @articleContent,
       imgPath = @imgPath
WHERE  url = @url;
";

                bool result = con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@url", new object[2] { SqlDbType.NVarChar, url } },
                    { "@title", new object[2] { SqlDbType.NVarChar, title } },
                    { "@description", new object[2] { SqlDbType.NVarChar, description } },
                    { "@articleContent", new object[2] { SqlDbType.NVarChar, articleContent } },
                    { "@imgPath", new object[2] { SqlDbType.NVarChar, imgPath } }
                });

                if (!result)
                {
                    return "Failed to register";
                }
            }
            catch (Exception e)
            {
                return "Something is wrong";
            }

            return "success";
        }

        [HttpPost("[action]/")]
        public string Register(string url, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS) { return "Password is wrong"; }

            try
            {
                var con = new DBCon();

                string sql = @"
UPDATE tblArticles
SET    released = 1
WHERE  url = @url;
";

                bool result = con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@url", new object[2] { SqlDbType.NVarChar, url } },
                });

                if (!result)
                {
                    return "Failed to register";
                }
            }
            catch (Exception e)
            {
                return "Something is wrong";
            }

            return "success";
        }

        [HttpPost("[action]/")]
        public string Hide(string url, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS) { return "Password is wrong"; }

            try
            {
                var con = new DBCon();

                string sql = @"
UPDATE tblArticles
SET    released = 0
WHERE  url = @url;
";

                bool result = con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@url", new object[2] { SqlDbType.NVarChar, url } },
                });

                if (!result)
                {
                    return "Failed to hide";
                }
            }
            catch (Exception e)
            {
                return "Something is wrong";
            }

            return "success";
        }
    }
}
