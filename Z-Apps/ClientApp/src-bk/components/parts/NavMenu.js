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
require("bootstrap/dist/css/bootstrap.css");
require("./NavMenu.css");
class NavigationItems extends React.Component {
    render() {
        let objLinks = {
            "Hiragana / Katakana Quiz": "/hiragana-quiz",
            "Japanese Folktales": "/folktales",
            "Kanji / Romaji Converter": "/kanji-converter",
            "Action Games": "/ninja",
        };
        let linkList = [];
        for (let key in objLinks) {
            linkList.push(React.createElement(reactstrap_1.NavLink, { key: key, tag: react_router_dom_1.Link, className: "text-light dropdown", to: objLinks[key] }, key));
        }
        return (React.createElement("ul", { className: "navbar-nav flex-grow", onClick: this.props.closeToggle }, linkList));
    }
}
class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.closeToggle = this.closeToggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeToggle() {
        this.setState({
            isOpen: false
        });
    }
    render() {
        return (React.createElement("header", null,
            React.createElement(reactstrap_1.Navbar, { variant: "pills", className: "navbar-inverse navbar-expand-md navbar-toggleable-md border-bottom box-shadow mb-3" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement(reactstrap_1.NavbarBrand, { tag: react_router_dom_1.Link, to: "/" },
                        React.createElement("b", { onClick: this.closeToggle, className: "z-apps-title text-light" },
                            React.createElement("span", { style: { whiteSpace: "nowrap" } }, "Lingual Ninja"))),
                    React.createElement(reactstrap_1.NavbarToggler, { onClick: this.toggle, className: "mr-2" }),
                    React.createElement(reactstrap_1.Collapse, { className: "d-md-inline-flex flex-md-row-reverse", isOpen: this.state.isOpen, navbar: true },
                        React.createElement(NavigationItems, { closeToggle: this.closeToggle }))))));
    }
}
exports.default = NavMenu;
