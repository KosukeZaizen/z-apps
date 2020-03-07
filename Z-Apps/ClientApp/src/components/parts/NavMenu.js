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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.css");
require("./NavMenu.css");
var NavigationItems = /** @class */ (function (_super) {
    __extends(NavigationItems, _super);
    function NavigationItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationItems.prototype.render = function () {
        var objLinks = {
            "Hiragana / Katakana Quiz": "/hiragana-quiz",
            "Japanese Folktales": "/folktales",
            "Kanji / Romaji Converter": "/kanji-converter",
            "Action Games": "/ninja",
        };
        var linkList = [];
        for (var key in objLinks) {
            linkList.push(React.createElement(reactstrap_1.NavLink, { key: key, tag: react_router_dom_1.Link, className: "text-light dropdown", to: objLinks[key] }, key));
        }
        return (React.createElement("ul", { className: "navbar-nav flex-grow", onClick: this.props.closeToggle }, linkList));
    };
    return NavigationItems;
}(React.Component));
var NavMenu = /** @class */ (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.toggle = _this.toggle.bind(_this);
        _this.closeToggle = _this.closeToggle.bind(_this);
        _this.state = {
            isOpen: false
        };
        return _this;
    }
    NavMenu.prototype.toggle = function () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    NavMenu.prototype.closeToggle = function () {
        this.setState({
            isOpen: false
        });
    };
    NavMenu.prototype.render = function () {
        return (React.createElement("header", null,
            React.createElement(reactstrap_1.Navbar, { variant: "pills", className: "navbar-inverse navbar-expand-md navbar-toggleable-md border-bottom box-shadow mb-3" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement(reactstrap_1.NavbarBrand, { tag: react_router_dom_1.Link, to: "/" },
                        React.createElement("b", { onClick: this.closeToggle, className: "z-apps-title text-light" },
                            React.createElement("span", { style: { whiteSpace: "nowrap" } }, "Lingual Ninja"))),
                    React.createElement(reactstrap_1.NavbarToggler, { onClick: this.toggle, className: "mr-2" }),
                    React.createElement(reactstrap_1.Collapse, { className: "d-md-inline-flex flex-md-row-reverse", isOpen: this.state.isOpen, navbar: true },
                        React.createElement(NavigationItems, { closeToggle: this.closeToggle }))))));
    };
    return NavMenu;
}(React.Component));
exports.default = NavMenu;
