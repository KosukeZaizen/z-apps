using System;
using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.SystemBase
{
    public class ClientOpeLogManager
    {
        private const int logRemainingDays = 1000;
        private readonly DBCon Con;
        public ClientOpeLogManager(DBCon con)
        {
            Con = con;
        }

        public bool InsertLog(ClientOpeLog log)
        {
            //SQL文作成
            string sql = "insert into tblClientOpeLog(time, url, operationName, userId, parameters) ";
            sql += " values (@time, @url, @operationName, @userId, @parameters) ";

            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
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
            //SQL文作成
            string sql = $@"
 SELECT time
      ,url
      ,operationName
      ,userId
      ,parameters
  FROM tblClientOpeLog
  where time > CONVERT(date, getdate()-{logRemainingDays})
  and not url like '%localhost%'
  order by time desc
";

            var dics = Con.ExecuteSelect(sql, null);

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
            //SQL文作成
            string sql = $@"
delete from tblClientOpeLog
  where time < CONVERT(date, getdate()-{logRemainingDays})
  or url like '%localhost%'
            ";

            Con.ExecuteUpdate(sql, null);
        }
    }
}
