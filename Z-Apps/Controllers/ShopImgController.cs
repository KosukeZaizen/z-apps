using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Util;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.Controllers
{
    [Route("api/[controller]")]
    public class ShopImgController : Controller
    {
        private readonly StorageService storageService;
        public ShopImgController(StorageService storageService)
        {
            this.storageService = storageService;
        }

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

            //upload
            if (!await storageService.UploadAndOverwriteFileAsync(formFile, shop + "/" + fileName + ".png"))
            {
                return new { result = "ng", errMessage = "Error! Upload was failed!" };
            };

            return new { result = "ok" };
        }
    }
}