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
var grave3_jpg_1 = __importDefault(require("../img/background/grave3.jpg"));
var Stage = {};
//英雄の墓３
Stage.getObjs = function (ninja) {
    Stage.bgImg = grave3_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), { bottomFall: StageParts.getDangerousObj(1000, -70, 100) }), StageParts.getFlyingRockRight("toRight", 17, 67, 31, 50)), StageParts.getFlyingRock("toUp", 17, 32, 47, 30)), { aoKinoko: StageParts.getOnePic(10, 0, 32, ImportImgs_1.default.AoKinoko, 10, OnTouch.toAoKinoko), obake1: StageParts.getEnemy(13, 75, 80, ImportImgs_1.default.Obake1, 100, 0.5, 0.5) }), StageParts.getBlocks(10, [
        [5, 3], [6, 3],
        [5, 4], [6, 4],
        [13, 3], [14, 3], [15, 3], [16, 3],
        [13, 4], [14, 4], [15, 4], [16, 4],
        [15, 5], [16, 5],
        [15, 6], [16, 6],
        [15, 7], [16, 7],
        [-2, 4], [-1, 4], [0, 4],
        [-2, 5], [-1, 5], [0, 5],
        [-2, 6], [-1, 6], [0, 6], [3, 6], [4, 6],
        [-2, 7], [-1, 7], [0, 7], [3, 7], [4, 7],
    ], OnTouch.toBlock, ImportImgs_1.default.StoneBlock, 50)), { rightGate: StageParts.getRightGate(18), topGate: StageParts.getTopGate(20, -50, null, 75) });
    return returnObjs;
};
exports.default = Stage;
