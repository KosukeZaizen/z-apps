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
require("../css/Developer.css");
var KosukeZaizen_jpg_1 = __importDefault(require("../img/KosukeZaizen.jpg"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
function SayHello() {
    return (React.createElement("p", null,
        React.createElement("b", null, "Hello! I'm Kosuke Zaizen!"),
        React.createElement("br", null),
        React.createElement("br", null),
        "Thank you for using Lingual Ninja!",
        React.createElement("br", null),
        "I am a Japanese software engineer.",
        React.createElement("br", null),
        "Lingual Ninja is a website for Japanese learners.",
        React.createElement("br", null),
        "I hope Lingual Ninja can help!"));
}
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Developer.prototype.render = function () {
        return (React.createElement("div", { className: "developer" },
            React.createElement(Helmet_1.default, { title: "Kosuke Zaizen", desc: "I am a Japanese software engineer. Lingual Ninja is a website for Japanese learners. I hope Lingual Ninja can help!" }),
            React.createElement("center", null,
                React.createElement("h1", null, "Kosuke Zaizen"),
                React.createElement("div", { className: "contents" },
                    React.createElement("hr", { id: "scrollTargetId" }),
                    React.createElement("span", { className: 'hidden-xs' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("img", { width: "200px", src: KosukeZaizen_jpg_1.default, alt: "Kosuke Zaizen" })),
                                    React.createElement("td", { className: "tdExplanation", valign: "top" },
                                        React.createElement(SayHello, null)))))),
                    React.createElement("span", { className: 'visible-xs' },
                        React.createElement("center", null,
                            React.createElement("img", { width: "200px", src: KosukeZaizen_jpg_1.default, alt: "Kosuke Zaizen" }),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement(SayHello, null))),
                    React.createElement("hr", { ref: this.ref }),
                    React.createElement("br", null),
                    React.createElement("center", null,
                        React.createElement("p", { className: "no-margin" },
                            "To contact me, please write a message",
                            React.createElement("span", { className: 'hidden-xs' }, " "),
                            React.createElement("span", { className: 'visible-xs' },
                                React.createElement("br", null)),
                            "using the link below:"),
                        React.createElement("br", null),
                        React.createElement("b", null,
                            React.createElement("a", { href: "https://uni-browser.lingual-ninja.com/?pageId=4", target: "_blank", rel: "noopener noreferrer" }, "Contact uni-browser >>")),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement("p", { className: "no-margin" },
                            "Also, I am writing a blog for people",
                            React.createElement("span", { className: 'hidden-xs' }, " "),
                            React.createElement("span", { className: 'visible-xs' },
                                React.createElement("br", null)),
                            "studying Japanese:"),
                        React.createElement("br", null),
                        React.createElement("b", null,
                            React.createElement("a", { href: "https://www.lingual-ninja.com/", target: "_blank", rel: "noopener noreferrer" }, "Lingual Ninja! >>")),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement(FaceBook_1.default, null))),
                React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, targetId: "scrollTargetId" }))));
    };
    return Developer;
}(React.Component));
exports.default = Developer;
