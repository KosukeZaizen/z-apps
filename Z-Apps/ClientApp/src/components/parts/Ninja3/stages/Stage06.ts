//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg1 = `${gameStorage}ninja3/background/snow2.jpg`;
const bgImg2 = `${gameStorage}ninja3/background/snow2-2.jpg`;

const Stage: any = {};

//修行僧がいる雪道
Stage.getObjs = (ninja: any) => {
    Stage.windSpeed = ninja.snow ? -1 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        leftGate: StageParts.getLeftGate(4),
        rightGate: StageParts.getRightGate(7, 1, 75 - ninja.size),
    };

    if (ninja.snow) {
        //雪の時
        Stage.bgImg = bgImg1;

        returnObjs = {
            ...returnObjs,

            ...StageParts.getSoroll(
                "MONK",
                17,
                122,
                58,
                Imgs.Monk,
                Imgs.Monk,
                20
            ),

            ...StageParts.getIceBlocks(
                10,
                [
                    [15, -7],
                    [15, -6],
                    [15, -5],
                    [15, -4],
                    [15, -3],
                    [15, -2],
                    [15, -1],
                    [15, 0],
                    [15, 1],
                    [15, 2],
                    [5, 3],
                    [6, 3],
                    [7, 3],
                    [15, 3],
                    [4, 4],
                    [5, 4],
                    [6, 4],
                    [7, 4],
                    [11, 4],
                    [12, 4],
                    [13, 4],
                    [14, 4],
                    [15, 4],
                    [16, 4],
                    [3, 5],
                    [4, 5],
                    [5, 5],
                ],
                OnTouch.toBlock,
                Imgs.Ice,
                30,
                0.7
            ),

            ...StageParts.getFlyingRock(1, 34, 78, 46, 30, -50),

            ...StageParts.getSnows(0.15, 30),
        };
    } else {
        //雪がやんだとき
        Stage.bgImg = bgImg2;

        returnObjs = {
            ...returnObjs,
            oni1: StageParts.getEnemy(67, 20, 11, Imgs.Oni, 100, 0.2, 0),
            obake1: StageParts.getEnemy(16, 35, 65, Imgs.Obake1, 101, 0.4, 0.4),
            obake2: StageParts.getEnemy(13, 20, 15, Imgs.Obake2, 102, 0.4, 0.4),
            obake3: StageParts.getEnemy(10, 22, 35, Imgs.Obake2, 102, 0.3, 0.3),

            ...StageParts.getFlyingRock(1, 20, 120, 60, 30, -50),
        };
    }
    return returnObjs;
};
export default Stage;
