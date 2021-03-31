import * as React from "react";
import { useEffect, useState } from "react";
import {
    AnimationEngine,
    smoothCSSProperty,
    timeStep
} from "../../../../common/animation";
import { appsPublicImg } from "../../../../common/consts";

const badNinja = appsPublicImg + "ninja_bad.png";
const rock = appsPublicImg + "rockRight.png";
const fire = appsPublicImg + "fireRight.png";
const flyingNinja = appsPublicImg + "flying-ninja.png";
const runningNinja = appsPublicImg + "ninja_hashiru.png";

interface StateToAnimate {
    shown: boolean;
    ninjaX: number;
    ninjaY: number;
    badNinjaX: number;
    turn: boolean;
    flyingNinjaPos: [number, number];
    flyingNinjaSpeed: [number, number];
    time: number;
    flyingNinjaDisplay: string;
}

const initialAnimationState: StateToAnimate = {
    shown: true,
    ninjaX: 3000,
    ninjaY: 0,
    badNinjaX: 3000,
    turn: false,
    flyingNinjaPos: [2500, 300],
    flyingNinjaSpeed: [0, 0],
    flyingNinjaDisplay: "block",
    time: 0,
};

const baseStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000000000,
};

export let finishFooterAnimation: () => void;
export let restartFooterAnimation: () => void;

const smoothPosition = {
    transitionProperty: "top left",
    ...smoothCSSProperty,
};

export default function WelcomeAnimation() {
    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        finishFooterAnimation = () => {
            setAnimationState({ ...initialAnimationState, shown: false });
        };

        restartFooterAnimation = () => {
            setAnimationState(initialAnimationState);
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
                flyingNinjaDisplay,
                time,
                ...rest
            }) => {
                if (time > 1000 / timeStep && time < 11200 / timeStep) {
                    ninjaX -= 0.5 * timeStep;
                    badNinjaX = ninjaX + 900;
                }

                if (time === Math.floor(11200 / timeStep)) {
                    turn = true;
                    ninjaY = 115;
                }

                if (time > 11200 / timeStep && time < 22000 / timeStep) {
                    ninjaX += 0.5 * timeStep;
                    badNinjaX = ninjaX + 600;
                }

                if (time > 22000 / timeStep && flyingNinjaPos[0] > -200) {
                    if (flyingNinjaPos[0] > 2000) {
                        flyingNinjaDisplay = "block";
                    }
                    flyingNinjaSpeed[1] +=
                        ((Math.random() - 0.499) * timeStep) / 30;

                    flyingNinjaPos[0] -= 0.3 * timeStep;
                    flyingNinjaPos[1] += flyingNinjaSpeed[1];
                }

                if (time % Math.floor(60000 / timeStep) === 0) {
                    flyingNinjaDisplay = "none";
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
                    flyingNinjaDisplay,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
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
                    ...smoothPosition,
                }}
            />
            {animationState.time > 10000 / timeStep && (
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
                            ...smoothPosition,
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
                            ...smoothPosition,
                        }}
                    />
                </>
            )}
            {animationState.time > 18000 / timeStep && (
                <img
                    src={flyingNinja}
                    alt="flying ninja"
                    style={{
                        ...baseStyle,
                        left: animationState.flyingNinjaPos[0] * U,
                        bottom: animationState.flyingNinjaPos[1] * U,
                        width: ninjaLength * U * 1.5,
                        display: animationState.flyingNinjaDisplay,
                        ...smoothPosition,
                    }}
                />
            )}
        </>
    );
}
