using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models.SystemBase;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;

namespace Z_Apps.Controllers
{
    public class HomeController : Controller
    {
        private readonly IndexHtml indexHtml;
        public HomeController(IndexHtml indexHtml)
        {
            this.indexHtml = indexHtml;
        }

        public IActionResult Index()
        {
            if (string.IsNullOrEmpty(indexHtml.html))
            {
                return new ContentResult
                {
                    Content = "System is preparing now. Please reload later.",
                    ContentType = "text/html; charset=utf-8"
                };
            }

            var request = HttpContext.Request;
            string url = request.Path.Value;
            var app = Apps
                        .apps
                        .FirstOrDefault(
                            a => request
                                    .Host
                                    .Host
                                    .Contains($"{a.Key}.lingual-ninja.com")
                        );

            if (app == null)
            {
                app = Apps.apps.FirstOrDefault();
            }

            var contentType = url == "/" ? "website" : "article";

            var content = indexHtml
                            .html
                            .Replace("__title__", app.Title)
                            .Replace("__description__", app.Description)
                            .Replace("__url__", $"{app.Key}.lingual-ninja.com")
                            .Replace("__content_type__", contentType);

            return new ContentResult
            {
                Content = content,
                ContentType = "text/html; charset=utf-8"
            };
        }
    }

    public class IndexHtml
    {
        public string html { get; set; }
        public IndexHtml()
        {
            Task.Run(async () =>
            {
                while (string.IsNullOrEmpty(html))
                {
                    try
                    {
                        using (var sr = new StreamReader("./ClientApp/build/index.html"))
                        {
                            html = sr.ReadToEnd();
                        }
                    }
                    catch (Exception) { }

                    await Task.Delay(5 * 1000);
                }
            });
        }
    }
}
