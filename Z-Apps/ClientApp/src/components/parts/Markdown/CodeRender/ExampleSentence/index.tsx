import React, { useEffect, useState } from "react";
import { sentence, word } from "../../../../../types/stories";
import { AudioControl } from "../../../../Stories/AudioControl";
import { WordList } from "../../../../Stories/WordList";

interface BoldInfo {
    K?: number[];
    H?: number[];
    R?: number[];
    E?: number[];
}
export function ExampleSentence({
    s,
    boldInfo,
    words,
    audioPath,
}: {
    s: sentence;
    boldInfo: string;
    words: word[];
    audioPath: string;
}) {
    const [bold, setBold] = useState<BoldInfo>({});

    useEffect(() => {
        if (!boldInfo) {
            setBold({});
            return;
        }
        try {
            const objBold: BoldInfo = JSON.parse(
                boldInfo
                    .replace("K", '"K"')
                    .replace("H", '"H"')
                    .replace("R", '"R"')
                    .replace("E", '"E"')
            );
            setBold(objBold);
        } catch (ex) {}
    }, [boldInfo]);

    return (
        <>
            <span style={{ fontSize: "small", marginBottom: 5 }}>
                <span
                    style={{
                        backgroundColor: "#fff0f2",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>K</b>: Kanji
                </span>
                <span
                    style={{
                        backgroundColor: "#ffffe0",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>H</b>: Hiragana
                </span>
                <span
                    style={{
                        backgroundColor: "#f0fff2",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>R</b>: Romaji
                </span>
                <span
                    style={{
                        backgroundColor: "#f0f8ff",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>E</b>: English
                </span>
            </span>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#fff0f2",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="kanji">Ｋ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.kanji, bold?.K)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#ffffe0",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="hiragana">Ｈ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.hiragana, bold?.H)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#f0fff2",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="romaji">Ｒ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.romaji, bold?.R)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#f0f8ff",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="english">Ｅ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.english, bold?.E)}
                </div>
            </div>
            {audioPath && <AudioControl audioPath={audioPath} />}
            <WordList
                words={{ [s.lineNumber]: words }}
                s={s}
                storyId={s.storyId}
            />
        </>
    );
}

function getBoldSentence(sentence: string, minAndMax?: number[]) {
    if (!minAndMax || minAndMax.length % 2 !== 0) {
        return sentence;
    }

    const copyMinAndMax = [...minAndMax];
    const arrToShow = [];

    const firstPart = sentence.substr(0, copyMinAndMax[0]);

    while (copyMinAndMax.length > 0) {
        const min = copyMinAndMax.shift() || 0;
        const max = copyMinAndMax.shift() || 500;

        const strongPart = sentence.substr(min, max - min);
        const thirdPart = sentence.substr(
            max,
            (copyMinAndMax[0] || sentence.length) - max
        );
        arrToShow.push(
            <span key={min}>
                <strong style={{ color: "red" }}>{strongPart}</strong>
                {thirdPart}
            </span>
        );
    }

    return (
        <>
            {firstPart}
            {arrToShow}
        </>
    );
}
