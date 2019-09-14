//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow5.jpg';

const Stage = {};
Stage.bgImg = bgImg;
Stage.windSpeed = -2.5;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),

        //door: StageParts.getOnePic(28, 66, 50, null, 10, OnTouch.toNothing),
        door: StageParts.getOnePic(15, 72, 60, Imgs.DarkDoor, 10, OnTouch.toNothing),

        leftGate: StageParts.getLeftGate(800, null, null, -9),
        rightGate: StageParts.getRightGate(1000),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;