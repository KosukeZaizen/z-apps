import { Direction, StageItem } from ".";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex: number;
}

export class Floor extends StageItem {
    constructor(props: Props) {
        super({ type: "floor", ...props });
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
        }
    }
}
