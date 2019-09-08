//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//背景画像
import bgImg from '../img/background/snow4.jpg';

const Stage800 = {};
Stage800.bgImg = bgImg;
Stage800.windSpeed = -3;//風速の最大・最小

Stage800.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        leftGate: StageParts.getLeftGate(700),
        rightGate: StageParts.getRightGate(900, 1, 63),

        ...StageParts.getSnows(0.15, 30),
    };
}
export { Stage800 };