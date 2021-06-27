import React, { useEffect, useState } from "react";
import { cFetch } from "../../../../../common/util/cFetch";
import { vocab, vocabGenre } from "../../../../../types/vocab";
import { VList } from "./List";

const initialVocabGenre = {
    genreId: 0,
    genreName: "",
    order: 0,
    youtube: "",
    released: true,
};
export function VocabList({ genreName }: { genreName: string }) {
    const [genreAndVocab, setGenreAndVocab] = useState<GenreAndVocab>({
        vocabGenre: initialVocabGenre,
        vocabList: [],
    });

    useEffect(() => {
        const load = async () => {
            const result = await fetchGenreAndVocab(genreName);
            if (result) {
                setGenreAndVocab(result);
            }
        };
        void load();
    }, [genreName]);

    return (
        <VList
            g={genreAndVocab.vocabGenre}
            vocabList={genreAndVocab.vocabList}
        />
    );
}

interface GenreAndVocab {
    vocabGenre: vocabGenre;
    vocabList: vocab[];
}
async function fetchGenreAndVocab(
    genreName: string
): Promise<GenreAndVocab | null> {
    try {
        return (
            await cFetch(`api/VocabQuiz/GetQuizDataWithoutCache/${genreName}`)
        ).json();
    } catch (ex) {
        return null;
    }
}
