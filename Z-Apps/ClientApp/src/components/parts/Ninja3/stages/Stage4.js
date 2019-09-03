//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../../Ninja/img/background/ryokan1.jpg';


const Stage4 = {};
Stage4.bgImg = bgImg;
Stage4.windRange = [0, 0];//風速の最大・最小
Stage4.windRand = 0;//風速の変化の速さ

Stage4.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("POCHI2", 10, 50, 62, Imgs.Pochi, Imgs.Pochi, 20),

        butsudan: StageParts.getOnePic(40, 5, 32, Imgs.Butsudan, 20, OnTouch.toTree),

        ...StageParts.getSoroll("TOBIISHI", 10, 19, 42, Imgs.Scroll, null, 22),

        rightGate: StageParts.getRightGate(2),
    };
}
export { Stage4 };