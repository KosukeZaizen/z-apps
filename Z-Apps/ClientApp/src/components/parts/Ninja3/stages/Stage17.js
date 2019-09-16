//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/grave1.jpg';

const Stage = {};

//英雄の墓１
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        bottomFall: StageParts.getDangerousObj(1000, -70, 100),

        ...StageParts.getFlyingRockLeft(1, 17, 96, 21, 50),
        ...StageParts.getFlyingRockLeft(2, 17, 56, 52, 50),

        ...StageParts.getIceBlocks(10, [
            [11, 2], [12, 2],
            [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],
            [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
            [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5],
            [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6],
            [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7],
        ], OnTouch.toBlock, Imgs.StoneBlock, 50),

        leftGate: StageParts.getLeftGate(18, 157, null, -9),
    };

    if (ninja.posX < 80) {
        //左から来た時
        returnObjs = {
            ...returnObjs,
            ...StageParts.getFlyingRockRight("toRight", 17, -17, 21, 30, 110),
        };
    }
    return returnObjs;
}
export default Stage;