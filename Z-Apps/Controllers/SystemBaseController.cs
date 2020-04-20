using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using System.Collections.Generic;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private ClientLogService clientLogService;
        public SystemBaseController(DBCon con)
        {
            clientLogService = new ClientLogService(con);
        }

        [HttpGet("[action]")]
        public IEnumerable<ClientOpeLog> GetOpeLogs()
        {
            return clientLogService.GetOpeLogs();
        }

        [HttpGet("[action]")]
        public IEnumerable<Client> GetAllClients()
        {
            return clientLogService.GetAllClients();
        }

        [HttpPost("[action]")]
        public void RegisterLog([FromBody] ClientOpeLog log)
        {
            clientLogService.RegisterLog(log);
        }
    }
}