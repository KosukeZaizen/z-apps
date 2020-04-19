using System;
using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.SystemBase
{
    public class ClientManager
    {
        private readonly DBCon Con;
        public ClientManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<Client> GetAllClients()
        {
            //SQL文作成
            string sql = $@"
 SELECT *
  FROM tblClientMst
";

            var dics = Con.ExecuteSelect(sql, null);

            var result = new List<Client>();
            foreach (var dic in dics)
            {
                var record = new Client();
                record.userId = (string)dic["userId"];
                record.userName = (string)dic["userName"];
                record.isAdmin = (bool)dic["isAdmin"];

                result.Add(record);
            }
            return result;
        }
    }
}
