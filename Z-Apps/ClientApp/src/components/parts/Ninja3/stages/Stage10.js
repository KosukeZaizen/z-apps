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
Stage.windSpeed = -3.2;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),

        door: StageParts.getOnePic(15, 72, 60, Imgs.DarkDoor, 10, OnTouch.toNothing),

        toriiFramePic: StageParts.getOnePic(15, 72, 45, Imgs.Frame, 20, OnTouch.toNothing),
        toriiMessage1: StageParts.getMessage(20, 77, 46, "仙", 5, 22, OnTouch.toNothing),

        crystal: StageParts.getOnePic(10, 74, 14, Imgs.Crystal, 20, OnTouch.toBlock),
        
        leftGate: StageParts.getLeftGate(800, null, null, -9),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;