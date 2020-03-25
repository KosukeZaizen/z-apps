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
const bgImg = require('../img/background/grave4.jpg');
const Stage = {};
//半化の書
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getFlyingRock("toUp", 17, 32, 150, 30, -100)), StageParts.getSoroll("HANKA", 10, 88, 43, ImportImgs_1.default.Scroll, ImportImgs_1.default.AoKinoko, 22)), StageParts.getBlocks(10, [
        [8.4, 5.3], [9.4, 5.3],
    ], OnTouch.toBlock, ImportImgs_1.default.StoneBlock, 50)), { bottomGate: StageParts.getBottomGate(19, 200, 52) });
    return returnObjs;
};
exports.default = Stage;
