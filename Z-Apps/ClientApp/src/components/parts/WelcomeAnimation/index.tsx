import * as React from "react";
import { useEffect, useState } from "react";
import { AnimationEngine } from "../../../common/animation";
import "./animation.css";

const runningNinja = require("./../Ninja/objs/ninja/ninja_hashiru.png");
const shuriken = require("../../../img/shuriken.png");

interface StateToAnimate {
    shown: boolean;
    isOpen: boolean;
    underBarLength: number;
    underBarOpacity: number;
    time: number;
}

export default function WelcomeAnimation() {
    const initialAnimationState: StateToAnimate = {
        shown: true,
        isOpen: false,
        underBarLength: 0,
        underBarOpacity: 0,
        time: 0,
    };

    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        const animation = new AnimationEngine<StateToAnimate>(
            initialAnimationState,
            ({ shown, isOpen, underBarLength, underBarOpacity, time }) => {
                if (time === 1) {
                    isOpen = true;
                }
                if (time > 190 && time <= 250) {
                    underBarOpacity = 1;
                    underBarLength = underBarLength + 50;
                }
                if (time > 250) {
                    if (underBarOpacity > 0) {
                        underBarOpacity = underBarOpacity - 0.02;
                    }
                }
                if (time > 470) {
                    shown = false;
                    animation.cleanUpAnimation();
                }

                return {
                    shown,
                    isOpen,
                    underBarLength,
                    underBarOpacity,
                    time: time + 1,
                };
            },
            setAnimationState
        );
        return animation.cleanUpAnimation;
    }, []);

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const squareLength = innerWidth < innerHeight ? innerWidth : innerHeight;
    const leftTopPosition = [
        (innerWidth - squareLength) / 2,
        (innerHeight - squareLength) / 2,
    ];
    const U = squareLength / 1000; // unit length

    const charHeight = 130 * U;
    const charTop = leftTopPosition[1] + (squareLength - charHeight) * (2 / 5);

    return animationState.shown ? (
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999999999,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
            }}
            className="screen"
        >
            <div
                style={{
                    borderRadius: 1,
                    width: animationState.underBarLength,
                    border: "solid 1px #007bff",
                    height: 0,
                    marginTop: charTop + charHeight * 1.5,
                    opacity: animationState.underBarOpacity,
                }}
            ></div>
            <p
                style={{
                    width: 1000 * U,
                    position: "absolute",
                    left: leftTopPosition[0],
                    top: charTop,
                    textAlign: "center",
                    fontSize: charHeight,
                    padding: 0,
                    fontWeight: "bold",
                    transition: "2s",
                    opacity: animationState.isOpen ? 1 : 0,
                    fontStyle: "italic",
                }}
            >
                {"Lingual Ninja"}
            </p>
            <img
                src={runningNinja}
                alt={"running ninja"}
                style={{
                    width: 210 * U,
                    position: "absolute",
                    left: leftTopPosition[0] + 100 * U,
                    top: leftTopPosition[1] + 470 * U,
                }}
                className="ninja"
            />
            <img
                src={shuriken}
                alt={"shuriken"}
                style={{
                    width: 170 * U,
                    position: "absolute",
                    left: leftTopPosition[0] + 750 * U,
                    top: leftTopPosition[1] + 270 * U,
                }}
                className="shuriken"
            />
        </div>
    ) : null;
}
