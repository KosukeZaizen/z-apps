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

        snowman: StageParts.getOnePic(12, 60, 62, Imgs.Snowman, 20, OnTouch.toBlock),
        kanban1Pic: StageParts.getOnePic(20, 7, 60, Imgs.Kanban1, 10, OnTouch.toNothing),
        kanban1ArrowPic: StageParts.getOnePic(10, 11, 63, Imgs.Arrow1, 10, OnTouch.toNothing, true),

        /*
        rock1: {
            size: 17,
            posX: 50,
            posY: 63,
            zIndex: 30,
            img: imgRock,
            onTouch: onTouchBlock,
        },
        tree1Pic: {
            size: 60,
            posX: 120,
            posY: 20,
            zIndex: 15,
            img: imgTree1,
            onTouch: onTouchNothing,
        },
        tree1Actual: {
            size: 60,
            posX: 120,
            posY: 30,
            onTouch: onTouchTree,
        },
        toriiPic: {
            size: 120,
            posX: 35,
            posY: 3,
            zIndex: 10,
            img: imgTorii,
            onTouch: onTouchNothing,
        },
        toriiActual: {
            size: 120,
            posX: 35,
            posY: 9,
            zIndex: 10,
            onTouch: onTouchTree,
        },
        toriiFramePic: {
            size: 40,
            posX: 75,
            posY: 5,
            zIndex: 30,
            img: imgFrame,
            onTouch: onTouchNothing,
        },
        toriiMessage1: {
            size: 30,
            posX: 87,
            posY: 10,
            zIndex: 30,
            message: "Welcome",
            fontSize: 4,
            onTouch: onTouchNothing,
        },
        toriiMessage2: {
            size: 30,
            posX: 93,
            posY: 15,
            zIndex: 30,
            message: "to",
            fontSize: 4,
            onTouch: onTouchNothing,
        },
        toriiMessage3: {
            size: 30,
            posX: 89,
            posY: 20,
            zIndex: 30,
            message: "Japan!",
            fontSize: 4,
            onTouch: onTouchNothing,
        },
        rightGateWall: {
            size: 300,
            posX: 160,
            posY: -200,
            zIndex: 30,
            next: 1,
            onTouch: onTouchGateWall,
            changeStage: this.props.changeStage,
        },
        leftGateWall: {
            size: 300,
            posX: -300,
            posY: -200,
            zIndex: 30,
            next: 3,
            onTouch: onTouchGateWall,
            changeStage: this.props.changeStage,
        },
        */

        rightGate: StageParts.getRightGate(1),
        leftGate: StageParts.getLeftGate(3),

        ...StageParts.getSnows(0.1, 30),
    };
}
export { Stage2 };