import React from "react";
import { Direction, StageItem } from ".";
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
    life: number;
}

export class Enemy extends StageItem {
    isGoingRight: boolean;
    currentLife: number;
    initialLife: number;

    constructor(props: Props) {
        super({ type: "enemy", ...props });
        this.isGoingRight = false;
        this.currentLife = props.life;
        this.initialLife = props.life;
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

        this.isGoingRight = dX > 0;
    }

    onTouchNinja(ninja: Ninja) {
        const ninjaDirection = this.getTargetDirection(ninja);
        if (ninjaDirection === Direction.top) {
            this.currentLife--;
            ninja.speedY = -8;
        }
        console.log("touched!");
    }

    renderItem(UL: number) {
        return (
            <div
                key={this.key}
                style={{
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    transition: `${timeStep}ms`,
                    transitionProperty: "top, left",
                    transitionTimingFunction: "linear",
                    zIndex: this.zIndex || 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <meter
                    value={this.currentLife / this.initialLife}
                    style={{ margin: 2 * UL }}
                />
                <img
                    alt={this.key}
                    src={this.imgSrc}
                    style={{
                        width: this.width * UL,
                        transform: this.isGoingRight
                            ? undefined
                            : "scale(-1, 1)",
                    }}
                />
            </div>
        );
    }
}
