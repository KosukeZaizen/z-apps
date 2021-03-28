import React from "react";
import { Direction, StageItem } from ".";
import { Ninja } from "../Ninja";

interface FloorProps {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex: number;
}

export class Floor extends StageItem {
    key: string;

    constructor({ key, ...rest }: FloorProps) {
        super({ type: "floor", ...rest });
        this.key = key;
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
        const ninjaDirection = this.getTargetDirection(ninja);
        switch (ninjaDirection) {
            case Direction.top: {
                // 忍者が上にいる
                ninja.updateNinjaData({
                    ...ninja,
                    y: this.y - ninja.width,
                    speedY: 0,
                    jumpable: true,
                });
                break;
            }
        }
    }
}
