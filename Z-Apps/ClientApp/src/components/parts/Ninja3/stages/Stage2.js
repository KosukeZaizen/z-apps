//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../../Ninja/img/background/town1.jpg';


const Stage2 = {};
Stage2.bgImg = bgImg;
Stage2.windRange = [0, 0];//風速の最大・最小
Stage2.windRand = 0;//風速の変化の速さ

Stage2.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        rock1: StageParts.getOnePic(17, 50, 63, Imgs.Rock, 30, OnTouch.toBlock),

        tree1Pic: StageParts.getOnePic(60, 120, 20, Imgs.Tree, 15, OnTouch.toNothing),
        tree1Actual: StageParts.getOnePic(60, 120, 30, null, null, OnTouch.toTree),

        toriiPic: StageParts.getOnePic(120, 35, 3, Imgs.Torii, 10, OnTouch.toNothing),
        toriiActual: StageParts.getOnePic(120, 35, 9, null, null, OnTouch.toTree),

        toriiFramePic: StageParts.getOnePic(40, 75, 5, Imgs.Frame, 30, OnTouch.toNothing),
        toriiMessage1: StageParts.getMessage(30, 87, 10, "Welcome", 4, 30, OnTouch.toNothing),
        toriiMessage2: StageParts.getMessage(30, 93, 15, "to", 4, 30, OnTouch.toNothing),
        toriiMessage3: StageParts.getMessage(30, 89, 20, "Japan!", 4, 30, OnTouch.toNothing),

        rightGate: StageParts.getRightGate(1),
        leftGate: StageParts.getLeftGate(3),

        ...StageParts.getSnows(0.1, 30),
    };
}
export { Stage2 };