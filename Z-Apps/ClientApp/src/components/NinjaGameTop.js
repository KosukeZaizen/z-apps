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
var react_router_dom_1 = require("react-router-dom");
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var logo_png_1 = __importDefault(require("./parts/Ninja/img/logo.png"));
var logo_png_2 = __importDefault(require("./parts/Ninja2/img/logo.png"));
var logo_png_3 = __importDefault(require("./parts/Ninja3/img/logo.png"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var GoogleAd_1 = require("./parts/GoogleAd");
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var NinjaGameTop = function () {
    if (GoogleAd_1.isGoogleAdsDisplayed) {
        // Adsenseが表示されているときに遷移があった場合はリロードし、
        // 自動広告によってゲームが邪魔されることを防ぐ
        window.location.reload();
        return (React.createElement("center", null,
            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })));
    }
    return (React.createElement("div", { className: "ninjaGameTop", style: { fontSize: "large" } },
        React.createElement(Helmet_1.default, { title: "Lingual Ninja Games", desc: "Japanese action game! Be a Ninja, and collect the scrolls in Japan!" }),
        React.createElement("center", null,
            React.createElement("h1", null, "Lingual Ninja Games")),
        React.createElement("br", null),
        React.createElement(react_router_dom_1.Link, { to: "/ninja1" },
            "Chapter1: Scrolls Of The Four Elements",
            React.createElement("br", null),
            React.createElement("img", { width: "100%", src: logo_png_1.default, alt: "Ninja Game 1" })),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(react_router_dom_1.Link, { to: "/ninja2" },
            "Chapter2: Castle Of The Maze",
            React.createElement("br", null),
            React.createElement("img", { width: "100%", src: logo_png_2.default, alt: "Ninja Game 2" })),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(react_router_dom_1.Link, { to: "/ninja3" },
            "Chapter3: Frozen Nightmare",
            React.createElement("br", null),
            React.createElement("img", { width: "100%", src: logo_png_3.default, alt: "Ninja Game 3" })),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(FaceBook_1.default, null)));
};
exports.default = NinjaGameTop;
