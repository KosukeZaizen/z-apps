import Imgs from '../ImportImgs';
import * as OnTouch from '../OnTouch';//タッチ関数
import * as EachTime from '../EachTime';//タイムステップごとの処理
import { messages } from '../Messages';//メッセージモジュール
import { changeStage } from '../CommonFnc'//共通関数

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

//画像　生成関数
export function getOnePic(size, posX, posY, img, zIndex, onTouch, boolLeft) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: onTouch,
        boolLeft: boolLeft,
    };
}

//飛ぶ岩　生成関数
export function getFlyingRock(id, size, posX, posY, zIndex) {
    let objResult = {};
    objResult[`Rock${id}`] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: Imgs.Rock,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: `Fire${id}`,
    };
    objResult[`Fire${id}`] = {
        size: size,
        posX: posX,
        posY: posY + (size * 3 / 4),
        zIndex: zIndex - 1,
        img: Imgs.FireR,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
    };
    return objResult;
}

//文字列要素　生成関数
export function getMessage(size, posX, posY, message, fontSize, zIndex, onTouch) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        message: message,
        fontSize: fontSize,
        onTouch: onTouch,
    };
}

//メッセージ表示　巻物
export function getSoroll(name, size, posX, posY, img, speakerImg, zIndex, boolLeft) {
    let objResult = {};

    objResult[`${name}_ScrollOpener`] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        boolLeft: boolLeft,
        onTouch: OnTouch.toScrollOpener,
        openTargetTitle: messages[`${name}_SCROLL_TITLE`],
    };
    objResult[`${name}_ScrollMessage`] = {
        size: 150,
        posX: 5,
        posY: 5,
        zIndex: 1000,
        img: Imgs.ScrollOpen,
        scroll: true,
        visible: false,
        onTouch: OnTouch.toNothing,
        title: messages[`${name}_SCROLL_TITLE`],
        message: messages[`${name}_SCROLL_MESSAGE`],
        fontSize: 3,
        speakerImg: speakerImg,
    };
    return objResult;
}


//ステージ変更用　スノーマン
export function getStageChangeSnowman(size, posX, posY, next, nextPosLeft) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        img: Imgs.Snowman,
        zIndex: 20,
        next: next,
        onTouch: OnTouch.toSnowman,
        changeStage: changeStage,
    };
}

//ステージ変更用ゲート（左）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
export function getLeftGate(next, nextX, nextY) {
    return {
        size: 300,
        posX: -300,
        posY: -200,
        zIndex: 30,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: true,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//ステージ変更用ゲート（右）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
export function getRightGate(next, nextX, nextY) {
    return {
        size: 300,
        posX: 160,
        posY: -200,
        zIndex: 30,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: false,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//ステージ変更用ゲート（上）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
export function getTopGate(next, heightOfTheGate, nextX, nextY) {

    const posY = heightOfTheGate - 1000 || -1012;

    return {
        size: 1000,
        posX: -420,
        posY: posY,
        zIndex: 30,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: false,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//触ったら死亡する、不動オブジェクト
export function getDangerousObj(size, posX, posY, img, zIndex, boolLeft) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: OnTouch.toEnemy,
        enemy: true,
        boolLeft: boolLeft,
    };
}

//雪 生成関数
export function getSnows(strength, zIndex) {
    let objResult = {};

    for (let i = 0; i <= 160 * strength; i++) {
        for (let j = -10; j <= 75 * strength; j++) {
            objResult["snowX" + i + "Y" + j] = {
                size: 30,
                posX: Math.floor(Math.random() * 161),
                posY: Math.floor(Math.random() * 86) - 10,
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

//崖の岩
export function getCliffRocks() {
    return {
        rock1Pic: getOnePic(60, 135, 30, Imgs.RockR, 20, OnTouch.toNothing),
        rock1Actual: getOnePic(60, 135, 33, null, null, OnTouch.toBlock),

        rock2Pic: getOnePic(50, 20, 65, Imgs.RockR, 20, OnTouch.toNothing),
        rock2Actual: getOnePic(50, 20, 68, null, null, OnTouch.toBlock),

        rock3Pic: getOnePic(50, -25, 65, Imgs.RockR, 20, OnTouch.toNothing),
        rock3Actual: getOnePic(50, -25, 68, null, null, OnTouch.toBlock),
    }
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