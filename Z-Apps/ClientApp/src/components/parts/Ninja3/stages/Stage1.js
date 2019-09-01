//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//メッセージモジュールの読み込み
import { messages } from '../Messages';
//共通関数の読み込み
import { changeStage } from '../CommonFnc'
//背景画像
import bgImg from '../img/background/furuie.jpg';


// ------------------------------------------------------------
// ステージ1 (出発地点　屋根の上)
// ------------------------------------------------------------

const Stage1 = {};
Stage1.bgImg = bgImg;
Stage1.windRange = [0, 0];//風速の最大・最小
Stage1.windRand = 0;//風速の変化の速さ

Stage1.getObjs = function () {
    let objs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        openFirstScroll: {
            size: 10,
            posX: 145,
            posY: -20,
            zIndex: 20,
            onTouch: OnTouch.toScrollOpener,
            openTargetTitle: messages.POCHI_SCROLL_TITLE,
        },
        firstScroll: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: Imgs.ScrollOpen,
            scroll: true,
            visible: false,
            onTouch: OnTouch.toNothing,
            title: messages.POCHI_SCROLL_TITLE,
            message: messages.POCHI_SCROLL_MESSAGE,
            fontSize: 3,
            speakerImg: Imgs.Pochi,
        },

        kanban1Pic: StageParts.getOnePic(20, 7, 60, Imgs.Kanban1, 10, OnTouch.toNothing),
        kanban1ArrowPic: StageParts.getOnePic(10, 11, 63, Imgs.Arrow1, 10, OnTouch.toNothing, true),

        bottomGate: {
            size: 300,
            posX: -80,
            posY: 80,
            zIndex: 30,
            next: 2,
            onTouch: OnTouch.toGateTop1,
            changeStage: changeStage,
        },

        ...StageParts.getSnows(0.1, 30),
    };
    return objs;
}

export { Stage1 };