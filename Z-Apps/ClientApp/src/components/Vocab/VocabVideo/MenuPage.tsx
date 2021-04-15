import React, { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { sound } from "../../../types/vocab";

export function MenuPage({
    changePage,
    vocabSounds,
}: {
    changePage: ChangePage;
    vocabSounds: sound[];
}) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    const [playableArray, setPlayableArray] = useState(
        vocabSounds.map(s => s.playable)
    );

    useEffect(() => {
        vocabSounds.forEach(vocabSound => {
            vocabSound.audio.oncanplaythrough = () => {
                vocabSound.playable = true;
                setPlayableArray(vocabSounds.map(s => s.playable));
            };
            vocabSound.audio.load();
        });
    }, [vocabSounds]);

    const playableCount = playableArray.filter(p => p).length;
    const totalCount = vocabSounds.filter(s => s).length;

    return isButtonShown ? (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <p
                style={{ margin: 10 }}
            >{`Loaded Audio: ${playableCount} / ${totalCount}`}</p>
            <button
                style={{ margin: 10 }}
                onClick={() => {
                    setTimeout(() => {
                        changePage(Page.title);
                    }, 3000);
                    setIsButtonShown(false);
                }}
            >
                Title Page
            </button>
            <button
                style={{ margin: 10 }}
                onClick={() => {
                    changePage(Page.list);
                }}
            >
                List Page
            </button>
            <button
                style={{ margin: 10 }}
                onClick={() => {
                    changePage(Page.quiz);
                }}
            >
                Quiz Page
            </button>
            <button
                style={{ margin: 10 }}
                onClick={() => {
                    changePage(Page.last);
                }}
            >
                Last Page
            </button>
        </div>
    ) : null;
}
