using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
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
                    string accessLog = "{userId:'" + data.userId + "',href:'" + data.href + "'}";
                    logger.LogWarning(accessLog);

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