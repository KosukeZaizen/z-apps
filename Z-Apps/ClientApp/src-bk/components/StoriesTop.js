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
const StoriesTopStore_1 = require("../store/StoriesTopStore");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const FaceBook_1 = __importDefault(require("./parts/FaceBook"));
const GoogleAd_1 = __importDefault(require("./parts/GoogleAd"));
const PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
const consts = __importStar(require("./common/consts"));
class StoriesTop extends React.Component {
    constructor(props) {
        super(props);
        this.changeScreenSize = () => {
            this.setState({
                screenWidth: window.innerWidth
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
        this.ref = React.createRef();
    }
    render() {
        const { allStories } = this.props;
        const { screenWidth } = this.state;
        const styleForAboutTitle = {
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
        };
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: "Japanese Folktales", desc: "Free application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!" }),
            React.createElement("div", { style: { maxWidth: 700 } },
                React.createElement("div", { className: "breadcrumbs", itemScope: true, itemType: "https://schema.org/BreadcrumbList", style: { textAlign: "left" } },
                    React.createElement("span", { itemProp: "itemListElement", itemScope: true, itemType: "http://schema.org/ListItem" },
                        React.createElement(react_router_dom_1.Link, { to: "/", itemProp: "item", style: { marginRight: "5px", marginLeft: "5px" } },
                            React.createElement("span", { itemProp: "name" }, "Home")),
                        React.createElement("meta", { itemProp: "position", content: "1" })),
                    "\uFF1E",
                    React.createElement("span", { itemProp: "itemListElement", itemScope: true, itemType: "http://schema.org/ListItem" },
                        React.createElement("span", { itemProp: "name", style: { marginRight: "5px", marginLeft: "5px" } }, "Japanese Folktales"),
                        React.createElement("meta", { itemProp: "position", content: "2" }))),
                React.createElement("h1", { style: {
                        margin: "30px",
                        lineHeight: "40px",
                    } },
                    React.createElement("b", null, "Japanese Folktales")),
                React.createElement("p", { style: styleForAboutTitle },
                    "Free app to learn Japanese from folktales!",
                    React.createElement("br", null),
                    "You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"),
                React.createElement("br", null),
                allStories && allStories.length > 0 ?
                    null
                    :
                        React.createElement("div", { className: "center" },
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })),
                React.createElement("div", { id: "scrollTargetId", ref: this.ref }, allStories && allStories.map(s => {
                    const nameForUrl = s.storyName;
                    const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
                    return (React.createElement("div", { key: s.storyId, style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" } }, screenWidth > 500 ?
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { className: "center" },
                                            React.createElement("h2", { style: { color: "black", marginBottom: "20px" } },
                                                React.createElement("b", null, nameToShow))))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement(react_router_dom_1.Link, { to: `/folktales/${nameForUrl}` },
                                            React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`, width: "90%", alt: nameToShow, title: nameToShow, style: { marginLeft: "10px", marginBottom: "10px" } }))),
                                    React.createElement("td", { style: { textAlign: "left" } },
                                        s.description.split("\\n").map((d, i) => React.createElement("span", { key: i, style: { color: "black" } },
                                            d,
                                            React.createElement("br", null))),
                                        React.createElement("div", { className: "center" },
                                            React.createElement("p", { style: { margin: "20px" } },
                                                React.createElement(react_router_dom_1.Link, { to: `/folktales/${nameForUrl}` },
                                                    "Read ",
                                                    nameToShow,
                                                    " >>")))))))
                        :
                            React.createElement("div", null,
                                React.createElement("b", null,
                                    React.createElement("h2", { style: { color: "black", marginBottom: "20px" } }, nameToShow)),
                                React.createElement(react_router_dom_1.Link, { to: `/folktales/${nameForUrl}` },
                                    React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`, width: "90%", alt: nameToShow, title: nameToShow })),
                                React.createElement("div", { style: { textAlign: "left", margin: "10px" } }, s.description.split("\\n").map((d, i) => React.createElement("span", { key: i, style: { color: "black" } },
                                    d,
                                    React.createElement("br", null)))),
                                React.createElement("p", null,
                                    React.createElement(react_router_dom_1.Link, { to: `/folktales/${nameForUrl}` },
                                        "Read ",
                                        nameToShow,
                                        " >>")))));
                }))),
            React.createElement(FaceBook_1.default, null),
            React.createElement("br", null),
            React.createElement(GoogleAd_1.default, null),
            React.createElement(PleaseScrollDown_1.default, { criteriaRef: this.ref, screenWidth: screenWidth })));
    }
}
;
exports.default = react_redux_1.connect(state => state["storiesTop"], dispatch => redux_1.bindActionCreators(StoriesTopStore_1.actionCreators, dispatch))(StoriesTop);
