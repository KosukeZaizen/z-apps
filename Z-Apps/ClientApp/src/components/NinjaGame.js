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
const Page1_1 = require("./parts/Ninja/Page1");
const Page2_1 = require("./parts/Ninja/Page2");
require("../css/NinjaGame.css");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
class NinjaGame extends React.Component {
    constructor(props) {
        super(props);
        let ninja;
        let stage;
        //セーブデータ読み込み
        const saveData = localStorage.getItem('saveData1');
        if (saveData) {
            //セーブデータがあればそれを設定
            const objSaveData = JSON.parse(saveData);
            ninja = objSaveData.ninja || {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: -20,
                readScroll: [],
            };
            stage = objSaveData.stage || 1;
        }
        else {
            //セーブデータがなければ、初期値を設定
            ninja = {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: -20,
                readScroll: [],
            };
            stage = 1;
        }
        this.state = {
            language: "English",
            curPage: 1,
            stage: stage,
            //stage: 1,
            ninja: ninja,
        };
        this.readElementScroll = [];
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
            backgroundColor: "black",
            zIndex: 9999999,
            userSelect: "none",
            touchCallout: "none",
        };
        return (React.createElement("div", { className: "center", id: "ninja-game", style: style },
            React.createElement(Helmet_1.default, { title: "Lingual Ninja Games - Scrolls of The Four Elements", desc: "Japanese action game! Be a Ninja, and collect the scrolls in Japan!" }),
            React.createElement(Pages, { state: this.state, changePage: (i, lang) => { this.changePage(i, lang); }, changeStage: (i, j) => { this.changeStage(i, j); }, readElementScroll: this.readElementScroll })));
    }
}
;
function Pages(props) {
    if (props.state.curPage === 1) {
        return (React.createElement(Page1_1.Page1, { changePage: (i, lang) => { props.changePage(i, lang); } }));
    }
    else if (props.state.curPage === 2) {
        return (React.createElement(Page2_1.Page2, { changeStage: (i, j) => { props.changeStage(i, j); }, ninja: props.state.ninja, stage: props.state.stage, readElementScroll: props.readElementScroll, language: props.state.language }));
    }
}
exports.default = NinjaGame;
