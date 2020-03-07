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
var grave5_jpg_1 = __importDefault(require("../img/background/grave5.jpg"));
var Stage = {};
//踏みつけの書
Stage.getObjs = function (ninja) {
    Stage.bgImg = grave5_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("HUMITSUKE", 10, 67, 59, ImportImgs_1.default.Scroll, ImportImgs_1.default.Hige, 22)), { stopSnow: StageParts.getOnePic(10, 67, 59, null, 0, OnTouch.toStopSnow), akaKinoko: StageParts.getOnePic(20, 61, 62, ImportImgs_1.default.AkaKinoko, 10, OnTouch.toAkaKinoko) }), StageParts.getFlyingRock("toUp", 17, 8, 62, 30)), { topGate: StageParts.getTopGate(15, -50, 57, 63, true), leftGate: StageParts.getLeftGate(15, 125, 63, -9) });
    return returnObjs;
};
exports.default = Stage;
