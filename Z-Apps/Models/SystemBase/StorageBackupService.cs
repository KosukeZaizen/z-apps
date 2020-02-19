using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Z_Apps.Util;

namespace Z_Apps.Models.SystemBase
{
    public class StorageBackupService
    {
        private readonly CloudBlobContainer container;
        private readonly IDBCon con;
        public StorageBackupService(IDBCon con)
        {
            this.con = con;

            //storageAccountの作成（接続情報の定義）
            //アカウントネームやキー情報はAzureポータルから確認できる。
            var accountName = PrivateConsts.STORAGE_BK_ACCOUNT_NAME;
            var accessKey = PrivateConsts.STORAGE_BK_ACCOUNT_KEY;

            var credential = new StorageCredentials(accountName, accessKey);
            var storageAccount = new CloudStorageAccount(credential, true);

            ////////////////// ここまでは各Storageサービス共通 //////////////////////////////////

            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            container = blobClient.GetContainerReference("lingual-ninja-bk");
        }

        public async Task<bool> UploadAndOverwriteFileAsync(string content, string filePath)
        {
            //upload
            //アップロード後のファイル名を指定（無くてよい）
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(filePath);

            //アップロード処理
            await blockBlob.UploadTextAsync(content);
            return true;
        }

        public async Task<bool> MakeBackup()
        {
            var dbUtil = new DB_Util(con);
            var tableNames = dbUtil.GetAllTableNames();

            foreach (string tableName in tableNames)
            {
                StringBuilder sb = new StringBuilder();
                var records = dbUtil.GetAllDataFromOneTable(tableName);

                foreach (string key in records[0].Keys)
                {
                    sb.Append(key);
                    sb.Append("\t");
                }
                sb.Append("\n");

                foreach (var record in records)
                {
                    foreach (string key in records[0].Keys)
                    {
                        sb.Append(record[key].ToString());
                        sb.Append("\t");
                    }
                    sb.Append("\n");
                }

                DateTime dt = DateTime.Now;
                await UploadAndOverwriteFileAsync(sb.ToString(), "database-bk/" + dt.ToString("yyyy-MM") + "-" + tableName + ".txt");
            }

            return true;
        }
    }
}