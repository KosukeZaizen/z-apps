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
var tengumura6_jpg_1 = __importDefault(require("../img/background/tengumura6.jpg"));
var Stage = {};
//英雄の墓
Stage.getObjs = function (ninja) {
    Stage.bgImg = tengumura6_jpg_1.default;
    Stage.windSpeed = (ninja.snow) ? 1 : 0; //風速
    var returnObjs = __assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getSoroll("SIGN3", 15, 70, 60, ImportImgs_1.default.Kanban1, null, 20)), StageParts.getBlocks(10, [
        [-2, 7.3], [-1, 7.3], [0, 7.3], [1, 7.3], [2, 7.3], [3, 7.3], [4, 7.3], [5, 7.3], [6, 7.3], [7, 7.3], [8, 7.3], [9, 7.3],
        [9.3, 7.3], [12.7, 7.3],
        [13, 7.3], [14, 7.3], [15, 7.3], [16, 7.3],
    ], OnTouch.toBlock, ImportImgs_1.default.Block, 50)), { leftGate: StageParts.getLeftGate(14), topGate: StageParts.getTopGate(13, -100, 120, 10), bottomGate: StageParts.getBottomGate(17, 100, null, null, true) });
    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = __assign(__assign(__assign({}, returnObjs), StageParts.getFlyingRock(2, 30, 100, 48, 30, null, ImportImgs_1.default.Grave)), StageParts.getSnows(0.1, 30));
    }
    else {
        //雪がやんだとき
        returnObjs = __assign(__assign({}, returnObjs), StageParts.getSoroll("SENNIN2", 14, 30, 58, ImportImgs_1.default.Sennin, ImportImgs_1.default.Sennin, 20));
    }
    return returnObjs;
};
exports.default = Stage;
