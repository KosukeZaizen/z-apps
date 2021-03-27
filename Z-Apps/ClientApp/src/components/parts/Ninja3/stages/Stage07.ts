//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg1 = `${gameStorage}ninja3/background/snow3.jpg`;
const bgImg2 = `${gameStorage}ninja3/background/snow3-2.jpg`;

const Stage: any = {};

Stage.getObjs = (ninja: any) => {
    Stage.windSpeed = ninja.snow ? -3.5 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        leftGate: StageParts.getLeftGate(6),
        rightGate: StageParts.getRightGate(8, -5),
    };

    if (ninja.snow) {
        //雪の時
        Stage.bgImg = bgImg1;

        returnObjs = {
            ...returnObjs,

            ...StageParts.getSoroll(
                "SHINO2",
                10,
                63,
                62,
                Imgs.Shino,
                Imgs.Shino,
                20
            ),

            ...StageParts.getFlyingRockRight(1, 17, 8, 20, 50),

            ...StageParts.getFrozenObj("oni", 22, 110, 54, Imgs.Oni),
            ...StageParts.getFrozenObj("obake1", 10, 80, 50, Imgs.Obake1),
            ...StageParts.getFrozenObj("obake2", 10, 70, 25, Imgs.Obake2),
            ...StageParts.getFrozenObj("obake3", 10, 25, 40, Imgs.Obake2),
            ...StageParts.getFrozenObj("obake4", 10, 136, 32, Imgs.Obake2),

            ...StageParts.getIceBlocks(
                10,
                [
                    [0, -3],
                    [0, -2],
                    [0, -1],
                    [0, 0],
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4],
                ],
                OnTouch.toBlock,
                Imgs.Ice,
                90
            ),

            ...StageParts.getSnows(0.15, 30),
        };
    } else {
        //雪がやんだとき
        Stage.bgImg = bgImg2;

        returnObjs = {
            ...returnObjs,

            oneEye: StageParts.getOneEye(12, 75, 5, 30),

            ...StageParts.getIceBlocks(
                10,
                [
                    [7, 2],
                    [8, 2],
                    [9, 2],
                    [10, 2],
                    [7, 3],
                    [8, 3],
                    [9, 3],
                    [10, 3],
                    [7, 4],
                    [8, 4],
                    [7, 5],
                    [8, 5],
                    [7, 6],
                    [8, 6],
                    [7, 7],
                    [8, 7],
                ],
                OnTouch.toIceBlock,
                Imgs.Ice,
                90
            ),
        };
    }
    return returnObjs;
};
export default Stage;
