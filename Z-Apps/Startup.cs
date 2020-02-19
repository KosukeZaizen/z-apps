using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Z_Apps.Models;
using Z_Apps.Models.Stories.Stories;
using Microsoft.Extensions.Logging;
using System;
using Z_Apps.Models.SystemBase;

namespace Z_Apps
{
    public class Startup
    {
        private readonly ILogger logger;
        private readonly IStorageService storageService;
        private readonly IStorageBackupService storageBkService;
        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
            this.logger = logger;
            this.storageService = storageService;
            this.storageBkService = storageBkService;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IDBCon, DBCon>();
            services.AddSingleton<IStorageService, StorageService>();
            services.AddSingleton<IStorageBackupService, StorageBackupService>();
            services.AddSingleton<ITelemetryInitializer, TelemetryInitializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IDBCon con)
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

            app.Use(async (context, next) =>
            {
                var ua = context.Request.Headers["User-Agent"].ToString();
                string url = context.Request.Path.Value;

                if (url.EndsWith("sitemap.xml"))
                {
                    logger.LogWarning("sitemap.xml");
                    var siteMapService = new SiteMapService(storageService, storageBkService);
                    string resultXML = await siteMapService.GetSiteMapText();
                    logger.LogWarning(resultXML);

                    await context.Response.WriteAsync(resultXML);
                }
                else if (ua.StartsWith("facebookexternalhit"))
                {
                    logger.LogWarning("SNS bot");
                    
                    if (url == null)
                    {
                        await next.Invoke();
                    }
                    else
                    {
                        string resultHTML = "";
                        if (url == "/")
                        {
                            resultHTML = "" +
                                "<head>" +
                                "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                "<meta property='og:image' content='https://z-apps.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                "<meta property='og:url' content='https://z-apps.lingual-ninja.com'>" + Environment.NewLine +
                                "<meta property='og:type' content='website'>" + Environment.NewLine +
                                "<meta property='og:title' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='og:description' content='Applications to learn Japanese! You can study Japanese from Japanese folktales!'>" + Environment.NewLine +
                                "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                "</head>" + Environment.NewLine +
                                "<body>Content for SNS bot</body>";
                        }
                        else if (url.Contains("folktales/") && url.Length > 10)
                        {
                            string storyName = url.Split("folktales/")[1].Replace("/", "");

                            var storyManager = new StoryManager(con);
                            var story = storyManager.GetStory(storyName);
                            var description = story?.Description.Replace("\\n", " ").Replace("\'", "&#39;");
                            var title = storyName.Replace("--", " - ").Replace("_", " ");

                            resultHTML = "" +
                                    "<head>" + Environment.NewLine +
                                    "<meta name='twitter:card' content='summary_large_image'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://lingualninja.blob.core.windows.net/lingual-storage/folktalesImg/" + storyName.Split("--")[0] + ".png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://z-apps.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='" + title + "'>" + Environment.NewLine +
                                    "<meta property='og:description' content='" + description + "'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body>";
                        }
                        else
                        {
                            resultHTML = "" +
                                    "<head>" +
                                    "<meta name='twitter:card' content='summary'>" + Environment.NewLine +
                                    "<meta name='twitter:site' content='@LingualNinja'>" + Environment.NewLine +
                                    "<meta property='og:image' content='https://z-apps.lingual-ninja.com/ogp-img.png'>" + Environment.NewLine +
                                    "<meta property='og:url' content='https://z-apps.lingual-ninja.com" + url + "'>" + Environment.NewLine +
                                    "<meta property='og:type' content='article'>" + Environment.NewLine +
                                    "<meta property='og:title' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:image:alt' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='og:description' content='Applications to learn Japanese! You can study Japanese from Japanese folktales!'>" + Environment.NewLine +
                                    "<meta property='og:site_name' content='Lingual Ninja'>" + Environment.NewLine +
                                    "<meta property='fb:app_id' content='217853132566874'>" + Environment.NewLine +
                                    "<meta property='fb:page_id' content='491712431290062'>" + Environment.NewLine +
                                    "</head>" + Environment.NewLine +
                                    "<body>Content for SNS bot</body>";
                        }
                        logger.LogWarning(resultHTML);
                        await context.Response.WriteAsync(resultHTML);
                    }
                }
                else
                {
                    await next.Invoke();
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
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