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
var grave2_jpg_1 = __importDefault(require("../img/background/grave2.jpg"));
var Stage = {};
//英雄の墓２
Stage.getObjs = function (ninja) {
    Stage.bgImg = grave2_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getFlyingRockRight("toRight", 17, 77, 21, 50)), { downArrow: StageParts.getOnePic(15, 9, 52, ImportImgs_1.default.DownArrow, 10, OnTouch.toNothing) }), StageParts.getBlocks(10, [
        [5, 2], [6, 2], [7, 2],
        [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
        [-2, 3.7], [-1, 3.7], [0, 3.7], [1, 3.7], [2, 3.7], [3, 3.7], [4, 3.7], [5, 3.7], [6, 3.7], [7, 3.7],
        [-2, 4], [-1, 4], [0, 4],
        [-2, 5], [-1, 5], [0, 5],
        [-2, 6], [-1, 6], [0, 6], [3, 6], [4, 6],
        [-2, 7], [-1, 7], [0, 7], [3, 7], [4, 7],
    ], OnTouch.toBlock, ImportImgs_1.default.StoneBlock, 50)), { rightGate: StageParts.getRightGate(17, -8, null, 9), leftGate: StageParts.getLeftGate(19), gateToLastRoom: StageParts.getDoor(22, 9, 80, null, 10, 21, 145, -10, true) });
    if (ninja.posX > 80) {
        //左から来た時
        returnObjs = __assign(__assign(__assign(__assign({}, returnObjs), StageParts.getFlyingRockLeft(1, 17, 160, 21, 30, 55)), StageParts.getFlyingRockLeft(2, 17, 160, 52, 30)), { bottomGate: StageParts.getBottomGate(17, 90, 115, -12, true) });
    }
    else {
        returnObjs = __assign(__assign({}, returnObjs), { bottomGate: StageParts.getBottomGate(18, 90, 0, 0) });
    }
    return returnObjs;
};
exports.default = Stage;
