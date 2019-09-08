//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//背景画像
import bgImg from '../img/background/snow2.jpg';

const Stage600 = {};
Stage600.bgImg = bgImg;
Stage600.windSpeed = -1;//風速の最大・最小

Stage600.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("MONK", 24, 100, 54, Imgs.Monk, null, 20),

        leftGate: StageParts.getLeftGate(400),
        rightGate: StageParts.getRightGate(700, 1, 63),

        ...StageParts.getSnows(0.15, 30),
    };
}
export { Stage600 };