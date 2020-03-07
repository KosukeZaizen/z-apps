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
var last_jpg_1 = __importDefault(require("../img/background/last.jpg"));
var Stage = {};
//クリア後
Stage.getObjs = function (ninja) {
    Stage.bgImg = last_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("SENNIN3", 15, 45, 55, ImportImgs_1.default.Sennin, ImportImgs_1.default.Sennin, 22, false, true)), { rock00Pic: StageParts.getOnePic(50, 155, 68, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock00Actual: StageParts.getOnePic(50, 155, 71, null, null, OnTouch.toBlock), rock0Pic: StageParts.getOnePic(50, 110, 68, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock0Actual: StageParts.getOnePic(50, 110, 71, null, null, OnTouch.toBlock), rock1Pic: StageParts.getOnePic(50, 65, 68, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock1Actual: StageParts.getOnePic(50, 65, 71, null, null, OnTouch.toBlock), rock2Pic: StageParts.getOnePic(50, 20, 68, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock2Actual: StageParts.getOnePic(50, 20, 71, null, null, OnTouch.toBlock), rock3Pic: StageParts.getOnePic(50, -25, 68, ImportImgs_1.default.RockR, 20, OnTouch.toNothing), rock3Actual: StageParts.getOnePic(50, -25, 71, null, null, OnTouch.toBlock) });
    return returnObjs;
};
exports.default = Stage;
