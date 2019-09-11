//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//背景画像
import bgImg from '../img/background/snow3.jpg';

const Stage = {};
Stage.bgImg = bgImg;
Stage.windSpeed = -2.5;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SHINO2", 10, 115, 62, Imgs.Shino, Imgs.Shino, 20),

        leftGate: StageParts.getLeftGate(600),
        rightGate: StageParts.getRightGate(800, 1, 63),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;