//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//背景画像
import bgImg from '../img/background/cliff.jpg';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';

const Stage = {};

Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 2.5 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        snowman: StageParts.getStageChangeSnowman(12, 30, 55, 5),

        rock1Pic: StageParts.getOnePic(60, 135, 30, Imgs.RockR, 20, OnTouch.toNothing),
        rock1Actual: StageParts.getOnePic(60, 135, 33, null, null, OnTouch.toBlock),

        rock2Pic: StageParts.getOnePic(50, 20, 65, Imgs.RockR, 20, OnTouch.toNothing),
        rock2Actual: StageParts.getOnePic(50, 20, 68, null, null, OnTouch.toBlock),

        rock3Pic: StageParts.getOnePic(50, -25, 65, Imgs.RockR, 20, OnTouch.toNothing),
        rock3Actual: StageParts.getOnePic(50, -25, 68, null, null, OnTouch.toBlock),

        rightGate: StageParts.getRightGate(4, 1, 63),
        bottomFall: StageParts.getDangerousObj(1000, -70, 100),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.15, 30),
        }
    }
    return returnObjs;
}
export default Stage;