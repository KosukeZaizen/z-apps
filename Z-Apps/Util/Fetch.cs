using System;
using System.Net.Http;
using System.Threading.Tasks;
using Z_Apps.Models;

namespace Z_Apps.Util
{
    public class Fetch
    {
        public static async Task<string> GetAsync(string url)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(url);
                    return await response.Content.ReadAsStringAsync();
                }
            }
            catch (Exception ex)
            {
                ErrorLog.InsertErrorLog(ex.Message);
                return "";
            }
        }
    }
}