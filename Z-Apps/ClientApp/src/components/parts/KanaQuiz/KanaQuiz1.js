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
var PleaseScrollDown_1 = __importDefault(require("../PleaseScrollDown"));
var Quiz1 = /** @class */ (function (_super) {
    __extends(Quiz1, _super);
    function Quiz1(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            START_BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        _this.state = {
            maxChar: 0,
        };
        _this.ref = React.createRef();
        return _this;
    }
    Quiz1.prototype.startGame = function (maxChar) {
        this.props.setMaxChar(maxChar);
        this.props.changePage(2);
    };
    Quiz1.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "disp1" },
            React.createElement("h1", null,
                this.props.consts.KANA_TYPE,
                " Quiz!"),
            React.createElement("p", null,
                "Please bookmark this page to remember all ",
                this.props.consts.KANA_TYPE,
                " characters!"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn10", onClick: function () { return _this.startGame(10); }, className: this.consts.START_BUTTON_PRIMARY }, "Random 10 characters"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn30", onClick: function () { return _this.startGame(30); }, className: this.consts.START_BUTTON_SUCCESS }, "Random 30 characters"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn102", onClick: function () { return _this.startGame(102); }, className: this.consts.START_BUTTON_DANGER, ref: this.ref },
                "All ",
                this.props.consts.KANA_TYPE,
                " characters"),
            React.createElement("br", null),
            React.createElement("hr", null),
            React.createElement("br", null),
            React.createElement(react_router_dom_1.Link, { to: "/" + this.props.consts.OTHER_KANA_TYPE.toLowerCase() + "-quiz" },
                React.createElement("button", { id: "btnOther", onClick: function () { return "start(102)"; }, className: this.consts.START_BUTTON_DARK },
                    this.props.consts.OTHER_KANA_TYPE,
                    " Quiz")),
            React.createElement("br", null),
            React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, targetId: "disp1" })));
    };
    return Quiz1;
}(React.Component));
exports.Quiz1 = Quiz1;
exports.default = Quiz1;
