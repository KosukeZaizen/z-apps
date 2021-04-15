import React, { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audioPlayAsync";
import { vocab } from "../../../types/vocab";
import CharacterComment from "../../parts/CharacterComment";

export function ListPage({
    screenWidth,
    changePage,
    vocabList,
    vocabSounds,
}: {
    screenWidth: number;
    changePage: ChangePage;
    vocabList: vocab[];
    vocabSounds: HTMLAudioElement[];
}) {
    const [currentVocab, setCurrentVocab] = useState(vocabList[0]);

    useEffect(() => {
        const play = async () => {
            for (let i in vocabList) {
                setCurrentVocab(vocabList[i]);
                const audio = vocabSounds[vocabList[i].vocabId];
                await audioPlayAsync(audio);
                await sleepAsync(2000);
                await audioPlayAsync(audio);
                await sleepAsync(2000);
            }
            changePage(Page.quiz);
        };
        play();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 90,
            }}
        >
            <p>{currentVocab.kanji}</p>
            <p>{currentVocab.hiragana}</p>
            <p>{currentVocab.english}</p>
            <div style={{ position: "absolute", bottom: 0, left: 20 }}>
                <CharacterComment
                    imgNumber={2}
                    comment={
                        <p style={{ fontSize: "x-large", width: 273 }}>
                            {"Remember these words"}
                            <br />
                            {"before the quiz!"}
                        </p>
                    }
                    imgStyle={{ width: 95 }}
                    screenWidth={screenWidth / 2}
                    commentStyle={{ marginLeft: 15, paddingLeft: 25 }}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    fontSize: 40,
                }}
            >
                {`${vocabList.indexOf(currentVocab) + 1} / ${vocabList.length}`}
            </div>
        </div>
    );
}
