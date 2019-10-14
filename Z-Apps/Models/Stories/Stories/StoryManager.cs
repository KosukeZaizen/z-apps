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

        public IEnumerable<Story> GetAllStories()
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblStoryMst";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, null);

            //Story型に変換してreturn
            var resultStories = new List<Story>();
            foreach (var dicStory in stories)
            {
                var story = new Story();
                story.StoryId = (int)dicStory["StoryId"];
                story.StoryName = (string)dicStory["StoryName"];
                story.Description = (string)dicStory["Description"];

                resultStories.Add(story);
            }
            return resultStories;
        }

        public Story GetStory(string storyName)
        {
            //SQL文作成
            string sql = "";
            sql += "select * from tblStoryMst";
            sql += " where StoryName Like @storyName";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyName", new object[2] { SqlDbType.NChar, storyName } } });

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

        public bool UpdateDesc(int storyId, string storyName, string desc)
        {
            bool result;
            string replacedDesc = desc.Replace("\r", "\n").Replace("\n\n", "\n").Replace("\n\n", "\n")
                .Replace("\n", "\\n");

            //SQL文作成
            string sql = "";
            sql += "Insert into tblStoryMst";
            sql += " (StoryId, StoryName, Description) values(@storyId, @storyName, @desc)";

            try
            {
                //List<Dictionary<string, Object>>型で取得
                result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                { "@desc", new object[2] { SqlDbType.NVarChar, replacedDesc }},
                { "@storyId", new object[2] { SqlDbType.Int, storyId }},
                { "@storyName", new object[2] { SqlDbType.NVarChar, storyName }}
            });
            }
            catch (Exception e)
            {
                //SQL文作成
                sql = "";
                sql += "update tblStoryMst";
                sql += " set Description = @desc where StoryId Like @storyId";

                //List<Dictionary<string, Object>>型で取得
                result = Con.ExecuteUpdate(sql, new Dictionary<string, object[]> {
                { "@desc", new object[2] { SqlDbType.NVarChar, replacedDesc }},
                { "@storyId", new object[2] { SqlDbType.Int, storyId }}
            });
            }
            return result;
        }

    }
}
