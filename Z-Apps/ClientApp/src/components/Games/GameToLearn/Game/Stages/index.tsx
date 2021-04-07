import { gameStorage } from "../../../../../common/consts";
import { getStage1 } from "./stage1";
import { getStage2 } from "./stage2";

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

export const stageGetters = [() => [], getStage1, getStage2];
