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
//背景画像
var cliff_jpg_1 = __importDefault(require("../img/background/cliff.jpg"));
//各オブジェクト用画像の読み込み
var ImportImgs_1 = __importDefault(require("../ImportImgs"));
//タッチ関数の読み込み
var OnTouch = __importStar(require("../OnTouch"));
var Stage = {};
Stage.getObjs = function (ninja) {
    Stage.bgImg = cliff_jpg_1.default;
    Stage.windSpeed = (ninja.snow) ? 2.5 : 0; //風速
    var returnObjs = __assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), { rock1Pic: StageParts.getOnePic(60, 135, 30, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock1Actual: StageParts.getOnePic(60, 135, 33, null, null, OnTouch.toBlock), rock2Pic: StageParts.getOnePic(50, -20, 65, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock2Actual: StageParts.getOnePic(50, -20, 68, null, null, OnTouch.toBlock), rock3Pic: StageParts.getOnePic(50, -65, 65, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock3Actual: StageParts.getOnePic(50, -65, 68, null, null, OnTouch.toBlock), bottomFall: StageParts.getDangerousObj(1000, -70, 100) });
    if (ninja.snow) {
        returnObjs = __assign(__assign(__assign({}, returnObjs), { rightGate: StageParts.getRightGate(4, 1, 75 - ninja.size) }), StageParts.getSnows(0.15, 30));
    }
    else {
        returnObjs = __assign(__assign({}, returnObjs), { boss: StageParts.getBoss(), leftGate: StageParts.getLeftGate(22) });
    }
    return returnObjs;
};
exports.default = Stage;
