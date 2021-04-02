import React from "react";
import { timeStep } from "..";
import { appsPublicImg } from "../../../../../common/consts";
import { gameState } from "../GameState";
import { StageName } from "../Stages";
import { Renderable } from "./StageItems";

type NinjaProps = {
    x: number;
    y: number;
    speedY: number;
    speedX: number;
    width: number;
    isGoingRight: boolean;
    jumpable: boolean;
    currentStage: StageName;
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
    currentStage: StageName;
    cssAnimation: boolean;

    constructor({
        x,
        y,
        speedX,
        speedY,
        width,
        isGoingRight,
        jumpable,
        currentStage,
        cssAnimation,
    }: NinjaProps) {
        super();

        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = width;
        this.isGoingRight = isGoingRight;
        this.jumpable = jumpable;
        this.currentStage = currentStage;
        this.cssAnimation = cssAnimation;
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
