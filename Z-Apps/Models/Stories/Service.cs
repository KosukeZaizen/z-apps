using System;
using System.Collections.Generic;
using System.Linq;
using Z_Apps.Models.Stories.Sentences;

namespace Z_Apps.Models.Stories
{
    public class Service
    {
        private SentenceManager sm;
        public Service(DBConnection con)
        {
            sm = new SentenceManager(con);
        }

        public IEnumerable<Sentence> GetPageData(int storyId, int pageNumber)
        {
            var sentences = sm.GetSentences(storyId, pageNumber);
            return sentences;
        }
    }
}
