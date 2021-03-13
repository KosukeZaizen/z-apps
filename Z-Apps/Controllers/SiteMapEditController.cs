using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;

namespace Z_Apps.Controllers {
    [Route("api/[controller]")]
    public class SiteMapEditController : Controller {
        private readonly SiteMapService siteMapService;
        public SiteMapEditController(SiteMapService siteMapService) {
            this.siteMapService = siteMapService;
        }

        [HttpGet("[action]/")]
        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap() {
            return await siteMapService.GetSiteMap(true);
        }

        [HttpPost("[action]")]
        public async Task<bool> RegisterSiteMap([FromBody] DataToBeRegistered data) {
            var result = false;
            if (data.token == PrivateConsts.REGISTER_PASS) {
                result = await siteMapService.RegisterSitemap(data.sitemap);
            }
            return result;
        }
        public class DataToBeRegistered {
            public IEnumerable<Dictionary<string, string>> sitemap { get; set; }
            public string token { get; set; }
        }
    }
}