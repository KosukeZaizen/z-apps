using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.SystemBase
{
    public class ClientOpeLogManager
    {
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
    }
}
