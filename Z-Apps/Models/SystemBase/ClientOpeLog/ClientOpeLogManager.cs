using System;
using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.SystemBase
{
    public class ClientOpeLogManager
    {
        private const int logRemainingDays = 1000;
        private readonly DBCon con;
        public ClientOpeLogManager(DBCon con)
        {
            this.con = con;
        }

        public bool InsertLog(ClientOpeLog log)
        {
            var wikiCon = new DBCon(DBCon.DBType.wiki_db);

            //SQL文作成
            string sql = @"
insert into ZAppsClientOpeLog(time, url, operationName, userId, parameters)
values (@time, @url, @operationName, @userId, @parameters);
";

            bool result = wikiCon.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@time", new object[2] { SqlDbType.DateTime, log.time } },
                    { "@url", new object[2] { SqlDbType.VarChar, log.url } },
                    { "@operationName", new object[2] { SqlDbType.VarChar, log.operationName } },
                    { "@userId", new object[2] { SqlDbType.VarChar, log.userId } },
                    { "@parameters", new object[2] { SqlDbType.VarChar, log.parameters } }
                });

            if (!result)
            {
                return false;
            }
            return true;
        }

        public IEnumerable<ClientOpeLog> GetOpeLogs()
        {
            var wikiCon = new DBCon(DBCon.DBType.wiki_db);

            //SQL文作成
            string sql = $@"
 SELECT time
      ,url
      ,operationName
      ,userId
      ,parameters
  FROM ZAppsClientOpeLog
  where time > CONVERT(date, getdate()-{logRemainingDays})
  and not url like '%localhost%'
  order by time desc
";

            var dics = wikiCon.ExecuteSelect(sql, null);

            var result = new List<ClientOpeLog>();
            foreach (var dic in dics)
            {
                var record = new ClientOpeLog();
                record.time = (DateTime)dic["time"];
                record.url = (string)dic["url"];
                record.operationName = (string)dic["operationName"];
                record.userId = (string)dic["userId"];
                record.parameters = (string)dic["parameters"];

                result.Add(record);
            }
            return result;
        }

        public void DeleteOldLogs()
        {
            var logService = new ClientLogService(con);
            try
            {
                var wikiCon = new DBCon(DBCon.DBType.wiki_db);

                //SQL文作成
                string sql = $@"
delete from ZAppsClientOpeLog
  where time < CONVERT(date, getdate()-{logRemainingDays})
  or url like '%localhost%'
            ";

                wikiCon.ExecuteUpdate(sql, null);

                logService.RegisterLog(new ClientOpeLog()
                {
                    url = "wrBatch",
                    operationName = "finish to delete old OpeLog",
                    userId = "wrBatch"
                });
            }
            catch (Exception ex)
            {
                logService.RegisterLog(new ClientOpeLog()
                {
                    url = "wrBatch",
                    operationName = " DeleteOldLogs error",
                    userId = "wrBatch",
                    parameters = "Message: " + ex.Message + " StackTrace: " + ex.StackTrace
                });
            }
        }

        public void DeleteAdminLogs()
        {
            var logService = new ClientLogService(con);
            try
            {
                var wikiCon = new DBCon(DBCon.DBType.wiki_db);

                var clientManager = new ClientManager(con);
                var allClients = clientManager.GetAllClients();

                foreach (var client in allClients)
                {
                    if (client.isAdmin == true)
                    {
                        string sql = $@"
delete from ZAppsClientOpeLog
  where userId like @userId
  ";

                        wikiCon.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                            { "@userId", new object[2] { SqlDbType.VarChar, client.userId } },
                        });
                    }
                }
                
                logService.RegisterLog(new ClientOpeLog()
                {
                    url = "wrBatch",
                    operationName = "finish to delete Admin OpeLog",
                    userId = "wrBatch"
                });
            }
            catch (Exception ex)
            {
                logService.RegisterLog(new ClientOpeLog()
                {
                    url = "wrBatch",
                    operationName = " DeleteOldLogs error",
                    userId = "wrBatch",
                    parameters = "Message: " + ex.Message + " StackTrace: " + ex.StackTrace
                });
            }
        }

    }
}
