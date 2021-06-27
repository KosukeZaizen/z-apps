import { Direction, StageItem } from ".";
import { ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex: number;
    imgSrc: ImgSrc;
}

export class Block extends StageItem {
    constructor(props: Props) {
        super({ type: "block", ...props });
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
