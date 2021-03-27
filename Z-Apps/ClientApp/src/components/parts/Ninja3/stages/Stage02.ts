//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";

const Stage: any = {};
Stage.bgImg = `${gameStorage}ninja1/background/town1.jpg`;

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRock(1, 17, 20, 63, 30),

        toriiPic: StageParts.getOnePic(
            120,
            35,
            3,
            Imgs.Torii,
            10,
            OnTouch.toNothing
        ),
        toriiActual: StageParts.getOnePic(
            100,
            45,
            9,
            null,
            null,
            OnTouch.toTree
        ),

        toriiFramePic: StageParts.getOnePic(
            40,
            75,
            5,
            Imgs.Frame,
            30,
            OnTouch.toNothing
        ),
        toriiMessage1: StageParts.getMessage(
            30,
            87,
            10,
            "Welcome",
            4,
            30,
            OnTouch.toNothing
        ),
        toriiMessage2: StageParts.getMessage(
            30,
            93,
            15,
            "to",
            4,
            30,
            OnTouch.toNothing
        ),
        toriiMessage3: StageParts.getMessage(
            30,
            89,
            20,
            "Japan!",
            4,
            30,
            OnTouch.toNothing
        ),

        rightGate: StageParts.getRightGate(1),
        leftGate: StageParts.getLeftGate(3),
        topGate: StageParts.getTopGate(4, -100, 0, -20),

        ...StageParts.getSnows(0.1, 30),
    };
};
export default Stage;
