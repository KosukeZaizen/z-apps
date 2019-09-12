//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow3.jpg';

const Stage = {};
Stage.bgImg = bgImg;
Stage.windSpeed = -3.5;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SHINO2", 10, 63, 62, Imgs.Shino, Imgs.Shino, 20),

        oni: StageParts.getOnePic(22, 110, 54, Imgs.Oni, 10, OnTouch.toNothing),
        oniIce1: StageParts.getOnePic(22, 110, 54, Imgs.Ice, 9, OnTouch.toBlock, false, 0.8),
        oniIce2: StageParts.getOnePic(22, 110, 54, Imgs.Ice, 40, OnTouch.toBlock, false, 0.5),

        obake: StageParts.getOnePic(10, 80, 50, Imgs.Obake1, 10, OnTouch.toNothing),
        obakeIce1: StageParts.getOnePic(10, 80, 50, Imgs.Ice, 9, OnTouch.toBlock, false, 0.8),
        obakeIce2: StageParts.getOnePic(10, 80, 50, Imgs.Ice, 40, OnTouch.toBlock, false, 0.5),

        obake2: StageParts.getOnePic(10, 80, 50, Imgs.Obake1, 10, OnTouch.toNothing),
        obake2Ice1: StageParts.getOnePic(10, 80, 50, Imgs.Ice, 9, OnTouch.toBlock, false, 0.8),
        obake2Ice2: StageParts.getOnePic(10, 80, 50, Imgs.Ice, 40, OnTouch.toBlock, false, 0.6),

        ...StageParts.getFlyingRockRight(1, 17, 8, 20, 30),

        ...StageParts.getIceBlocks(10, [
            [0, -3], 
            [0, -2], 
            [0, -1], 
            [0, 0], 
            [0, 1], 
            [0, 2],
            [0, 3], 
        ], OnTouch.toBlock, Imgs.Ice, 30),

        leftGate: StageParts.getLeftGate(600),
        rightGate: StageParts.getRightGate(800, 1, 63),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;