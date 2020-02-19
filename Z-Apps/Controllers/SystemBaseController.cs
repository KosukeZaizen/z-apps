using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private readonly LogService logService;
        private readonly IStorageBackupService storageBkService;
        public SystemBaseController(ILogger<LogService> logger, IStorageBackupService storageBkService)
        {
            logService = new LogService(logger);
            this.storageBkService = storageBkService;
        }

        [HttpPost("[action]")]
        public string RegisterAccessLog([FromBody] DataToBeRegistered data)
        {
            string result = logService.RegisterAccessLog(data);
            return result;
        }
        public class DataToBeRegistered
        {
            public string userId;
            public string href;
            public string token;
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