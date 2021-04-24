import React, { useEffect, useState } from "react";
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
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsInitial(false);
        }, 4000);
        setTimeout(() => {
            changePage(Page.list);
        }, 8000);
    }, []);

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
            <p style={{ fontSize: 50 }}>
                {"Let's check all the words"}
                <br />
                {"before starting the quiz!"}
            </p>
        );
    }

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
                comment={comment}
                style={{
                    maxWidth: 1000,
                    marginBottom: 40,
                    position: "relative",
                    left: -40,
                }}
                commentStyle={{
                    fontSize: 100,
                    fontWeight: "bold",
                    maxWidth: 900,
                    marginLeft: 40,
                    textAlign: "center",
                }}
                imgStyle={{ maxWidth: 150 }}
            />
        </div>
    );
}
