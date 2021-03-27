//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/last.jpg`;

const Stage: any = {};

//クリア後
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll(
            "SENNIN3",
            15,
            45,
            55,
            Imgs.Sennin,
            Imgs.Sennin,
            22,
            false,
            true
        ),

        rock00Pic: StageParts.getOnePic(
            50,
            155,
            68,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock00Actual: StageParts.getOnePic(
            50,
            155,
            71,
            null,
            null,
            OnTouch.toBlock
        ),

        rock0Pic: StageParts.getOnePic(
            50,
            110,
            68,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock0Actual: StageParts.getOnePic(
            50,
            110,
            71,
            null,
            null,
            OnTouch.toBlock
        ),

        rock1Pic: StageParts.getOnePic(
            50,
            65,
            68,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock1Actual: StageParts.getOnePic(
            50,
            65,
            71,
            null,
            null,
            OnTouch.toBlock
        ),

        rock2Pic: StageParts.getOnePic(
            50,
            20,
            68,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock2Actual: StageParts.getOnePic(
            50,
            20,
            71,
            null,
            null,
            OnTouch.toBlock
        ),

        rock3Pic: StageParts.getOnePic(
            50,
            -25,
            68,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock3Actual: StageParts.getOnePic(
            50,
            -25,
            71,
            null,
            null,
            OnTouch.toBlock
        ),
    };
    return returnObjs;
};
export default Stage;
