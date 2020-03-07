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
var Center = /** @class */ (function (_super) {
    __extends(Center, _super);
    function Center() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Center.prototype.render = function () {
        var innerWidth = parseInt(window.innerWidth, 10);
        var width;
        if (innerWidth > 350) {
            width = 350;
        }
        else {
            width = 300;
        }
        var height = 200;
        return (React.createElement("center", null,
            React.createElement("iframe", { title: "fb", src: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingualNinja%2F&width=" + width + "&height=" + height + "&small_header=false&tabs=timeline$adapt_container_width=false&hide_cover=false&show_facepile=true&appId", width: width, height: height, style: { border: "none", overflow: "hidden" }, scrolling: "yes", frameBorder: "0", allowtransparency: "true", allow: "encrypted-media" })));
    };
    return Center;
}(React.Component));
exports.default = Center;
