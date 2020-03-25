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
const reactstrap_1 = require("reactstrap");
const react_router_dom_1 = require("react-router-dom");
class IncorrectTable extends React.Component {
    render() {
        let top = "Characters you should remember:";
        let trList = [];
        for (let key in this.props.incorrectList) {
            trList.push(React.createElement("tr", { key: key },
                React.createElement("td", null, this.props.incorrectList[key]),
                React.createElement("td", null, "\u3000:\u3000"),
                React.createElement("td", null, key)));
        }
        return (React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "primary" },
            React.createElement(reactstrap_1.CardHeader, { tag: "h3" }, top),
            React.createElement(reactstrap_1.CardBody, null,
                React.createElement("table", null,
                    React.createElement("tbody", null, trList)),
                React.createElement("br", null),
                React.createElement(reactstrap_1.Button, { onClick: () => { this.props.changePage(1); }, type: "button" }, "Retry"))));
    }
}
class RelatedArticles extends React.Component {
    render() {
        let linkList = [];
        for (let key in this.props.objLinks) {
            linkList.push(React.createElement("div", { key: key },
                React.createElement("span", { className: "font-large" },
                    "\u00A0 \u00A0",
                    React.createElement("u", null,
                        React.createElement("a", { href: this.props.objLinks[key], target: "_blank", rel: "noopener noreferrer" },
                            key,
                            " >>"))),
                React.createElement("br", null)));
        }
        return (React.createElement("div", { className: "related-articles" },
            React.createElement("b", null,
                React.createElement("span", { className: "font-large" }, "Related articles:")),
            React.createElement("br", null),
            React.createElement("br", null),
            linkList));
    }
}
class Quiz3 extends React.Component {
    constructor(props) {
        super(props);
        this.consts = {
            BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
    }
    render() {
        return (React.createElement("div", { id: "disp3" },
            React.createElement("h1", null,
                "Your score is:",
                React.createElement("br", null),
                this.props.score,
                "/",
                this.props.maxChar),
            React.createElement("br", null),
            Object.keys(this.props.incorrectList).length > 0 &&
                React.createElement(IncorrectTable, { incorrectList: this.props.incorrectList, changePage: (i) => { this.props.changePage(i); } }),
            React.createElement("br", null),
            React.createElement(react_router_dom_1.Link, { to: "/" + this.props.consts.OTHER_KANA_TYPE.toLowerCase() + "-quiz" },
                React.createElement("button", { className: this.consts.BUTTON_SUCCESS },
                    this.props.consts.OTHER_KANA_TYPE,
                    " Quiz!")),
            React.createElement("br", null),
            React.createElement(react_router_dom_1.Link, { to: "/romaji-converter" },
                React.createElement("button", { className: this.consts.BUTTON_DANGER }, "Romaji Converter")),
            React.createElement("br", null),
            React.createElement(RelatedArticles, { objLinks: this.props.consts.OBJ_LINKS })));
    }
}
exports.default = Quiz3;
exports.Quiz3 = Quiz3;
