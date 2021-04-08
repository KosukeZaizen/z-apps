import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Direction, StageItem } from ".";
import { timeStep } from "../..";
import { gameOpenAnimationTime } from "../../../GameFrame";
import { gameState } from "../../GameState";
import { ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

const DamageAnimationDuration = 500; //ms

const opacityKeyframes = {
    "0%": {
        opacity: 1,
    },
    "25%": {
        opacity: 0,
    },
    "50%": {
        opacity: 1,
    },
    "75%": {
        opacity: 0,
    },
    "100%": {
        opacity: 1,
    },
};

const styles = StyleSheet.create({
    blink: {
        animationName: opacityKeyframes,
        animationDuration: `${DamageAnimationDuration}ms`,
    },
});

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
    isDamaged: boolean;

    constructor(props: Props) {
        super({ type: "enemy", ...props });
        this.isGoingRight = false;
        this.isDamaged = false;
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
            ninja.speedY = -8;

            // ダメージ時の点滅制御
            this.isDamaged = true;
            setTimeout(() => {
                this.isDamaged = false;
            }, DamageAnimationDuration);

            if (--this.currentLife <= 0) {
                gameState.stageItems = gameState.stageItems.filter(
                    item => item.key !== this.key
                );
            }
        }
        console.log("touched!");
    }

    renderItem(UL: number) {
        return (
            <div
                key={this.key}
                style={{
                    opacity: UL ? 1 : 0,
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    transition:
                        `top ${timeStep}ms, ` +
                        `left ${timeStep}ms, ` +
                        `opacity ${gameOpenAnimationTime}`,
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
                    className={this.isDamaged ? css(styles.blink) : undefined}
                />
            </div>
        );
    }
}
