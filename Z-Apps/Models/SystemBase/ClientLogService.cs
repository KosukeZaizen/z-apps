using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Z_Apps.Util;

namespace Z_Apps.Models.SystemBase
{
    public class ClientLogService
    {
        private readonly ClientOpeLogManager clientOpeLogManager;
        private readonly ClientManager clientManager;
        public ClientLogService(DBCon con)
        {
            clientOpeLogManager = new ClientOpeLogManager(con);
            clientManager = new ClientManager(con);
        }

        public IEnumerable<ClientOpeLog> Get100DaysLogs()
        {
            return clientOpeLogManager.Get100DaysLogs();
        }

        public IEnumerable<Client> GetAllClients()
        {
            return clientManager.GetAllClients();
        }

        public void RegisterLog(ClientOpeLog log)
        {
            TimeZoneInfo jstZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Tokyo Standard Time");
            log.time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, jstZoneInfo);

            clientOpeLogManager.InsertLog(log);
        }
    }
}