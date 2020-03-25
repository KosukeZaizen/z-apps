"use strict";
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
const React = __importStar(require("react"));
const Page1_1 = require("./parts/Ninja3/Page1");
const Page2_1 = require("./parts/Ninja3/Page2");
const Consts = __importStar(require("./parts/Ninja3/Consts"));
const functions_1 = require("./common/functions");
require("../css/NinjaGame2.css"); //CSSは2のもの
const Helmet_1 = __importDefault(require("./parts/Helmet"));
class NinjaGame extends React.Component {
    constructor(props) {
        super(props);
        let ninja;
        let stage;
        const initialNinja = {
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
        const saveData = localStorage.getItem(Consts.SAVE_NAME);
        //セーブデータがあればそれを設定
        const objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            ninja = objSaveData.ninja || initialNinja;
            stage = objSaveData.stage || 1;
        }
        else {
            ninja = initialNinja;
            stage = 1;
        }
        let lang;
        if (ninja && ninja.lang) {
            //セーブデータからlangが読み込めた場合
            lang = ninja.lang;
        }
        else {
            //urlパラメータ取得
            const params = functions_1.getParams();
            lang = (params) ? params["l"] : "";
        }
        //デバッグ用★
        /*
        stage = 4;
        ninja.snow = false;
        */
        this.state = {
            language: lang,
            curPage: 1,
            stage: stage,
            ninja: ninja,
        };
        this.readElementScroll = [];
        this.changePage = this.changePage.bind(this);
        this.changeStage = this.changeStage.bind(this);
    }
    changePage(num, lang) {
        this.setState({
            curPage: num,
            language: lang,
        });
    }
    changeStage(num, ninja) {
        this.readElementScroll = [];
        this.setState({
            stage: num,
            ninja: ninja,
            curPage: 2,
        });
    }
    render() {
        let style = {
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
        return (React.createElement("div", { className: "center", id: "ninja-game", style: style },
            React.createElement(Helmet_1.default, { title: "Lingual Ninja Games - Frozen Nightmare", desc: "Japanese action game! Be a ninja, and save the village from the monsters!" }),
            React.createElement(Pages, { state: this.state, changePage: (i, lang) => { this.changePage(i, lang); }, changeStage: (i, j) => { this.changeStage(i, j); }, readElementScroll: this.readElementScroll })));
    }
}
;
function Pages(props) {
    if (props.state.curPage === 2 || props.state.language) {
        return (React.createElement(Page2_1.Page2, { changeStage: (i, j) => { props.changeStage(i, j); }, ninja: props.state.ninja, stage: props.state.stage, readElementScroll: props.readElementScroll, language: props.state.language }));
    }
    else if (props.state.curPage === 1) {
        return (React.createElement(Page1_1.Page1, { changePage: (i, lang) => { props.changePage(i, lang); } }));
    }
}
exports.default = NinjaGame;
