using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Models;
using Z_Apps.Util;
using static WikiService;

namespace Z_Apps.Controllers {

    [Route("api/[controller]")]
    public class WikiController : Controller {

        [HttpGet("[action]")]
        public IEnumerable<string> GetAllWords(int num) {
            var service = new WikiService();
            return service.GetAllWordsFromDB(num);
        }


        [HttpPost("[action]")]
        public void Exclude(string word, string token) {
            if (token != PrivateConsts.REGISTER_PASS) {
                return;
            }

            var con = new DBCon(DBCon.DBType.wiki_db);
            var sql = @"
UPDATE ZAppsDictionaryCache SET
 response = N'removed'
 where word = @word
;";

            var result = con.ExecuteSelect(
                    sql,
                    new Dictionary<string, object[]> {
                        { "@word", new object[2] { SqlDbType.NVarChar, word } }
                    }
                );
        }

        [HttpPost("[action]")]
        public void Register(string word, string token, string jsonText) {
            if (token != PrivateConsts.REGISTER_PASS) {
                return;
            }

            var con = new DBCon(DBCon.DBType.wiki_db);
            var sql = @"
UPDATE ZAppsDictionaryCache SET
 response = @jsonText
 where word = @word
;";

            var result = con.ExecuteSelect(
                    sql,
                    new Dictionary<string, object[]> {
                        { "@word", new object[2] { SqlDbType.NVarChar, word } },
                        { "@jsonText", new object[2] { SqlDbType.NVarChar, jsonText } }
                    }
                );
        }


        [HttpGet("[action]")]
        public async Task<CacheResult> GetEnglishWordAndSnippet(string word) {
            var service = new WikiService();
            return await service.GetEnglishWordAndSnippet(word);
        }
    }
}
