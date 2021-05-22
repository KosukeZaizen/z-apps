using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Z_Apps.Models.Stories.Stories
{
    public class StoryManager
    {
        private readonly DBCon Con;
        public StoryManager(DBCon con)
        {
            Con = con;
        }

        public IEnumerable<Story> GetAllStories(bool isEdit = false)
        {
            //SQL文作成
            string sql =
                isEdit ?
                    @"select * from tblStoryMst
                    order by [Order] desc"
                :
                    @"select * from tblStoryMst
                    where Released = 1
                    order by [Order] desc";

            //List<Dictionary<string, Object>>型で取得
            var stories = Con.ExecuteSelect(sql, null);

            //Story型に変換してreturn
            var resultStories = new List<Story>();
            foreach (var dicStory in stories)
            {
                resultStories.Add(
                    new Story()
                    {
                        StoryId = (int)dicStory["StoryId"],
                        StoryName = (string)dicStory["StoryName"],
                        Description = (string)dicStory["Description"],
                        Order = (int?)dicStory["Order"],
                        Season = (string)dicStory["Season"],
                        Youtube = (string)dicStory["Youtube"],
                        Released = (bool)dicStory["Released"]
                    });
            }
            return resultStories;
        }

        public Story GetStory(string storyName)
        {
            //SQL文作成
            string sql = @"
            select * from tblStoryMst
            where StoryName Like @storyName";

            //List<Dictionary<string, Object>>型で取得
            var result = Con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                { "@storyName", new object[2] { SqlDbType.NChar, storyName } }
            })
            .FirstOrDefault();

            if (result == null)
            {
                // 1件もデータがなければ、
                // フロントから不正なパラメータが来ている可能性があるためエラー
                throw new Exception();
            }

            //Story型に変換してreturn
            return new Story()
            {
                StoryId = (int)result["StoryId"],
                StoryName = (string)result["StoryName"],
                Description = (string)result["Description"],
                Order = (int?)result["Order"],
                Season = (string)result["Season"],
                Youtube = (string)result["Youtube"],
                Released = (bool)result["Released"],
            };
        }

        public Story GetStoryById(int storyId)
        {
            //SQL文作成
            string sql = @"
            select * from tblStoryMst
            where StoryId Like @storyId";

            //List<Dictionary<string, Object>>型で取得
            var result = Con.ExecuteSelect(sql, new Dictionary<string, object[]> {
                { "@storyId", new object[2] { SqlDbType.Int, storyId } }
            }).FirstOrDefault();

            if (result == null)
            {
                return null;
            }

            //Story型に変換してreturn
            return new Story()
            {
                StoryId = (int)result["StoryId"],
                StoryName = (string)result["StoryName"],
                Description = (string)result["Description"]
            };
        }

        public bool UpdateDesc(
            int storyId,
            string storyName,
            string desc,
            Func<string, Dictionary<string, object[]>, int> execUpdate)
        {
            int result;
            string replacedDesc = desc
                                    .Replace("\r", "\n")
                                    .Replace("\n\n", "\n")
                                    .Replace("\n\n", "\n")
                                    .Replace("\n", "\\n");

            string sql = @"
                update tblStoryMst
                set Description = @desc where StoryId Like @storyId";

            result = execUpdate(sql, new Dictionary<string, object[]> {
                    { "@desc", new object[2] { SqlDbType.NVarChar, replacedDesc }},
                    { "@storyId", new object[2] { SqlDbType.Int, storyId }}
                });
            return result == 1;
        }

        public bool SaveAllStories(IEnumerable<Story> stories)
        {
            return Con.UseTransaction((execUpdate) =>
                        {
                            var result = execUpdate("delete tblStoryMst;", null);
                            if (result < 0)
                            {
                                return false;
                            }

                            foreach (var story in stories)
                            {
                                //SQL文作成
                                var sql = @"
                                    insert into tblStoryMst(
                                        StoryId,
                                        StoryName,
                                        Description,
                                        [Order],
                                        Season,
                                        Youtube,
                                        Released)
                                    values (
                                        @StoryId,
                                        @StoryName,
                                        @Description,
                                        @Order,
                                        @Season,
                                        @Youtube,
                                        @Released)";

                                result = execUpdate(sql, new Dictionary<string, object[]> {
                                    { "@StoryId", new object[2] { SqlDbType.Int, story.StoryId } },
                                    { "@StoryName", new object[2] { SqlDbType.NVarChar, story.StoryName } },
                                    { "@Description", new object[2] { SqlDbType.NVarChar, story.Description } },
                                    { "@Order", new object[2] { SqlDbType.Int, story.Order == null ? 0 : story.Order } },
                                    { "@Season", new object[2] { SqlDbType.NVarChar, story.Season } },
                                    { "@Youtube", new object[2] { SqlDbType.NVarChar, story.Youtube } },
                                    { "@Released", new object[2] { SqlDbType.Bit, story.Released } }
                                });

                                if (result != 1)
                                {
                                    return false;
                                }
                            }
                            return true;
                        });
        }
    }
}
