using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class FallingImageController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<FallingImage> GetFallingImages()
        {
            var con = new DBCon();
            var sql = @"
select name, alt, fileName
from tblFallingImage
;";

            var result = con.ExecuteSelect(sql, null);

            return result.Select(r => new FallingImage()
            {
                name = (string)r["name"],
                alt = (string)r["alt"],
                fileName = (string)r["fileName"],
            });
        }
    }

    public class FallingImage
    {
        public string name { get; set; }
        public string alt { get; set; }
        public string fileName { get; set; }
    }
}
