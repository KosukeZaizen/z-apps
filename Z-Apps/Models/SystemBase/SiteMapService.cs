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

            // デプロイ直後にサイトマップをキャッシュ
            Task.Run(async () =>
            {
                foreach (var app in Apps.apps)
                {
                    await GetSiteMapText($"{app.Key}.lingual-ninja.com");
                }
            });
        }

        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap()
        {
            var listResult = new List<Dictionary<string, string>>();

            var resultXML = await GetSiteMapTextOnlyFromStorageXmlFile();

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


        public async Task<string> GetSiteMapText(string hostName)
        {
            return await ApiCache.UseCacheAsync(
                "Z_Apps.Models.SystemBase.SiteMapService",
                "GetSiteMapText",
                hostName,
                async () =>
                {
                    return await _GetSiteMapText(hostName);
                }
            );
        }

        public async Task<string> _GetSiteMapText(string hostName)
        {
            try
            {
                if (hostName == "articles.lingual-ninja.com")
                {
                    return GetSiteMapTextForArticles(hostName);
                }
                else if (hostName == Consts.Z_APPS_HOST)
                {
                    return await GetSiteMapTextForZApps(hostName);
                }
                ErrorLog.InsertErrorLog("Message from Lingual Ninja: The url is invalid.");
            }
            catch (Exception ex)
            {
                ErrorLog.InsertErrorLog(ex.Message);
            }
            return null;
        }

        public string GetSiteMapTextForArticles(string hostName)
        {
            var lstSitemap = new List<Dictionary<string, string>>();

            //------------------------------------------------------------
            //Articles Topページ
            var articleTopDic = new Dictionary<string, string>();
            articleTopDic["loc"] = $"https://{hostName}";
            lstSitemap.Add(articleTopDic);

            //Articlesの各記事
            var articlesService = new ArticlesService();
            var allArticles = articlesService.GetAllArticles(true)
                        .Concat(articlesService.GetAllArticles(false));

            foreach (var article in allArticles)
            {
                var dicArticleURL = new Dictionary<string, string>();
                dicArticleURL["loc"] = $"https://{hostName}/articles/" + article.url;
                lstSitemap.Add(dicArticleURL);
            }

            string partialXML = GetStringSitemapFromDics(lstSitemap);

            return (
                    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
                        + partialXML + "</urlset>"
            );
        }

        public async Task<string> GetSiteMapTextForZApps(string hostName)
        {
            //Startup.csのSitemapリクエスト時の処理と、
            //サイトマップ編集画面の内容をストレージに登録する処理の両方から呼ばれる
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(Consts.BLOB_URL + Consts.SITEMAP_PATH);
                string sitemapFromStorage = await response.Content.ReadAsStringAsync();

                var lstSitemap = new List<Dictionary<string, string>>();

                //------------------------------------------------------------
                //Folktales Topページ
                var folktaleBaseUrl = $"https://{hostName}/folktales";
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
                // Vocab List
                lstSitemap.Add(new Dictionary<string, string>() {
                        {"loc", $"https://{hostName}/vocabulary-list" }
                    });

                // Vocab Quiz Top
                string vocabQuizBase = $"https://{hostName}/vocabulary-quiz";
                lstSitemap.Add(new Dictionary<string, string>() {
                        {"loc", vocabQuizBase }
                    });

                // Kanji Quiz Top
                string kanjiQuizBase = $"https://{hostName}/kanji-quiz";
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

                string partialXML = GetStringSitemapFromDics(lstSitemap);
                return sitemapFromStorage.Replace("</urlset>", partialXML + "</urlset>");
            }
        }

        public async Task<string> GetSiteMapTextOnlyFromStorageXmlFile()
        {
            try
            {
                //Startup.csのSitemapリクエスト時の処理と、
                //サイトマップ編集画面の内容をストレージに登録する処理の両方から呼ばれる
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(Consts.BLOB_URL + Consts.SITEMAP_PATH);
                    string sitemapFromStorage = await response.Content.ReadAsStringAsync();

                    return sitemapFromStorage;

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
            var previousXML = await GetSiteMapText(Consts.Z_APPS_HOST);
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