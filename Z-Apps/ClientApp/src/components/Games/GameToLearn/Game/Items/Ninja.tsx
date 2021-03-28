import React from "react";
import { timeStep } from "..";
import { appsPublicImg } from "../../../../../common/consts";
import { Renderable } from "./StageItems";

const ninjaUrl = `${appsPublicImg}ninja_hashiru.png`;

type NinjaProps = Omit<
    Ninja,
    "renderItem" | "updateNinjaData" | "calcNextNinjaPosition"
>;

export class Ninja extends Renderable {
    x: number;
    y: number;
    speedY: number;
    width: number;

    constructor({ x, y, speedY, width }: NinjaProps) {
        super();

        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.width = width;
    }

    updateNinjaData({ x, y, speedY, width }: NinjaProps) {
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.width = width;
    }

    calcNextNinjaPosition({
        isLeftButtonClicked,
        isRightButtonClicked,
        isJumpButtonClicked,
    }: {
        isLeftButtonClicked: boolean;
        isRightButtonClicked: boolean;
        isJumpButtonClicked: boolean;
    }) {
        // 忍者の位置更新
        if (isLeftButtonClicked) {
            this.x -= 3;
        }
        if (isRightButtonClicked) {
            this.x += 3;
        }
        if (isJumpButtonClicked) {
            this.speedY -= 10;
        }

        // 重力
        this.speedY += 2;

        // 速度から位置更新
        this.y += this.speedY;
    }

    renderItem(UL: number) {
        return (
            <img
                key="Japanese running ninja"
                alt="Japanese running ninja"
                src={ninjaUrl}
                style={{
                    width: this.width * UL,
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    transition: `${timeStep}ms`,
                    transitionProperty: "top left",
                    transitionTimingFunction: "linear",
                    zIndex: 10,
                }}
            />
        );
    }
}
