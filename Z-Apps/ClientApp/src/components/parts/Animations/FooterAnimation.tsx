import * as React from "react";
import { useEffect, useState } from "react";
import { AnimationEngine } from "../../../common/animation";

const runningNinja = require("./../Ninja/objs/ninja/ninja_hashiru.png");
const badNinja = require("./../Ninja2/objs/ninja_bad.png");
const rock = require("./../Ninja3/objs/rockRight.png");
const fire = require("./../Ninja3/objs/fireRight.png");

interface StateToAnimate {
    ninjaX: number;
    ninjaY: number;
    badNinjaX: number;
    turn: boolean;
    time: number;
}

const initialAnimationState: StateToAnimate = {
    ninjaX: 3000,
    ninjaY: 0,
    badNinjaX: 3000,
    turn: false,
    time: 0,
};

export default function WelcomeAnimation() {
    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        const animation = new AnimationEngine<StateToAnimate>(
            initialAnimationState,
            ({ ninjaX, ninjaY, badNinjaX, turn, time }) => {
                if (time > 100 && time < 1120) {
                    ninjaX -= 5;
                    badNinjaX = ninjaX + 900;
                }

                if (time === 1120) {
                    turn = true;
                    ninjaY = 115;
                }

                if (time > 1120 && time < 2200) {
                    ninjaX += 5;
                    badNinjaX = ninjaX + 600;
                }

                if (time === 2200) {
                    animation.cleanUpAnimation();
                }

                return {
                    ninjaX,
                    ninjaY,
                    badNinjaX,
                    turn,
                    time: time + 1,
                };
            },
            setAnimationState
        );
        return animation.cleanUpAnimation;
    }, []);

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const squareLength = (innerWidth + innerHeight) / 2;

    const U = squareLength / 1000; // unit length

    const ninjaLength = 100;

    return (
        <>
            <img
                src={runningNinja}
                alt="running ninja"
                style={{
                    position: "fixed",
                    left: animationState.ninjaX * U,
                    bottom: animationState.ninjaY * U,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "scale(-1, 1)" : "",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: animationState.badNinjaX * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: animationState.badNinjaX * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: (animationState.badNinjaX - 100) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: (animationState.badNinjaX - 200) * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: (animationState.badNinjaX - 300) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    position: "fixed",
                    left: (animationState.badNinjaX - 400) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                    zIndex: 1000000000,
                }}
            />
            {animationState.turn && (
                <>
                    <img
                        src={rock}
                        alt="rock"
                        style={{
                            position: "fixed",
                            left: (animationState.ninjaX - 5) * U,
                            bottom: 0,
                            width: ninjaLength * U * 1.3,
                            zIndex: 1000000001,
                        }}
                    />
                    <img
                        src={fire}
                        alt="fire"
                        style={{
                            position: "fixed",
                            left: (animationState.ninjaX - ninjaLength) * U,
                            bottom: 0,
                            width: ninjaLength * U * 1.3,
                            zIndex: 1000000000,
                        }}
                    />
                </>
            )}
        </>
    );
}
