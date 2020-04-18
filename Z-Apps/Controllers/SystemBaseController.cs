using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using Z_Apps.Util;
using System;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SystemBaseController : Controller
    {
        private ClientOpeLogManager clientOpeLogManager;
        public SystemBaseController(DBCon con)
        {
            clientOpeLogManager = new ClientOpeLogManager(con);
        }

        [HttpPost("[action]")]
        public void RegisterLog([FromBody] ClientOpeLog log)
        {
            log.time = DateTime.Now;
            var result = clientOpeLogManager.InsertLog(log);
        }
    }
}