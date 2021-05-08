using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Z_Apps.Util;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Models.Articles;
using Z_Apps.Models.VocabList;

namespace Z_Apps.Models.SystemBase
{
    public class SiteMapService
    {
        private readonly StorageService storageService;
        private readonly StorageBackupService storageBkService;

        public SiteMapService(StorageService storageService, StorageBackupService storageBkService)
        {
            this.storageService = storageService;
            this.storageBkService = storageBkService;
        }

        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap(bool onlyStrageXmlFile = false)
        {
            var listResult = new List<Dictionary<string, string>>();

            var resultXML = await GetSiteMapText(onlyStrageXmlFile);

            XElement xmlTree = XElement.Parse(resultXML);
            var urls = xmlTree.Elements();

            foreach (XElement url in urls)
            {
                var dic = new Dictionary<string, string>();
                dic.Add("loc", url.Elements().Where(u => u.Name.ToString().Contains("loc")).First().Value);
                dic.Add("lastmod", url.Elements().Where(u => u.Name.ToString().Contains("lastmod")).First().Value);

                listResult.Add(dic);
            }

            return listResult;
        }


        public async Task<string> GetSiteMapText(bool onlyStrageXmlFile = false)
        {
            return await ApiCache.UseCacheAsync(
                "Z_Apps.Models.SystemBase.SiteMapService",
                "GetSiteMapText",
                onlyStrageXmlFile ? "true" : "false",
                async () =>
             {
                 return await _GetSiteMapText(onlyStrageXmlFile);
             });
        }


        public async Task<string> _GetSiteMapText(
            bool onlyStrageXmlFile = false
        )
        {
            try
            {
                //Startup.csのSitemapリクエスト時の処理と、
                //サイトマップ編集画面の内容をストレージに登録する処理の両方から呼ばれる
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(Consts.BLOB_URL + Consts.SITEMAP_PATH);
                    string sitemapFromStorage = await response.Content.ReadAsStringAsync();

                    if (onlyStrageXmlFile)
                    {
                        return sitemapFromStorage;
                    }


                    var lstSitemap = new List<Dictionary<string, string>>();

                    //------------------------------------------------------------
                    //Folktales Topページ
                    var folktaleBaseUrl = "https://www.lingual-ninja.com/folktales";
                    var topDic = new Dictionary<string, string>();
                    topDic["loc"] = folktaleBaseUrl;
                    lstSitemap.Add(topDic);

                    //Folktalesの各ストーリー
                    var storyManager = new StoryManager(new DBCon());
                    var allStories = storyManager.GetAllStories();

                    foreach (var story in allStories)
                    {
                        var dicFolktaleURL = new Dictionary<string, string>();
                        dicFolktaleURL["loc"] = folktaleBaseUrl + "/" + story.StoryName;
                        lstSitemap.Add(dicFolktaleURL);
                    }

                    //------------------------------------------------------------
                    //Articles Topページ
                    var articlesBaseUrl = "https://www.lingual-ninja.com/articles";
                    var articleTopDic = new Dictionary<string, string>();
                    articleTopDic["loc"] = articlesBaseUrl;
                    lstSitemap.Add(articleTopDic);

                    //Articlesの各記事
                    var articlesService = new ArticlesService();
                    var allArticles = articlesService.GetAllArticles(true)
                                .Concat(articlesService.GetAllArticles(false));

                    foreach (var article in allArticles)
                    {
                        var dicArticleURL = new Dictionary<string, string>();
                        dicArticleURL["loc"] = articlesBaseUrl + "/" + article.url;
                        lstSitemap.Add(dicArticleURL);
                    }

                    //------------------------------------------------------------
                    // Vocab List
                    lstSitemap.Add(new Dictionary<string, string>() {
                        {"loc", "https://www.lingual-ninja.com/vocabulary-list" }
                    });

                    // Vocab Quiz Top
                    string vocabQuizBase = "https://www.lingual-ninja.com/vocabulary-quiz";
                    lstSitemap.Add(new Dictionary<string, string>() {
                        {"loc", vocabQuizBase }
                    });

                    // Kanji Quiz Top
                    string kanjiQuizBase = "https://www.lingual-ninja.com/kanji-quiz";
                    lstSitemap.Add(new Dictionary<string, string>() {
                        {"loc", kanjiQuizBase }
                    });

                    var vocabManager = new VocabGenreManager(new DBCon());
                    var allVocabGenres = vocabManager.GetAllGenres();

                    foreach (var vocabGenre in allVocabGenres)
                    {
                        lstSitemap.Add(new Dictionary<string, string>() { {
                                "loc", $"{vocabQuizBase}/{vocabGenre.genreName}"
                            } });
                        lstSitemap.Add(new Dictionary<string, string>() { {
                                "loc", $"{kanjiQuizBase}/{vocabGenre.genreName}"
                            } });
                    }


                    //------------------------------------------------------------
                    ////Dictionary機能
                    //var dictionaryBaseUrl = "https://www.lingual-ninja.com/dictionary";

                    ////top page (noindexのためコメントアウト)
                    ////var dic1 = new Dictionary<string, string>();
                    ////dic1["loc"] = domain;
                    ////lstSitemap.Add(dic1);

                    ////各ページ
                    //var wikiService = new WikiService();
                    //IEnumerable<string> allWords = wikiService.GetAllWordsFromDB(0);
                    //foreach (string word in allWords)
                    //{
                    //    var encodedWord = HttpUtility.UrlEncode(word, Encoding.UTF8).Replace("+", "%20");
                    //    var dicWordId = new Dictionary<string, string>();
                    //    dicWordId["loc"] = dictionaryBaseUrl + "/" + encodedWord;
                    //    lstSitemap.Add(dicWordId);
                    //}

                    //------------------------------------------------------------

                    string partialXML = GetStringSitemapFromDics(lstSitemap);
                    return sitemapFromStorage.Replace("</urlset>", partialXML + "</urlset>");
                }
            }
            catch (Exception ex)
            {
                ErrorLog.InsertErrorLog(ex.Message);
            }

            return "";
        }


        private string GetStringSitemapFromDics(IEnumerable<Dictionary<string, string>> sitemapItems)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var item in sitemapItems)
            {
                sb.Append("  <url>");
                sb.Append("\n");

                sb.Append("    <loc>");
                sb.Append(item["loc"]);
                sb.Append("</loc>");
                sb.Append("\n");

                sb.Append("  </url>");
                sb.Append("\n");
            }

            return sb.ToString();
        }

        public async Task<bool> RegisterSitemap(IEnumerable<Dictionary<string, string>> sitemapItems)
        {
            //backup
            var previousXML = await GetSiteMapText();
            DateTime dt = DateTime.Now;
            await storageBkService.UploadAndOverwriteFileAsync(previousXML, "lingual-storage-bk/sitemap/" + dt.ToString("yyyy-MM") + "-sitemap.xml");

            //register new sitemap
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            sb.Append("\n");
            sb.Append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
            sb.Append("\n");

            foreach (var item in sitemapItems)
            {
                sb.Append("  <url>");
                sb.Append("\n");

                sb.Append("    <loc>");
                sb.Append(item["loc"]);
                sb.Append("</loc>");
                sb.Append("\n");

                sb.Append("    <lastmod>");
                sb.Append(item["lastmod"]);
                sb.Append("</lastmod>");
                sb.Append("\n");

                sb.Append("  </url>");
                sb.Append("\n");
            }
            sb.Append("</urlset>");

            string strSitemap = sb.ToString();
            await storageService.UploadAndOverwriteFileAsync(strSitemap, "appsPublic/sitemap.xml");

            return true;
        }
    }
}