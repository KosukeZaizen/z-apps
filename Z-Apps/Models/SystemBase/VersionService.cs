using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Z_Apps.Util;

namespace Z_Apps.Models.SystemBase
{
    public class VersionService
    {
        public async Task<string> GetVersion(HttpContext httpContext)
        {
            try
            {
                using (var sr = new StreamReader("./ClientApp/build/version.txt"))
                {
                    return sr.ReadToEnd();
                }
            }
            catch (Exception)
            {
                // ローカルデバッグでは「ClientApp/build」未作成の場合があるため
                using (var client = new HttpClient())
                {
                    return await Fetch.GetAsync(
                        "https://" + httpContext.Request.Host.Value + "/version.txt"
                    );
                }
            }
        }
    }
}