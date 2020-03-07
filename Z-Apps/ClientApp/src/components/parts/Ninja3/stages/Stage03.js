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
var ryokan1_jpg_1 = __importDefault(require("../../Ninja/img/background/ryokan1.jpg"));
var Stage = {};
Stage.bgImg = ryokan1_jpg_1.default;
Stage.getObjs = function () {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("POCHI2", 10, 50, 62, ImportImgs_1.default.Pochi, ImportImgs_1.default.Pochi, 20)), { butsudan: StageParts.getOnePic(40, 5, 32, ImportImgs_1.default.Butsudan, 20, OnTouch.toTree) }), StageParts.getSoroll("TOBIISHI", 10, 19, 42, ImportImgs_1.default.Scroll, null, 22)), { rightGate: StageParts.getRightGate(2) });
};
exports.default = Stage;
