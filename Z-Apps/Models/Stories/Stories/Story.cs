using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z_Apps.Models.Stories.Sentences;

namespace Z_Apps.Models.Stories.Stories
{
    public class Story
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public string Description { get; set; }
    }
}
