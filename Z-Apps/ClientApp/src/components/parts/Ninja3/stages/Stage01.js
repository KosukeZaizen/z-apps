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
const bgImg = require('../../Ninja/img/background/furuie5.jpg');
const Stage = {};
Stage.bgImg = bgImg;
Stage.getObjs = () => {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("POCHI", 10, 145, -20, null, ImportImgs_1.default.Pochi, 20)), { snowman: StageParts.getOnePic(12, 60, 62, ImportImgs_1.default.Snowman, 20, OnTouch.toBlock) }), StageParts.getArrowBoard(null, 7, 60, 10, true)), { leftGate: StageParts.getLeftGate(2) }), StageParts.getSnows(0.1, 30));
};
exports.default = Stage;
