//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";

const Stage: any = {};
Stage.bgImg = `${gameStorage}ninja1/background/furuie5.jpg`;

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("POCHI", 10, 145, -20, null, Imgs.Pochi, 20),

        snowman: StageParts.getOnePic(
            12,
            60,
            62,
            Imgs.Snowman,
            20,
            OnTouch.toBlock
        ),

        ...StageParts.getArrowBoard(null, 7, 60, 10, true),

        leftGate: StageParts.getLeftGate(2),

        ...StageParts.getSnows(0.1, 30),
    };
};
export default Stage;
