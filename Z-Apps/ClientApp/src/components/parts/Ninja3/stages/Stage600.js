//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow2.jpg';

const Stage = {};
Stage.bgImg = bgImg;
Stage.windSpeed = -1;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("MONK", 24, 120, 54, Imgs.Monk, null, 20),

        ...StageParts.getIceBlocks(10, [
            [15, -1],
            [15, 0],
            [15, 1],
            [15, 2],
            [5, 3], [6, 3], [7, 3],[15, 3],
            [4, 4], [5, 4], [6, 4], [7, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
            [3, 5], [4, 5], [5, 5],
        ], OnTouch.toBlock, Imgs.Ice, 30, 0.7),

        ...StageParts.getFlyingRock(1, 34, 78, 46, 30, -35),

        leftGate: StageParts.getLeftGate(400),
        rightGate: StageParts.getRightGate(700, 1, 63),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;