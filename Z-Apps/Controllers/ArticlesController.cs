using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using System.Data;
using System.Linq;
using Z_Apps.Util;
using System;
using Microsoft.EntityFrameworkCore.Internal;
using Z_Apps.Models.Articles;

namespace Z_Apps.Controllers
{

    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {

        [HttpGet("[action]/")]
        public Article GetArticle(string p)
        {

            return ApiCache.UseCache(p, () =>
            {

                var con = new DBCon();
                var result = con.ExecuteSelect(@"
SELECT title, description, articleContent, imgPath, isAboutFolktale
FROM tblArticles
WHERE url = @p and released = 1
AND title != N'folktale'
", new Dictionary<string, object[]> { { "@p", new object[2] { SqlDbType.NVarChar, p } } }
                ).FirstOrDefault();

                if (result == null)
                {
                    // 1件もデータがなければ、
                    // フロントから不正なパラメータが来ている可能性があるためエラー
                    throw new Exception();
                }

                return new Article()
                {
                    title = (string)result["title"],
                    description = (string)result["description"],
                    articleContent = (string)result["articleContent"],
                    imgPath = (string)result["imgPath"],
                    isAboutFolktale = result["isAboutFolktale"] != null ? (bool)result["isAboutFolktale"] : false,
                };
            });
        }

        [HttpGet("[action]/")]
        public IEnumerable<Article> GetAllArticles(bool isAboutFolktale = false)
        {
            ArticlesService articleService = new ArticlesService();

            var res = ApiCache.UseCache(
                isAboutFolktale ? "true" : "false",
                () => articleService.GetAllArticles(isAboutFolktale)
                );

            return res;
        }


        [HttpGet("[action]/")]
        public IEnumerable<Article> GetNewArticles(bool isAboutFolktale = false, int num = 5)
        {

            return ApiCache.UseCache(isAboutFolktale ? "true" : "false" + num, () =>
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
                }).Take(num);
            });
        }


        [HttpGet("[action]/")]
        public IEnumerable<Article> GetRandomArticles(
            bool isAboutFolktale = false,
            int num = 5,
            IEnumerable<string> wordsToExclude = null
        )
        {

            return ApiCache.UseCache(isAboutFolktale ? "true" : "false" + num + string.Join("", wordsToExclude), () =>
            {

                if (wordsToExclude == null)
                {
                    wordsToExclude = new List<string>();
                }

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
                }).Where(a => !wordsToExclude.Any(w => a.title.Contains(w))).OrderBy(i => Guid.NewGuid()).Take(num);
            });
        }

        [HttpGet("[action]/")]
        public Article GetArticleForEdit(string p)
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT title, description, articleContent, released, isAboutFolktale
FROM tblArticles
WHERE url = @p
", new Dictionary<string, object[]> { { "@p", new object[2] { SqlDbType.NVarChar, p } } }
            ).FirstOrDefault();

            if (result == null)
            {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }

            return new Article()
            {
                title = (string)result["title"],
                description = (string)result["description"],
                articleContent = (string)result["articleContent"],
                released = result["released"] != null ? (bool)result["released"] : false,
                isAboutFolktale = result["isAboutFolktale"] != null ? (bool)result["isAboutFolktale"] : false,
            };
        }

        [HttpGet("[action]/")]
        public IEnumerable<Article> GetAllArticlesForEdit()
        {
            var con = new DBCon();
            var result = con.ExecuteSelect(@"
SELECT url, title, description, released, isAboutFolktale
FROM tblArticles
ORDER BY orderNumber DESC
", null);

            var articles = result.Select(r => new Article()
            {
                url = (string)r["url"],
                title = (string)r["title"],
                description = (string)r["description"],
                released = r["released"] != null ? (bool)r["released"] : false,
                isAboutFolktale = r["isAboutFolktale"] != null ? (bool)r["isAboutFolktale"] : false,
            });

            return articles;
        }

        [HttpPost("[action]/")]
        public string AddNewUrl(string url, string token)
        {
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return "Password is wrong";
            }

            if (url.Length <= 0)
            {
                return "Url is empty";
            }

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
        public string UpdateContents(string url, string token, string title, string description,
            string articleContent, string imgPath, bool isAboutFolktale)
        {
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return "Password is wrong";
            }

            try
            {
                var con = new DBCon();

                string sql = @"
UPDATE tblArticles
SET    title = @title,
       description = @description,
       articleContent = @articleContent,
       imgPath = @imgPath,
       isAboutFolktale = @isAboutFolktale
WHERE  url = @url;
";

                bool result = con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@url", new object[2] { SqlDbType.NVarChar, url } },
                    { "@title", new object[2] { SqlDbType.NVarChar, title != null ? title : "" } },
                    { "@description", new object[2] { SqlDbType.NVarChar, description != null ? description : "" } },
                    { "@articleContent", new object[2] { SqlDbType.NVarChar, articleContent != null ? articleContent : "" } },
                    { "@imgPath", new object[2] { SqlDbType.NVarChar, imgPath != null ? imgPath : "" } },
                    { "@isAboutFolktale", new object[2] { SqlDbType.Bit, isAboutFolktale } }
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
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return "Password is wrong";
            }

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
            if (token != PrivateConsts.REGISTER_PASS)
            {
                return "Password is wrong";
            }

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
