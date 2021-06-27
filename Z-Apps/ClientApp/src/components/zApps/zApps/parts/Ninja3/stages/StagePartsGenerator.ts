//@ts-nocheck
import { changeStage } from "../CommonFnc"; //共通関数
import * as EachTime from "../EachTime"; //タイムステップごとの処理
import Imgs from "../ImportImgs";
import { messages } from "../Messages"; //メッセージモジュール
import * as OnTouch from "../OnTouch"; //タッチ関数

//------------------------------------------------------------
//
//　ステージに配置されるオブジェクトを生成するための関数群
//
//------------------------------------------------------------

//ブロック生成関数
export function getBlocks(size, arrPos, onTouch, imgBlock, zIndex, opacity?) {
    let objResult = {};

    for (let index in arrPos) {
        objResult["block" + index] = {
            size: size,
            posX: arrPos[index][0] * size,
            posY: arrPos[index][1] * size,
            zIndex: zIndex,
            img: imgBlock,
            onTouch: onTouch,
            opacity: opacity,
        };
    }
    return objResult;
}

//氷ブロック生成関数
export function getIceBlocks(
    size,
    arrPos,
    onTouch,
    imgBlock,
    zIndex,
    opacity?
) {
    let objResult = {};

    for (let index in arrPos) {
        objResult["iceBlock" + index] = {
            size: size,
            posX: arrPos[index][0] * size,
            posY: arrPos[index][1] * size,
            zIndex: zIndex,
            img: imgBlock,
            onTouch: onTouch,
            opacity: opacity,
            eachTime: EachTime.IceBlock,
        };
    }
    return objResult;
}

//画像　生成関数
export function getOnePic(
    size,
    posX,
    posY,
    img,
    zIndex,
    onTouch,
    boolLeft?,
    opacity?
) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: onTouch,
        boolLeft: boolLeft,
        opacity: opacity,
    };
}

//矢印看板
export function getArrowBoard(scrollName, posX, posY, zIndex, boolLeft?) {
    //看板に触れた時にメッセージを出したくない場合は、scrollNameにnullを渡す
    let objResult = {};
    if (boolLeft) {
        //左向き矢印
        objResult[`Kanban${scrollName}`] = getOnePic(
            20,
            posX,
            posY,
            Imgs.Kanban1,
            zIndex - 1,
            OnTouch.toNothing
        );
        if (scrollName) {
            objResult = {
                ...objResult,
                ...getSoroll(
                    scrollName,
                    10,
                    posX + 4,
                    posY + 3,
                    Imgs.Arrow1,
                    null,
                    zIndex,
                    true
                ),
            };
        } else {
            objResult[`Arrow${scrollName}`] = getOnePic(
                10,
                posX + 4,
                posY + 3,
                Imgs.Arrow1,
                zIndex,
                OnTouch.toNothing,
                true
            );
        }
    } else {
        //右向き矢印
        objResult[`Kanban${scrollName}`] = getOnePic(
            20,
            posX,
            posY,
            Imgs.Kanban1,
            zIndex - 1,
            OnTouch.toNothing
        );
        if (scrollName) {
            objResult = {
                ...objResult,
                ...getSoroll(
                    scrollName,
                    10,
                    posX + 5,
                    posY + 3,
                    Imgs.Arrow1,
                    null,
                    zIndex,
                    false
                ),
            };
        } else {
            objResult[`Arrow${scrollName}`] = getOnePic(
                10,
                posX + 5,
                posY + 3,
                Imgs.Arrow1,
                zIndex,
                OnTouch.toNothing,
                false
            );
        }
    }
    return objResult;
}

//飛ぶ岩　生成関数
export function getFlyingRock(
    name,
    size,
    posX,
    posY,
    zIndex,
    maxHeight?,
    img?
) {
    let objResult = {};
    img = img || Imgs.Rock;

    objResult[`Rock${name}`] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: `Fire${name}`,
        maxHeight: maxHeight,
    };
    objResult[`Fire${name}`] = {
        size: size,
        posX: posX,
        posY: posY + (size * 3) / 4,
        zIndex: zIndex - 1,
        img: Imgs.FireR,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxHeight: maxHeight,
    };
    return objResult;
}

//飛ぶ岩（右向き）　生成関数
export function getFlyingRockRight(id, size, posX, posY, zIndex, maxRight?) {
    let objResult = {};
    objResult[`Rock${id}`] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: Imgs.RockRight,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: `Fire${id}`,
        maxRight: maxRight,
        direction: "right",
    };
    objResult[`Fire${id}`] = {
        size: size,
        posX: posX - (size * 3) / 4,
        posY: posY,
        zIndex: zIndex - 1,
        img: Imgs.FireRight,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxRight: maxRight,
        direction: "right",
    };
    return objResult;
}

//飛ぶ岩（左向き）　生成関数
export function getFlyingRockLeft(id, size, posX, posY, zIndex, maxLeft?) {
    let objResult = {};
    objResult[`Rock${id}`] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: Imgs.RockRight,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: `Fire${id}`,
        maxLeft: maxLeft,
        direction: "left",
        boolLeft: true,
    };
    objResult[`Fire${id}`] = {
        size: size,
        posX: posX + (size * 3) / 4,
        posY: posY,
        zIndex: zIndex - 1,
        img: Imgs.FireRight,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxLeft: maxLeft,
        direction: "left",
        boolLeft: true,
    };
    return objResult;
}

//凍ったオブジェクト　生成関数
export function getFrozenObj(name, size, posX, posY, img, zIndex?, boolLeft?) {
    let objResult = {};
    zIndex = zIndex || 10;
    objResult[name] = getOnePic(
        size,
        posX,
        posY,
        img,
        zIndex,
        OnTouch.toNothing,
        boolLeft
    );
    objResult[`${name}Ice1`] = getOnePic(
        size,
        posX,
        posY,
        Imgs.Ice,
        5,
        OnTouch.toBlock,
        false,
        0.8
    );
    objResult[`${name}Ice2`] = getOnePic(
        size,
        posX,
        posY,
        Imgs.Ice,
        40,
        OnTouch.toBlock,
        false,
        0.5
    );
    return objResult;
}

//文字列要素　生成関数
export function getMessage(
    size,
    posX,
    posY,
    message,
    fontSize,
    zIndex,
    onTouch
) {
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
export function getSoroll(
    name,
    size,
    posX,
    posY,
    img,
    speakerImg,
    zIndex,
    boolLeft?,
    isFinal?
) {
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
        finalMessage: isFinal,
    };
    return objResult;
}

//ステージ変更用ドア
export function getDoor(
    size,
    posX,
    posY,
    img,
    zIndex,
    next,
    nextX,
    nextY,
    nextLeft
) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        img: img,
        zIndex: zIndex,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: nextLeft,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//敵
export function getEnemy(size, posX, posY, img, zIndex, speedX, speedY) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        speedX: speedX,
        speedY: speedY,
        zIndex: zIndex,
        img: img,
        onTouch: OnTouch.toMortalEnemy,
        enemy: true,
        eachTime: EachTime.Enemy,
    };
}

//一つ目
export function getOneEye(size, posX, posY, zIndex) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: Imgs.Hitotsume,
        onTouch: OnTouch.toEnemy,
        enemy: true,
        eachTime: EachTime.OneEye,
    };
}

//ボス
export function getBoss() {
    return {
        size: 14,
        posX: 8,
        posY: 53,
        zIndex: 25,
        img: Imgs.Boss,
        onTouch: OnTouch.toMortalEnemy,
        enemy: true,
        eachTime: EachTime.Boss,
    };
}

//ステージ変更用ゲート（左）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
export function getLeftGate(next, nextX?, nextY?, posX?) {
    return {
        size: 300,
        posX: -300 + (posX || 0),
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
export function getRightGate(next, nextX?, nextY?, posX?) {
    return {
        size: 300,
        posX: 160 + (posX || 0),
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
export function getTopGate(next, heightOfTheGate, nextX, nextY, nextLeft?) {
    const posY = heightOfTheGate - 1000 || -1012;
    return {
        size: 1000,
        posX: -420,
        posY: posY,
        zIndex: 30,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: nextLeft,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//ステージ変更用ゲート（下）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
export function getBottomGate(next, heightOfTheGate, nextX, nextY?, nextLeft?) {
    const posY = heightOfTheGate || 87;
    return {
        size: 1000,
        posX: -420,
        posY: posY,
        zIndex: 30,
        next: next,
        nextX: nextX,
        nextY: nextY,
        nextLeft: nextLeft,
        onTouch: OnTouch.toStageChangeCommon,
        changeStage: changeStage,
    };
}

//触ったら死亡する、不動オブジェクト
export function getDangerousObj(size, posX, posY, img?, zIndex?, boolLeft?) {
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
export function getSnows(strength, zIndex?, reverse?) {
    let objResult = {};
    const eachTimeFunc = reverse ? EachTime.SnowR : EachTime.Snow;

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
                eachTime: eachTimeFunc,
                fontColor: "white",
            };
        }
    }
    return objResult;
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
