import Imgs from '../ImportImgs';
import * as OnTouch from '../OnTouch';//タッチ関数
import * as EachTime from '../EachTime';//タイムステップごとの処理

//------------------------------------------------------------
//
//　ステージに配置されるオブジェクトを生成するための関数群
//
//------------------------------------------------------------

//ブロック生成関数
export function getItems(size, arrPos, onTouch, imgBlock, zIndex) {
    let objResult = {};

    for (let index in arrPos) {
        objResult["objItem" + index] = {
            size: size + 3,
            posX: arrPos[index][0] * size,
            posY: arrPos[index][1] * size,
            zIndex: zIndex,
            img: imgBlock,
            onTouch: onTouch,
        };
    }
    return objResult;
}

//雪 生成関数
export function getSnows(strength, zIndex, wind) {
    let objResult = {};

    for (let i = 0; i <= 160 * strength; i++) {
        for (let j = 0; j <= 75 * strength; j++) {
            objResult["snowX" + i + "Y" + j] = {
                size: 30,
                posX: Math.floor(Math.random() * 161),
                posY: Math.floor(Math.random() * 76),
                zIndex: zIndex,
                message: ".",
                fontSize: 4,
                onTouch: OnTouch.toNothing,
                eachTime: EachTime.Snow,
                fontColor: "white",
            };
        }
    }
    return objResult;
}

//鍵　生成関数
export function getKeys(ninja, posX, posY, zIndex, openTargetTitle) {
    let objResult = {};

    if (ninja.readScroll.indexOf(openTargetTitle) < 0) {
        //まだ鍵を見付けていない場合のみ表示
        objResult["key"] = {
            size: 10,
            posX: posX,
            posY: posY,
            zIndex: zIndex,
            img: Imgs.imgKey,
            onTouch: OnTouch.toScrollOpener,
            openTargetTitle: openTargetTitle,
            boolLeft: true,
        };
    }
    return objResult;
}

//画像（触っても何も起きない）　生成関数
export function getOnePic(name, size, posX, posY, img, zIndex, onTouch) {
    let objResult = {};

    objResult[name] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: onTouch,
    }
    return objResult;
}


//ファイヤーボール　生成関数
export function getFireBall(size, posX, posY, boolLeft, fireBallCount) {

    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: 999 - fireBallCount,
        img: Imgs.FireBallR,
        onTouch: OnTouch.toNothing,
        fireBall: true,
        boolLeft: boolLeft,
        eachTime: EachTime.FireBall,
    };
}

//画面外を黒くする要素
export function getObjOutOfScreen() {

    return {
        outOfScreenLeft: {
            size: 300,
            posX: -300,
            posY: -200,
            onTouch: OnTouch.toNothing,
            divType: "outOfScreen",
        },
        outOfScreenRight: {
            size: 300,
            posX: 160,
            posY: -200,
            onTouch: OnTouch.toNothing,
            divType: "outOfScreen",
        },
        outOfScreenTop: {
            size: 260,
            posX: -50,
            posY: -260,
            onTouch: OnTouch.toNothing,
            divType: "outOfScreen",
        },
        outOfScreenBottom: {
            size: 260,
            posX: -50,
            posY: 90,
            onTouch: OnTouch.toNothing,
            divType: "outOfScreen",
        },
    };
}

//全ステージ共通の壁（render内で設定）
export function getObjWalls() {

    return {
        leftWall: {
            size: 300,
            posX: -310,
            posY: -200,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
        rightWall: {
            size: 300,
            posX: 170,
            posY: -200,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
    };
}

//全ステージ共通の壁（render内で設定）
export function getObjFloor() {

    return {
        floor1: {
            size: 200,
            posX: -20,
            posY: 79,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
        floor2: {
            size: 200,
            posX: -20,
            posY: 77,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
        floor3: {
            size: 200,
            posX: -20,
            posY: 76,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
        floor4: {
            size: 200,
            posX: -20,
            posY: 75,
            zIndex: 30,
            onTouch: OnTouch.toBlock,
        },
    };
}