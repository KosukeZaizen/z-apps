using System;
using System.Collections.Generic;
using System.Linq;
using Z_Apps.Models.Stories.Sentences;
using Z_Apps.Models.Stories.Stories;

namespace Z_Apps.Models.Stories
{
    public class Service
    {
        
        private DBCon con;
        public Service(DBCon con)
        {
            this.con = con;
        }

        public Story GetPageData(string storyName, int pageNumber)
        {
            var stm = new StoryManager(con);
            var story = stm.GetStory(storyName);
            return story;
        }

        public IEnumerable<Sentence> GetSentences(int storyId, int pageNumber)
        {
            var sem = new SentenceManager(con);
            var sentences = sem.GetSentences(storyId, pageNumber);
            return sentences;
        }
    }
}
