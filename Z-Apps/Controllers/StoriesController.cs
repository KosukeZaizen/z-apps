using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Models.Stories;
using Z_Apps.Models.Stories.Stories;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class StoriesController : Controller
    {
        private Service service;
        public StoriesController()
        {
            service = new Service(new DBCon());
        }

        [HttpGet("[action]/{storyName?}")]
        public Story GetPageData(string storyName, int page = 1)
        {
            if (!string.IsNullOrEmpty(storyName) && page > 0)
            {
                var story = service.GetPageData(storyName, page);
                return story;
            }
            else
            {
                return null;
            }
        }
    }
}