using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Util;

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

        public class DataToSave
        {
            public IEnumerable<FallingImage> fallingImages { get; set; }
            public string token { get; set; }
        }
        [HttpPost("[action]/")]
        public bool Save([FromBody] DataToSave data)
        {
            if (data.token != PrivateConsts.REGISTER_PASS)
            {
                return false;
            }

            var con = new DBCon();
            return con.UseTransaction((execUpdate) =>
                {
                    try
                    {
                        if (!data.fallingImages.Any())
                        {
                            return false;
                        }

                        execUpdate("delete tblFallingImage;", null);

                        int i = 1;
                        foreach (var fallingImage in data.fallingImages)
                        {
                            string insertSql = @"
insert into tblFallingImage
    (name, alt, fileName)
values
    (@name, @alt, @fileName)
;";
                            var resultCount = execUpdate(insertSql, new Dictionary<string, object[]> {
                                { "@name", new object[2] { SqlDbType.NVarChar, fallingImage.name } },
                                { "@alt", new object[2] { SqlDbType.NVarChar, fallingImage.alt } },
                                { "@fileName", new object[2] { SqlDbType.NVarChar, fallingImage.fileName } },
                            });

                            if (resultCount != 1)
                            {
                                return false;
                            }
                            i++;
                        }
                        return true;
                    }
                    catch (Exception ex)
                    {
                        ErrorLog.InsertErrorLog(ex.Message);
                    }
                    return false;
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
