"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImportImgs_1 = __importDefault(require("../ImportImgs"));
var OnTouch = __importStar(require("../OnTouch")); //タッチ関数
var EachTime = __importStar(require("../EachTime")); //タイムステップごとの処理
var Messages_1 = require("../Messages"); //メッセージモジュール
var CommonFnc_1 = require("../CommonFnc"); //共通関数
//------------------------------------------------------------
//
//　ステージに配置されるオブジェクトを生成するための関数群
//
//------------------------------------------------------------
//ブロック生成関数
function getBlocks(size, arrPos, onTouch, imgBlock, zIndex, opacity) {
    var objResult = {};
    for (var index in arrPos) {
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
exports.getBlocks = getBlocks;
//氷ブロック生成関数
function getIceBlocks(size, arrPos, onTouch, imgBlock, zIndex, opacity) {
    var objResult = {};
    for (var index in arrPos) {
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
exports.getIceBlocks = getIceBlocks;
//画像　生成関数
function getOnePic(size, posX, posY, img, zIndex, onTouch, boolLeft, opacity) {
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
exports.getOnePic = getOnePic;
//矢印看板
function getArrowBoard(scrollName, posX, posY, zIndex, boolLeft) {
    //看板に触れた時にメッセージを出したくない場合は、scrollNameにnullを渡す
    var objResult = {};
    if (boolLeft) {
        //左向き矢印
        objResult["Kanban" + scrollName] = getOnePic(20, posX, posY, ImportImgs_1.default.Kanban1, zIndex - 1, OnTouch.toNothing);
        if (scrollName) {
            objResult = __assign(__assign({}, objResult), getSoroll(scrollName, 10, posX + 4, posY + 3, ImportImgs_1.default.Arrow1, null, zIndex, true));
        }
        else {
            objResult["Arrow" + scrollName] = getOnePic(10, posX + 4, posY + 3, ImportImgs_1.default.Arrow1, zIndex, OnTouch.toNothing, true);
        }
    }
    else {
        //右向き矢印
        objResult["Kanban" + scrollName] = getOnePic(20, posX, posY, ImportImgs_1.default.Kanban1, zIndex - 1, OnTouch.toNothing);
        if (scrollName) {
            objResult = __assign(__assign({}, objResult), getSoroll(scrollName, 10, posX + 5, posY + 3, ImportImgs_1.default.Arrow1, null, zIndex, false));
        }
        else {
            objResult["Arrow" + scrollName] = getOnePic(10, posX + 5, posY + 3, ImportImgs_1.default.Arrow1, zIndex, OnTouch.toNothing, false);
        }
    }
    return objResult;
}
exports.getArrowBoard = getArrowBoard;
//飛ぶ岩　生成関数
function getFlyingRock(name, size, posX, posY, zIndex, maxHeight, img) {
    var objResult = {};
    img = img || ImportImgs_1.default.Rock;
    objResult["Rock" + name] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: "Fire" + name,
        maxHeight: maxHeight,
    };
    objResult["Fire" + name] = {
        size: size,
        posX: posX,
        posY: posY + (size * 3 / 4),
        zIndex: zIndex - 1,
        img: ImportImgs_1.default.FireR,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxHeight: maxHeight,
    };
    return objResult;
}
exports.getFlyingRock = getFlyingRock;
//飛ぶ岩（右向き）　生成関数
function getFlyingRockRight(id, size, posX, posY, zIndex, maxRight) {
    var objResult = {};
    objResult["Rock" + id] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: ImportImgs_1.default.RockRight,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: "Fire" + id,
        maxRight: maxRight,
        direction: "right",
    };
    objResult["Fire" + id] = {
        size: size,
        posX: posX - (size * 3 / 4),
        posY: posY,
        zIndex: zIndex - 1,
        img: ImportImgs_1.default.FireRight,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxRight: maxRight,
        direction: "right",
    };
    return objResult;
}
exports.getFlyingRockRight = getFlyingRockRight;
//飛ぶ岩（左向き）　生成関数
function getFlyingRockLeft(id, size, posX, posY, zIndex, maxLeft) {
    var objResult = {};
    objResult["Rock" + id] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: ImportImgs_1.default.RockRight,
        onTouch: OnTouch.toFlyingRock,
        eachTime: EachTime.FlyingRock,
        fireName: "Fire" + id,
        maxLeft: maxLeft,
        direction: "left",
        boolLeft: true,
    };
    objResult["Fire" + id] = {
        size: size,
        posX: posX + (size * 3 / 4),
        posY: posY,
        zIndex: zIndex - 1,
        img: ImportImgs_1.default.FireRight,
        onTouch: OnTouch.toNothing,
        eachTime: EachTime.FlyingRock,
        maxLeft: maxLeft,
        direction: "left",
        boolLeft: true,
    };
    return objResult;
}
exports.getFlyingRockLeft = getFlyingRockLeft;
//凍ったオブジェクト　生成関数
function getFrozenObj(name, size, posX, posY, img, zIndex, boolLeft) {
    var objResult = {};
    zIndex = zIndex || 10;
    objResult[name] = getOnePic(size, posX, posY, img, zIndex, OnTouch.toNothing, boolLeft);
    objResult[name + "Ice1"] = getOnePic(size, posX, posY, ImportImgs_1.default.Ice, 5, OnTouch.toBlock, false, 0.8);
    objResult[name + "Ice2"] = getOnePic(size, posX, posY, ImportImgs_1.default.Ice, 40, OnTouch.toBlock, false, 0.5);
    return objResult;
}
exports.getFrozenObj = getFrozenObj;
//文字列要素　生成関数
function getMessage(size, posX, posY, message, fontSize, zIndex, onTouch) {
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
exports.getMessage = getMessage;
//メッセージ表示　巻物
function getSoroll(name, size, posX, posY, img, speakerImg, zIndex, boolLeft, isFinal) {
    var objResult = {};
    objResult[name + "_ScrollOpener"] = {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: img,
        boolLeft: boolLeft,
        onTouch: OnTouch.toScrollOpener,
        openTargetTitle: Messages_1.messages[name + "_SCROLL_TITLE"],
    };
    objResult[name + "_ScrollMessage"] = {
        size: 150,
        posX: 5,
        posY: 5,
        zIndex: 1000,
        img: ImportImgs_1.default.ScrollOpen,
        scroll: true,
        visible: false,
        onTouch: OnTouch.toNothing,
        title: Messages_1.messages[name + "_SCROLL_TITLE"],
        message: Messages_1.messages[name + "_SCROLL_MESSAGE"],
        fontSize: 3,
        speakerImg: speakerImg,
        finalMessage: isFinal,
    };
    return objResult;
}
exports.getSoroll = getSoroll;
//ステージ変更用ドア
function getDoor(size, posX, posY, img, zIndex, next, nextX, nextY, nextLeft) {
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
        changeStage: CommonFnc_1.changeStage,
    };
}
exports.getDoor = getDoor;
//敵
function getEnemy(size, posX, posY, img, zIndex, speedX, speedY) {
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
exports.getEnemy = getEnemy;
//一つ目
function getOneEye(size, posX, posY, zIndex) {
    return {
        size: size,
        posX: posX,
        posY: posY,
        zIndex: zIndex,
        img: ImportImgs_1.default.Hitotsume,
        onTouch: OnTouch.toEnemy,
        enemy: true,
        eachTime: EachTime.OneEye,
    };
}
exports.getOneEye = getOneEye;
//ボス
function getBoss() {
    return {
        size: 14,
        posX: 8,
        posY: 53,
        zIndex: 25,
        img: ImportImgs_1.default.Boss,
        onTouch: OnTouch.toMortalEnemy,
        enemy: true,
        eachTime: EachTime.Boss,
    };
}
exports.getBoss = getBoss;
//ステージ変更用ゲート（左）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
function getLeftGate(next, nextX, nextY, posX) {
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
        changeStage: CommonFnc_1.changeStage,
    };
}
exports.getLeftGate = getLeftGate;
//ステージ変更用ゲート（右）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
function getRightGate(next, nextX, nextY, posX) {
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
        changeStage: CommonFnc_1.changeStage,
    };
}
exports.getRightGate = getRightGate;
//ステージ変更用ゲート（上）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
function getTopGate(next, heightOfTheGate, nextX, nextY, nextLeft) {
    var posY = heightOfTheGate - 1000 || -1012;
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
        changeStage: CommonFnc_1.changeStage,
    };
}
exports.getTopGate = getTopGate;
//ステージ変更用ゲート（下）
//引数にnextX, nextYを渡さなければ、自動的に位置が計算される
function getBottomGate(next, heightOfTheGate, nextX, nextY, nextLeft) {
    var posY = heightOfTheGate || 87;
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
        changeStage: CommonFnc_1.changeStage,
    };
}
exports.getBottomGate = getBottomGate;
//触ったら死亡する、不動オブジェクト
function getDangerousObj(size, posX, posY, img, zIndex, boolLeft) {
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
exports.getDangerousObj = getDangerousObj;
//雪 生成関数
function getSnows(strength, zIndex, reverse) {
    var objResult = {};
    var eachTimeFunc = reverse ? EachTime.SnowR : EachTime.Snow;
    for (var i = 0; i <= 160 * strength; i++) {
        for (var j = -10; j <= 75 * strength; j++) {
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
exports.getSnows = getSnows;
//鍵　生成関数
function getKeys(ninja, posX, posY, zIndex, openTargetTitle) {
    var objResult = {};
    if (ninja.readScroll.indexOf(openTargetTitle) < 0) {
        //まだ鍵を見付けていない場合のみ表示
        objResult["key"] = {
            size: 10,
            posX: posX,
            posY: posY,
            zIndex: zIndex,
            img: ImportImgs_1.default.imgKey,
            onTouch: OnTouch.toScrollOpener,
            openTargetTitle: openTargetTitle,
            boolLeft: true,
        };
    }
    return objResult;
}
exports.getKeys = getKeys;
//画面外を黒くする要素
function getObjOutOfScreen() {
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
exports.getObjOutOfScreen = getObjOutOfScreen;
//全ステージ共通の壁（render内で設定）
function getObjWalls() {
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
exports.getObjWalls = getObjWalls;
//全ステージ共通の壁（render内で設定）
function getObjFloor() {
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
exports.getObjFloor = getObjFloor;
