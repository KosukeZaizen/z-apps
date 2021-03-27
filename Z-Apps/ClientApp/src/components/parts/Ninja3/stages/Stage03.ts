//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";

const Stage: any = {};
Stage.bgImg = `${gameStorage}ninja1/background/ryokan1.jpg`;

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll(
            "POCHI2",
            10,
            50,
            62,
            Imgs.Pochi,
            Imgs.Pochi,
            20
        ),

        butsudan: StageParts.getOnePic(
            40,
            5,
            32,
            Imgs.Butsudan,
            20,
            OnTouch.toTree
        ),

        ...StageParts.getSoroll("TOBIISHI", 10, 19, 42, Imgs.Scroll, null, 22),

        rightGate: StageParts.getRightGate(2),
    };
};
export default Stage;
