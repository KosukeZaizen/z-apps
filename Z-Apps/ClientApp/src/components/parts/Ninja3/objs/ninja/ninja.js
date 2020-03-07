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
var ninja_hashiru_png_1 = __importDefault(require("./../../../Ninja/objs/ninja/ninja_hashiru.png"));
function NinjaChar(props) {
    var left = props.boolLeft ? "" : "scale(-1, 1)";
    var style = {
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: left,
        zIndex: 25,
    };
    return (React.createElement("img", { src: ninja_hashiru_png_1.default, alt: props.imgAlt, width: props.width, style: style }));
}
exports.NinjaChar = NinjaChar;
