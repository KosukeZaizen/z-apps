import React, { useEffect } from "react";
import { ChangePage, Page } from ".";
import CharacterComment from "../../parts/CharacterComment";

export function TitlePage({
    titleToShowUpper,
    screenWidth,
    changePage,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    changePage: ChangePage;
}) {
    useEffect(() => {
        setTimeout(() => {
            changePage(Page.list);
        }, 4000);
    }, []);

    return (
        <div>
            <h1
                id="h1title"
                style={{
                    marginBottom: 100,
                    fontWeight: "bold",
                    fontSize: 90,
                }}
            >
                {"Japanese Vocabulary Quiz"}
            </h1>
            <CharacterComment
                imgNumber={1}
                screenWidth={screenWidth}
                comment={titleToShowUpper.split(" ").map((t, i) => {
                    const str = i ? " " + t : t;
                    return t.includes("-") ? (
                        <span style={{ display: "inline-block" }}>{str}</span>
                    ) : (
                        str
                    );
                })}
                style={{ maxWidth: 1000, marginBottom: 40 }}
                commentStyle={{
                    fontSize: 100,
                    fontWeight: "bold",
                    maxWidth: 900,
                    marginLeft: 40,
                    textAlign: "center",
                }}
            />
        </div>
    );
}
