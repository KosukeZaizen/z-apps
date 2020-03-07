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
require("../css/Terms.css");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var Terms = /** @class */ (function (_super) {
    __extends(Terms, _super);
    function Terms(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Terms.prototype.render = function () {
        return (React.createElement("div", { className: "terms" },
            React.createElement(Helmet_1.default, { title: "Terms of Use", desc: "Lingual Ninja - The ownership of website and Responsibility" }),
            React.createElement("div", { className: "center" },
                React.createElement("h1", { id: "scrollTargetId" },
                    "Lingual Ninja",
                    React.createElement("span", { className: 'hidden-xs' }, " "),
                    React.createElement("span", { className: 'visible-xs' },
                        React.createElement("br", null)),
                    "Terms of Use"),
                React.createElement("div", { className: "contents" },
                    React.createElement("hr", null),
                    React.createElement("h2", null, "The ownership of website"),
                    React.createElement("p", null,
                        "This website is developed and owned by ",
                        React.createElement(react_router_dom_1.Link, { to: "/developer" }, "Kosuke Zaizen"),
                        ". When you want to use any quotes, images, or programs, you must get approval from the owner."),
                    React.createElement("hr", { ref: this.ref }),
                    React.createElement("h2", null, "Responsibility"),
                    React.createElement("p", null, "If user experiences trouble including defects or bugs, the owner of this website can't be held liable. It will be user's responsibility."),
                    React.createElement("hr", null),
                    React.createElement("h2", null, "Contact"),
                    "If you have trouble, please contact using this link:",
                    React.createElement("br", null),
                    React.createElement("a", { href: "https://uni-browser.lingual-ninja.com/?pageId=4", target: "_blank", rel: "noopener noreferrer" }, "\u3000uni-browser >>")),
                React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, targetId: "scrollTargetId" }))));
    };
    return Terms;
}(React.Component));
exports.default = Terms;
