using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private readonly IStorageBackupService storageBkService;
        public SystemBaseController(IStorageBackupService storageBkService)
        {
            this.storageBkService = storageBkService;
        }

        [HttpPost("[action]")]
        public async Task MakeDbBackupAsync([FromBody] ReceivedToken data)
        {
            if (data.token == PrivateConsts.REGISTER_PASS)
            {
                bool x = await storageBkService.MakeBackup();
            }
        }
        public class ReceivedToken
        {
            public string token;
        }
    }
}