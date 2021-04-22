export type vocab = {
    genreId: number;
    vocabId: number;
    hiragana: string;
    kanji: string;
    english: string;
    order: number;
};
export type vocabGenre = {
    genreId: number;
    genreName: string;
    order: number;
    youtube: string;
    released: boolean;
};

export type sound = {
    audio: HTMLAudioElement;
    playable: boolean;
};
