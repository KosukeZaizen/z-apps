using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Z_Apps.Util;
using System.Runtime.Serialization.Json;
using System.IO;

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

        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap()
        {
            var listResult = new List<Dictionary<string, string>>();

            var resultXML = await GetSiteMapText();


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

        public async Task<string> GetSiteMapText()
        {
            string resultXML = "";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(Consts.BLOB_URL + Consts.SITEMAP_PATH);
                resultXML = await response.Content.ReadAsStringAsync();

                var domains = new List<string>();
                domains.Add("https://z-apps.lingual-ninja.com/how-to-read-japanese");
                domains.Add("https://z-apps.lingual-ninja.com/dictionary");

                var lstSitemap = new List<Dictionary<string, string>>();

                foreach (string domain in domains)
                {
                    //top page (noindexのためコメントアウト)
                    //var dic1 = new Dictionary<string, string>();
                    //dic1["loc"] = domain;
                    //lstSitemap.Add(dic1);

                    IEnumerable<string> allWord = await GetAllWords();
                    foreach (string word in allWord)
                    {
                        var encodedWord = HttpUtility.UrlEncode(word, Encoding.UTF8).Replace("+", "%20");
                        var dicWordId = new Dictionary<string, string>();
                        dicWordId["loc"] = domain + "/" + encodedWord;
                        lstSitemap.Add(dicWordId);
                    }
                }

                string partialXML = GetWikiSitemap(lstSitemap);

                resultXML = resultXML.Replace("</urlset>", partialXML + "</urlset>");
            }
            return resultXML;
        }

        private async Task<IEnumerable<string>> GetAllWords()
        {
            string result = "";
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync("https://wiki-jp.lingual-ninja.com/api/WikiWalks/GetAllWords");
                result = await response.Content.ReadAsStringAsync();
            }
            return result.Replace("\"", "").Replace("[", "").Replace("]", "").Split(",");
        }

        private string GetWikiSitemap(IEnumerable<Dictionary<string, string>> sitemapItems)
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