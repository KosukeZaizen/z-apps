import React from "react";
import { StageItem } from ".";
import { timeStep } from "../..";
import { ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex?: number;
    imgSrc: ImgSrc;
}

export class Enemy extends StageItem {
    isGoingRight: boolean;

    constructor(props: Props) {
        super({ type: "enemy", ...props });
        this.isGoingRight = false;
    }

    onEachTime(ninja: Ninja) {
        const ninjaCenter = [
            ninja.x + ninja.width / 2,
            ninja.y + ninja.width / 2,
        ];
        const enemyCenter = [this.x + this.width / 2, this.y + this.width / 2];

        const dX = ninjaCenter[0] - enemyCenter[0];
        const dY = ninjaCenter[1] - enemyCenter[1];

        const d = Math.sqrt(dX ** 2 + dY ** 2);

        this.x += dX / d;
        this.y += dY / d;

        this.isGoingRight = dX < 0;
    }

    onTouchNinja(ninja: Ninja) {
        console.log("touched!");
    }

    renderItem(UL: number) {
        return (
            <img
                alt={this.key}
                key={this.key}
                src={this.imgSrc}
                style={{
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    width: this.width * UL,
                    zIndex: this.zIndex || 10,
                    transition: `${timeStep}ms`,
                    transitionProperty: "top, left",
                    transitionTimingFunction: "linear",
                    transform: this.isGoingRight ? "scale(-1, 1)" : undefined,
                }}
            />
        );
    }
}
