using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private LogService service;
        public SystemBaseController()
        {
            service = new LogService(new DBCon());
        }

        [HttpPost("[action]")]
        public bool RegisterAccessLog([FromBody] DataToBeRegistered data)
        {
            bool result = service.RegisterAccessLog(data);
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