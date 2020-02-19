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
        private readonly LogService service;
        private readonly IDBCon con;
        public SystemBaseController(ILogger<LogService> logger, IDBCon con)
        {
            service = new LogService(logger);
        }

        [HttpPost("[action]")]
        public string RegisterAccessLog([FromBody] DataToBeRegistered data)
        {
            string result = service.RegisterAccessLog(data);
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
                var storageBk = new StorageBackupService(con);
                bool x = await storageBk.MakeBackup();
            }
        }
        public class ReceivedToken
        {
            public string token;
        }
    }
}