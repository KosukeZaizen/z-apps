import { Item } from "../Items";
import { Rock } from "../Items/Rock";

export type Stages = { firstStage1: Item[] };

export const stages: Stages = {
    firstStage1: [new Rock({ key: "rock1", x: 135, y: 50, width: 30 })],
};
