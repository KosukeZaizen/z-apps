import React, { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audioPlayAsync";
import { vocab } from "../../../types/vocab";
import CharacterComment from "../../parts/CharacterComment";

export function QuizPage({
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
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const [count, setCount] = useState(4);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const play = async () => {
            for (let i in vocabList) {
                setCurrentVocab(vocabList[i]);
                const audio = vocabSounds[vocabList[i].vocabId];
                await audioPlayAsync(audio);
                await sleepAsync(3000);
                setCount(3);
                await sleepAsync(1000);
                setCount(2);
                await sleepAsync(1000);
                setCount(1);
                await sleepAsync(1000);
                setCount(4);
                setShowAnswer(true);
                await audioPlayAsync(audio);
                await sleepAsync(2000);
                setShowAnswer(false);
            }
            changePage(Page.quiz);
        };
        setTimeout(() => {
            setIsInitialScreen(false);
            play();
        }, 3000);
    }, []);

    return isInitialScreen ? (
        <CharacterComment
            imgNumber={1}
            comment={<p style={{ fontSize: 70 }}>{"Let's start the quiz!"}</p>}
            style={{ maxWidth: 1000 }}
            screenWidth={screenWidth}
            commentStyle={{
                fontSize: 100,
                maxWidth: 900,
                width: 700,
                marginLeft: 40,
                textAlign: "center",
            }}
        />
    ) : (
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
            <p
                key={currentVocab.vocabId}
                style={{
                    color: "red",
                    opacity: showAnswer ? 1 : 0,
                    transition: "500ms",
                }}
            >
                {currentVocab.english}
            </p>
            <div style={{ position: "absolute", bottom: 0, left: 20 }}>
                <CharacterComment
                    imgNumber={3}
                    comment={
                        <p style={{ fontSize: "x-large" }}>
                            {"Do you remember the meaning?"}
                        </p>
                    }
                    imgStyle={{ width: 95 }}
                    screenWidth={screenWidth / 2}
                    commentStyle={{
                        marginLeft: 15,
                        paddingLeft: 25,
                        width: 300,
                    }}
                />
            </div>
            {count < 4 && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 50,
                        fontSize: 100,
                    }}
                >
                    {count}
                </div>
            )}
        </div>
    );
}
