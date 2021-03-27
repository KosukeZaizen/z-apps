//タイムステップごとの処理
import { gameStorage } from "../../../../common/consts";
import * as EachTime from "../EachTime";
//各オブジェクト用画像の読み込み
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/washitsu.jpg`;

const Stage: any = {};

//仙人の家（室内）
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        sapphire: StageParts.getOnePic(
            25,
            69,
            3,
            Imgs.Sapphire,
            10,
            OnTouch.toNothing
        ),

        ...StageParts.getSoroll(
            "MELT",
            10,
            3,
            65,
            Imgs.Scroll,
            Imgs.IceStone,
            22
        ),

        ...StageParts.getIceBlocks(
            10,
            [
                [-2, 0],
                [-1, 0],
                [0, 0],
                [1, 0],
                [2, 0],
                [-2, 1],
                [-1, 1],
                [0, 1],
                [1, 1],
                [2, 1],
                [-2, 2],
                [-1, 2],
                [0, 2],
                [1, 2],
                [2, 2],
                [-2, 3],
                [-1, 3],
                [0, 3],
                [1, 3],
                [2, 3],
                [-2, 4],
                [-1, 4],
                [0, 4],
                [1, 4],
                [2, 4],
                [-2, 5],
                [-1, 5],
                [0, 5],
                [1, 5],
                [2, 5],
                [2, 6],
            ],
            OnTouch.toIceBlock,
            Imgs.Ice,
            90
        ),

        rightGate: StageParts.getRightGate(9, 106, 75 - ninja.size),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll(
                "SENNIN",
                14,
                50,
                60,
                Imgs.Sennin,
                Imgs.Sennin,
                20
            ),

            iceBlockSnow: {
                size: 10,
                posX: 20,
                posY: 70,
                zIndex: 90,
                img: Imgs.Ice,
                onTouch: OnTouch.toIceBlock,
                eachTime: EachTime.IceBlock,
            },

            ...StageParts.getSnows(0.1, 30, true),
        };
    }
    return returnObjs;
};
export default Stage;
