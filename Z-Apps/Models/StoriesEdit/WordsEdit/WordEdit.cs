using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Z_Apps.Models.StoriesEdit.WordsEdit
{
    public class WordEdit
    {
        public int StoryId { get; set; }
        public int LineNumber { get; set; }
        public int WordNumber { get; set; }
        public string Kanji { get; set; }
        public string Hiragana { get; set; }
        public string English { get; set; }
    }
}
