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
//背景画像
var snow4_jpg_1 = __importDefault(require("../img/background/snow4.jpg"));
var snow4_2_jpg_1 = __importDefault(require("../img/background/snow4-2.jpg"));
var Stage = {};
Stage.getObjs = function (ninja) {
    Stage.windSpeed = (ninja.snow) ? -3.2 : 0; //風速
    var returnObjs = __assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { leftGate: StageParts.getLeftGate(7, null, null, -9), rightGate: StageParts.getRightGate(9, -8) });
    if (ninja.snow) {
        //雪の時
        Stage.bgImg = snow4_jpg_1.default;
        returnObjs = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, returnObjs), StageParts.getFrozenObj("obake1", 10, 55, 43, ImportImgs_1.default.Obake1)), StageParts.getFrozenObj("obake2", 10, 40, 35, ImportImgs_1.default.Obake2)), StageParts.getFrozenObj("obake3", 10, 25, 34, ImportImgs_1.default.Obake1)), StageParts.getFrozenObj("obake4", 10, 122, 44, ImportImgs_1.default.Obake2, 11)), StageParts.getFrozenObj("obake5", 10, 140, 24, ImportImgs_1.default.Obake1)), StageParts.getFrozenObj("obake6", 10, 87, 65, ImportImgs_1.default.Obake2)), StageParts.getFrozenObj("obake7", 13, 110, 30, ImportImgs_1.default.Shinigami)), StageParts.getFrozenObj("oni1", 26, 98, 50, ImportImgs_1.default.Oni, 9)), StageParts.getFrozenObj("oni2", 22, 125, 54, ImportImgs_1.default.Oni)), StageParts.getFrozenObj("oni3", 12, 60, 64, ImportImgs_1.default.Oni)), StageParts.getFrozenObj("oni5", 12, 10, 64, ImportImgs_1.default.Oni)), StageParts.getFrozenObj("oni6", 24, 73, 52, ImportImgs_1.default.Shinigami, 9)), StageParts.getFrozenObj("oni7", 32, 20, 44, ImportImgs_1.default.Oni, 9)), StageParts.getSnows(0.15, 30));
        if (ninja.posX < 80) {
            //左から来た時
            returnObjs = __assign(__assign({}, returnObjs), StageParts.getFlyingRockRight(1, 17, -17, 20, 50));
        }
    }
    else {
        //雪がやんだとき
        Stage.bgImg = snow4_2_jpg_1.default;
        returnObjs = __assign(__assign({}, returnObjs), { oni1: StageParts.getEnemy(15, 65, 61, ImportImgs_1.default.Oni, 100, 0.4, 0), oni2: StageParts.getEnemy(20, 55, 56, ImportImgs_1.default.Oni, 100, 0.35, 0), oni3: StageParts.getEnemy(13, 45, 63, ImportImgs_1.default.Oni, 100, 0.5, 0), obake2: StageParts.getEnemy(30, 65, -20, ImportImgs_1.default.Obake2, 100, 0.4, 0.4) });
    }
    return returnObjs;
};
exports.default = Stage;
