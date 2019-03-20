using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(String startDateIndex)
        {
            return Enumerable.Range(1,1).Select(index => new WeatherForecast
            {
                DateFormatted = startDateIndex,
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
        }
    }
}
