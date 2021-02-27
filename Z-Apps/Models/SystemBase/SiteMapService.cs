using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Z_Apps.Util;
using Z_Apps.Models.Stories.Stories;
using Z_Apps.Controllers;

namespace Z_Apps.Models.SystemBase
{
    public class SiteMapService
    {
        private readonly StorageService storageService;
        private readonly StorageBackupService storageBkService;
        public List<IEnumerable<Dictionary<string, string>>> sitemapChunks;

        public SiteMapService(StorageService storageService, StorageBackupService storageBkService)
        {
            this.storageService = storageService;
            this.storageBkService = storageBkService;

            //分割したsitemapChunksの初期値を生成
            Task.Run(() =>
            {
                Task.Delay(3 * 60 * 1000);//３分遅れ
                var task = GetSiteMapText(false, 0);
            });
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

        public async Task<string> GetSiteMapText(
            bool onlyStrageXmlFile = false,
            //各ファイルの配置を書いているXMLが0番、ストレージ上の静的XMLが1番、それ以降は2番～...
            int sitemapNumber = 0
        )
        {
            try
            {
                //Startup.csのSitemapリクエスト時の処理と、
                //サイトマップ編集画面の内容をストレージに登録する処理の両方から呼ばれる
                using (var client = new HttpClient())
                {
                    if (sitemapNumber == 1 || onlyStrageXmlFile)
                    {
                        var response = await client.GetAsync(Consts.BLOB_URL + Consts.SITEMAP_PATH);
                        return await response.Content.ReadAsStringAsync();
                    }

                    if (sitemapNumber == 0)
                    {
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
                        var articlesController = new ArticlesController();
                        var allArticles = articlesController.GetAllArticles(true)
                                    .Concat(articlesController.GetAllArticles(false));

                        foreach (var article in allArticles)
                        {
                            var dicArticleURL = new Dictionary<string, string>();
                            dicArticleURL["loc"] = articlesBaseUrl + "/" + article.url;
                            lstSitemap.Add(dicArticleURL);
                        }

                        //------------------------------------------------------------
                        //Dictionary機能
                        var dictionaryBaseUrl = "https://www.lingual-ninja.com/dictionary";

                        //top page (noindexのためコメントアウト)
                        //var dic1 = new Dictionary<string, string>();
                        //dic1["loc"] = domain;
                        //lstSitemap.Add(dic1);

                        //各ページ
                        var wikiService = new WikiService();
                        IEnumerable<string> allWords = wikiService.GetAllWordsFromDB(0);
                        foreach (string word in allWords)
                        {
                            var encodedWord = HttpUtility.UrlEncode(word, Encoding.UTF8).Replace("+", "%20");
                            var dicWordId = new Dictionary<string, string>();
                            dicWordId["loc"] = dictionaryBaseUrl + "/" + encodedWord;
                            lstSitemap.Add(dicWordId);
                        }

                        //------------------------------------------------------------
                        //サイトマップの分割
                        var chunkSize = 30000;
                        sitemapChunks = lstSitemap.Select((v, i) => new { v, i })
                                                .GroupBy(x => x.i / chunkSize)
                                                .Select(g => g.Select(x => x.v))
                                                .ToList();

                        return GetSitemapWithoutStorageFromCache();
                    }

                    if (sitemapChunks == null || sitemapChunks.Count() == 0)
                    {
                        await GetSiteMapText(false, 0);
                    }

                    var chunkIndex = sitemapNumber - 2;
                    if (sitemapChunks != null && chunkIndex < sitemapChunks.Count())
                    {
                        string baseXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"></urlset>";
                        string partialXML = GetStringSitemapFromDics(sitemapChunks[chunkIndex]);
                        return baseXML.Replace("</urlset>", partialXML + "</urlset>");
                    }
                }
            }
            catch (Exception ex) { }

            return "";
        }


        public string GetSitemapWithoutStorageFromCache()
        {
            var result = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?><sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
            for (var i = 1; i < sitemapChunks.Count() + 2; i++)
            {
                result.Append("<sitemap><loc>");
                result.Append(Consts.SITE_URL + "/sitemap" + i + ".xml");
                result.Append("</loc></sitemap>");
            }
            result.Append("</sitemapindex>");
            return result.ToString();
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