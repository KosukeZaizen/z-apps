"use strict";
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
const StageParts = __importStar(require("./StagePartsGenerator"));
//各オブジェクト用画像の読み込み
const ImportImgs_1 = __importDefault(require("../ImportImgs"));
//タッチ関数の読み込み
const OnTouch = __importStar(require("../OnTouch"));
//背景画像
const bgImg = require('../img/background/tengumura3.jpg');
const Stage = {};
//キノコ村　街中２
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0; //風速
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { aoKinoko: StageParts.getOnePic(10, 127, 28, ImportImgs_1.default.AoKinoko, 10, OnTouch.toAoKinoko), rockPic: StageParts.getOnePic(50, -17, 59, ImportImgs_1.default.RockR, 60, OnTouch.toNothing), rockActual: StageParts.getOnePic(50, -17, 62, null, null, OnTouch.toBlock), rock2Pic: StageParts.getOnePic(50, 8, 59, ImportImgs_1.default.RockR, 60, OnTouch.toNothing), rock2Actual: StageParts.getOnePic(50, 8, 62, null, null, OnTouch.toBlock) }), StageParts.getBlocks(12, [
        [10, 3], [11, 3],
        [-2, 6], [-1, 6], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
    ], OnTouch.toBlock, ImportImgs_1.default.Block, 50)), { rightGate: StageParts.getRightGate(13), leftGate: StageParts.getLeftGate(11, null, 75 - ninja.size) });
    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = Object.assign(Object.assign(Object.assign({}, returnObjs), StageParts.getSoroll("GIRL1", 18, 95, 51, ImportImgs_1.default.Girl1, ImportImgs_1.default.Girl1, 20)), StageParts.getSnows(0.1, 30));
    }
    else {
        //雪がやんだとき
        returnObjs = Object.assign(Object.assign({}, returnObjs), { obake1: StageParts.getEnemy(13, 65, 20, ImportImgs_1.default.Obake2, 100, 0.5, 0.5) });
    }
    return returnObjs;
};
exports.default = Stage;
