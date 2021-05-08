import React, { useEffect, useRef, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { sound, vocab } from "../../../types/vocab";
import CharacterComment from "../../parts/CharacterComment";
import { ScrollBox } from "../../parts/ScrollBox";

export function TitlePage({
    titleToShowUpper,
    screenWidth,
    changePage,
    vocabList,
    music,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    changePage: ChangePage;
    vocabList: vocab[];
    music: sound;
}) {
    const scrollTextRef = useRef<HTMLSpanElement>(null);
    const characterCommentRef = useRef<HTMLDivElement>(null);

    const [isInitial, setIsInitial] = useState(true);
    const [vList, setVList] = useState<vocab[]>(vocabList.map(v => ({ ...v })));
    const [isOmitted, setIsOmitted] = useState(false);
    const [isCommentTwoLines, setIsCommentTwoLines] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const musicPlay = async () => {
                const { audio } = music;
                audio.volume = 0;
                audio.onended = musicPlay;
                audio.play();
                while (audio.volume < 0.005) {
                    audio.volume += 0.001;
                    await sleepAsync(500);
                }
            };
            musicPlay();
        }, 500);

        setTimeout(() => {
            setIsInitial(false);
        }, 3000);
        setTimeout(() => {
            changePage(Page.list);
        }, 8000);
    }, []);

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

    let comment: React.ReactNode;
    if (isInitial) {
        comment = titleToShowUpper.split(" ").map((t, i) => {
            const str = i ? " " + t : t;
            return t.includes("-") ? (
                <span style={{ display: "inline-block" }}>{str}</span>
            ) : (
                str
            );
        });
    } else {
        comment = (
            <p style={{ fontSize: 60 }}>
                {"Let's check all the words"}
                <br />
                {"before starting the quiz!"}
            </p>
        );
    }

    return (
        <div
            style={
                isInitial
                    ? {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: "100%",
                          padding: isCommentTwoLines ? undefined : 20,
                      }
                    : {}
            }
        >
            {isInitial && (
                <h1
                    id="h1title"
                    style={{
                        marginTop: 10,
                        marginBottom: isInitial ? 20 : 100,
                        fontWeight: "bold",
                        fontSize: 100,
                    }}
                >
                    {"Japanese Vocabulary Quiz"}
                </h1>
            )}
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
            {isInitial && (
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
            )}
        </div>
    );
}
