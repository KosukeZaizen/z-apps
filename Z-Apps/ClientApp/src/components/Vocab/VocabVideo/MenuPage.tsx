import React, { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { StopAnimation } from "../../../common/animation";
import { sound } from "../../../types/vocab";
import { Season } from "../../parts/Animations/SeasonAnimation";

export function MenuPage({
    changePage,
    vocabSounds,
    music,
    setSeason,
}: {
    changePage: ChangePage;
    vocabSounds: sound[];
    music?: sound;
    setSeason: (season: Season) => void;
}) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    const [playableArray, setPlayableArray] = useState(
        vocabSounds.map(s => s.playable)
    );
    const [musicPlayable, setMusicPlayable] = useState(false);

    useEffect(() => {
        vocabSounds.forEach(vocabSound => {
            vocabSound.audio.oncanplaythrough = () => {
                vocabSound.playable = true;
                setPlayableArray(vocabSounds.map(s => s.playable));
            };
            vocabSound.audio.load();
        });
    }, [vocabSounds]);

    useEffect(() => {
        if (!music) {
            return;
        }
        music.audio.oncanplaythrough = () => {
            music.playable = true;
            setMusicPlayable(true);
        };
        music.audio.load();
    }, [music]);

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
            <StopAnimation />
            <p
                style={{ margin: 10 }}
            >{`Loaded Audio: ${playableCount} / ${totalCount}`}</p>
            <p style={{ margin: 10 }}>{`Music: ${
                musicPlayable ? "OK!" : "Loading..."
            }`}</p>
            <button
                style={{ margin: 10 }}
                onClick={() => {
                    setTimeout(() => {
                        changePage(Page.title);
                    }, 3000);
                    setIsButtonShown(false);
                }}
            >
                Video Start
            </button>
            <div style={{ display: "flex", margin: 20 }}>
                <div>{"Season:"}</div>
                <select
                    onChange={ev => {
                        setSeason(ev.target.value);
                    }}
                >
                    {Object.keys(Season).map(s => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>
            <div style={{ border: "solid", margin: 20, padding: 10 }}>
                <p>途中から</p>
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
            <button
                onClick={() => {
                    changePage(Page.thumbnail);
                }}
            >
                {"サムネイル用画面"}
            </button>
        </div>
    ) : null;
}
