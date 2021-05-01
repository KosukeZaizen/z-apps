import React from "react";
import { Markdown } from "..";
import { sentence } from "../../../../types/stories";
import { ExampleSentence } from "./ExampleSentence";
import { FolktaleExample } from "./ExampleSentence/Folktale";
import { PointBox } from "./PointBox";

function sliceByNumber<T>(array: T[], number: number) {
    const length = Math.ceil(array.length / number);
    return new Array(length)
        .fill(undefined)
        .map((_, i) => array.slice(i * number, (i + 1) * number));
}

export const CodeRender = ({
    language,
    value,
}: {
    language: string;
    value: string;
}) => {
    if (!value) {
        return null;
    }

    const params: { [key: number]: string } = value
        .split("\n")
        .reduce((acc: { [key: number]: string }, val: string, i: number) => {
            acc[i] = val;
            return acc;
        }, {});

    if (language === "ex") {
        return (
            <FolktaleExample
                storyName={params[0]}
                lineNumber={Number(params[1])}
                boldInfo={params[2]}
            />
        );
    } else if (language === "e") {
        return <OriginalExample params={params} />;
    } else if (language === "box") {
        return (
            <div className="greenBox">
                <Markdown source={value} />
            </div>
        );
    }

    return (
        <PointBox language={language}>
            <Markdown source={value} />
        </PointBox>
    );
};

function OriginalExample({ params }: { params: { [key: number]: string } }) {
    const s: sentence = {
        storyId: 0,
        lineNumber: 0,
        kanji: params[0],
        hiragana: params[1],
        romaji: params[2],
        english: params[3],
    };

    const strWords = params[6];
    let threeItemsArrays: string[][] = [];
    if (strWords) {
        try {
            const arrWords: string[] = JSON.parse(strWords);
            threeItemsArrays = sliceByNumber<string>(arrWords, 3);
        } catch (e) {}
    }
    const words = threeItemsArrays.map((items, i) => ({
        lineNumber: 0,
        wordNumber: i,
        kanji: items[0],
        hiragana: items[1],
        english: items[2],
    }));

    return (
        <div style={{ marginBottom: 20 }}>
            <ExampleSentence
                s={s}
                boldInfo={params[4]}
                audioPath={params[5]}
                words={words}
            />
        </div>
    );
}
