import React from "react";
import { timeStep } from "..";
import { appsPublicImg } from "../../../../../common/consts";
import { gameState } from "../GameState";
import { Renderable } from "./StageItems";

type NinjaProps = {
    x: number;
    y: number;
    speedY: number;
    speedX: number;
    width: number;
    isGoingRight: boolean;
    jumpable: boolean;
    cssAnimation: boolean;
};

export class Ninja extends Renderable {
    x: number;
    y: number;
    speedY: number;
    speedX: number;
    width: number;
    isGoingRight: boolean;
    jumpable: boolean;
    cssAnimation: boolean;

    constructor(props: NinjaProps) {
        super();

        this.x = props.x;
        this.y = props.y;
        this.speedX = props.speedX;
        this.speedY = props.speedY;
        this.width = props.width;
        this.isGoingRight = props.isGoingRight;
        this.jumpable = props.jumpable;
        this.cssAnimation = props.cssAnimation;
    }

    calcNextNinjaPosition() {
        const {
            isLeftButtonClicked,
            isRightButtonClicked,
            isJumpButtonClicked,
        } = gameState.controller;

        // 忍者の位置更新
        if (isLeftButtonClicked) {
            this.isGoingRight = false;
            this.x -= 2;
        }
        if (isRightButtonClicked) {
            this.isGoingRight = true;
            this.x += 2;
        }
        if (isJumpButtonClicked && this.jumpable) {
            this.speedY -= 7;
        }

        // 重力
        this.speedY += 1;

        // 速度から位置更新
        this.x += this.speedX;
        this.y += this.speedY;

        // 他のItemから影響を受けた状態をタイムステップ毎にリセットする
        this.jumpable = false; // 床
        this.cssAnimation = true; // StageChanger
    }

    renderItem(UL: number) {
        const transitionStyle = this.cssAnimation
            ? {
                  transition: `${timeStep}ms`,
                  transitionProperty: "top, left",
                  transitionTimingFunction: "linear",
              }
            : {};

        return (
            UL && (
                <img
                    key="Japanese running ninja"
                    alt="Japanese running ninja"
                    src={`${appsPublicImg}ninja_hashiru.png`}
                    style={{
                        width: this.width * UL,
                        position: "absolute",
                        top: this.y * UL,
                        left: this.x * UL,
                        zIndex: 10,
                        transform: this.isGoingRight
                            ? "scale(-1, 1)"
                            : undefined,
                        ...transitionStyle,
                    }}
                />
            )
        );
    }
}
