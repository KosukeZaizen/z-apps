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
var logo_png_1 = __importDefault(require("./img/logo.png"));
var Page1 = /** @class */ (function (_super) {
    __extends(Page1, _super);
    function Page1(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            BTN_START_CLASS: "btn btn-dark btn-lg btn-block",
        };
        _this.state = {
            topImage: true,
        };
        return _this;
    }
    Page1.prototype.hideTopImage = function () {
        this.setState({ topImage: false, });
    };
    Page1.prototype.render = function () {
        var _this = this;
        var bottomMargin = {
            marginBottom: 10,
        };
        var screenHeight = parseInt(window.innerHeight, 10);
        return (React.createElement("div", { id: "page1" },
            React.createElement("span", { onClick: function () { _this.hideTopImage(); } },
                React.createElement(TopImage, { topImage: this.state.topImage })),
            React.createElement("h2", { style: { color: "white", } }, "Which language do you prefer?"),
            screenHeight > 360 ?
                React.createElement("span", null,
                    React.createElement("span", { onClick: function () { _this.props.changePage(2, "English"); } },
                        React.createElement("button", { style: bottomMargin, className: this.consts.BTN_START_CLASS }, "English")),
                    React.createElement("span", { onClick: function () { _this.props.changePage(2, "Japanese"); } },
                        React.createElement("button", { className: this.consts.BTN_START_CLASS }, "日本語")))
                :
                    React.createElement("span", null,
                        React.createElement("table", { style: { width: "100%" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { align: "center" },
                                        React.createElement("span", { onClick: function () { _this.props.changePage(2, "English"); } },
                                            React.createElement("button", { style: { width: "80%" }, className: this.consts.BTN_START_CLASS }, "English"))),
                                    React.createElement("td", { align: "center" },
                                        React.createElement("span", { onClick: function () { _this.props.changePage(2, "Japanese"); } },
                                            React.createElement("button", { style: { width: "80%" }, className: this.consts.BTN_START_CLASS }, "日本語"))))))),
            React.createElement("br", null),
            React.createElement("center", { style: { color: "white" } },
                "If you want to be a real Ninja, please check this:",
                React.createElement("br", null),
                React.createElement("a", { href: "https://www.lingual-ninja.com/2018/09/how-to-be-ninja.html", target: "_blank", rel: "noopener noreferrer" }, "How to be a Ninja >>")),
            React.createElement("br", null),
            React.createElement("br", null)));
    };
    return Page1;
}(React.Component));
exports.Page1 = Page1;
exports.default = Page1;
function TopImage(props) {
    if (props.topImage) {
        return React.createElement("h1", null,
            React.createElement("img", { width: "100%", src: logo_png_1.default, alt: "Lingual Ninja Games - Scrolls of The Four Elements" }));
    }
    else {
        return React.createElement("span", null);
    }
}
