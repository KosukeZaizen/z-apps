using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.SystemBase;
using System.Net.Http;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SiteMapEditController : Controller
    {
        private readonly StorageService storageService;
        public SiteMapEditController()
        {
            storageService = new StorageService();
        }

        [HttpGet("[action]/")]
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
    }
}