using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Util;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.Controllers {
    [Route("api/[controller]")]
    public class ShopImgController : Controller {
        private readonly StorageService storageService;
        public ShopImgController(StorageService storageService) {
            this.storageService = storageService;
        }

        [HttpPost("[action]")]
        public async Task<Object> Upload(IFormFile file, string shop, string pw, string fileName) {
            if (pw != PrivateConsts.BOSCOBEL_PW) {
                return new {
                    result = "ng",
                    errMessage = "画面上部でパスワードを入力してください！"
                };
            }

            var formFile = file;
            if (formFile.Length <= 0) {
                return new {
                    result = "ng",
                    errMessage = "ファイルが不正です！"
                };
            }

            //upload
            if (!await storageService.UploadAndOverwriteFileAsync(formFile, shop + "/" + fileName + ".png")) {
                return new {
                    result = "ng",
                    errMessage = "アップロードに失敗しました。"
                };
            };

            return new {
                result = "ok"
            };
        }

        [HttpPost("[action]")]
        public async Task<Object> DeleteOldMenu(string shop, string pw) {
            if (pw != PrivateConsts.BOSCOBEL_PW) {
                return new {
                    result = "ng",
                    errMessage = "画面上部でパスワードを入力してください！"
                };
            }

            //delete
            if (!await storageService.DeleteAllFilesInTheFolder(shop + "/menu")) {
                return new {
                    result = "ng",
                    errMessage = "古いメニューの削除に失敗しました。"
                };
            }

            return new {
                result = "ok"
            };
        }
    }
}