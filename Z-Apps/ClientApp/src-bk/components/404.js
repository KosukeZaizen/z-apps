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
require("../css/Terms.css");
const react_router_dom_1 = require("react-router-dom");
const reactstrap_1 = require("reactstrap");
const functions_1 = require("./common/functions");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const img404 = require('../img/404.png');
const NotFound = props => {
    const params = functions_1.getParams();
    return (React.createElement("div", null,
        React.createElement(Helmet_1.default, { title: "404", noindex: true }),
        React.createElement("div", { className: "center" },
            React.createElement("h1", null, "Page not found!"),
            React.createElement("hr", null),
            React.createElement("img", { src: img404, width: "50%", alt: "404 error" }),
            React.createElement("h2", null,
                "No match for ",
                React.createElement("code", null, params && params["p"])),
            React.createElement("p", null, "Please check if the url is correct!"),
            React.createElement(react_router_dom_1.Link, { to: "/" },
                React.createElement(reactstrap_1.Button, { color: "primary", style: { width: "50%" } },
                    React.createElement("b", null, "Home"))))));
};
exports.default = NotFound;
