//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/grave5.jpg`;

const Stage: any = {};

//踏みつけの書
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll(
            "HUMITSUKE",
            10,
            67,
            59,
            Imgs.Scroll,
            Imgs.Hige,
            22
        ),
        stopSnow: StageParts.getOnePic(10, 67, 59, null, 0, OnTouch.toStopSnow),

        akaKinoko: StageParts.getOnePic(
            20,
            61,
            62,
            Imgs.AkaKinoko,
            10,
            OnTouch.toAkaKinoko
        ),

        ...StageParts.getFlyingRock("toUp", 17, 8, 62, 30),

        topGate: StageParts.getTopGate(15, -50, 57, 63, true),
        leftGate: StageParts.getLeftGate(15, 125, 63, -9),
    };
    return returnObjs;
};
export default Stage;
