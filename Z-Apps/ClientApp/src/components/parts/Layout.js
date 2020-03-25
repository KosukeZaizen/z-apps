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
const reactstrap_1 = require("reactstrap");
const NavMenu_1 = __importDefault(require("./NavMenu"));
const Footer_1 = __importDefault(require("./Footer"));
require("./Layout.css");
exports.default = props => (React.createElement("div", null,
    React.createElement(NavMenu_1.default, null),
    React.createElement(reactstrap_1.Container, { className: "contents-container" }, props.children),
    React.createElement(Footer_1.default, null)));
