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
var furuie5_jpg_1 = __importDefault(require("../../Ninja/img/background/furuie5.jpg"));
var Stage = {};
Stage.bgImg = furuie5_jpg_1.default;
Stage.getObjs = function () {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getObjFloor()), StageParts.getSoroll("POCHI", 10, 145, -20, null, ImportImgs_1.default.Pochi, 20)), { snowman: StageParts.getOnePic(12, 60, 62, ImportImgs_1.default.Snowman, 20, OnTouch.toBlock) }), StageParts.getArrowBoard(null, 7, 60, 10, true)), { leftGate: StageParts.getLeftGate(2) }), StageParts.getSnows(0.1, 30));
};
exports.default = Stage;
