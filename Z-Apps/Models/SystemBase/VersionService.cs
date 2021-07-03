using System.Net.Http;
using System.Threading.Tasks;
using Z_Apps.Util;

namespace Z_Apps.Models.SystemBase
{
    public class VersionService
    {
        public async Task<string> GetVersion()
        {
            string resultText = "";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(Consts.SITE_URL + "/version.txt");
                resultText = await response.Content.ReadAsStringAsync();
            }
            return resultText;
        }
    }
}