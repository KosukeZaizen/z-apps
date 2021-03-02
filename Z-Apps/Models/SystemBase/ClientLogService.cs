using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Z_Apps.Models.SystemBase {
    public class ClientLogService {
        private readonly ClientOpeLogManager clientOpeLogManager;
        private readonly ClientManager clientManager;
        public ClientLogService(DBCon con) {
            clientOpeLogManager = new ClientOpeLogManager(con);
            clientManager = new ClientManager(con);
        }

        public IEnumerable<ClientOpeLog> GetOpeLogs() {
            return clientOpeLogManager.GetOpeLogs();
        }

        public IEnumerable<Client> GetAllClients() {
            return clientManager.GetAllClients();
        }

        public void RegisterLog(ClientOpeLog log) {
            var task = Task.Run(() => {
                TimeZoneInfo jstZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Tokyo Standard Time");
                log.time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, jstZoneInfo);

                if (log.parameters == null) {
                    log.parameters = "";
                }

                clientOpeLogManager.InsertLog(log);
            });
        }
    }
}