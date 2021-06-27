import { backgroundSrc, imgSrc } from ".";
import { BackgroundImg } from "../Items/StageItems/BackgroundImg";
import { Block } from "../Items/StageItems/Block";
import { Enemy } from "../Items/StageItems/Enemy";
import { Floor } from "../Items/StageItems/Floor";
import { SpeakingCharacter } from "../Items/StageItems/SpeakingCharacter";
import { StageChanger } from "../Items/StageItems/StageChanger";

export function getStage1() {
    return [
        new Enemy({
            key: "enemy1",
            imgSrc: imgSrc.fugu,
            x: 0,
            y: 0,
            width: 10,
            life: 2,
        }),
        new SpeakingCharacter({
            key: "pochi",
            imgSrc: imgSrc.pochi,
            x: 40,
            y: 62,
            width: 10,
        }),
        new Block({
            key: "rock1",
            x: 135,
            y: 50,
            width: 30,
            zIndex: 10,
            imgSrc: imgSrc.rock,
        }),
        new Block({
            key: "rock2",
            x: 15,
            y: 65,
            width: 13,
            zIndex: 10,
            imgSrc: imgSrc.rock,
        }),
        new Floor({ key: "floor1", x: -50, y: 75, width: 260, zIndex: 10 }),
        new StageChanger({
            key: "stageChanger1",
            x: -110,
            y: 0,
            width: 90,
            nextStage: 2,
            nextX: 150,
        }),
        new BackgroundImg({
            key: "old house",
            imgSrc: backgroundSrc.furuie,
        }),
    ];
}
