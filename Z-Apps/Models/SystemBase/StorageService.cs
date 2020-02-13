using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Z_Apps.Util;

namespace Z_Apps.Models.SystemBase
{
    public class StorageService
    {
        private readonly CloudBlobContainer container;
        public StorageService()
        {
            //storageAccountの作成（接続情報の定義）
            //アカウントネームやキー情報はAzureポータルから確認できる。
            var accountName = PrivateConsts.STORAGE_ACCOUNT_NAME;
            var accessKey = PrivateConsts.STORAGE_ACCOUNT_KEY;

            var credential = new StorageCredentials(accountName, accessKey);
            var storageAccount = new CloudStorageAccount(credential, true);

            ////////////////// ここまでは各Storageサービス共通 //////////////////////////////////

            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            container = blobClient.GetContainerReference("lingual-storage");
        }

        public async Task<bool> UploadAndOverwriteFileAsync(IFormFile file, string filePath)
        {
            //upload
            //アップロード後のファイル名を指定（無くてよい）
            CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(filePath);

            //アップロード処理
            using (var stream = file.OpenReadStream())
            {
                await blockBlob_upload.UploadFromStreamAsync(stream);
            }
            return true;
        }
    }
}