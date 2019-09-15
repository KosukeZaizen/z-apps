//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow2.jpg';

const Stage = {};

//修行僧がいる雪道
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? -1 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("MONK", 17, 122, 58, Imgs.Monk, Imgs.Monk, 20),

        ...StageParts.getIceBlocks(10, [
            [15, -7],
            [15, -6],
            [15, -5],
            [15, -4],
            [15, -3],
            [15, -2],
            [15, -1],
            [15, 0],
            [15, 1],
            [15, 2],
            [5, 3], [6, 3], [7, 3], [15, 3],
            [4, 4], [5, 4], [6, 4], [7, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
            [3, 5], [4, 5], [5, 5],
        ], OnTouch.toBlock, Imgs.Ice, 30, 0.7),

        ...StageParts.getFlyingRock(1, 34, 78, 46, 30, -50),

        leftGate: StageParts.getLeftGate(4),
        rightGate: StageParts.getRightGate(7, 1, 63),
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