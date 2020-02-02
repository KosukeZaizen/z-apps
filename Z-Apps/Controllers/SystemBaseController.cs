using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private LogService service;
        public SystemBaseController(ILogger<LogService> logger)
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
    }
}