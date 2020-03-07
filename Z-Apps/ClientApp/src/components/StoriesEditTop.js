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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var StoriesEditTopStore_1 = require("../store/StoriesEditTopStore");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var consts = __importStar(require("./common/consts"));
var StoriesTop = /** @class */ (function (_super) {
    __extends(StoriesTop, _super);
    function StoriesTop(props) {
        var _this = _super.call(this, props) || this;
        _this.changeScreenSize = function () {
            _this.setState({
                screenWidth: parseInt(window.innerWidth, 10),
            });
        };
        _this.state = {
            screenWidth: parseInt(window.innerWidth, 10),
        };
        _this.props.loadAllStories();
        var timer = 0;
        window.onresize = function () {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                _this.changeScreenSize();
            }, 100);
        };
        alert("edit");
        return _this;
    }
    StoriesTop.prototype.render = function () {
        var allStories = this.props.allStories;
        var screenWidth = this.state.screenWidth;
        return (React.createElement("center", null,
            React.createElement(Helmet_1.default, { title: "Japanese Folktales", noindex: true }),
            React.createElement("div", { style: { maxWidth: 700 } },
                React.createElement("div", { className: "breadcrumbs", style: { textAlign: "left" } },
                    React.createElement(react_router_dom_1.Link, { to: "/", style: { marginRight: "5px", marginLeft: "5px" } },
                        React.createElement("span", null, "Home")),
                    "\uFF1E",
                    React.createElement("span", { style: { marginRight: "5px", marginLeft: "5px" } }, "Japanese Folktales")),
                React.createElement("h1", { style: {
                        margin: "30px",
                        lineHeight: "40px",
                    } },
                    React.createElement("b", null, "Japanese Folktales")),
                React.createElement("br", null),
                allStories && allStories.length > 0 ?
                    null
                    :
                        React.createElement("center", null,
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })),
                allStories && allStories.map(function (s) {
                    var nameForUrl = s.storyName;
                    var nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
                    return (React.createElement("a", { key: s.storyId, href: "/folktalesEdit/" + nameForUrl },
                        React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" } }, screenWidth > 500 ?
                            React.createElement("table", null,
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { colSpan: 2 },
                                            React.createElement("center", null,
                                                React.createElement("h2", { style: { color: "black", marginBottom: "20px" } },
                                                    React.createElement("b", null, nameToShow))))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { width: "50%" },
                                            React.createElement("img", { src: consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png", width: "90%", alt: nameToShow, title: nameToShow, style: { marginLeft: "10px", marginBottom: "10px" } })),
                                        React.createElement("td", null,
                                            s.description.split("\\n").map(function (d, i) {
                                                return React.createElement("span", { key: i, style: { color: "black" } },
                                                    d,
                                                    React.createElement("br", null));
                                            }),
                                            React.createElement("center", null,
                                                React.createElement("p", { style: { margin: "20px" } },
                                                    "Read ",
                                                    nameToShow,
                                                    " >>"))))))
                            :
                                React.createElement("div", null,
                                    React.createElement("b", null,
                                        React.createElement("h2", { style: { color: "black", marginBottom: "20px" } }, nameToShow)),
                                    React.createElement("img", { src: consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png", width: "90%", alt: nameToShow, title: nameToShow }),
                                    React.createElement("div", { style: { textAlign: "left", margin: "10px" } }, s.description.split("\\n").map(function (d, i) {
                                        return React.createElement("span", { key: i, style: { color: "black" } },
                                            d,
                                            React.createElement("br", null));
                                    })),
                                    React.createElement("p", null,
                                        "Read ",
                                        nameToShow,
                                        " >>")))));
                }))));
    };
    return StoriesTop;
}(React.Component));
;
exports.default = react_redux_1.connect(function (state) { return state.storiesTop; }, function (dispatch) { return redux_1.bindActionCreators(StoriesEditTopStore_1.actionCreators, dispatch); })(StoriesTop);
