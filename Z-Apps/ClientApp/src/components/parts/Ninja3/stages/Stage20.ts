//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/grave4.jpg`;

const Stage: any = {};

//半化の書
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        ...StageParts.getFlyingRock("toUp", 17, 32, 150, 30, -100),

        ...StageParts.getSoroll(
            "HANKA",
            10,
            88,
            43,
            Imgs.Scroll,
            Imgs.AoKinoko,
            22
        ),

        ...StageParts.getBlocks(
            10,
            [
                [8.4, 5.3],
                [9.4, 5.3],
            ],
            OnTouch.toBlock,
            Imgs.StoneBlock,
            50
        ),

        bottomGate: StageParts.getBottomGate(19, 200, 52),
    };
    return returnObjs;
};
export default Stage;
