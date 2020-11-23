import * as React from "react";
import { useEffect, useState } from "react";
import { AnimationEngine } from "../../../../common/animation";

const runningNinja = require("./../../Ninja/objs/ninja/ninja_hashiru.png");
const badNinja = require("./../../Ninja2/objs/ninja_bad.png");
const rock = require("./../../Ninja3/objs/rockRight.png");
const fire = require("./../../Ninja3/objs/fireRight.png");
const flyingNinja = require("./flying-ninja.png");

interface StateToAnimate {
    shown: boolean;
    ninjaX: number;
    ninjaY: number;
    badNinjaX: number;
    turn: boolean;
    flyingNinjaPos: [number, number];
    flyingNinjaSpeed: [number, number];
    time: number;
}

const initialAnimationState: StateToAnimate = {
    shown: true,
    ninjaX: 3000,
    ninjaY: 0,
    badNinjaX: 3000,
    turn: false,
    flyingNinjaPos: [2500, 300],
    flyingNinjaSpeed: [0, 0],
    time: 0,
};

const baseStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000000000,
};

export let finishFooterAnimation: () => void;

export default function WelcomeAnimation() {
    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        finishFooterAnimation = () => {
            setAnimationState({ ...initialAnimationState, shown: false });
        };

        const animation = new AnimationEngine<StateToAnimate>(
            initialAnimationState,
            ({
                ninjaX,
                ninjaY,
                badNinjaX,
                turn,
                flyingNinjaPos,
                flyingNinjaSpeed,
                time,
                ...rest
            }) => {
                if (time > 5 && time < 370) {
                    ninjaX -= 15;
                    badNinjaX = ninjaX + 900;
                }

                if (time === 370) {
                    turn = true;
                    ninjaY = 115;
                }

                if (time > 370 && time < 730) {
                    ninjaX += 15;
                    badNinjaX = ninjaX + 600;
                }

                if (time > 730 && flyingNinjaPos[0] > -200) {
                    flyingNinjaSpeed[1] += (Math.random() - 0.499) / 3;

                    flyingNinjaPos[0] -= 9;
                    flyingNinjaPos[1] += flyingNinjaSpeed[1];
                }

                if (time % 2000 === 0) {
                    flyingNinjaPos = [2500, 300];
                    flyingNinjaSpeed = [0, 0];
                }

                return {
                    ninjaX,
                    ninjaY,
                    badNinjaX,
                    turn,
                    flyingNinjaPos,
                    flyingNinjaSpeed,
                    time: time + 1,
                    ...rest,
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

    const squareLength = (innerWidth + innerHeight) / 2;

    const U = squareLength / 1000; // unit length

    const ninjaLength = 100;

    return (
        <>
            <img
                src={runningNinja}
                alt="running ninja"
                style={{
                    ...baseStyle,
                    left: animationState.ninjaX * U,
                    bottom: animationState.ninjaY * U,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "scale(-1, 1)" : "",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: animationState.badNinjaX * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: animationState.badNinjaX * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: (animationState.badNinjaX - 100) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: (animationState.badNinjaX - 200) * U,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: (animationState.badNinjaX - 300) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    left: (animationState.badNinjaX - 400) * U,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn ? "" : "scale(-1, 1)",
                }}
            />
            {animationState.time > 330 && (
                <>
                    <img
                        src={rock}
                        alt="rock"
                        style={{
                            ...baseStyle,
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
                            ...baseStyle,
                            left: (animationState.ninjaX - ninjaLength) * U,
                            bottom: 0,
                            width: ninjaLength * U * 1.3,
                        }}
                    />
                </>
            )}
            {animationState.time > 600 && (
                <img
                    src={flyingNinja}
                    alt="flying ninja"
                    style={{
                        ...baseStyle,
                        left: animationState.flyingNinjaPos[0] * U,
                        bottom: animationState.flyingNinjaPos[1] * U,
                        width: ninjaLength * U * 1.5,
                    }}
                />
            )}
        </>
    );
}
