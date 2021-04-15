import React, { useEffect } from "react";
import { ChangePage, Page } from ".";
import CharacterComment from "../../parts/CharacterComment";

export function LastPage({
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
            changePage(Page.menu);
        }, 20000);
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
                {"Thank you for watching!"}
            </h1>
            <CharacterComment
                imgNumber={1}
                screenWidth={screenWidth}
                comment={"Don't forget to subscribe to this YouTube channel!"}
                style={{ maxWidth: 1000, marginBottom: 40 }}
                commentStyle={{
                    fontSize: 50,
                    fontWeight: "bold",
                    maxWidth: 900,
                    marginLeft: 40,
                    textAlign: "center",
                }}
            />
        </div>
    );
}
