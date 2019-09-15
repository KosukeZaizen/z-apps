//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/grave2.jpg';

const Stage = {};

//英雄の墓２
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockLeft(1, 17, 160, 22, 50),
        ...StageParts.getFlyingRockLeft(2, 17, 160, 56, 50),

        ...StageParts.getIceBlocks(10, [
            [-2, 3.7], [-1, 3.7], [0, 3.7], [1, 3.7], [2, 3.7], [3, 3.7], [4, 3.7], [5, 3.7], [6, 3.7], [7, 3.7],
        ], OnTouch.toBlock, Imgs.StoneBlock, 50),
    };
    return returnObjs;
}
export default Stage;