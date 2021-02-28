using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;
using static Z_Apps.Models.DBCon;

namespace Z_Apps.wrBatch {

    public class Batch {

        public static async void runAsync() {

            //await Task.Delay(1000 * 30);
            //SetNoindexDictionary();

            await Task.Delay(1000 * 60 * 60 * 5);//デプロイ後５時間待機

            while (true) {
                try {

                    var t = Task.Run(() => {
                        MakeDbBackupAsync();
                        DeleteOpeLogs();
                    });

                    await Task.Delay(1000 * 60 * 60 * 24);//１日待機

                } catch (Exception ex) { }
            }
        }

        private static async void MakeDbBackupAsync() {
            var con = new DBCon();
            var logService = new ClientLogService(con);

            var storageBkService = new StorageBackupService(con);
            await storageBkService.MakeBackup();

            logService.RegisterLog(new ClientOpeLog() {
                url = "wrBatch",
                operationName = "finish to make DB backup",
                userId = "wrBatch"
            });
        }

        private static void DeleteOpeLogs() {
            var con = new DBCon();
            var service = new ClientOpeLogManager(con);
            service.DeleteOldLogs();
            service.DeleteAdminLogs();
        }

        private static void SetNoindexDictionary() {

            var zAppsCon = new DBCon(DBType.z_apps);
            var wikiCon = new DBCon(DBType.wiki_db);


            //キャッシュされてから半年以上経過したワード
            var resultCache = wikiCon.ExecuteSelect(@"
select word
from ZAppsDictionaryCache
");
            var longTermCachedWords = resultCache.Select(r => (string)r["word"]);


            //半年以内にアクセスがあったワード
            var opeLogResult = zAppsCon.ExecuteSelect(@"
select distinct url
from tblClientOpeLog
where time > dateadd(MONTH, -6, GETDATE())
and url like N'https://www.lingual-ninja.com/dictionary/%'
and parameters != ''
and parameters not like N'%Googlebot%';
");
            var urls = opeLogResult
                           .Select(r => (string)r["url"]);

            var accessedWords = urls
                                .Select(r => r.Replace("https://www.lingual-ninja.com/dictionary/", ""))
                                .Select(r => HttpUtility.UrlDecode(r, Encoding.UTF8));


            var noindexWords = longTermCachedWords
                                .Where(w => {
                                    var sameItem = accessedWords.FirstOrDefault(aw => {
                                        return aw.Equals(w);
                                    });
                                    return sameItem == null;
                                });


            var count = noindexWords.Count();

            var a = 1;
        }
    }
}