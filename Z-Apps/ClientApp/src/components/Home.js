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
require("../css/Home.css");
var reactstrap_1 = require("reactstrap");
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", { className: "home" },
            React.createElement(Helmet_1.default, { title: "Lingual Ninja", desc: "Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!", isHome: true }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("h1", null,
                    "Welcome to",
                    React.createElement("span", { className: 'hidden-xs' }, " "),
                    React.createElement("span", { className: 'visible-xs' },
                        React.createElement("br", null)),
                    "Lingual Ninja!"),
                React.createElement("div", { className: "initial-message" },
                    React.createElement("p", { className: "no-margin" },
                        "Applications to learn Japanese,",
                        React.createElement("span", { className: 'hidden-xs' }, " "),
                        React.createElement("span", { className: 'visible-xs' },
                            React.createElement("br", null)),
                        "made by ",
                        React.createElement(react_router_dom_1.Link, { to: "/developer" }, "Kosuke Zaizen"),
                        "."),
                    React.createElement("p", { className: "no-margin" }, "I hope you enjoy!")),
                React.createElement("div", { ref: this.ref, id: "scrollTargetId" },
                    React.createElement(react_router_dom_1.Link, { to: "/hiragana-quiz" },
                        React.createElement(reactstrap_1.Card, { body: true, style: { backgroundColor: '#333', borderColor: '#333', color: "white" } },
                            React.createElement(reactstrap_1.CardTitle, null, "Hiragana / Katakana Quiz"),
                            React.createElement(reactstrap_1.CardText, null, "An app to remember Hiragana and Katakana! I hope this will help you to study."),
                            React.createElement(reactstrap_1.Button, { color: "secondary" }, "Try!"))),
                    React.createElement("br", null),
                    React.createElement(react_router_dom_1.Link, { to: "/folktales" },
                        React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "primary" },
                            React.createElement(reactstrap_1.CardTitle, null, "Japanese Folktales"),
                            React.createElement(reactstrap_1.CardText, null, "An app to learn Japanese from folktales. You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"),
                            React.createElement(reactstrap_1.Button, { color: "secondary" }, "Try!"))),
                    React.createElement("br", null),
                    React.createElement(react_router_dom_1.Link, { to: "/kanji-converter" },
                        React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "success" },
                            React.createElement(reactstrap_1.CardTitle, null, "Kanji Converter"),
                            React.createElement(reactstrap_1.CardText, null, "A converter to change Kanji to Hiragana and Romaji. Use to know how to read Kanji!"),
                            React.createElement(reactstrap_1.Button, { color: "secondary" }, "Try!"))),
                    React.createElement("br", null),
                    React.createElement(react_router_dom_1.Link, { to: "/romaji-converter" },
                        React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "danger" },
                            React.createElement(reactstrap_1.CardTitle, null, "Romaji Converter"),
                            React.createElement(reactstrap_1.CardText, null, "A converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!"),
                            React.createElement(reactstrap_1.Button, null, "Try!"))),
                    React.createElement("br", null),
                    React.createElement(react_router_dom_1.Link, { to: "/ninja" },
                        React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "warning" },
                            React.createElement(reactstrap_1.CardTitle, null, "Lingual Ninja Game"),
                            React.createElement(reactstrap_1.CardText, null, "Action game! Be a Ninja, and collect the scrolls in Japan!"),
                            React.createElement(reactstrap_1.Button, { color: "secondary" }, "Play!"))),
                    React.createElement("br", null),
                    React.createElement(react_router_dom_1.Link, { to: "/color-code" },
                        React.createElement(reactstrap_1.Card, { body: true, inverse: true, color: "info" },
                            React.createElement(reactstrap_1.CardTitle, null, "Color Code Getter"),
                            React.createElement(reactstrap_1.CardText, null, "Get the Color Code of your favolite color!"),
                            React.createElement(reactstrap_1.Button, { color: "secondary" }, "Try!"))))),
            React.createElement("br", null),
            React.createElement(FaceBook_1.default, null),
            React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, targetId: "scrollTargetId" })));
    };
    return Home;
}(React.Component));
exports.default = Home;
