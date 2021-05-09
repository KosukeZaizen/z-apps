export type storyDesc = {
    storyId: number;
    storyName: string;
    description: string;
    order?: number;
    season?: string;
    youtube?: string;
};
export type sentence = {
    storyId: number;
    lineNumber: number;
    kanji: string;
    hiragana: string;
    romaji: string;
    english: string;
};
export type word = {
    lineNumber: number;
    wordNumber: number;
    kanji: string;
    hiragana: string;
    english: string;
};
