//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/tengumura6.jpg';

const Stage = {};

//英雄の墓
Stage.getObjs = (ninja) => {

    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        ...StageParts.getFlyingRock(2, 30, 100, 48, 30, null, Imgs.Grave),

        ...StageParts.getSoroll("SIGN3", 15, 70, 60, Imgs.Kanban1, null, 20),

        ...StageParts.getIceBlocks(10, [
            [-2, 7.3], [-1, 7.3], [0, 7.3], [1, 7.3], [2, 7.3], [3, 7.3], [4, 7.3], [5, 7.3], [6, 7.3], [7, 7.3], [8, 7.3], [9, 7.3],
            [9.3, 7.3], [12.7, 7.3],
            [13, 7.3], [14, 7.3], [15, 7.3], [16, 7.3],
        ], OnTouch.toBlock, Imgs.Block, 50),

        leftGate: StageParts.getLeftGate(14),
        topGate: StageParts.getTopGate(9, -100, 62, 10),
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