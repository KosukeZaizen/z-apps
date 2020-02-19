using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SiteMapEditController : Controller
    {
        private readonly SiteMapService service;
        public SiteMapEditController(IDBCon con)
        {
            service = new SiteMapService(con);
        }

        [HttpGet("[action]/")]
        public async Task<IEnumerable<Dictionary<string, string>>> GetSiteMap()
        {
            return await service.GetSiteMap();
        }

        [HttpPost("[action]")]
        public async Task<bool> RegisterSiteMap([FromBody] DataToBeRegistered data)
        {
            var result = false;
            if (data.token == PrivateConsts.REGISTER_PASS)
            {
                result = await service.RegisterSitemap(data.sitemap);
            }
            return result;
        }
        public class DataToBeRegistered
        {
            public IEnumerable<Dictionary<string, string>> sitemap;
            public string token;
        }
    }
}