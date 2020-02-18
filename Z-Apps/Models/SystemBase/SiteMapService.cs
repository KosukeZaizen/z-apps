using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Z_Apps.Util;
using static Z_Apps.Controllers.SiteMapEditController;

namespace Z_Apps.Models.SystemBase
{
    public class SiteMapService
    {
        private readonly StorageService storageService;
        private readonly StorageBackupService storageBkService;

        public SiteMapService()
        {
            storageService = new StorageService();
            storageBkService = new StorageBackupService();
        }

        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap()
        {
            var listResult = new List<Dictionary<string, string>>();

            string resultXML = "";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(@"https://lingualninja.blob.core.windows.net/lingual-storage/appsPublic/sitemap.xml");
                resultXML = await response.Content.ReadAsStringAsync();
            }


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

        public async Task<bool> RegisterSitemap(IEnumerable<Dictionary<string, string>> sitemapItems)
        {
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

            //backup
            DateTime dt = DateTime.Now;
            await storageBkService.UploadAndOverwriteFileAsync(strSitemap, "lingual-storage-bk/sitemap/" + dt.ToString("yyyy-MM") + "-sitemap.xml");

            return true;
        }
    }
}