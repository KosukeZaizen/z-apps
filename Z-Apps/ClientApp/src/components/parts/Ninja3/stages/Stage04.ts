//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/snow1.jpg`;

const Stage: any = {};

Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = 0; //風速の最大・最小

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SIGN", 20, 12, 60, Imgs.Kanban1, null, 10),
        kanban1ArrowPic: StageParts.getOnePic(
            10,
            16,
            63,
            Imgs.Arrow1,
            10,
            OnTouch.toNothing,
            true
        ),

        rightGate: StageParts.getRightGate(6),
        leftGate: StageParts.getLeftGate(5, 145, 32 - ninja.size),
    };

    if (ninja.snow) {
        //雪の時
        returnObjs = {
            ...returnObjs,

            ...StageParts.getSoroll(
                "SHINO",
                10,
                110,
                62,
                Imgs.Shino,
                Imgs.Shino,
                20
            ),
            ...StageParts.getFrozenObj("kinoko", 10, 61, 67, Imgs.AkaKinoko),

            ...StageParts.getSnows(0.1, 30),
        };
    } else {
        //雪がやんだとき
        returnObjs = {
            ...returnObjs,
            akaKinoko: StageParts.getOnePic(
                10,
                61,
                67,
                Imgs.AkaKinoko,
                10,
                OnTouch.toAkaKinoko
            ),
            ...StageParts.getSoroll(
                "SHINO4",
                10,
                110,
                62,
                Imgs.Shino,
                Imgs.Shino,
                20
            ),
        };
    }
    return returnObjs;
};
export default Stage;
