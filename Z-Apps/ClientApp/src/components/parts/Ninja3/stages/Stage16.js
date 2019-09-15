//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/washitsu.jpg';

const Stage = {};

//仙人の家（室内）
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SENNIN", 14, 50, 60, Imgs.Sennin, Imgs.Sennin, 20),
        sapphire: StageParts.getOnePic(25, 69, 5, Imgs.Sapphire, 10, OnTouch.toNothing),

        leftGate: StageParts.getLeftGate(14),
        topGate: StageParts.getTopGate(9, -100, 62, 10),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.1, 30, true),
        }
    }
    return returnObjs;
}
export default Stage;