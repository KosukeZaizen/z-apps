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
const bgImg = require('../img/background/tengumura2.jpg');
const Stage = {};
//キノコ村　街中１
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0; //風速
    let returnObjs = Object.assign(Object.assign(Object.assign(Object.assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { rightGate: StageParts.getRightGate(12), leftGate: StageParts.getLeftGate(10) });
    if (ninja.snow) {
        //雪が降っているとき
        returnObjs = Object.assign(Object.assign(Object.assign({}, returnObjs), StageParts.getSoroll("SHINO3", 10, 47, 62, ImportImgs_1.default.Shino, ImportImgs_1.default.Shino, 20)), StageParts.getSnows(0.1, 30));
    }
    else {
        //雪がやんだとき
        returnObjs = Object.assign(Object.assign({}, returnObjs), { shinigami: StageParts.getEnemy(16, 65, 45, ImportImgs_1.default.Shinigami, 100, 0.4, 0.4) });
    }
    return returnObjs;
};
exports.default = Stage;
