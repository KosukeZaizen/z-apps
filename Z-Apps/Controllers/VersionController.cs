using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class VersionController : Controller
    {
        [HttpGet("[action]")]
        public async Task<string> GetVersion()
        {
            string resultTxt = "";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("https://" + HttpContext.Request.Host + "/version.txt");
                resultTxt = await response.Content.ReadAsStringAsync();
            }
            return resultTxt.Trim();
        }
    }
}