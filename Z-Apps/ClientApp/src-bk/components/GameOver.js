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
const react_router_dom_1 = require("react-router-dom");
const functions_1 = require("./common/functions");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
class GameOver extends React.Component {
    render() {
        this.consts = {
            BTN_START_CLASS: "btn btn-primary btn-lg btn-block",
        };
        const bottomMargin = {
            marginBottom: 20,
        };
        //urlパラメータ取得
        const params = functions_1.getParams();
        const game = params["g"] || "";
        const lang = params["l"] || "";
        const gameUrl = "/" + game + "?l=" + lang;
        let title;
        let msgButton;
        if (lang === "Japanese") {
            title = "Oops!　ゲームオーバー!";
            msgButton = "続きから再開";
        }
        else {
            title = "Oops! Game over!";
            msgButton = "Continue the game";
        }
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: "Game Over", noindex: true }),
            React.createElement("h2", { style: bottomMargin }, title),
            React.createElement(react_router_dom_1.Link, { to: gameUrl },
                React.createElement("button", { className: this.consts.BTN_START_CLASS }, msgButton))));
    }
}
exports.default = GameOver;
