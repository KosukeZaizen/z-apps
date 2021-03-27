import React from "react";
import { timeStep } from ".";
import { appsPublicImg } from "../../../../common/consts";

const ninjaUrl = `${appsPublicImg}ninja_hashiru.png`;

export interface Ninja {
    x: number;
    y: number;
}

export function getInitialNinja(): Ninja {
    return {
        x: 140,
        y: 0,
    };
}

export function Ninja({ ninja, UL }: { ninja: Ninja; UL: number }) {
    return (
        <img
            src={ninjaUrl}
            style={{
                width: 15 * UL,
                position: "absolute",
                top: ninja.y * UL,
                left: ninja.x * UL,
                transition: `${timeStep}ms`,
                transitionProperty: "top left",
                transitionTimingFunction: "linear"
            }}
        />
    );
}
