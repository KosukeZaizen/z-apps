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
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const StoriesEditTopStore_1 = require("../store/StoriesEditTopStore");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const consts = __importStar(require("./common/consts"));
class StoriesTop extends React.Component {
    constructor(props) {
        super(props);
        this.changeScreenSize = () => {
            this.setState({
                screenWidth: window.innerWidth,
            });
        };
        this.state = {
            screenWidth: window.innerWidth,
        };
        this.props.loadAllStories();
        let timer;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
        alert("edit");
    }
    render() {
        const allStories = this.props.allStories;
        const { screenWidth } = this.state;
        return (React.createElement("div", { className: "center" },
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
                        React.createElement("div", { className: "center" },
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })),
                allStories && allStories.map(s => {
                    const nameForUrl = s.storyName;
                    const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
                    return (React.createElement("a", { key: s.storyId, href: `/folktalesEdit/${nameForUrl}` },
                        React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" } }, screenWidth > 500 ?
                            React.createElement("table", null,
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { colSpan: 2 },
                                            React.createElement("div", { className: "center" },
                                                React.createElement("h2", { style: { color: "black", marginBottom: "20px" } },
                                                    React.createElement("b", null, nameToShow))))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: "50%" } },
                                            React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`, width: "90%", alt: nameToShow, title: nameToShow, style: { marginLeft: "10px", marginBottom: "10px" } })),
                                        React.createElement("td", null,
                                            s.description.split("\\n").map((d, i) => React.createElement("span", { key: i, style: { color: "black" } },
                                                d,
                                                React.createElement("br", null))),
                                            React.createElement("div", { className: "center" },
                                                React.createElement("p", { style: { margin: "20px" } },
                                                    "Read ",
                                                    nameToShow,
                                                    " >>"))))))
                            :
                                React.createElement("div", null,
                                    React.createElement("b", null,
                                        React.createElement("h2", { style: { color: "black", marginBottom: "20px" } }, nameToShow)),
                                    React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`, width: "90%", alt: nameToShow, title: nameToShow }),
                                    React.createElement("div", { style: { textAlign: "left", margin: "10px" } }, s.description.split("\\n").map((d, i) => React.createElement("span", { key: i, style: { color: "black" } },
                                        d,
                                        React.createElement("br", null)))),
                                    React.createElement("p", null,
                                        "Read ",
                                        nameToShow,
                                        " >>")))));
                }))));
    }
}
;
exports.default = react_redux_1.connect(state => state["storiesTop"], dispatch => redux_1.bindActionCreators(StoriesEditTopStore_1.actionCreators, dispatch))(StoriesTop);
