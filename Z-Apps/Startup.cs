using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Z_Apps.Models;
using Z_Apps.Models.Stories.Stories;
using Microsoft.Extensions.Logging;

namespace Z_Apps
{
    public class Startup
    {
        private readonly ILogger logger;
        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
            this.logger = logger;
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

            services.AddSingleton<ITelemetryInitializer, TelemetryInitializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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

                if (ua.StartsWith("facebookexternalhit") || ua.Contains("Twitterbot"))
                {
                    logger.LogWarning($"SNS bot");
                    
                    string url = context.Request.Path.Value;
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
                                "<meta name=\"twitter:card\" content=\"summary\">" +
                                "<meta name=\"twitter:site\" content=\"@LingualNinja\">" +
                                "<meta property=\"og:image\" content=\"https://z-apps.lingual-ninja.com/ogp-img.png\">" +
                                "<meta property=\"og:url\" content=\"" + "https://z-apps.lingual-ninja.com\">" +
                                "<meta property=\"og:type\" content=\"website\">" +
                                "<meta property=\"og:title\" content=\"Lingual Ninja\">" +
                                "<meta property=\"og:image:alt\" content=\"Lingual Ninja\">" +
                                "<meta property=\"og:description\" content=\"Applications to learn Japanese! You can study Japanese from Japanese folktales!\">" +
                                "<meta property=\"og:site_name\" content=\"Lingual Ninja\">" +
                                "<meta property=\"fb:app_id\" content=\"217853132566874\">" +
                                "<meta property=\"fb:page_id\" content=\"491712431290062\">" +
                                "</head>" +
                                "<body>Content for SNS bot</body>";
                        }
                        else if (url.Contains("folktales/"))
                        {
                            string storyName = url.Split("folktales/")[1].Replace("/", "");

                            var storyManager = new StoryManager(new DBCon());
                            var story = storyManager.GetStory(storyName);
                            var description = story.Description.Replace("\\n", " ").Replace("\"", "&quot;");
                            var title = storyName.Replace("--", " - ").Replace("_", " ");

                            resultHTML = "" +
                                    "<head>" +
                                    "<meta name=\"twitter:card\" content=\"summary\">" +
                                    "<meta name=\"twitter:site\" content=\"@LingualNinja\">" +
                                    "<meta property=\"og:image\" content=\"https://z-apps.lingual-ninja.com/imgs/" + storyName.Split("--")[0] + ".png\">" +
                                    "<meta property=\"og:url\" content=\"" + "https://z-apps.lingual-ninja.com" + url + "\">" +
                                    "<meta property=\"og:type\" content=\"article\">" +
                                    "<meta property=\"og:title\" content=\"" + title + "\">" +
                                    "<meta property=\"og:image:alt\" content=\"" + title + "\">" +
                                    "<meta property=\"og:description\" content=\"" + description + "\">" +
                                    "<meta property=\"og:site_name\" content=\"Lingual Ninja\">" +
                                    "<meta property=\"fb:app_id\" content=\"217853132566874\">" +
                                    "<meta property=\"fb:page_id\" content=\"491712431290062\">" +
                                    "</head>" +
                                    "<body>Content for SNS bot</body>";

                        }
                        else
                        {
                            resultHTML = "" +
                                    "<head>" +
                                    "<meta name=\"twitter:card\" content=\"summary\">" +
                                    "<meta name=\"twitter:site\" content=\"@LingualNinja\">" +
                                    "<meta property=\"og:image\" content=\"https://z-apps.lingual-ninja.com/ogp-img.png\">" +
                                    "<meta property=\"og:url\" content=\"" + "https://z-apps.lingual-ninja.com" + url + "\">" +
                                    "<meta property=\"og:type\" content=\"article\">" +
                                    "<meta property=\"og:title\" content=\"Lingual Ninja\">" +
                                    "<meta property=\"og:image:alt\" content=\"Lingual Ninja\">" +
                                    "<meta property=\"og:description\" content=\"Applications to learn Japanese! You can study Japanese from Japanese folktales!\">" +
                                    "<meta property=\"og:site_name\" content=\"Lingual Ninja\">" +
                                    "<meta property=\"fb:app_id\" content=\"217853132566874\">" +
                                    "<meta property=\"fb:page_id\" content=\"491712431290062\">" +
                                    "</head>" +
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