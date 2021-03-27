import React, { useEffect, useState } from "react";
import { StopAnimation } from "../../../common/animation";
import { debounce } from "../../../common/functions";
import { Helmet } from "../../parts/Helmet";
import { HideHeaderAndFooter } from "../../parts/Layout";
import "./index.css";

export default function GameToLearn() {
    return (
        <div>
            <Helmet
                title="Action Game to Learn Japanese Vocabulary"
                desc="You can learn Japanese vocabulary while playing an action game!"
            />
            <HideHeaderAndFooter />
            <StopAnimation />
            <GameFrame />
        </div>
    );
}

const setScreen = debounce<React.Dispatch<React.SetStateAction<number>>>(
    setUL => {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        if (screenWidth < screenHeight) {
            // 縦長なら幅と高さを入れ替えて計算
            screenWidth = window.innerHeight;
            screenHeight = window.innerWidth;
        }

        const UL = Math.min(screenWidth / 160, screenHeight / 90);
        setUL(UL);
    },
    100
);

function GameFrame() {
    const [UL, setUL] = useState(0);

    useEffect(() => {
        window.onresize = () => {
            setScreen(setUL);
        };

        for (let i = 0; i < 5; i++) {
            setTimeout(() => setScreen(setUL), i * 1000);
        }
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                userSelect: "none",
                // touchCallout: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                id={"game-screen"}
                style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: 160 * UL,
                    height: 90 * UL,
                    zIndex: 1000,
                    transition: "1s",
                }}
            >
                hello!!
            </div>
        </div>
    );
}
