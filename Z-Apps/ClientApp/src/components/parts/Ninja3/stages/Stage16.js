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
//タイムステップごとの処理
const EachTime = __importStar(require("../EachTime"));
//背景画像
const bgImg = require('../img/background/washitsu.jpg');
const Stage = {};
//仙人の家（室内）
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { sapphire: StageParts.getOnePic(25, 69, 3, ImportImgs_1.default.Sapphire, 10, OnTouch.toNothing) }), StageParts.getSoroll("MELT", 10, 3, 65, ImportImgs_1.default.Scroll, ImportImgs_1.default.IceStone, 22)), StageParts.getIceBlocks(10, [
        [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
        [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2],
        [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3],
        [-2, 4], [-1, 4], [0, 4], [1, 4], [2, 4],
        [-2, 5], [-1, 5], [0, 5], [1, 5], [2, 5],
        [2, 6],
    ], OnTouch.toIceBlock, ImportImgs_1.default.Ice, 90)), { rightGate: StageParts.getRightGate(9, 106, 75 - ninja.size) });
    if (ninja.snow) {
        returnObjs = Object.assign(Object.assign(Object.assign(Object.assign({}, returnObjs), StageParts.getSoroll("SENNIN", 14, 50, 60, ImportImgs_1.default.Sennin, ImportImgs_1.default.Sennin, 20)), { iceBlockSnow: {
                size: 10,
                posX: 20,
                posY: 70,
                zIndex: 90,
                img: ImportImgs_1.default.Ice,
                onTouch: OnTouch.toIceBlock,
                eachTime: EachTime.IceBlock,
            } }), StageParts.getSnows(0.1, 30, true));
    }
    return returnObjs;
};
exports.default = Stage;
