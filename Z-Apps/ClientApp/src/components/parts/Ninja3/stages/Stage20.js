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
var grave4_jpg_1 = __importDefault(require("../img/background/grave4.jpg"));
var Stage = {};
//半化の書
Stage.getObjs = function (ninja) {
    Stage.bgImg = grave4_jpg_1.default;
    var returnObjs = __assign(__assign(__assign(__assign(__assign(__assign({}, StageParts.getObjOutOfScreen()), StageParts.getObjWalls()), StageParts.getFlyingRock("toUp", 17, 32, 150, 30, -100)), StageParts.getSoroll("HANKA", 10, 88, 43, ImportImgs_1.default.Scroll, ImportImgs_1.default.AoKinoko, 22)), StageParts.getBlocks(10, [
        [8.4, 5.3], [9.4, 5.3],
    ], OnTouch.toBlock, ImportImgs_1.default.StoneBlock, 50)), { bottomGate: StageParts.getBottomGate(19, 200, 52) });
    return returnObjs;
};
exports.default = Stage;
