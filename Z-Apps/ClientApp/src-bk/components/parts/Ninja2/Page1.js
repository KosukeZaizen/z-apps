"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const logo = require('./img/logo.png');
class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.consts = {
            BTN_START_CLASS: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            topImage: true,
        };
    }
    hideTopImage() {
        this.setState({ topImage: false, });
    }
    render() {
        const bottomMargin = {
            marginBottom: 10,
        };
        const screenHeight = window.innerHeight;
        return (React.createElement("div", { id: "page1" },
            React.createElement("span", { onClick: () => { this.hideTopImage(); } },
                React.createElement(TopImage, { topImage: this.state.topImage })),
            React.createElement("h2", { style: { color: "white", marginBottom: 10, } }, "Which language do you prefer?"),
            screenHeight > 360 ?
                React.createElement("span", null,
                    React.createElement("span", { onClick: () => { this.props.changePage(2, "English"); } },
                        React.createElement("button", { style: bottomMargin, className: this.consts.BTN_START_CLASS }, "English")),
                    React.createElement("span", { onClick: () => { this.props.changePage(2, "Japanese"); } },
                        React.createElement("button", { style: bottomMargin, className: this.consts.BTN_START_CLASS }, "日本語")))
                :
                    React.createElement("span", null,
                        React.createElement("table", { style: { width: "100%" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { align: "center" },
                                        React.createElement("span", { onClick: () => { this.props.changePage(2, "English"); } },
                                            React.createElement("button", { style: Object.assign(Object.assign({}, bottomMargin), { width: "80%" }), className: this.consts.BTN_START_CLASS }, "English"))),
                                    React.createElement("td", { align: "center" },
                                        React.createElement("span", { onClick: () => { this.props.changePage(2, "Japanese"); } },
                                            React.createElement("button", { style: Object.assign(Object.assign({}, bottomMargin), { width: "80%" }), className: this.consts.BTN_START_CLASS }, "日本語"))))))),
            React.createElement("br", null),
            React.createElement("div", { className: "center", style: { color: "white" } },
                "If you want to be a real Ninja, please check this:",
                React.createElement("br", null),
                React.createElement("a", { href: "https://www.lingual-ninja.com/2018/09/how-to-be-ninja.html", target: "_blank", rel: "noopener noreferrer" }, "How to be a Ninja >>")),
            React.createElement("br", null),
            React.createElement("br", null)));
    }
}
exports.default = Page1;
exports.Page1 = Page1;
function TopImage(props) {
    if (props.topImage) {
        return React.createElement("h1", null,
            React.createElement("img", { width: "100%", src: logo, alt: "Lingual Ninja Games - Castle Of The Maze" }));
    }
    else {
        return React.createElement("span", null);
    }
}
