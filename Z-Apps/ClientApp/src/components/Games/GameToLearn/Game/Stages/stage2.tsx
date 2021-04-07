import { backgroundSrc, imgSrc } from ".";
import { BackgroundImg } from "../Items/StageItems/BackgroundImg";
import { Block } from "../Items/StageItems/Block";
import { Floor } from "../Items/StageItems/Floor";
import { StageChanger } from "../Items/StageItems/StageChanger";

export function getStage2() {
    return [
        new Block({
            key: "rock3",
            x: 45,
            y: 50,
            width: 30,
            zIndex: 10,
            imgSrc: imgSrc.rock,
        }),
        new Floor({ key: "floor2", x: -50, y: 75, width: 260, zIndex: 10 }),
        new StageChanger({
            key: "stageChanger2",
            x: 180,
            y: 0,
            width: 90,
            nextStage: 1,
            nextX: 0,
        }),
        new BackgroundImg({
            key: "town1",
            imgSrc: backgroundSrc.town1,
        }),
    ];
}
