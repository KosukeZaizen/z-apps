import { StageItem } from ".";
import { gameState } from "../../GameState";
import { stageGetters } from "../../Stages";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    nextStage: number;
    nextX?: number;
    nextY?: number;
}

export class StageChanger extends StageItem {
    nextStage: number;
    nextX?: number;
    nextY?: number;

    constructor({ nextStage, nextX, nextY, ...rest }: Props) {
        super({ type: "stageChanger", zIndex: 0, ...rest });
        this.nextStage = nextStage;
        this.nextX = nextX;
        this.nextY = nextY;
    }

    onEachTime() {}

    onTouchNinja(ninja: Ninja) {
        ninja.cssAnimation = false;
        gameState.stageItems = stageGetters[this.nextStage]();

        if (typeof this.nextX === "number") {
            ninja.x = this.nextX;
        }
        if (typeof this.nextY === "number") {
            ninja.y = this.nextY;
        }
    }
}
