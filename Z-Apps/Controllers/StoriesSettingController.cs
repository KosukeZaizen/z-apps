using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.Stories;
using Z_Apps.Models.Stories.Sentences;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesSettingController : Controller
    {
        private Service service;
        public StoriesSettingController()
        {
            service = new Service(new DBCon());
        }

        [HttpGet("[action]")]
        public IEnumerable<Sentence> GetPageData(int id, int page)
        {
            if (id > 0 && page > 0)
            {
                var pageData = service.GetPageData(id, page);
                return pageData;
            }
            else
            {
                return null;
            }
        }
    }
}