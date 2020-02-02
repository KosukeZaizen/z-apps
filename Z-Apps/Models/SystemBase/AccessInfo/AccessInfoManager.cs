using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.SystemBase.AccessInfo
{
    public class AccessInfoManager
    {
        private DBCon Con;
        public AccessInfoManager(DBCon con)
        {
            Con = con;
        }

        public bool InsertAccessInfo(AccessInfo accessInfo)
        {
            //SQL文作成
            string sql = "";
            sql += "insert into tblAccessInfo(time, userId, href) ";
            sql += " values (@time, @userId, @href) ";

            bool result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                    { "@time", new object[2] { SqlDbType.DateTime, accessInfo.time } },
                    { "@userId", new object[2] { SqlDbType.Int, accessInfo.userId } },
                    { "@href", new object[2] { SqlDbType.VarChar, accessInfo.href } },
                });

            return result;
        }
    }
}