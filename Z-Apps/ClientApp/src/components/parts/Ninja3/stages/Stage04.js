//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow1.jpg';

const Stage = {};

Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = 0;//風速の最大・最小

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SHINO", 10, 110, 62, Imgs.Shino, Imgs.Shino, 20),

        ...StageParts.getSoroll("SIGN", 20, 12, 60, Imgs.Kanban1, null, 10),
        kanban1ArrowPic: StageParts.getOnePic(10, 16, 63, Imgs.Arrow1, 10, OnTouch.toNothing, true),

        rightGate: StageParts.getRightGate(6),
        leftGate: StageParts.getLeftGate(5, 145, 20),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.1, 30),
        }
    }
    return returnObjs;
}
export default Stage;