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
const bgImg1 = require('../img/background/snow3.jpg');
const bgImg2 = require('../img/background/snow3-2.jpg');
const Stage = {};
Stage.getObjs = (ninja) => {
    Stage.windSpeed = (ninja.snow) ? -3.5 : 0; //風速
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { leftGate: StageParts.getLeftGate(6), rightGate: StageParts.getRightGate(8, -5) });
    if (ninja.snow) {
        //雪の時
        Stage.bgImg = bgImg1;
        returnObjs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, returnObjs), StageParts.getSoroll("SHINO2", 10, 63, 62, ImportImgs_1.default.Shino, ImportImgs_1.default.Shino, 20)), StageParts.getFlyingRockRight(1, 17, 8, 20, 50)), StageParts.getFrozenObj("oni", 22, 110, 54, ImportImgs_1.default.Oni)), StageParts.getFrozenObj("obake1", 10, 80, 50, ImportImgs_1.default.Obake1)), StageParts.getFrozenObj("obake2", 10, 70, 25, ImportImgs_1.default.Obake2)), StageParts.getFrozenObj("obake3", 10, 25, 40, ImportImgs_1.default.Obake2)), StageParts.getFrozenObj("obake4", 10, 136, 32, ImportImgs_1.default.Obake2)), StageParts.getIceBlocks(10, [
            [0, -3],
            [0, -2],
            [0, -1],
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
        ], OnTouch.toBlock, ImportImgs_1.default.Ice, 90)), StageParts.getSnows(0.15, 30));
    }
    else {
        //雪がやんだとき
        Stage.bgImg = bgImg2;
        returnObjs = Object.assign(Object.assign(Object.assign({}, returnObjs), { oneEye: StageParts.getOneEye(12, 75, 5, 30) }), StageParts.getIceBlocks(10, [
            [7, 2], [8, 2], [9, 2], [10, 2],
            [7, 3], [8, 3], [9, 3], [10, 3],
            [7, 4], [8, 4],
            [7, 5], [8, 5],
            [7, 6], [8, 6],
            [7, 7], [8, 7],
        ], OnTouch.toIceBlock, ImportImgs_1.default.Ice, 90));
    }
    return returnObjs;
};
exports.default = Stage;
