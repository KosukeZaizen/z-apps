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
const storiesStore = __importStar(require("../store/StoriesStore"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const react_anchor_link_smooth_scroll_1 = __importDefault(require("react-anchor-link-smooth-scroll"));
require("./parts/PleaseScrollDown.css");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const GoogleAd_1 = __importDefault(require("./parts/GoogleAd"));
const FaceBook_1 = __importDefault(require("./parts/FaceBook"));
const consts = __importStar(require("./common/consts"));
class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.changeScreenSize = () => {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        };
        this.judgeFooter = () => {
            if (!this.refSentences)
                return;
            const divSentences = this.refSentences.current;
            if (!divSentences)
                return;
            const { screenHeight } = this.state;
            const offsetY = divSentences.getBoundingClientRect().top;
            const t_height = divSentences.offsetHeight;
            const t_position = offsetY - screenHeight;
            if (t_position >= 0) {
                // sentencesよりも上側の時
                this.setState({
                    pleaseScrollDown: true,
                    showFooterMenu: false
                });
            }
            else if (-screenHeight > (t_position + t_height)) {
                // sentencesよりも下側の時
                this.setState({
                    pleaseScrollDown: false,
                    showFooterMenu: false
                });
            }
            else {
                // sentencesが画面内
                this.setState({
                    pleaseScrollDown: false,
                    showFooterMenu: true
                });
            }
        };
        this.onClickLangBtn = (btnType) => {
            let saveData;
            switch (btnType) {
                case "kanji":
                    saveData = {
                        kanji: !this.state.kanji,
                        hiragana: this.state.hiragana,
                        romaji: this.state.romaji,
                        english: this.state.english,
                    };
                    this.setState({ kanji: !this.state.kanji, });
                    break;
                case "hiragana":
                    saveData = {
                        kanji: this.state.kanji,
                        hiragana: !this.state.hiragana,
                        romaji: this.state.romaji,
                        english: this.state.english,
                    };
                    this.setState({ hiragana: !this.state.hiragana, });
                    break;
                case "romaji":
                    saveData = {
                        kanji: this.state.kanji,
                        hiragana: this.state.hiragana,
                        romaji: !this.state.romaji,
                        english: this.state.english,
                    };
                    this.setState({ romaji: !this.state.romaji, });
                    break;
                case "english":
                    saveData = {
                        kanji: this.state.kanji,
                        hiragana: this.state.hiragana,
                        romaji: this.state.romaji,
                        english: !this.state.english,
                    };
                    this.setState({ english: !this.state.english, });
                    break;
                default:
            }
            localStorage.setItem("folktales-languages", JSON.stringify(saveData));
        };
        const { params } = props.match;
        const storyName = params.storyName.toString().split("#")[0];
        this.props.loadStory(storyName);
        this.state = {
            storyName: storyName,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pleaseScrollDown: false,
            showFooterMenu: false,
        };
        this.screenHeight = window.innerHeight;
        const saveData = localStorage.getItem("folktales-languages");
        const objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            this.state = Object.assign(Object.assign({}, this.state), { kanji: objSaveData.kanji == null ? true : objSaveData.kanji, hiragana: objSaveData.hiragana == null ? true : objSaveData.hiragana, romaji: objSaveData.romaji == null ? false : objSaveData.romaji, english: objSaveData.english == null ? true : objSaveData.english });
        }
        else {
            this.state = Object.assign(Object.assign({}, this.state), { kanji: true, hiragana: true, romaji: true, english: true });
        }
        let timer;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
        window.addEventListener('scroll', this.judgeFooter);
        this.refSentences = React.createRef();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.judgeFooter);
    }
    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.judgeFooter();
            }, i * 1000);
        }
    }
    componentDidUpdate(preciousProps) {
        if (preciousProps.location !== this.props.location) {
            const storyName = this.props.location.pathname.split("/").filter(a => a).pop();
            this.setState({
                storyName: storyName,
            });
            this.props.loadStory(storyName);
        }
    }
    render() {
        const storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const titleOfAbout = storyName.split("--")[0].split("_").join(" ");
        const styleForAboutTitle = {
            fontSize: "large",
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
            fontWeight: "bold",
        };
        const styleForStoryTitle = {
            fontSize: "x-large",
            fontWeight: "bold",
        };
        const { screenWidth, pleaseScrollDown, showFooterMenu } = this.state;
        const { storyDesc, sentences, words, otherStories } = this.props;
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: title + " Story | Japanese Folktales", desc: storyDesc.description && storyDesc.description.split("\\n").join(" "), img: `${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png` }),
            React.createElement("div", { style: { maxWidth: 700 } },
                React.createElement("div", { className: "breadcrumbs", itemScope: true, itemType: "https://schema.org/BreadcrumbList", style: { textAlign: "left" } },
                    React.createElement("span", { itemProp: "itemListElement", itemScope: true, itemType: "http://schema.org/ListItem" },
                        React.createElement(react_router_dom_1.Link, { to: "/", itemProp: "item", style: { marginRight: "5px", marginLeft: "5px" } },
                            React.createElement("span", { itemProp: "name" }, "Home")),
                        React.createElement("meta", { itemProp: "position", content: "1" })),
                    "\uFF1E",
                    React.createElement("span", { itemProp: "itemListElement", itemScope: true, itemType: "http://schema.org/ListItem" },
                        React.createElement(react_router_dom_1.Link, { to: "/folktales", itemProp: "item", style: { marginRight: "5px", marginLeft: "5px" } },
                            React.createElement("span", { itemProp: "name" }, "Japanese Folktales"),
                            React.createElement("meta", { itemProp: "position", content: "2" }))),
                    "\uFF1E",
                    React.createElement("span", { itemProp: "itemListElement", itemScope: true, itemType: "http://schema.org/ListItem" },
                        React.createElement("span", { itemProp: "name", style: { marginRight: "5px", marginLeft: "5px" } }, title),
                        React.createElement("meta", { itemProp: "position", content: "3" }))),
                React.createElement("h1", { style: {
                        margin: "25px",
                        lineHeight: screenWidth > 500 ? "45px" : "35px",
                    } },
                    React.createElement("b", null, title)),
                React.createElement("br", null),
                this.state.storyName ?
                    React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`, width: "90%", alt: title, title: title })
                    :
                        null,
                React.createElement("br", null),
                React.createElement("br", null),
                storyDesc.description ?
                    React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" }, id: "aboutFolktale" },
                        React.createElement("h2", { style: styleForAboutTitle },
                            "About ",
                            titleOfAbout),
                        storyDesc.description.split("\\n").map((d, i) => React.createElement("span", { key: i },
                            d,
                            React.createElement("br", null))))
                    :
                        null,
                React.createElement("br", null),
                React.createElement("div", { ref: this.refSentences }, storyDesc.storyId ?
                    React.createElement("div", null,
                        React.createElement("span", { style: { textAlign: "left" } },
                            React.createElement("h2", { style: styleForStoryTitle }, title + " Story")),
                        React.createElement("br", null),
                        React.createElement(Sentences, { storyId: storyDesc.storyId, sentences: sentences, words: words, langState: this.state, audioFolder: storyName && storyName.split("--")[0] }))
                    :
                        React.createElement("div", { className: "center" },
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" }))),
                otherStories && otherStories.length > 0 ?
                    React.createElement("div", { style: { textAlign: "left", marginTop: "30px", marginBottom: "20px" } },
                        React.createElement("h2", { style: styleForStoryTitle }, "More folktales"))
                    :
                        null,
                otherStories && otherStories.map(s => {
                    const nameForUrl = s.storyName;
                    const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
                    return (React.createElement("div", { key: s.storyId, style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" } }, screenWidth > 500 ?
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { className: "center" },
                                            React.createElement("h3", { style: { color: "black", marginBottom: "20px" } },
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
                                    React.createElement("h3", { style: { color: "black", marginBottom: "20px" } }, nameToShow)),
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
                }),
                React.createElement(react_router_dom_1.Link, { to: "/folktales", style: { fontSize: "x-large" } }, "All folktales >>"),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(FaceBook_1.default, null),
                React.createElement("br", null),
                React.createElement(GoogleAd_1.default, null),
                React.createElement(FooterMenu, { onClickLangBtn: this.onClickLangBtn, langState: this.state, screenWidth: screenWidth, showFooterMenu: showFooterMenu }),
                React.createElement(PleaseScrollDown, { pleaseScrollDown: pleaseScrollDown, screenWidth: screenWidth }))));
    }
}
;
class Sentences extends React.Component {
    render() {
        const { storyId, sentences, words, langState, audioFolder } = this.props;
        const isLoading = !sentences || sentences.length <= 0;
        return (React.createElement("div", { style: { textAlign: "left" } }, isLoading ?
            React.createElement("div", { className: "center" },
                React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" }))
            :
                sentences && sentences.map(s => React.createElement("span", { key: s.lineNumber },
                    React.createElement("table", { style: { width: "100%" } },
                        React.createElement("tbody", null,
                            langState.kanji ?
                                React.createElement("tr", { style: { backgroundColor: "#fff0f2" } },
                                    React.createElement("td", null,
                                        React.createElement("b", null, "\uFF2B:\u3000")),
                                    React.createElement("td", null, s.kanji))
                                :
                                    null,
                            langState.hiragana ?
                                React.createElement("tr", { style: { backgroundColor: "#ffffe0" } },
                                    React.createElement("td", null,
                                        React.createElement("b", null, "\uFF28:\u3000")),
                                    React.createElement("td", null, s.hiragana))
                                :
                                    null,
                            langState.romaji ?
                                React.createElement("tr", { style: { backgroundColor: "#f0fff2" } },
                                    React.createElement("td", null,
                                        React.createElement("b", null, "\uFF32:\u3000")),
                                    React.createElement("td", null, s.romaji))
                                :
                                    null,
                            langState.english ?
                                React.createElement("tr", { style: { backgroundColor: "#f0f8ff" } },
                                    React.createElement("td", null,
                                        React.createElement("b", null, "\uFF25:\u3000")),
                                    React.createElement("td", null, s.english))
                                :
                                    null)),
                    React.createElement(AudioContol, { s: s, audioFolder: audioFolder }),
                    React.createElement(WordList, { words: words, s: s, storyId: storyId }),
                    React.createElement("hr", null)))));
    }
}
;
class AudioContol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showControl: false
        };
        this.refAudio = React.createRef();
    }
    componentDidMount() {
        if (!this.refAudio)
            return;
        const audio = this.refAudio.current;
        audio.load();
    }
    render() {
        const { audioFolder } = this.props;
        const audioPath = `${consts.BLOB_URL}/folktalesAudio/${audioFolder}/folktale-audio${this.props.s.lineNumber}.m4a`;
        return (React.createElement("audio", { ref: this.refAudio, src: audioPath, style: { width: "100%", height: "30px", marginTop: "5px" }, onCanPlayThrough: () => {
                this.setState({ showControl: true });
            }, controls: this.state.showControl }));
    }
}
class WordList extends React.Component {
    constructor(props) {
        super(props);
        this.showWordList = () => {
            this.setState({ showWordList: true });
        };
        this.hideWordList = () => {
            this.setState({ showWordList: false });
        };
        this.state = {
            showWordList: false
        };
    }
    render() {
        return (React.createElement("span", null,
            this.props.words && this.props.words.filter(w => w.lineNumber === this.props.s.lineNumber).length > 0 ?
                this.state.showWordList ?
                    React.createElement("button", { style: { marginTop: 5, marginBottom: 2, height: 28, paddingTop: 0, color: "white" }, className: "btn btn-dark btn-xs", onClick: this.hideWordList }, "\u25B2\u3000Hide word list")
                    :
                        React.createElement("button", { style: { marginTop: 5, height: 28, paddingTop: 0, color: "white" }, className: "btn btn-dark btn-xs", onClick: this.showWordList }, "\u25BC\u3000Show word list")
                :
                    null,
            React.createElement("div", null, this.state.showWordList ?
                React.createElement("div", { className: "center", style: { backgroundColor: "#f8f7f8" } },
                    React.createElement("table", null,
                        React.createElement("tbody", null, this.props.words && this.props.words.filter(w => w.lineNumber === this.props.s.lineNumber).map(w => React.createElement("tr", { key: w.wordNumber },
                            React.createElement("td", { style: { textAlign: "center", minWidth: 100, border: "1px solid" } },
                                w.kanji,
                                React.createElement("br", null),
                                w.hiragana ?
                                    `(${w.hiragana})`
                                    :
                                        null),
                            React.createElement("td", { style: { paddingLeft: 3, paddingRight: 3, border: "1px solid" } }, w.english))))))
                :
                    null)));
    }
}
class PleaseScrollDown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { screenWidth, pleaseScrollDown } = this.props;
        return (React.createElement("div", { style: {
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: pleaseScrollDown ? 999999990 : 0,
                width: `${screenWidth}px`,
                height: "70px",
                opacity: pleaseScrollDown ? 1.0 : 0,
                transition: pleaseScrollDown ? "all 2s ease" : "all 2s ease",
                fontSize: "x-large",
                backgroundColor: "#EEEEEE",
                borderRadius: "30px 30px 0px 0px",
            } },
            React.createElement("span", { id: "pleaseScroll" },
                React.createElement("span", null),
                React.createElement(react_anchor_link_smooth_scroll_1.default, { href: '#aboutFolktale' }, "Scroll"))));
    }
}
class FooterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.showLangMenu = () => {
            this.setState({ showLangMenu: !this.state.showLangMenu });
        };
        this.state = {
            showLangMenu: true,
        };
    }
    render() {
        const { showLangMenu } = this.state;
        const { screenWidth, langState, showFooterMenu } = this.props;
        const tableWidth = (screenWidth > 730) ? 730 : screenWidth;
        const buttonWidth = (tableWidth / 4) - 4;
        const tableLeft = (screenWidth > 730) ? (screenWidth - tableWidth) / 2 - 10 : (screenWidth - tableWidth) / 2;
        const tdStyle = { width: `${buttonWidth}px` };
        return (React.createElement("div", { style: {
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: showFooterMenu ? 999999999 : 0,
                width: `${screenWidth}px`,
                height: "50px",
                backgroundColor: "white",
                opacity: showFooterMenu ? 1.0 : 0,
                transition: showFooterMenu ? "all 2s ease" : "all 2s ease",
            } },
            React.createElement("table", { style: {
                    position: "fixed",
                    bottom: 3,
                    left: `${tableLeft}px`,
                    width: tableWidth,
                    backgroundColor: "#e7e9e7",
                    border: "1px solid gray",
                } },
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { width: "100%" }, onClick: this.showLangMenu },
                        React.createElement("td", { colSpan: 4, style: { padding: 3 } }, showLangMenu ?
                            React.createElement("div", { className: "center" }, "\u25BC Select the languages to read \u25BC")
                            :
                                React.createElement("div", { className: "center" }, "\u25B2 Show language menu \u25B2"))),
                    showLangMenu ?
                        React.createElement("tr", null,
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-danger", style: { width: "100%", fontSize: "small", opacity: !langState.kanji ? 0.3 : 1 }, onClick: () => this.props.onClickLangBtn("kanji") },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "K"),
                                    "anji")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-warning", style: { width: "100%", fontSize: "small", color: "white", backgroundColor: "#d9c402", opacity: !langState.hiragana ? 0.3 : 1 }, onClick: () => this.props.onClickLangBtn("hiragana") },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "H"),
                                    "iragana")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-success", style: { width: "100%", fontSize: "small", opacity: !langState.romaji ? 0.3 : 1 }, onClick: () => this.props.onClickLangBtn("romaji") },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "R"),
                                    "omaji")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-primary", style: { width: "100%", fontSize: "small", opacity: !langState.english ? 0.3 : 1 }, onClick: () => this.props.onClickLangBtn("english") },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "E"),
                                    "nglish")))
                        :
                            null))));
    }
}
exports.default = react_redux_1.connect((state) => state.stories, dispatch => redux_1.bindActionCreators(storiesStore.actionCreators, dispatch))(Stories);
