//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/snow5.jpg';

const Stage = {};

//仙人の家（外）
Stage.getObjs = (ninja) => {

    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? -2 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),

        //door: StageParts.getOnePic(15, 72, 60, Imgs.DarkDoor, 10, OnTouch.toNothing),

        toriiFramePic: StageParts.getOnePic(15, 72, 45, Imgs.Frame, 20, OnTouch.toNothing),
        toriiMessage1: StageParts.getMessage(20, 77, 46, "仙", 5, 22, OnTouch.toNothing),

        jizo1: StageParts.getOnePic(12, 50, 64, Imgs.Jizo, 20, OnTouch.toBlock),
        jizo2: StageParts.getOnePic(12, 96, 64, Imgs.Jizo, 20, OnTouch.toBlock),

        ...StageParts.getFlyingRock(2, 17, 15, 63, 30),
        topGate: StageParts.getTopGate(15, -100, 32, 10),

        
        door: StageParts.getDoor(15, 72, 60, Imgs.DarkDoor, 10, 16, 155, 63, true),

        rightGate: StageParts.getRightGate(10),
        leftGate: StageParts.getLeftGate(8, null, null, -9),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.15, 30),
        }
    }
    return returnObjs;
}
export default Stage;