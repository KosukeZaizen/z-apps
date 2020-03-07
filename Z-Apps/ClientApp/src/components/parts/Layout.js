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
var reactstrap_1 = require("reactstrap");
var NavMenu_1 = __importDefault(require("./NavMenu"));
var Footer_1 = __importDefault(require("./Footer"));
require("./Layout.css");
exports.default = (function (props) { return (<div>
        <NavMenu_1.default />
        <reactstrap_1.Container className="contents-container">
            {props.children}
        </reactstrap_1.Container>
        <Footer_1.default />
    </div>); });
