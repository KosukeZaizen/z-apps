using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Z_Apps.Util;
using static Z_Apps.Controllers.SystemBaseController;

namespace Z_Apps.Models.SystemBase
{
    public class LogService
    {
        private readonly ILogger logger;
        public LogService(ILogger<LogService> logger)
        {
            this.logger = logger;
        }

        public string RegisterAccessLog(DataToBeRegistered data)
        {
            try
            {
                if (data.token == PrivateConsts.LOG_TOKEN)
                {
                    var accessLog = new { userId = data.userId, href = data.href };
                    var json = JsonConvert.SerializeObject(accessLog);
                    logger.LogWarning(json);

                    return data.userId;
                }
                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}