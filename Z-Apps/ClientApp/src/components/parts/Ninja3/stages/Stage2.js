//ステージの部品作成用関数群の読み込み
import { getObjOutOfScreen, getObjWalls, getObjFloor } from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import { onTouchNothing, onTouchBlock, onTouchGateWall, onTouchScrollOpener } from '../OnTouch';
//メッセージモジュールの読み込み
import { getMessage } from '../Messages';
//共通関数の読み込み
import { changeStage } from '../CommonFnc'
//背景画像
import bgImg from '../img/background/whiteWall.jpg';


// ------------------------------------------------------------
// ステージ2 (ファイヤーボールの書)
// ------------------------------------------------------------

const Stage2 = {}
Stage2.bgImg = bgImg;

Stage2.getObjs = function () {
    let objs = {
        ...getObjOutOfScreen(),
        ...getObjWalls(),
        ...getObjFloor(),

        fireBallDummy: {
            //FireBallの画像初期表示速度向上のためのダミー
            size: 13,
            posX: -100,
            posY: 60,
            speedX: 0,
            speedY: 0,
            zIndex: 20,
            img: Imgs.imgFireBallR,
            onTouch: onTouchNothing,
        },
        scrollFireBallIcon: {
            size: 10,
            posX: 105,
            posY: 46,
            boolLeft: true,
            zIndex: 22,
            img: Imgs.imgScroll,
            onTouch: onTouchScrollOpener,
            openTargetTitle: getMessage("FIRE_SCROLL_TITLE"),
        },
        fireBallScrollOpened: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: Imgs.imgScrollOpen,
            scroll: true,
            visible: false,
            onTouch: onTouchNothing,
            title: getMessage("FIRE_SCROLL_TITLE"),
            message: getMessage("FIRE_SCROLL_MESSAGE"),
            fontSize: 3,
        },
        rock1Pic: {
            size: 40,
            posX: 90,
            posY: 50,
            zIndex: 20,
            img: Imgs.imgRock,
            onTouch: onTouchNothing,
        },
        rock1Actual: {
            size: 40,
            posX: 90,
            posY: 53,
            zIndex: 30,
            onTouch: onTouchBlock,
        },
        shino: {
            size: 10,
            posX: 30,
            posY: 61,
            zIndex: 17,
            img: Imgs.imgShino,
            onTouch: onTouchScrollOpener,
            openTargetTitle: getMessage("SHINO_SCROLL_TITLE"),
        },
        shinoScroll: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: Imgs.imgScrollOpen,
            scroll: true,
            visible: false,
            onTouch: onTouchNothing,
            title: getMessage("SHINO_SCROLL_TITLE"),
            message: getMessage("SHINO_SCROLL_MESSAGE"),
            fontSize: 3,
            speakerImg: Imgs.imgShino,
        },
        leftGateWall: {
            size: 300,
            posX: -300,
            posY: -200,
            zIndex: 30,
            next: 3,
            onTouch: onTouchGateWall,
            changeStage: changeStage,
        },
    };
    return objs;
}
export { Stage2 };