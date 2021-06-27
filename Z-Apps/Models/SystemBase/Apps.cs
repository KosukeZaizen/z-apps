using System.Collections.Generic;

namespace Z_Apps.Models.SystemBase
{
    public class AppInfo
    {
        public string Key { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class Apps
    {
        // アプリ追加時は、hostsに新しいドメインを追加する
        public static readonly List<AppInfo> apps = new List<AppInfo>()
        {
            new AppInfo(){
                Key = "www",
                Title = "Lingual Ninja - Learn Japanese Online",
                Description ="Applications to learn Japanese! You can study Japanese from Japanese folktales!",
            },
            new AppInfo(){
                Key = "articles",
                Title = "Lingual Ninja Blog",
                Description ="Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!",
            },
        };
    }
}