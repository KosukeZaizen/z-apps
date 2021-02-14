import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExampleSentence } from ".";
import * as consts from "../../../../common/consts";
import { sentence, word } from "../../../../types/stories";

export function FolktaleExample({
    storyName,
    lineNumber,
    boldInfo,
}: {
    storyName: string;
    lineNumber: number;
    boldInfo: string;
}) {
    const [s, setSentence] = useState<sentence>({
        storyId: 0,
        lineNumber: 0,
        kanji: "",
        hiragana: "",
        romaji: "",
        english: "",
    });
    const [words, setWords] = useState<word[]>([]);

    useEffect(() => {
        const fetchSentence = async () => {
            const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
            const response = await fetch(url);
            const { sentence, words } = await response.json();
            setSentence(sentence);
            setWords(words);
        };
        storyName && lineNumber && fetchSentence();
    }, [storyName, lineNumber]);

    if (!s.lineNumber) {
        return <p>Loading...</p>;
    }

    const audioFolder = storyName?.split("--")[0];
    const id = `${storyName}-${s.lineNumber}`;
    const folktaleTitle = storyName
        .split("--")
        .join(" - ")
        .split("_")
        .join(" ");

    return (
        <div id={id} key={id} style={{ marginBottom: 25 }}>
            <img
                src={`${consts.BLOB_URL}/folktalesImg/${
                    storyName.split("--")[0]
                }.png`}
                alt={folktaleTitle}
                title={folktaleTitle}
                className="renderedImg"
            />
            <div style={{ fontWeight: "bold", marginBottom: 20 }}>
                {"Below is a sentence from the folktale "}
                <Link to={`/folktales/${storyName}`}>
                    {`${folktaleTitle}>>`}
                </Link>
            </div>
            <ExampleSentence
                s={s}
                boldInfo={boldInfo}
                words={words}
                audioFolder={audioFolder}
            />
        </div>
    );
}
