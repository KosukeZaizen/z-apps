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
const PleaseScrollDown_1 = __importDefault(require("../PleaseScrollDown"));
class Quiz1 extends React.Component {
    constructor(props) {
        super(props);
        this.consts = {
            START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            START_BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            maxChar: 0,
        };
        this.ref = React.createRef();
    }
    startGame(maxChar) {
        this.props.setMaxChar(maxChar);
        this.props.changePage(2);
    }
    render() {
        return (React.createElement("div", { id: "disp1" },
            React.createElement("h1", null,
                this.props.consts.KANA_TYPE,
                " Quiz!"),
            React.createElement("p", null,
                "Please bookmark this page to remember all ",
                this.props.consts.KANA_TYPE,
                " characters!"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn10", onClick: () => this.startGame(10), className: this.consts.START_BUTTON_PRIMARY }, "Random 10 characters"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn30", onClick: () => this.startGame(30), className: this.consts.START_BUTTON_SUCCESS }, "Random 30 characters"),
            React.createElement("br", null),
            React.createElement("button", { id: "btn102", onClick: () => this.startGame(102), className: this.consts.START_BUTTON_DANGER, ref: this.ref },
                "All ",
                this.props.consts.KANA_TYPE,
                " characters"),
            React.createElement("br", null),
            React.createElement("hr", null),
            React.createElement("br", null),
            React.createElement(react_router_dom_1.Link, { to: "/" + this.props.consts.OTHER_KANA_TYPE.toLowerCase() + "-quiz" },
                React.createElement("button", { id: "btnOther", onClick: () => "start(102)", className: this.consts.START_BUTTON_DARK },
                    this.props.consts.OTHER_KANA_TYPE,
                    " Quiz")),
            React.createElement("br", null),
            React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, targetId: "disp1" })));
    }
}
exports.default = Quiz1;
exports.Quiz1 = Quiz1;
