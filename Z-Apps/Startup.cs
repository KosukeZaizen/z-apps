using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Z_Apps.Models;
using Z_Apps.Models.Stories.Stories;
using System;
using Z_Apps.Models.SystemBase;
using Z_Apps.Models.Stories;
using Z_Apps.Models.StoriesEdit;
using Z_Apps.Models.VocabList;
using Microsoft.AspNetCore.Rewrite;
using Z_Apps.Controllers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace Z_Apps
{

    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var con = new DBCon();
            var storageService = new StorageService();
            var storageBackupService = new StorageBackupService(con);

            services.AddSingleton(con);
            services.AddSingleton(storageService);
            services.AddSingleton(storageBackupService);
            services.AddSingleton(new SiteMapService(storageService, storageBackupService));
            services.AddSingleton(new StoriesService(con));
            services.AddSingleton(new StoriesEditService(con));
            services.AddSingleton(new VocabQuizService(con));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DBCon con, SiteMapService siteMapService)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            var options = new RewriteOptions().AddRedirect("(.*)/$", "$1");
            app.UseRewriter(options);


            app.Use(async (context, next) =>
            {
                var ua = context.Request.Headers["User-Agent"].ToString();
                string url = context.Request.Path.Value;

                if (url.EndsWith("sitemap.xml"))
                {
                    context.Response.Headers.Add("Content-Type", "application/xml");

                    await context.Response.WriteAsync(
                        await siteMapService.GetSiteMapText()
                    );
                }
                else if (ua.StartsWith("facebookexternalhit") || ua.StartsWith("Twitterbot"))
                {
                    if (url == null)
                    {
                        await next.Invoke();
                    }
                    else
                    {
                        string resultHTML = "";
                        if (url == "/")
                        {
                            resultHTML = "<!DOCTYPE html><html>" +
                                "<head>" +
                                "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                "<meta property='og:image' content='https://www.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                "<meta property='og:url' content='https://www.lingual-ninja.com'>" + Environment.NewLine +
                                "<meta property='og:type' content='website'>" + Environment.NewLine +
                                "<meta property='og:title' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='og:description' content='Free app to learn Japanese! You can study Japanese from Japanese folktales!'>" + Environment.NewLine +
                                "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                "</head>" + Environment.NewLine +
                                "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("articles/") && url.Length > 10)
                        {
                            string articleName = url.Split("articles/")[1].Replace("/", "");

                            var articleCon = new ArticlesController();
                            var article = articleCon.GetArticle(articleName);
                            var description = article.description.Replace("\\n", " ").Replace("\'", "&#39;");
                            var title = article.title.Replace("\'", "&#39;");
                            var imgPath = article.imgPath?.Length > 0 ? article.imgPath : "https://www.lingual-ninja.com/ogp-img.png";

                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" + Environment.NewLine +
                                    "<meta name='twitter:card' content='summary_large_image'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='" + imgPath + "'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:description' content='" + description + "'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("folktales/") && url.Length > 11)
                        {
                            string storyName = url.Split("folktales/")[1].Replace("/", "");

                            var storyManager = new StoryManager(con);
                            var story = storyManager.GetStory(storyName);
                            var description = story?.Description.Replace("\\n", " ").Replace("\'", "&#39;");
                            var title = storyName.Replace("--", " - ").Replace("_", " ");

                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" + Environment.NewLine +
                                    "<meta name='twitter:card' content='summary_large_image'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://lingualninja.blob.core.windows.net/lingual-storage/folktalesImg/" + storyName.Split("--")[0] + ".png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:description' content='" + description + "'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("folktales") && url.Length < 11)
                        {
                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" + Environment.NewLine +
                                    "<meta name='twitter:card' content='summary_large_image'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://lingualninja.blob.core.windows.net/lingual-storage/folktalesImg/Momotaro.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='Learn Japanese from Folktales'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Learn Japanese from Folktales'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Free web app to learn Japanese from folktales! You can read traditional Japanese folktales in Romaji, Hiragana, Kanji, and English!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("vocabulary-quiz"))
                        {
                            var arrUrl = url.Split("/");
                            var lastElem = arrUrl.LastOrDefault();
                            string title = (lastElem == "vocabulary-quiz") ?
                                "Japanese Vocabulary Quiz" :
                                "Japanese Vocabulary Quiz - " + string.Join(" ", lastElem.Split("_").Select((e) => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(e)));

                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" +
                                    "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://www.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Free app to learn Japanese vocabulary! Try to get a perfect score on all the quizzes!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("kanji-quiz"))
                        {
                            var arrUrl = url.Split("/");
                            var lastElem = arrUrl.LastOrDefault();
                            string title = (lastElem == "kanji-quiz") ?
                                "Kanji Quiz" :
                                "Kanji Quiz - " + string.Join(" ", lastElem.Split("_").Select((e) => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(e)));

                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" +
                                    "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://www.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Free app to learn Japanese Kanji characters! Try to get a perfect score on all the quizzes!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else if (url.Contains("vocabulary-list"))
                        {
                            var arrUrl = url.Split("/");
                            var lastElem = arrUrl.LastOrDefault();
                            string title = "Japanese Vocabulary List";

                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" +
                                    "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://www.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Free app to learn Japanese vocabulary! Try to get a perfect score on all the quizzes!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";

                        }
                        else
                        {
                            resultHTML = "<!DOCTYPE html><html>" +
                                    "<head>" +
                                    "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://www.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://www.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Free app to learn Japanese! You can study Japanese from Japanese folktales!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body></html>";
                        }

                        var clientLogService = new ClientLogService(con);
                        clientLogService.RegisterLog(new ClientOpeLog()
                        {
                            url = url,
                            operationName = "get OGP setting",
                            userId = "SNS Bot",
                            parameters = "ua: " + ua

                        });

                        context.Response.Headers.Add("Content-Type", "text/html");
                        await context.Response.WriteAsync(resultHTML);
                    }
                }
                else
                {
                    await next.Invoke();
                }
            });

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}