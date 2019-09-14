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

        ...StageParts.getFlyingRockRight(1, 17, 8, 20, 50),

        ...StageParts.getFrozenObj("oni", 22, 110, 54, Imgs.Oni),
        ...StageParts.getFrozenObj("obake1", 10, 80, 50, Imgs.Obake1),
        ...StageParts.getFrozenObj("obake2", 10, 70, 25, Imgs.Obake2),
        ...StageParts.getFrozenObj("obake3", 10, 25, 40, Imgs.Obake2),
        ...StageParts.getFrozenObj("obake4", 10, 136, 32, Imgs.Obake2),

        ...StageParts.getIceBlocks(10, [
            [0, -3], 
            [0, -2], 
            [0, -1], 
            [0, 0], 
            [0, 1], 
            [0, 2],
            [0, 3], 
            [0, 4], 
        ], OnTouch.toBlock, Imgs.Ice, 90),

        leftGate: StageParts.getLeftGate(600),
        rightGate: StageParts.getRightGate(800, -8),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;