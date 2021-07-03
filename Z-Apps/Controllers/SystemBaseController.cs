using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using System.Collections.Generic;
using System.Threading.Tasks;
using Z_Apps.Util;

namespace Z_Apps.Controllers {
    [Route("api/[controller]")]
    public class SystemBaseController : Controller {
        private ClientLogService clientLogService;
        private VersionService versionService;
        public SystemBaseController(DBCon con) {
            clientLogService = new ClientLogService(con);
            versionService = new VersionService();
        }

        [HttpGet("[action]")]
        public IEnumerable<ClientOpeLog> GetOpeLogs() {
            return clientLogService.GetOpeLogs();
        }

        [HttpGet("[action]")]
        public IEnumerable<Client> GetAllClients() {
            return clientLogService.GetAllClients();
        }

        [HttpPost("[action]")]
        public void RegisterLog([FromBody] ClientOpeLog log) {
            clientLogService.RegisterLog(log);
        }

        [HttpGet("[action]/{dummyParam?}")]
        public async Task<string> GetVersion() {
            return await versionService.GetVersion();
        }

        [HttpGet("[action]")]
        public Dictionary<string, Dictionary<string, Dictionary<string, ApiCache.CacheData>>> GetCache() {
            return ApiCache.GetCache();
        }
    }
}