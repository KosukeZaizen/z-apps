using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class AppBaseController : Controller
    {
        private readonly IStorageBackupService storageBkService;
        public AppBaseController(IStorageBackupService storageBkService)
        {
            this.storageBkService = storageBkService;
        }


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

        [HttpPost("[action]")]
        public async Task MakeDbBackupAsync()
        {
            bool x = await storageBkService.MakeBackup();
        }
    }
}