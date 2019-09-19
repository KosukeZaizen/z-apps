//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/tengumura3.jpg';

const Stage = {};

//天狗村　街中２
Stage.getObjs = (ninja) => {

    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        rockPic: StageParts.getOnePic(50, -17, 59, Imgs.RockR, 60, OnTouch.toNothing),
        rockActual: StageParts.getOnePic(50, -17, 62, null, null, OnTouch.toBlock),

        rock2Pic: StageParts.getOnePic(50, 8, 59, Imgs.RockR, 60, OnTouch.toNothing),
        rock2Actual: StageParts.getOnePic(50, 8, 62, null, null, OnTouch.toBlock),

        ...StageParts.getIceBlocks(12, [
            [-2, 6], [-1, 6], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
        ], OnTouch.toBlock, Imgs.Block, 50),

        rightGate: StageParts.getRightGate(13),
        leftGate: StageParts.getLeftGate(11, null, 63),
    };

    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll("GIRL1", 18, 95, 51, Imgs.Girl1, Imgs.Girl1, 20),
            ...StageParts.getSoroll("GIRL2", 15, 115, 56, Imgs.Girl2, Imgs.Girl2, 20),

            ...StageParts.getSnows(0.1, 30),
        }
    }
    return returnObjs;
}
export default Stage;