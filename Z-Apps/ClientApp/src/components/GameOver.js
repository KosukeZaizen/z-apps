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
var react_router_dom_1 = require("react-router-dom");
var functions_1 = require("./common/functions");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOver.prototype.render = function () {
        this.consts = {
            BTN_START_CLASS: "btn btn-primary btn-lg btn-block",
        };
        var bottomMargin = {
            marginBottom: 20,
        };
        //urlパラメータ取得
        var params = functions_1.getParams();
        var game = params.g || "";
        var lang = params.l || "";
        var gameUrl = "/" + game + "?l=" + lang;
        var title;
        var msgButton;
        if (lang === "Japanese") {
            title = "Oops!　ゲームオーバー!";
            msgButton = "続きから再開";
        }
        else {
            title = "Oops! Game over!";
            msgButton = "Continue the game";
        }
        return (React.createElement("center", null,
            React.createElement(Helmet_1.default, { title: "Game Over", noindex: true }),
            React.createElement("h2", { style: bottomMargin }, title),
            React.createElement(react_router_dom_1.Link, { to: gameUrl },
                React.createElement("button", { className: this.consts.BTN_START_CLASS }, msgButton))));
    };
    return GameOver;
}(React.Component));
exports.default = GameOver;
