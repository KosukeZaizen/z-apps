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
import bgImg from '../img/background/whiteWall.jpg';


// ------------------------------------------------------------
// ステージ2 (ファイヤーボールの書)
// ------------------------------------------------------------

const Stage2 = {};
Stage2.bgImg = bgImg;

Stage2.getObjs = () => {
    let objs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        fireBallDummy: {
            //FireBallの画像初期表示速度向上のためのダミー
            size: 13,
            posX: -100,
            posY: 60,
            speedX: 0,
            speedY: 0,
            zIndex: 20,
            img: Imgs.FireBallR,
            onTouch: OnTouch.toNothing,
        },
        scrollFireBallIcon: {
            size: 10,
            posX: 105,
            posY: 46,
            boolLeft: true,
            zIndex: 22,
            img: Imgs.Scroll,
            onTouch: OnTouch.toScrollOpener,
            openTargetTitle: messages.FIRE_SCROLL_TITLE,
        },
        fireBallScrollOpened: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: Imgs.ScrollOpen,
            scroll: true,
            visible: false,
            onTouch: OnTouch.toNothing,
            title: messages.FIRE_SCROLL_TITLE,
            message: messages.FIRE_SCROLL_MESSAGE,
            fontSize: 3,
        },
        rock1Pic: {
            size: 40,
            posX: 90,
            posY: 50,
            zIndex: 20,
            img: Imgs.Rock,
            onTouch: OnTouch.toNothing,
        },
        rock1Actual: {
            size: 40,
            posX: 90,
            posY: 53,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
        shino: {
            size: 10,
            posX: 30,
            posY: 61,
            zIndex: 17,
            img: Imgs.Shino,
            onTouch: OnTouch.toScrollOpener,
            openTargetTitle: messages.SHINO_SCROLL_TITLE,
        },
        shinoScroll: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: Imgs.ScrollOpen,
            scroll: true,
            visible: false,
            onTouch: OnTouch.toNothing,
            title: messages.SHINO_SCROLL_TITLE,
            message: messages.SHINO_SCROLL_MESSAGE,
            fontSize: 3,
            speakerImg: Imgs.Shino,
        },
        leftGateWall: {
            size: 300,
            posX: -300,
            posY: -200,
            zIndex: 30,
            next: 3,
            onTouch: OnTouch.toGateWall,
            changeStage: changeStage,
        },
    };
    return objs;
}
export { Stage2 };