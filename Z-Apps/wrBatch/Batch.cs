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
            await Task.Delay(1000 * 60 * 60 * 3);//デプロイ直後は３時間待機

            while (true)
            {
                MakeDbBackupAsync();
                DeleteOldOpeLog();
                await Task.Delay(1000 * 60* 60 * 24);//１日待機
            }
        }

        private static async void MakeDbBackupAsync()
        {
            var storageBkService = new StorageBackupService(new DBCon());
            await storageBkService.MakeBackup();
        }

        private static void DeleteOldOpeLog()
        {
            var service = new ClientOpeLogManager(new DBCon());
            service.DeleteOldLogs();
        }
    }
}