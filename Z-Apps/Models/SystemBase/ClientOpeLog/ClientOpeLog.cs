using System;

namespace Z_Apps.Models.SystemBase
{
    public class ClientOpeLog
    {
        public DateTime time { get; set; }
        public string url { get; set; }
        public string operationName { get; set; }
        public string userId { get; set; }
        public string parameters { get; set; }
    }
}
