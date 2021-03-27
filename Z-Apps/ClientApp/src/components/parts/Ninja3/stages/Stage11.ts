//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/tengumura2.jpg`;

const Stage: any = {};

//キノコ村　街中１
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 1 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        rightGate: StageParts.getRightGate(12),
        leftGate: StageParts.getLeftGate(10),
    };

    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll(
                "SHINO3",
                10,
                47,
                62,
                Imgs.Shino,
                Imgs.Shino,
                20
            ),

            ...StageParts.getSnows(0.1, 30),
        };
    } else {
        //雪がやんだとき
        returnObjs = {
            ...returnObjs,
            shinigami: StageParts.getEnemy(
                16,
                65,
                45,
                Imgs.Shinigami,
                100,
                0.4,
                0.4
            ),
        };
    }
    return returnObjs;
};
export default Stage;
