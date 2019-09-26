using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.Stories.Stories
{
    public class StoryManager
    {
        private DBCon Con;
        public StoryManager(DBCon con)
        {
            Con = con;
        }

        public Story GetStory(string storyName)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblStoryMst";
            sql += " where StoryName Like @storyName";
            //sql += " where StoryName Like N'Momotaro';";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyName", new object[2]{ SqlDbType.NChar, storyName } } });

            //Story型に変換してreturn
            foreach (var dicStory in stories)
            {
                var story = new Story();
                story.StoryId = (int)dicStory["StoryId"];
                story.StoryName = (string)dicStory["StoryName"];
                story.Description = (string)dicStory["Description"];

                return story;
            }
            return null;
        }
    }
}