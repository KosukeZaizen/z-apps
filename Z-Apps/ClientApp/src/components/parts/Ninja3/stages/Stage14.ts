//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/tengumura5.jpg`;

const Stage: any = {};

//墓場への階段
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 1 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getArrowBoard(null, 25, 60, 10),

        rightGate: StageParts.getRightGate(15),
        leftGate: StageParts.getLeftGate(13),
    };

    if (ninja.snow) {
        //雪が降っている
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.1, 30),
        };
    } else {
        //雪がやんだ
        returnObjs = {
            ...returnObjs,
            obake1: StageParts.getEnemy(13, 65, 50, Imgs.Obake2, 100, 0.5, 0.5),
        };
    }
    return returnObjs;
};
export default Stage;
