//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../../Ninja/img/background/ryokan1.jpg';


const Stage3 = {};
Stage3.bgImg = bgImg;
Stage3.windRange = [0, 0];//風速の最大・最小
Stage3.windRand = 0;//風速の変化の速さ

Stage3.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("POCHI2", 10, 110, 62, Imgs.Pochi, Imgs.Pochi, 20),

        cake: StageParts.getOnePic(100, 5, 3, Imgs.Cake, 10, OnTouch.toNothing),

        ...StageParts.getSoroll("SHINO", 10, 20, 62, Imgs.Shino, Imgs.Shino, 20),

        rightGate: StageParts.getRightGate(2),
    };
}
export { Stage3 };