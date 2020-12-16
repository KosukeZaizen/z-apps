import * as React from "react";
import { useEffect, useState } from "react";
import { AnimationEngine } from "../../../../common/animation";
import "./animation.css";

const runningNinja = require("../../Ninja/objs/ninja/ninja_hashiru.png");
const shuriken = require("../../../../img/shuriken.png");

export let finishWelcomeAnimation: () => void = () => {};

interface StateToAnimate {
    shown: boolean;
    isOpen: boolean;
    underBarLength: number;
    underBarOpacity: number;
    time: number;
}

const initialAnimationState: StateToAnimate = {
    shown: true,
    isOpen: false,
    underBarLength: 0,
    underBarOpacity: 0,
    time: 0,
};

export default function WelcomeAnimation() {
    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        finishWelcomeAnimation = () => {
            setAnimationState({ ...initialAnimationState, shown: false });
        };

        const animation = new AnimationEngine<StateToAnimate>(
            initialAnimationState,
            ({ shown, isOpen, underBarLength, underBarOpacity, time }) => {
                if (time === 1) {
                    isOpen = true;
                }
                if (time > 95 && time <= 125) {
                    underBarOpacity = 1;
                    underBarLength = underBarLength + 100;
                }
                if (time > 125) {
                    if (underBarOpacity > 0) {
                        underBarOpacity = underBarOpacity - 0.04;
                    }
                }
                if (time > 215) {
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

    if (!animationState.shown) {
        return null;
    }

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

    return (
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
                    backgroundColor: "#007bff",
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
    );
}
