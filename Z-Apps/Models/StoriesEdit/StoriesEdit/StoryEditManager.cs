using System;
using System.Collections.Generic;
using System.Data;

namespace Z_Apps.Models.StoriesEdit.StoriesEdit
{
    public class StoryEditManager
    {
        private readonly DBCon Con;
        public StoryEditManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<StoryEdit> GetAllStories()
        {
            //SQL文作成
            string sql = @"
            select * from tblStoryMstEdit
            order by storyId";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, null);

            //Story型に変換してreturn
            var resultStories = new List<StoryEdit>();
            foreach (var dicStory in stories)
            {
                var story = new StoryEdit();
                story.StoryId = (int)dicStory["StoryId"];
                story.StoryName = (string)dicStory["StoryName"];
                story.Description = (string)dicStory["Description"];

                resultStories.Add(story);
            }
            return resultStories;
        }

        public StoryEdit GetStory(string storyName)
        {
            //SQL文作成
            string sql = @"
            select * from tblStoryMstEdit
            where StoryName Like @storyName";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, new Dictionary<string, object[]> { { "@storyName", new object[2] { SqlDbType.NChar, storyName } } });

            //Story型に変換してreturn
            foreach (var dicStory in stories)
            {
                var story = new StoryEdit();
                story.StoryId = (int)dicStory["StoryId"];
                story.StoryName = (string)dicStory["StoryName"];
                story.Description = (string)dicStory["Description"];

                return story;
            }
            return null;
        }

        public bool UpdateDesc(
            int storyId,
            string desc,
            Func<string, Dictionary<string, object[]>, int> execUpdate
        )
        {
            string replacedDesc = desc
                                    .Replace("\r", "\n")
                                    .Replace("\n\n", "\n")
                                    .Replace("\n\n", "\n")
                                    .Replace("\n", "\\n");

            //SQL文作成
            string sql = @"
            update tblStoryMstEdit
            set Description = @desc where StoryId Like @storyId";

            //List<Dictionary<string, Object>>型で取得
            int resultCount = execUpdate(sql, new Dictionary<string, object[]> {
                { "@desc", new object[2] { SqlDbType.NVarChar, replacedDesc }},
                { "@storyId", new object[2] { SqlDbType.Int, storyId }}
            });

            return resultCount == 1;
        }
    }
}
