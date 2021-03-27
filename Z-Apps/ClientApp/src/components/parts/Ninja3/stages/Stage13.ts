//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/tengumura4.jpg`;

const Stage: any = {};

//キノコ村　流れ出る温泉
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 1 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        rock1Pic: StageParts.getOnePic(
            50,
            113,
            63,
            Imgs.RockR,
            60,
            OnTouch.toNothing
        ),
        rock1Actual: StageParts.getOnePic(
            50,
            113,
            66,
            null,
            null,
            OnTouch.toBlock
        ),

        rock2Pic: StageParts.getOnePic(
            50,
            138,
            63,
            Imgs.RockR,
            60,
            OnTouch.toNothing
        ),
        rock2Actual: StageParts.getOnePic(
            50,
            138,
            66,
            null,
            null,
            OnTouch.toBlock
        ),

        rock0: StageParts.getOnePic(
            40,
            140,
            48,
            Imgs.Rock,
            10,
            OnTouch.toNothing,
            true
        ),

        ...StageParts.getBlocks(
            12,
            [
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

        rightGate: StageParts.getRightGate(14, null, 63),
        leftGate: StageParts.getLeftGate(12),
    };

    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll(
                "OLD",
                16,
                120,
                49,
                Imgs.OldWoman,
                Imgs.OldWoman,
                20
            ),

            ...StageParts.getSnows(0.1, 30),
        };
    } else {
        returnObjs = {
            ...returnObjs,
            oni1: StageParts.getEnemy(17, 65, 56, Imgs.Oni, 40, 0.5, 0),
            oni2: StageParts.getEnemy(20, 45, 53, Imgs.Oni, 40, 0.4, 0),
        };
    }
    return returnObjs;
};
export default Stage;
