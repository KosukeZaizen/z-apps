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
class FB extends React.Component {
    render() {
        const innerWidth = window.innerWidth;
        let width;
        if (innerWidth > 350) {
            width = 350;
        }
        else {
            width = 300;
        }
        const height = 200;
        return (React.createElement("div", { className: "center" },
            React.createElement("iframe", { title: "fb", src: `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingualNinja%2F&width=${width}&height=${height}&small_header=false&tabs=timeline$adapt_container_width=false&hide_cover=false&show_facepile=true&appId`, width: width, height: height, style: { border: "none", overflow: "hidden" }, scrolling: "yes", frameBorder: "0", allowTransparency: true, allow: "encrypted-media" })));
    }
}
exports.default = FB;
