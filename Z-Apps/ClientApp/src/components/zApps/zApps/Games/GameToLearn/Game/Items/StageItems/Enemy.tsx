import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Direction, StageItem } from ".";
import { timeStep } from "../..";
import { gameOpenAnimationTime } from "../../../GameFrame";
import { gameState } from "../../GameState";
import { ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

const damageAnimationDuration = 500; //ms

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
        animationDuration: `${damageAnimationDuration}ms`,
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
    speedY: number;
    isDead: boolean;

    constructor(props: Props) {
        super({ type: "enemy", ...props });
        this.isGoingRight = false;
        this.isDamaged = false;
        this.speedY = 0;
        this.isDead = false;
        this.currentLife = props.life;
        this.initialLife = props.life;
    }

    onEachTime(ninja: Ninja) {
        if (!this.isDead) {
            // 敵キャラ生存時の位置更新
            this.calcNextPosition(ninja);
        } else {
            // 速度から位置更新（死亡時の落下）
            this.speedY += 2;
            this.y += this.speedY;

            if (this.y > 90) {
                gameState.stageItems = gameState.stageItems.filter(
                    item => item.key !== this.key
                );
            }
        }
    }

    private calcNextPosition(ninja: Ninja) {
        // 忍者に向かって近づいてくる
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

        // 左右の向きの判定
        this.isGoingRight = dX > 0;
    }

    onTouchNinja(ninja: Ninja) {
        const ninjaDirection = this.getTargetDirection(ninja);
        if (ninjaDirection === Direction.top) {
            ninja.speedY = -8;
            ninja.y = this.y - ninja.width;

            // ダメージ時の点滅制御
            this.isDamaged = true;
            setTimeout(() => {
                this.isDamaged = false;
            }, damageAnimationDuration);

            if (--this.currentLife <= 0) {
                this.isDead = true;
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
                        transform: `scale(${this.isGoingRight ? 1 : -1}, ${
                            this.isDead ? -1 : 1
                        })`,
                    }}
                    className={this.isDamaged ? css(styles.blink) : undefined}
                />
            </div>
        );
    }
}
