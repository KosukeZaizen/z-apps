import React from "react";
import { Direction, StageItem } from ".";
import { gameStorage } from "../../../../../../common/consts";
import { Ninja } from "../Ninja";

interface RockProps {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex: number;
}

export class Rock extends StageItem {
    key: string;

    constructor({ key, ...rest }: RockProps) {
        super({ type: "rock", ...rest });
        this.key = key;
    }

    renderItem(UL: number) {
        return (
            <img
                alt="rock"
                key={this.key}
                src={`${gameStorage}ninja1/objs/rock.png`}
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
            case Direction.bottom: {
                // 忍者が下にいる
                ninja.updateNinjaData({
                    ...ninja,
                    y: this.y + this.width,
                    speedY: 0,
                });
                break;
            }
            case Direction.left: {
                // 忍者が左にいる
                ninja.updateNinjaData({
                    ...ninja,
                    x: this.x - ninja.width,
                    speedX: 0,
                });
                break;
            }
            case Direction.right: {
                // 忍者が右にいる
                ninja.updateNinjaData({
                    ...ninja,
                    x: this.x + this.width,
                    speedX: 0,
                });
                break;
            }
        }
    }
}
