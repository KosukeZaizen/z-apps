import { Season } from "../components/parts/Animations/SeasonAnimation";

export type storyDesc = {
    storyId: number;
    storyName: string;
    description: string;
    order?: number;
    season?: Season;
};
export type sentence = {
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
