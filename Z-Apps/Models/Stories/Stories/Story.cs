namespace Z_Apps.Models.Stories.Stories
{
    public class Story
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public string Description { get; set; }
        public int? Order { get; set; }
        public string Season { get; set; }
        public string Youtube { get; set; }
    }
}
