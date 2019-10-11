using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.StoriesEdit.SentencesEdit
{
    public class SentenceEdit
    {
        public int StoryId { get; set; }
        public int LineNumber { get; set; }
        public string Kanji { get; set; }
        public string Hiragana { get; set; }
        public string Romaji { get; set; }
        public string English { get; set; }
    }
}
