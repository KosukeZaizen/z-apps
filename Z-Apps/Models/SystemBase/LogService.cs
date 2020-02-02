using System;
using Z_Apps.Models.SystemBase.AccessInfo;
using Z_Apps.Util;
using static Z_Apps.Controllers.SystemBaseController;

namespace Z_Apps.Models.SystemBase
{
    public class LogService
    {

        private DBCon con;
        public LogService(DBCon con)
        {
            this.con = con;
        }

        public bool RegisterAccessLog(DataToBeRegistered data)
        {
            try
            {
                if (data.token == PrivateConsts.LOG_TOKEN)
                {
                    var aim = new AccessInfoManager(con);

                    var accessInfo = new AccessInfo.AccessInfo
                    {
                        time = DateTime.Now,
                        userId = UInt32.Parse(data.userId),
                        href = data.href
                    };

                    if (aim.InsertAccessInfo(accessInfo))
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}