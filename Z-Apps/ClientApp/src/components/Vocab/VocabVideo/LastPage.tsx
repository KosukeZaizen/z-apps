import React, { useEffect } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { sound } from "../../../types/vocab";
import CharacterComment from "../../parts/CharacterComment";

export function LastPage({
    screenWidth,
    changePage,
    music,
}: {
    screenWidth: number;
    changePage: ChangePage;
    music: sound;
}) {
    useEffect(() => {
        setTimeout(() => {
            const soundFadeOut = async () => {
                const { audio } = music;
                while (audio.volume > 0) {
                    audio.volume -= 0.001;
                    await sleepAsync(1000);
                }
            };
            soundFadeOut();
        }, 13000);

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
                comment={[
                    <p>{"Don't forget to subscribe"}</p>,
                    <p>{"to this YouTube channel!"}</p>,
                ]}
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
