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
var snow1_jpg_1 = __importDefault(require("../img/background/snow1.jpg"));
var Stage = {};
Stage.getObjs = function (ninja) {
    Stage.bgImg = snow1_jpg_1.default;
    Stage.windSpeed = 0; //風速の最大・最小
    var returnObjs = __assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("SIGN", 20, 12, 60, ImportImgs_1.default.Kanban1, null, 10)), { kanban1ArrowPic: StageParts.getOnePic(10, 16, 63, ImportImgs_1.default.Arrow1, 10, OnTouch.toNothing, true), rightGate: StageParts.getRightGate(6), leftGate: StageParts.getLeftGate(5, 145, 32 - ninja.size) });
    if (ninja.snow) {
        //雪の時
        returnObjs = __assign(__assign(__assign(__assign({}, returnObjs), StageParts.getSoroll("SHINO", 10, 110, 62, ImportImgs_1.default.Shino, ImportImgs_1.default.Shino, 20)), StageParts.getFrozenObj("kinoko", 10, 61, 67, ImportImgs_1.default.AkaKinoko)), StageParts.getSnows(0.1, 30));
    }
    else {
        //雪がやんだとき
        returnObjs = __assign(__assign(__assign({}, returnObjs), { akaKinoko: StageParts.getOnePic(10, 61, 67, ImportImgs_1.default.AkaKinoko, 10, OnTouch.toAkaKinoko) }), StageParts.getSoroll("SHINO4", 10, 110, 62, ImportImgs_1.default.Shino, ImportImgs_1.default.Shino, 20));
    }
    return returnObjs;
};
exports.default = Stage;
