//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/grave2.jpg`;

const Stage: any = {};

//英雄の墓２
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        ...StageParts.getFlyingRockRight("toRight", 17, 77, 21, 50),

        downArrow: StageParts.getOnePic(
            15,
            9,
            52,
            Imgs.DownArrow,
            10,
            OnTouch.toNothing
        ),

        ...StageParts.getBlocks(
            10,
            [
                [5, 2],
                [6, 2],
                [7, 2],
                [-2, 3],
                [-1, 3],
                [0, 3],
                [1, 3],
                [2, 3],
                [3, 3],
                [4, 3],
                [5, 3],
                [6, 3],
                [7, 3],
                [-2, 3.7],
                [-1, 3.7],
                [0, 3.7],
                [1, 3.7],
                [2, 3.7],
                [3, 3.7],
                [4, 3.7],
                [5, 3.7],
                [6, 3.7],
                [7, 3.7],
                [-2, 4],
                [-1, 4],
                [0, 4],
                [-2, 5],
                [-1, 5],
                [0, 5],
                [-2, 6],
                [-1, 6],
                [0, 6],
                [3, 6],
                [4, 6],
                [-2, 7],
                [-1, 7],
                [0, 7],
                [3, 7],
                [4, 7],
            ],
            OnTouch.toBlock,
            Imgs.StoneBlock,
            50
        ),

        rightGate: StageParts.getRightGate(17, -8, null, 9),
        leftGate: StageParts.getLeftGate(19),
        gateToLastRoom: StageParts.getDoor(
            22,
            9,
            80,
            null,
            10,
            21,
            145,
            -10,
            true
        ),
        bottomGate: null,
    };

    if (ninja.posX > 80) {
        //左から来た時
        returnObjs = {
            ...returnObjs,
            ...StageParts.getFlyingRockLeft(1, 17, 160, 21, 30, 55),
            ...StageParts.getFlyingRockLeft(2, 17, 160, 52, 30),
            bottomGate: StageParts.getBottomGate(17, 90, 115, -12, true) as any,
        };
    } else {
        returnObjs = {
            ...returnObjs,
            bottomGate: StageParts.getBottomGate(18, 90, 0, 0) as any,
        };
    }
    return returnObjs;
};
export default Stage;
