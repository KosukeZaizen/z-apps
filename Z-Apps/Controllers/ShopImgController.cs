using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage;
using Z_Apps.Util;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class ShopImgController : Controller
    {
        [HttpPost("[action]")]
        public async Task<Object> Upload(IFormFile file, string shop, string pw, string fileName)
        {
            if (pw != PrivateConsts.BOSCOBEL_PW) {
                return new { result = "ng", errMessage = "Error! Invalid password!"};
            }

            var formFile = file;
            if (formFile.Length <= 0)
            {
                return new { result = "ng", errMessage = "Error! Invalid file!" };
            }

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
            CloudBlobContainer container = blobClient.GetContainerReference("lingual-storage");


            //upload
            //アップロード後のファイル名を指定（無くてよい）
            CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(shop + "/" + fileName + ".png");

            //アップロード処理
            using (var stream = formFile.OpenReadStream())
            {
                await blockBlob_upload.UploadFromStreamAsync(stream);
            }
            return new { result = "ok" };
        }
    }
}