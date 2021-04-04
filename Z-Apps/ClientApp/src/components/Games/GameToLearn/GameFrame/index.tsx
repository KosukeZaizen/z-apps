import React, { useEffect, useState } from "react";
import { debounce } from "../../../../common/functions";
import { Game } from "../Game";
import "./style.css";

const setScreen = debounce<React.Dispatch<React.SetStateAction<number>>>(
    setUL => {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        if (screenWidth < screenHeight) {
            // 縦長なら幅と高さを入れ替えて計算
            screenWidth = window.innerHeight;
            screenHeight = window.innerWidth;
        }

        const UL = Math.min(screenWidth / 168, screenHeight / 94.5);
        setUL(UL);
    },
    100
);

export const gameOpenAnimationTime = "500ms";

export function GameFrame() {
    const [UL, setUL] = useState(0);
    const [isBackgroundBlack, setIsBackgroundBlack] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreen(setUL);
        });

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setScreen(setUL);
                if (i === 4) {
                    setIsBackgroundBlack(true); // 初期ロード時は白い背景を、それ以降黒く
                }
            }, i * 1000);
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
                    backgroundColor: isBackgroundBlack ? "black" : "white",
                    width: 160 * UL,
                    height: 90 * UL,
                    transition: gameOpenAnimationTime,
                }}
            >
                <Game UL={UL} />
            </div>
        </div>
    );
}
