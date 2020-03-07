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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//ステージの部品作成用関数群の読み込み
var StageParts = __importStar(require("./StagePartsGenerator"));
//各オブジェクト用画像の読み込み
var ImportImgs_1 = __importDefault(require("../ImportImgs"));
//タッチ関数の読み込み
var OnTouch = __importStar(require("../OnTouch"));
//背景画像
var grave1_jpg_1 = __importDefault(require("../img/background/grave1.jpg"));
var Stage = {};
//英雄の墓１
Stage.getObjs = function (ninja) {
    Stage.bgImg = grave1_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getFlyingRockLeft("toLeft1", 17, 96, 21, 50)), StageParts.getFlyingRockLeft("toLeft2", 17, 56, 52, 50)), StageParts.getFlyingRock("toUp", 17, 135, 16, 30)), StageParts.getBlocks(10, [
        [11, 2], [12, 2],
        [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],
        [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
        [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5],
        [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6],
        [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7],
    ], OnTouch.toBlock, ImportImgs_1.default.StoneBlock, 50)), { leftGate: StageParts.getLeftGate(18, 157, null, -9), topGate: StageParts.getTopGate(15, -50, 125, 63) });
    if (ninja.posX < 80) {
        //左から来た時
        returnObjs = __assign(__assign(__assign({}, returnObjs), StageParts.getFlyingRockRight("toRight", 17, -17, 21, 30, 110)), { bottomGate: StageParts.getBottomGate(17, 90, 115, -12, true) });
    }
    else {
        returnObjs = __assign(__assign({}, returnObjs), { bottomFall: StageParts.getDangerousObj(1000, -70, 100) });
    }
    return returnObjs;
};
exports.default = Stage;
