namespace Z_Apps.Models.VocabList
{
    public class Vocab
    {
        public int genreId { get; set; }
        public int vocabId { get; set; }
        public string kanji { get; set; }
        public string hiragana { get; set; }
        public string english { get; set; }
        public int order { get; set; }
    }
}