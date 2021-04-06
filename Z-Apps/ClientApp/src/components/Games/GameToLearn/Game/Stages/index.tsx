import { gameStorage } from "../../../../../common/consts";
import { StageItem } from "../Items/StageItems";
import { BackgroundImg } from "../Items/StageItems/BackgroundImg";
import { Block } from "../Items/StageItems/Block";
import { Enemy } from "../Items/StageItems/Enemy";
import { Floor } from "../Items/StageItems/Floor";
import { SpeakingCharacter } from "../Items/StageItems/SpeakingCharacter";
import { StageChanger } from "../Items/StageItems/StageChanger";

export type StageName = "emptyStage" | "firstStage1" | "firstStage2";
export type Stages = { [key in StageName]: StageItem[] };

export const imgSrc = {
    pochi: `${gameStorage}ninja1/objs/pochi.png`,
    rock: `${gameStorage}ninja1/objs/rock.png`,
    fugu: `${gameStorage}ninja2/objs/fugu.png`,
} as const;
export type ImgSrc = typeof imgSrc[keyof typeof imgSrc];

export const backgroundSrc = {
    furuie: `${gameStorage}ninja1/background/furuie5.jpg`,
    town1: `${gameStorage}ninja1/background/town1.jpg`,
} as const;
export type BackgroundSrc = typeof backgroundSrc[keyof typeof backgroundSrc];

export const stages = {
    emptyStage: [],
    firstStage1: [
        new Enemy({
            key: "enemy1",
            imgSrc: imgSrc.fugu,
            x: 0,
            y: 0,
            width: 10,
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
            nextStage: "firstStage2",
            nextX: 150,
        }),
        new BackgroundImg({
            key: "old house",
            imgSrc: backgroundSrc.furuie,
        }),
    ],
    firstStage2: [
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
            nextStage: "firstStage1",
            nextX: 0,
        }),
        new BackgroundImg({
            key: "town1",
            imgSrc: backgroundSrc.town1,
        }),
    ],
};
