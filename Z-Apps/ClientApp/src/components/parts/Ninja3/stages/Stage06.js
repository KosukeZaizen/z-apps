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
var snow2_jpg_1 = __importDefault(require("../img/background/snow2.jpg"));
var snow2_2_jpg_1 = __importDefault(require("../img/background/snow2-2.jpg"));
var Stage = {};
//修行僧がいる雪道
Stage.getObjs = function (ninja) {
    Stage.windSpeed = (ninja.snow) ? -1 : 0; //風速
    var returnObjs = __assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { leftGate: StageParts.getLeftGate(4), rightGate: StageParts.getRightGate(7, 1, 75 - ninja.size) });
    if (ninja.snow) {
        //雪の時
        Stage.bgImg = snow2_jpg_1.default;
        returnObjs = __assign(__assign(__assign(__assign(__assign({}, returnObjs), StageParts.getSoroll("MONK", 17, 122, 58, ImportImgs_1.default.Monk, ImportImgs_1.default.Monk, 20)), StageParts.getIceBlocks(10, [
            [15, -7],
            [15, -6],
            [15, -5],
            [15, -4],
            [15, -3],
            [15, -2],
            [15, -1],
            [15, 0],
            [15, 1],
            [15, 2],
            [5, 3], [6, 3], [7, 3], [15, 3],
            [4, 4], [5, 4], [6, 4], [7, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
            [3, 5], [4, 5], [5, 5],
        ], OnTouch.toBlock, ImportImgs_1.default.Ice, 30, 0.7)), StageParts.getFlyingRock(1, 34, 78, 46, 30, -50)), StageParts.getSnows(0.15, 30));
    }
    else {
        //雪がやんだとき
        Stage.bgImg = snow2_2_jpg_1.default;
        returnObjs = __assign(__assign(__assign({}, returnObjs), { oni1: StageParts.getEnemy(67, 20, 11, ImportImgs_1.default.Oni, 100, 0.2, 0), obake1: StageParts.getEnemy(16, 35, 65, ImportImgs_1.default.Obake1, 101, 0.4, 0.4), obake2: StageParts.getEnemy(13, 20, 15, ImportImgs_1.default.Obake2, 102, 0.4, 0.4), obake3: StageParts.getEnemy(10, 22, 35, ImportImgs_1.default.Obake2, 102, 0.3, 0.3) }), StageParts.getFlyingRock(1, 20, 120, 60, 30, -50));
    }
    return returnObjs;
};
exports.default = Stage;
