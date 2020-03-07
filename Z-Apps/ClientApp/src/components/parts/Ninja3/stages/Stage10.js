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
var tengumura1_jpg_1 = __importDefault(require("../img/background/tengumura1.jpg"));
var Stage = {};
//夜の階段（仙人の家の近く）
Stage.getObjs = function (ninja) {
    Stage.bgImg = tengumura1_jpg_1.default;
    Stage.windSpeed = (ninja.snow) ? 1 : 0; //風速
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("SIGN2", 20, 115, 60, ImportImgs_1.default.Kanban1, null, 10)), StageParts.getArrowBoard("SIGN4", 12, 60, 10, true)), { rightGate: StageParts.getRightGate(11), leftGate: StageParts.getLeftGate(9) });
    if (ninja.snow) {
        returnObjs = __assign(__assign({}, returnObjs), StageParts.getSnows(0.15, 30));
    }
    return returnObjs;
};
exports.default = Stage;
