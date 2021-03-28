import { StageItem } from "../Items/StageItems";
import { Floor } from "../Items/StageItems/Floor";
import { Rock } from "../Items/StageItems/Rock";
import { StageChanger } from "../Items/StageItems/StageChanger";

export type StageName = "emptyStage" | "firstStage1" | "firstStage2";
export type Stages = { [key in StageName]: StageItem[] };

export const stages = {
    emptyStage: [],
    firstStage1: [
        new Rock({ key: "rock1", x: 135, y: 50, width: 30, zIndex: 10 }),
        new Floor({ key: "floor1", x: -50, y: 75, width: 260, zIndex: 10 }),
        new StageChanger({
            key: "stageChanger1",
            x: -110,
            y: 0,
            width: 90,
            zIndex: 10,
            nextStage: "firstStage2",
            nextX: 150,
        }),
    ],
    firstStage2: [
        new Rock({ key: "rock2", x: 45, y: 50, width: 30, zIndex: 10 }),
        new Floor({ key: "floor2", x: -50, y: 75, width: 260, zIndex: 10 }),
    ],
};
