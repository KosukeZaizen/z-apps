//ステージの部品作成用関数群の読み込み
import { getObjOutOfScreen, getObjWalls, getObjFloor } from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import { onTouchOutsideEnemy1, onTouchBlock, onTouchGateWall } from '../OnTouch';
//オブジェクトのタイムステップごとのメソッドの読み込み
import { eachTimeEnemy } from '../EachTime';
//共通関数の読み込み
import { changeStage } from '../CommonFnc'
//背景画像
import bgImg from '../img/background/whiteWall2.jpg';


// ------------------------------------------------------------
// ステージ3 (鷲と白壁)
// ------------------------------------------------------------

const Stage3 = {}
Stage3.bgImg = bgImg;

Stage3.getObjs = function () {
    let objs = {
        ...getObjOutOfScreen(),
        ...getObjWalls(),
        ...getObjFloor(),

        washi1: {
            size: 13,
            posX: 0,
            posY: 0,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.imgWashi,
            onTouch: onTouchOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: eachTimeEnemy,
            life: 1,
        },
        washi2: {
            size: 13,
            posX: -40,
            posY: -60,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.imgWashi,
            onTouch: onTouchOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: eachTimeEnemy,
            life: 1,
        },
        washi3: {
            size: 13,
            posX: 0,
            posY: -100,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.imgWashi,
            onTouch: onTouchOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: eachTimeEnemy,
            life: 1,
        },

        box1: {
            size: 20,
            posX: 105,
            posY: 55,
            speedX: 0,
            speedY: 0,
            zIndex: 19,
            img: Imgs.imgBox1,
            onTouch: onTouchBlock,
            enemy: true,
            eachTime: eachTimeEnemy,
            life: 1,
        },

        rightGateWall: {
            size: 300,
            posX: 160,
            posY: -200,
            zIndex: 30,
            next: 2,
            onTouch: onTouchGateWall,
            changeStage: changeStage,
        },
        leftGateWall: {
            size: 300,
            posX: -300,
            posY: -200,
            zIndex: 30,
            next: 1,
            onTouch: onTouchGateWall,
            changeStage: changeStage,
        },
    };
    return objs;
}
export { Stage3 };