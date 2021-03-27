//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/tengumura3.jpg`;

const Stage: any = {};

//キノコ村　街中２
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 1 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        aoKinoko: StageParts.getOnePic(
            10,
            127,
            28,
            Imgs.AoKinoko,
            10,
            OnTouch.toAoKinoko
        ),

        rockPic: StageParts.getOnePic(
            50,
            -17,
            59,
            Imgs.RockR,
            60,
            OnTouch.toNothing
        ),
        rockActual: StageParts.getOnePic(
            50,
            -17,
            62,
            null,
            null,
            OnTouch.toBlock
        ),

        rock2Pic: StageParts.getOnePic(
            50,
            8,
            59,
            Imgs.RockR,
            60,
            OnTouch.toNothing
        ),
        rock2Actual: StageParts.getOnePic(
            50,
            8,
            62,
            null,
            null,
            OnTouch.toBlock
        ),

        ...StageParts.getBlocks(
            12,
            [
                [10, 3],
                [11, 3],
                [-2, 6],
                [-1, 6],
                [0, 6],
                [1, 6],
                [2, 6],
                [3, 6],
                [4, 6],
                [5, 6],
                [6, 6],
                [7, 6],
                [8, 6],
                [9, 6],
                [10, 6],
                [11, 6],
                [12, 6],
                [13, 6],
                [14, 6],
            ],
            OnTouch.toBlock,
            Imgs.Block,
            50
        ),

        rightGate: StageParts.getRightGate(13),
        leftGate: StageParts.getLeftGate(11, null, 75 - ninja.size),
    };

    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll(
                "GIRL1",
                18,
                95,
                51,
                Imgs.Girl1,
                Imgs.Girl1,
                20
            ),

            ...StageParts.getSnows(0.1, 30),
        };
    } else {
        //雪がやんだとき
        returnObjs = {
            ...returnObjs,
            obake1: StageParts.getEnemy(13, 65, 20, Imgs.Obake2, 100, 0.5, 0.5),
        };
    }
    return returnObjs;
};
export default Stage;
