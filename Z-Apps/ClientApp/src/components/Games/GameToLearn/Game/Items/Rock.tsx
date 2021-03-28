import React from "react";
import { Direction, Item } from ".";
import { gameStorage } from "../../../../../common/consts";
import { Ninja } from "../Ninja";

interface RockProps {
    key: string;
    x: number;
    y: number;
    width: number;
}

export class Rock extends Item {
    key: string;

    constructor({ key, x, y, width }: RockProps) {
        super({ type: "rock", x, y, width });
        this.key = key;
    }

    getItem(UL: number) {
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

    onTouchNinja(ninja: Ninja): Ninja {
        const ninjaDirection = this.getTargetDirection(ninja);
        switch (ninjaDirection) {
            case Direction.top: {
                // 忍者が上にいる
                return { ...ninja, y: this.y - ninja.width };
            }
            case Direction.bottom: {
                // 忍者が下にいる
                return { ...ninja, y: this.y + this.width };
            }
            case Direction.left: {
                // 忍者が左にいる
                return { ...ninja, x: this.x - ninja.width };
            }
            case Direction.right: {
                // 忍者が右にいる
                return { ...ninja, x: this.x + this.width };
            }
            default: {
                return ninja;
            }
        }
    }
}
