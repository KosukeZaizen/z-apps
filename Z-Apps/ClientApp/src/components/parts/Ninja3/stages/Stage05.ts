//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/cliff.jpg`;

const Stage: any = {};

Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 2.5 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        rock1Pic: StageParts.getOnePic(
            60,
            135,
            30,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock1Actual: StageParts.getOnePic(
            60,
            135,
            33,
            null,
            null,
            OnTouch.toBlock
        ),

        rock2Pic: StageParts.getOnePic(
            50,
            -20,
            65,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock2Actual: StageParts.getOnePic(
            50,
            -20,
            68,
            null,
            null,
            OnTouch.toBlock
        ),

        rock3Pic: StageParts.getOnePic(
            50,
            -65,
            65,
            Imgs.RockR,
            20,
            OnTouch.toNothing
        ),
        rock3Actual: StageParts.getOnePic(
            50,
            -65,
            68,
            null,
            null,
            OnTouch.toBlock
        ),

        bottomFall: StageParts.getDangerousObj(1000, -70, 100),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            rightGate: StageParts.getRightGate(4, 1, 75 - ninja.size),
            ...StageParts.getSnows(0.15, 30),
        };
    } else {
        returnObjs = {
            ...returnObjs,
            boss: StageParts.getBoss(),
            leftGate: StageParts.getLeftGate(22),
        };
    }
    return returnObjs;
};
export default Stage;
