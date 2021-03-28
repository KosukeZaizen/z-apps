import { StageItem } from "../Items/StageItems";
import { Rock } from "../Items/StageItems/Rock";

export type Stages = { firstStage1: StageItem[] };

export const stages: Stages = {
    firstStage1: [
        new Rock({ key: "rock1", x: 135, y: 50, width: 30, zIndex: 10 }),
    ],
};
