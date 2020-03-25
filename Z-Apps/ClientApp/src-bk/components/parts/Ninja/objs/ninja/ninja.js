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
const runningNinja = require('./ninja_hashiru.png');
function NinjaChar(props) {
    let left = props.boolLeft ? "" : "scale(-1, 1)";
    let style = {
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: left,
        zIndex: 25,
    };
    return (React.createElement("img", { src: runningNinja, alt: props.imgAlt, width: props.width, style: style }));
}
exports.NinjaChar = NinjaChar;
