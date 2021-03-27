//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";

//背景画像
const bgImg1 = `${gameStorage}ninja3/background/snow4.jpg`;
const bgImg2 = `${gameStorage}ninja3/background/snow4-2.jpg`;

const Stage: any = {};

Stage.getObjs = (ninja: any) => {
    Stage.windSpeed = ninja.snow ? -3.2 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        leftGate: StageParts.getLeftGate(7, null, null, -9),
        rightGate: StageParts.getRightGate(9, -8),
    };

    if (ninja.snow) {
        //雪の時
        Stage.bgImg = bgImg1;

        returnObjs = {
            ...returnObjs,
            ...StageParts.getFrozenObj("obake1", 10, 55, 43, Imgs.Obake1),
            ...StageParts.getFrozenObj("obake2", 10, 40, 35, Imgs.Obake2),
            ...StageParts.getFrozenObj("obake3", 10, 25, 34, Imgs.Obake1),
            ...StageParts.getFrozenObj("obake4", 10, 122, 44, Imgs.Obake2, 11),
            ...StageParts.getFrozenObj("obake5", 10, 140, 24, Imgs.Obake1),
            ...StageParts.getFrozenObj("obake6", 10, 87, 65, Imgs.Obake2),
            ...StageParts.getFrozenObj("obake7", 13, 110, 30, Imgs.Shinigami),

            ...StageParts.getFrozenObj("oni1", 26, 98, 50, Imgs.Oni, 9),
            ...StageParts.getFrozenObj("oni2", 22, 125, 54, Imgs.Oni),
            ...StageParts.getFrozenObj("oni3", 12, 60, 64, Imgs.Oni),
            ...StageParts.getFrozenObj("oni5", 12, 10, 64, Imgs.Oni),
            ...StageParts.getFrozenObj("oni6", 24, 73, 52, Imgs.Shinigami, 9),
            ...StageParts.getFrozenObj("oni7", 32, 20, 44, Imgs.Oni, 9),

            ...StageParts.getSnows(0.15, 30),
        };
        if (ninja.posX < 80) {
            //左から来た時
            returnObjs = {
                ...returnObjs,
                ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),
            };
        }
    } else {
        //雪がやんだとき
        Stage.bgImg = bgImg2;

        returnObjs = {
            ...returnObjs,
            oni1: StageParts.getEnemy(15, 65, 61, Imgs.Oni, 100, 0.4, 0),
            oni2: StageParts.getEnemy(20, 55, 56, Imgs.Oni, 100, 0.35, 0),
            oni3: StageParts.getEnemy(13, 45, 63, Imgs.Oni, 100, 0.5, 0),

            obake2: StageParts.getEnemy(
                30,
                65,
                -20,
                Imgs.Obake2,
                100,
                0.4,
                0.4
            ),
        };
    }
    return returnObjs;
};
export default Stage;
