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
//背景画像
const bgImg = require('../img/background/tengumura5.jpg');
const Stage = {};
//墓場への階段
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0; //風速
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getArrowBoard(null, 25, 60, 10)), { rightGate: StageParts.getRightGate(15), leftGate: StageParts.getLeftGate(13) });
    if (ninja.snow) {
        //雪が降っている
        returnObjs = Object.assign(Object.assign({}, returnObjs), StageParts.getSnows(0.1, 30));
    }
    else {
        //雪がやんだ
        returnObjs = Object.assign(Object.assign({}, returnObjs), { obake1: StageParts.getEnemy(13, 65, 50, ImportImgs_1.default.Obake2, 100, 0.5, 0.5) });
    }
    return returnObjs;
};
exports.default = Stage;
