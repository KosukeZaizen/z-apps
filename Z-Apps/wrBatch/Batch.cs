using System;
using System.Threading.Tasks;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.wrBatch
{
    public class Batch
    {
        public static async void runAsync()
        {
            await Task.Delay(1000 * 60 * 60 * 5);//デプロイ後５時間待機

            while (true)
            {
                MakeDbBackupAsync();
                DeleteOpeLogs();
                await Task.Delay(1000 * 60 * 60 * 24);//１日待機
            }
        }

        private static async void MakeDbBackupAsync()
        {
            var con = new DBCon();
            var logService = new ClientLogService(con);

            var storageBkService = new StorageBackupService(con);
            await storageBkService.MakeBackup();

            logService.RegisterLog(new ClientOpeLog()
            {
                url = "wrBatch",
                operationName = "finish to make DB backup",
                userId = "wrBatch"
            });
        }

        private static void DeleteOpeLogs()
        {
            var con = new DBCon();
            var service = new ClientOpeLogManager(con);
            service.DeleteOldLogs();
            service.DeleteAdminLogs();
        }
    }
}