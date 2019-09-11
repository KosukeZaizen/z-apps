//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../../Ninja/img/background/furuie5.jpg';


const Stage = {};
Stage.bgImg = bgImg;

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("POCHI", 10, 145, -20, null,Imgs.Pochi, 20),

        snowman: StageParts.getOnePic(12, 60, 62, Imgs.Snowman, 20, OnTouch.toBlock),
        kanban1Pic: StageParts.getOnePic(20, 7, 60, Imgs.Kanban1, 10, OnTouch.toNothing),
        kanban1ArrowPic: StageParts.getOnePic(10, 11, 63, Imgs.Arrow1, 10, OnTouch.toNothing, true),

        leftGate: StageParts.getLeftGate(2),

        ...StageParts.getSnows(0.1, 30),
    };
}
export default Stage;