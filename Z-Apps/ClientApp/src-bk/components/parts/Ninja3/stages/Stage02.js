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
const bgImg = require('../../Ninja/img/background/town1.jpg');
const Stage = {};
Stage.bgImg = bgImg;
Stage.getObjs = () => {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getFlyingRock(1, 17, 20, 63, 30)), { toriiPic: StageParts.getOnePic(120, 35, 3, ImportImgs_1.default.Torii, 10, OnTouch.toNothing), toriiActual: StageParts.getOnePic(100, 45, 9, null, null, OnTouch.toTree), toriiFramePic: StageParts.getOnePic(40, 75, 5, ImportImgs_1.default.Frame, 30, OnTouch.toNothing), toriiMessage1: StageParts.getMessage(30, 87, 10, "Welcome", 4, 30, OnTouch.toNothing), toriiMessage2: StageParts.getMessage(30, 93, 15, "to", 4, 30, OnTouch.toNothing), toriiMessage3: StageParts.getMessage(30, 89, 20, "Japan!", 4, 30, OnTouch.toNothing), rightGate: StageParts.getRightGate(1), leftGate: StageParts.getLeftGate(3), topGate: StageParts.getTopGate(4, -100, 0, -20) }), StageParts.getSnows(0.1, 30));
};
exports.default = Stage;
