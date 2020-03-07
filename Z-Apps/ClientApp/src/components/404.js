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
var React = __importStar(require("react"));
require("../css/Terms.css");
var _404_png_1 = __importDefault(require("../img/404.png"));
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var functions_1 = require("./common/functions");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var NotFound = function (props) {
    var params = functions_1.getParams();
    return (React.createElement("div", null,
        React.createElement(Helmet_1.default, { title: "404", noindex: true }),
        React.createElement("center", null,
            React.createElement("h1", null, "Page not found!"),
            React.createElement("hr", null),
            React.createElement("img", { src: _404_png_1.default, width: "50%", alt: "404 error" }),
            React.createElement("h2", null,
                "No match for ",
                React.createElement("code", null, params && params.p)),
            React.createElement("p", null, "Please check if the url is correct!"),
            React.createElement(react_router_dom_1.Link, { to: "/" },
                React.createElement(reactstrap_1.Button, { color: "primary", style: { width: "50%" } },
                    React.createElement("b", null, "Home"))))));
};
exports.default = NotFound;
