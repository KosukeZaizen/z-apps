import React from "react";
import { Direction, StageItem } from ".";
import { gameStorage } from "../../../../../common/consts";
import { Ninja } from "../Ninja";

interface RockProps {
    key: string;
    x: number;
    y: number;
    width: number;
}

export class Rock extends StageItem {
    key: string;

    constructor({ key, x, y, width }: RockProps) {
        super({ type: "rock", x, y, width });
        this.key = key;
    }

    renderItem(UL: number) {
        return (
            <img
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
                });
                break;
            }
            case Direction.bottom: {
                // 忍者が下にいる
                ninja.updateNinjaData({ ...ninja, y: this.y + this.width });
                break;
            }
            case Direction.left: {
                // 忍者が左にいる
                ninja.updateNinjaData({ ...ninja, x: this.x - ninja.width });
                break;
            }
            case Direction.right: {
                // 忍者が右にいる
                ninja.updateNinjaData({ ...ninja, x: this.x + this.width });
                break;
            }
        }
    }
}
