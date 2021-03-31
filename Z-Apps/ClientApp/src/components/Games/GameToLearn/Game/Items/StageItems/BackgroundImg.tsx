import React from "react";
import { Direction, StageItem } from ".";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    src: string;
}

export class BackgroundImg extends StageItem {
    key: string;
    src: string;

    constructor({ key, src, ...rest }: Props) {
        super({
            type: "backgroundImg",
            x: 0,
            y: 0,
            zIndex: 0,
            width: 0,
            isUntouchable: true,
            ...rest,
        });
        this.key = key;
        this.src = src;
    }

    renderItem(UL: number) {
        return (
            <img
                alt={this.key}
                key={this.key}
                src={this.src}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 160 * UL,
                    height: 75 * UL,
                    objectFit: "cover",
                    zIndex: 1,
                    transition: "1s",
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
                ninja.y = this.y - ninja.width;
                ninja.speedY = 0;
                ninja.jumpable = true;
                break;
            }
            case Direction.bottom: {
                // 忍者が下にいる
                ninja.y = this.y + this.width;
                ninja.speedY = 0;
                break;
            }
            case Direction.left: {
                // 忍者が左にいる
                ninja.x = this.x - ninja.width;
                ninja.speedX = 0;
                break;
            }
            case Direction.right: {
                // 忍者が右にいる
                ninja.x = this.x + this.width;
                ninja.speedX = 0;
                break;
            }
        }
    }
}
