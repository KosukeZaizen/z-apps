using Microsoft.AspNetCore.Mvc;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class VersionController : Controller
    {
        [HttpGet("[action]")]
        public int GetVersion()
        {
            return Util.Version.APP_VERSION;
        }
    }
}