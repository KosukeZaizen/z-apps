"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __importStar(require("react"));
var Page1_1 = require("./parts/Ninja3/Page1");
var Page2_1 = require("./parts/Ninja3/Page2");
var Consts = __importStar(require("./parts/Ninja3/Consts"));
var functions_1 = require("./common/functions");
require("../css/NinjaGame2.css"); //CSSは2のもの
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var NinjaGame = /** @class */ (function (_super) {
    __extends(NinjaGame, _super);
    function NinjaGame(props) {
        var _this = _super.call(this, props) || this;
        var ninja;
        var stage;
        var initialNinja = {
            size: 12,
            speedX: 0,
            speedY: 0,
            posX: 145,
            posY: -20,
            readScroll: [],
            //readScroll: ["飛び石の術", "半化の術", "踏みつけの術"],//デバッグ用★
            boolLeft: true,
            snow: true,
        };
        //セーブデータ読み込み
        var saveData = localStorage.getItem(Consts.SAVE_NAME);
        //セーブデータがあればそれを設定
        var objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            ninja = objSaveData.ninja || initialNinja;
            stage = objSaveData.stage || 1;
        }
        else {
            ninja = initialNinja;
            stage = 1;
        }
        var lang;
        if (ninja && ninja.lang) {
            //セーブデータからlangが読み込めた場合
            lang = ninja.lang;
        }
        else {
            //urlパラメータ取得
            var params = functions_1.getParams();
            lang = (params) ? params.l : "";
        }
        //デバッグ用★
        /*
        stage = 4;
        ninja.snow = false;
        */
        _this.state = {
            language: lang,
            curPage: 1,
            stage: stage,
            ninja: ninja,
        };
        _this.readElementScroll = [];
        _this.changePage = _this.changePage.bind(_this);
        _this.changeStage = _this.changeStage.bind(_this);
        return _this;
    }
    NinjaGame.prototype.changePage = function (num, lang) {
        this.setState({
            curPage: num,
            language: lang,
        });
    };
    NinjaGame.prototype.changeStage = function (num, ninja) {
        this.readElementScroll = [];
        this.setState({
            stage: num,
            ninja: ninja,
            curPage: 2,
        });
    };
    NinjaGame.prototype.render = function () {
        var _this = this;
        var style = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: 9999999,
            userSelect: "none",
            touchCallout: "none",
        };
        return (<center id="ninja-game" style={style}>
                <Helmet_1.default title="Lingual Ninja Games - Frozen Nightmare" desc="Japanese action game! Be a ninja, and save the village from the monsters!"/>
                <Pages state={this.state} changePage={function (i, lang) { _this.changePage(i, lang); }} changeStage={function (i, j) { _this.changeStage(i, j); }} changeLanguage={function () { _this.changeLanguage(); }} readElementScroll={this.readElementScroll}/>
            </center>);
    };
    return NinjaGame;
}(React.Component));
;
function Pages(props) {
    if (props.state.curPage === 2 || props.state.language) {
        return (<Page2_1.Page2 changeStage={function (i, j) { props.changeStage(i, j); }} ninja={props.state.ninja} stage={props.state.stage} readElementScroll={props.readElementScroll} language={props.state.language}/>);
    }
    else if (props.state.curPage === 1) {
        return (<Page1_1.Page1 changePage={function (i, lang) { props.changePage(i, lang); }}/>);
    }
}
exports.default = NinjaGame;
