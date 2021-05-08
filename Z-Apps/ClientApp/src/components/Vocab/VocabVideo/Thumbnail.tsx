import React, { useEffect, useRef, useState } from "react";
import { StopAnimation } from "../../../common/animation";
import { vocab } from "../../../types/vocab";
import CharacterComment from "../../parts/CharacterComment";
import { ScrollBox } from "../../parts/ScrollBox";

export function Thumbnail({
    titleToShowUpper,
    screenWidth,
    vocabList,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    vocabList: vocab[];
}) {
    const scrollTextRef = useRef<HTMLSpanElement>(null);
    const characterCommentRef = useRef<HTMLDivElement>(null);

    const [vList, setVList] = useState<vocab[]>(vocabList.map(v => ({ ...v })));
    const [isOmitted, setIsOmitted] = useState(false);
    const [isCommentTwoLines, setIsCommentTwoLines] = useState(false);

    useEffect(() => {
        if (!vList?.length) {
            setVList(vocabList);
        }

        const rect = scrollTextRef.current?.getBoundingClientRect();
        if (rect && rect.height > 100) {
            setIsOmitted(true);
            setVList(vList.filter((v, i) => i !== vList.length - 1));
        }
    }, [vList, vocabList, scrollTextRef.current]);

    useEffect(() => {
        const rect = characterCommentRef.current?.getBoundingClientRect();
        const isTwoLines = !!rect && rect.height > 230;
        setIsCommentTwoLines(isTwoLines);
    }, [titleToShowUpper]);

    const comment = titleToShowUpper.split(" ").map((t, i) => {
        const str = i ? " " + t : t;
        return t.includes("-") ? (
            <span style={{ display: "inline-block" }}>{str}</span>
        ) : (
            str
        );
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: "100%",
                padding: isCommentTwoLines ? undefined : 20,
            }}
        >
            <StopAnimation />
            <h1
                id="h1title"
                style={{
                    marginTop: 10,
                    marginBottom: 20,
                    fontWeight: "bold",
                    fontSize: 100,
                }}
            >
                {"Japanese Vocabulary Quiz"}
            </h1>

            <CharacterComment
                containerRef={characterCommentRef}
                imgNumber={1}
                screenWidth={screenWidth}
                comment={comment}
                style={{
                    maxWidth: 1000,
                    position: "relative",
                    left: -40,
                }}
                commentStyle={{
                    fontSize: 100,
                    fontWeight: "bold",
                    maxWidth: 1000,
                    marginLeft: 40,
                    textAlign: "center",
                    marginBottom: -20,
                    lineHeight: 1.3,
                    paddingBottom: 30,
                }}
                imgStyle={{ maxWidth: 150 }}
            />

            <ScrollBox>
                <div
                    style={{
                        fontSize: 50,
                        textOverflow: "hidden",
                        width: 1100,
                        fontWeight: "bold",
                    }}
                >
                    <span ref={scrollTextRef}>
                        {vList.map(v => v.hiragana).join(", ")}
                        {isOmitted && "..., etc"}
                    </span>
                </div>
            </ScrollBox>
        </div>
    );
}
