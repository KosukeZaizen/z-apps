//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//オブジェクトのタイムステップごとのメソッドの読み込み
import * as EachTime from '../EachTime';
//共通関数の読み込み
import { changeStage } from '../CommonFnc'
//背景画像
import bgImg from '../img/background/whiteWall2.jpg';


// ------------------------------------------------------------
// ステージ3 (鷲と白壁)
// ------------------------------------------------------------

const Stage3 = {};
Stage3.bgImg = bgImg;

Stage3.getObjs = function () {
    let objs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        washi1: {
            size: 13,
            posX: 0,
            posY: 0,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.Washi,
            onTouch: OnTouch.toOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: EachTime.Enemy,
            life: 1,
        },
        washi2: {
            size: 13,
            posX: -40,
            posY: -60,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.Washi,
            onTouch: OnTouch.toOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: EachTime.Enemy,
            life: 1,
        },
        washi3: {
            size: 13,
            posX: 0,
            posY: -100,
            speedX: 3,
            speedY: 1,
            zIndex: 20,
            img: Imgs.Washi,
            onTouch: OnTouch.toOutsideEnemy1,
            next: 2,
            changeStage: changeStage,
            enemy: true,
            eachTime: EachTime.Enemy,
            life: 1,
        },

        box1: {
            size: 20,
            posX: 105,
            posY: 55,
            speedX: 0,
            speedY: 0,
            zIndex: 19,
            img: Imgs.Box1,
            onTouch: OnTouch.toBlock,
            enemy: true,
            eachTime: EachTime.Enemy,
            life: 1,
        },

        rightGateWall: {
            size: 300,
            posX: 160,
            posY: -200,
            zIndex: 30,
            next: 2,
            onTouch: OnTouch.toGateWall,
            changeStage: changeStage,
        },
        leftGateWall: {
            size: 300,
            posX: -300,
            posY: -200,
            zIndex: 30,
            next: 1,
            onTouch: OnTouch.toGateWall,
            changeStage: changeStage,
        },
    };
    return objs;
}
export { Stage3 };