//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/grave3.jpg';

const Stage = {};

//英雄の墓２
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockRight("toRight", 17, 77, 21, 50),

        ...StageParts.getIceBlocks(10, [
            [5, 2],[6, 2], [7, 2],
            [5, 3],[6, 3], [7, 3],
            [13, 3.7], [14, 3.7], [15, 3.7], [16, 3.7],
            [-2, 4], [-1, 4], [0, 4],
            [-2, 5], [-1, 5], [0, 5],
            [-2, 6], [-1, 6], [0, 6], [3, 6], [4, 6],
            [-2, 7], [-1, 7], [0, 7], [3, 7], [4, 7],
        ], OnTouch.toBlock, Imgs.StoneBlock, 50),

        rightGate: StageParts.getRightGate(18),
    };
    return returnObjs;
}
export default Stage;