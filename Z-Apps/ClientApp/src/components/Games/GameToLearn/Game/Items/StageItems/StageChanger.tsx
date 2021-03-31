import React from "react";
import { StageItem } from ".";
import { StageName } from "../../Stages";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    nextStage: StageName;
    nextX?: number;
    nextY?: number;
}

export class StageChanger extends StageItem {
    key: string;
    nextStage: StageName;
    nextX?: number;
    nextY?: number;

    constructor({ key, nextStage, nextX, nextY, ...rest }: Props) {
        super({ type: "stageChanger", zIndex: 0, ...rest });
        this.key = key;
        this.nextStage = nextStage;
        this.nextX = nextX;
        this.nextY = nextY;
    }

    renderItem(UL: number) {
        return (
            <div
                key={this.key}
                style={{
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    width: this.width * UL,
                }}
            />
        );
    }

    onEachTime() {}

    onTouchNinja(ninja: Ninja) {
        ninja.cssAnimation = false;
        ninja.currentStage = this.nextStage;
        if (typeof this.nextX === "number") {
            ninja.x = this.nextX;
        }
        if (typeof this.nextY === "number") {
            ninja.y = this.nextY;
        }
    }
}
