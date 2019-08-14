using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Z_Apps.Controllers
{
    [Route("page/[controller]")]
    public class PageNotFoundController : Controller
    {
        public IActionResult error()
        {
            return View();
        }
    }
}
