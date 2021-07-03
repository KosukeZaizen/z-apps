import React, { useEffect, useState } from "react";
import { Z_APPS_TOP_URL } from "../../../../../common/consts";
import { cFetch } from "../../../../../common/util/cFetch";
import { vocab, vocabGenre } from "../../../../../types/vocab";
import { ATargetBlank } from "../../../Link/ATargetBlank";
import { linkShadowStyle } from "../../LinkBlockRender/linkShadowStyle";
import { VList } from "./List";

const initialVocabGenre = {
    genreId: 0,
    genreName: "",
    order: 0,
    youtube: "",
    released: true,
};
export function VocabList({ genreName }: { genreName: string }) {
    const genreAndVocab = useGenreAndVocab(genreName);

    return (
        <div
            style={{
                marginBottom: 30,
                textAlign: "center",
                textShadow: "initial",
            }}
        >
            <VList
                g={genreAndVocab.vocabGenre}
                vocabList={genreAndVocab.vocabList}
                style={{ marginBottom: 5 }}
            />
            <ATargetBlank
                href={`${Z_APPS_TOP_URL}/vocabulary-list#${encodeURIComponent(
                    genreAndVocab.vocabGenre.genreName
                )}`}
                style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    ...linkShadowStyle,
                }}
            >
                {"Check all vocab lists >>"}
            </ATargetBlank>
        </div>
    );
}

function useGenreAndVocab(genreName: string) {
    const [genreAndVocab, setGenreAndVocab] = useState<GenreAndVocab>({
        vocabGenre: initialVocabGenre,
        vocabList: [],
    });

    useEffect(() => {
        let unmounted = false;
        if (genreName) {
            const load = async () => {
                const result = await fetchGenreAndVocab(genreName);
                if (!unmounted && result) {
                    setGenreAndVocab(result);
                }
            };
            void load();
        }
        return () => {
            unmounted = true;
        };
    }, [genreName]);

    return genreAndVocab;
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
