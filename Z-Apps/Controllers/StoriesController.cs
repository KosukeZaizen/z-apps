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
    public class StoriesController : Controller
    {
        private Service service;
        public StoriesController()
        {
            service = new Service(new DBCon());
        }

        // GET: Story
        public string Index()
        {
            return "heeeelllo";
        }

        public string GetPageData(int id, int page)
        {
            if (id > 0 && page > 0)
            {
                IEnumerable<Sentence> pageData = service.GetPageData(id, page);
                return pageData.First().Kanji;
            }
            else
            {
                return "no data";
            }
        }
    }
}