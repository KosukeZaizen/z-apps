using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Z_Apps.Util;
using Z_Apps.Models.SystemBase;
using System.Collections.Generic;
using System.Linq;

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
            if (pw != PrivateConsts.BOSCOBEL_PW)
            {
                return new { result = "ng", errMessage = "Error! Invalid password!" };
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

        public class MenuRequest
        {
            //public IEnumerable<IFormFile> files;
            public string shop;
            public string pw;
        }
        [HttpPost("[action]")]
        public async Task<Object> UploadMenu([FromBody] MenuRequest req)
        {
            if (req.pw != PrivateConsts.BOSCOBEL_PW)
            {
                return new { result = "ng", errMessage = "Error! Invalid password!" };
            }

            //if (req.files.Any(file => file.Length <= 0))
            //{
            //    return new { result = "ng", errMessage = "Error! Invalid file!" };
            //}

            //delete
            if (!await storageService.DeleteAllFilesInTheFolder(req.shop + "/menu"))
            {
                return new { result = "ng", errMessage = "Error! Upload was failed!" };
            }

            //var i = 0;
            //foreach (var file in req.files)
            //{
            //    i++;

            //    //upload
            //    if (!await storageService.UploadAndOverwriteFileAsync(file, req.shop + "/menu/cafe-boscobel-menu-" + i.ToString("00") + ".png"))
            //    {
            //        return new { result = "ng", errMessage = "Error! Upload was failed!" };
            //    }
            //}

            return new { result = "ok" };
        }
    }
}