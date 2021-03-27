//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/grave3.jpg`;

const Stage: any = {};

//英雄の墓３
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        bottomFall: StageParts.getDangerousObj(1000, -70, 100),

        ...StageParts.getFlyingRockRight("toRight", 17, 67, 31, 50),
        ...StageParts.getFlyingRock("toUp", 17, 32, 47, 30),

        aoKinoko: StageParts.getOnePic(
            10,
            0,
            32,
            Imgs.AoKinoko,
            10,
            OnTouch.toAoKinoko
        ),

        obake1: StageParts.getEnemy(13, 75, 80, Imgs.Obake1, 100, 0.5, 0.5),

        ...StageParts.getBlocks(
            10,
            [
                [5, 3],
                [6, 3],
                [5, 4],
                [6, 4],

                [13, 3],
                [14, 3],
                [15, 3],
                [16, 3],
                [13, 4],
                [14, 4],
                [15, 4],
                [16, 4],
                [15, 5],
                [16, 5],
                [15, 6],
                [16, 6],
                [15, 7],
                [16, 7],

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

        rightGate: StageParts.getRightGate(18),
        topGate: StageParts.getTopGate(20, -50, null, 75),
    };
    return returnObjs;
};
export default Stage;
