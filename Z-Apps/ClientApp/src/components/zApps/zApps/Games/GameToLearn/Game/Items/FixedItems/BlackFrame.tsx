import React from "react";
import { gameOpenAnimationTime } from "../../../GameFrame";
import { Renderable } from "../StageItems";

// 画面からはみ出したコンポーネントを隠すための黒いフレーム
export class BlackFrame extends Renderable {
    renderItem(UL: number) {
        return [
            <div
                key="topBlackFrame"
                style={{
                    backgroundColor: "black",
                    zIndex: 10000,
                    position: "absolute",
                    top: -50 * UL,
                    left: -50 * UL,
                    height: 50 * UL,
                    width: 260 * UL,
                    transition: gameOpenAnimationTime,
                }}
            />,
            <div
                key="rightBlackFrame"
                style={{
                    backgroundColor: "black",
                    zIndex: 10000,
                    position: "absolute",
                    top: -50 * UL,
                    left: 160 * UL,
                    height: 190 * UL,
                    width: 50 * UL,
                    transition: gameOpenAnimationTime,
                }}
            />,
            <div
                key="bottomBlackFrame"
                style={{
                    backgroundColor: "black",
                    zIndex: 10000,
                    position: "absolute",
                    top: 75 * UL,
                    left: -50 * UL,
                    height: 50 * UL,
                    width: 260 * UL,
                    transition: gameOpenAnimationTime,
                }}
            />,
            <div
                key="leftBlackFrame"
                style={{
                    backgroundColor: "black",
                    zIndex: 10000,
                    position: "absolute",
                    top: -50 * UL,
                    left: -50 * UL,
                    height: 190 * UL,
                    width: 50 * UL,
                    transition: gameOpenAnimationTime,
                }}
            />,
        ];
    }
}
