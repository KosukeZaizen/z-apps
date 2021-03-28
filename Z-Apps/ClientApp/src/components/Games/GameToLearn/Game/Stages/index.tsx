import { StageItem } from "../Items/StageItems";
import { Floor } from "../Items/StageItems/Floor";
import { Rock } from "../Items/StageItems/Rock";

export type Stages = { firstStage1: StageItem[] };

export const stages: Stages = {
    firstStage1: [
        new Rock({ key: "rock1", x: 135, y: 50, width: 30, zIndex: 10 }),
        new Floor({ key: "floor1", x: -30, y: 75, width: 220, zIndex: 10 }),
    ],
};
