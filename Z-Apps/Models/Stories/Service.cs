using System;
using System.Collections.Generic;
using System.Linq;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Stories;

namespace Z_Apps.Models.Stories
{
    public class Service
    {
        private SentenceManager sem;
        private StoryManager stm;
        public Service(DBCon con)
        {
            sem = new SentenceManager(con);
            stm = new StoryManager(con);
        }

        public Story GetPageData(string storyName, int pageNumber)
        {
            var story = stm.GetStory(storyName);

            if (story != null)
            {
                story.Sentences = sem.GetSentences(story.StoryId, pageNumber);
            }
            return story;
        }
    }
}
