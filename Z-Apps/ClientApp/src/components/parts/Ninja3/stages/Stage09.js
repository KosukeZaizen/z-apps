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
var snow5_jpg_1 = __importDefault(require("../img/background/snow5.jpg"));
var Stage = {};
//仙人の家（外）
Stage.getObjs = function (ninja) {
    Stage.bgImg = snow5_jpg_1.default;
    Stage.windSpeed = (ninja.snow) ? 0 : 0; //風速
    var returnObjs = __assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), { ice: StageParts.getOnePic(16, 71, 12, ImportImgs_1.default.IceStone, 15, OnTouch.toNothing), toriiFramePic: StageParts.getOnePic(15, 72, 45, ImportImgs_1.default.Frame, 20, OnTouch.toNothing), toriiMessage1: StageParts.getMessage(20, 77, 46, "仙", 5, 22, OnTouch.toNothing), jizo1: StageParts.getOnePic(12, 50, 64, ImportImgs_1.default.Jizo, 20, OnTouch.toBlock), jizo2: StageParts.getOnePic(12, 96, 64, ImportImgs_1.default.Jizo, 20, OnTouch.toBlock), door: StageParts.getDoor(15, 72, 60, ImportImgs_1.default.DarkDoor, 10, 16, 135, 63, true), rightGate: StageParts.getRightGate(10), leftGate: StageParts.getLeftGate(8, null, null, -9) });
    if (ninja.snow) {
        //雪の時
        returnObjs = __assign(__assign({}, returnObjs), StageParts.getSnows(0.15, 30, true));
        if (ninja.posX < 80) {
            //左から来た時
            returnObjs = __assign(__assign({}, returnObjs), StageParts.getFlyingRockRight(1, 17, -17, 20, 50));
        }
    }
    else {
        //雪がやんだとき
        returnObjs = __assign(__assign({}, returnObjs), { obake2: StageParts.getEnemy(16, 65, 45, ImportImgs_1.default.Obake2, 100, 0.4, 0.4) });
    }
    return returnObjs;
};
exports.default = Stage;
