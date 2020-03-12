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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var storiesStore = __importStar(require("../store/StoriesStore"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var react_anchor_link_smooth_scroll_1 = __importDefault(require("react-anchor-link-smooth-scroll"));
require("./parts/PleaseScrollDown.css");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var GoogleAd_1 = __importDefault(require("./parts/GoogleAd"));
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var consts = __importStar(require("./common/consts"));
var Stories = /** @class */ (function (_super) {
    __extends(Stories, _super);
    function Stories(props) {
        var _this = _super.call(this, props) || this;
        _this.changeScreenSize = function () {
            _this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        };
        _this.judgeFooter = function () {
            if (!_this.refSentences)
                return;
            var divSentences = _this.refSentences.current;
            if (!divSentences)
                return;
            var screenHeight = _this.state.screenHeight;
            var offsetY = divSentences.getBoundingClientRect().top;
            var t_height = divSentences.offsetHeight;
            var t_position = offsetY - screenHeight;
            if (t_position >= 0) {
                // sentencesよりも上側の時
                _this.setState({
                    pleaseScrollDown: true,
                    showFooterMenu: false
                });
            }
            else if (-screenHeight > (t_position + t_height)) {
                // sentencesよりも下側の時
                _this.setState({
                    pleaseScrollDown: false,
                    showFooterMenu: false
                });
            }
            else {
                // sentencesが画面内
                _this.setState({
                    pleaseScrollDown: false,
                    showFooterMenu: true
                });
            }
        };
        _this.onClickLangBtn = function (btnType) {
            var saveData;
            switch (btnType) {
                case "kanji":
                    saveData = {
                        kanji: !_this.state.kanji,
                        hiragana: _this.state.hiragana,
                        romaji: _this.state.romaji,
                        english: _this.state.english,
                    };
                    _this.setState({ kanji: !_this.state.kanji, });
                    break;
                case "hiragana":
                    saveData = {
                        kanji: _this.state.kanji,
                        hiragana: !_this.state.hiragana,
                        romaji: _this.state.romaji,
                        english: _this.state.english,
                    };
                    _this.setState({ hiragana: !_this.state.hiragana, });
                    break;
                case "romaji":
                    saveData = {
                        kanji: _this.state.kanji,
                        hiragana: _this.state.hiragana,
                        romaji: !_this.state.romaji,
                        english: _this.state.english,
                    };
                    _this.setState({ romaji: !_this.state.romaji, });
                    break;
                case "english":
                    saveData = {
                        kanji: _this.state.kanji,
                        hiragana: _this.state.hiragana,
                        romaji: _this.state.romaji,
                        english: !_this.state.english,
                    };
                    _this.setState({ english: !_this.state.english, });
                    break;
                default:
            }
            localStorage.setItem("folktales-languages", JSON.stringify(saveData));
        };
        var params = props.match.params;
        var storyName = params.storyName.toString().split("#")[0];
        _this.props.loadStory(storyName);
        _this.state = {
            storyName: storyName,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pleaseScrollDown: false,
            showFooterMenu: false,
        };
        _this.screenHeight = window.innerHeight;
        var saveData = localStorage.getItem("folktales-languages");
        var objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            _this.state = __assign(__assign({}, _this.state), { kanji: objSaveData.kanji == null ? true : objSaveData.kanji, hiragana: objSaveData.hiragana == null ? true : objSaveData.hiragana, romaji: objSaveData.romaji == null ? false : objSaveData.romaji, english: objSaveData.english == null ? true : objSaveData.english });
        }
        else {
            _this.state = __assign(__assign({}, _this.state), { kanji: true, hiragana: true, romaji: true, english: true });
        }
        var timer;
        window.onresize = function () {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                _this.changeScreenSize();
            }, 100);
        };
        window.addEventListener('scroll', _this.judgeFooter);
        _this.refSentences = React.createRef();
        return _this;
    }
    Stories.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.judgeFooter);
    };
    Stories.prototype.componentDidMount = function () {
        var _this = this;
        for (var i = 0; i < 5; i++) {
            setTimeout(function () {
                _this.judgeFooter();
            }, i * 1000);
        }
    };
    Stories.prototype.componentDidUpdate = function (preciousProps) {
        if (preciousProps.location !== this.props.location) {
            var storyName = this.props.location.pathname.split("/").filter(function (a) { return a; }).pop();
            this.setState({
                storyName: storyName,
            });
            this.props.loadStory(storyName);
        }
    };
    Stories.prototype.render = function () {
        var storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        var title = storyName.split("--").join(" - ").split("_").join(" ");
        var titleOfAbout = storyName.split("--")[0].split("_").join(" ");
        var styleForAboutTitle = {
            fontSize: "large",
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
            fontWeight: "bold",
        };
        var styleForStoryTitle = {
            fontSize: "x-large",
            fontWeight: "bold",
        };
        var _a = this.state, screenWidth = _a.screenWidth, pleaseScrollDown = _a.pleaseScrollDown, showFooterMenu = _a.showFooterMenu;
        var _b = this.props, storyDesc = _b.storyDesc, sentences = _b.sentences, words = _b.words, otherStories = _b.otherStories;
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: title + " Story | Japanese Folktales", desc: storyDesc.description && storyDesc.description.split("\\n").join(" "), img: consts.BLOB_URL + "/folktalesImg/" + storyName.split("--")[0] + ".png" }),
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
                    React.createElement("img", { src: consts.BLOB_URL + "/folktalesImg/" + storyName.split("--")[0] + ".png", width: "90%", alt: title, title: title })
                    :
                        null,
                React.createElement("br", null),
                React.createElement("br", null),
                storyDesc.description ?
                    React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333" }, id: "aboutFolktale" },
                        React.createElement("h2", { style: styleForAboutTitle },
                            "About ",
                            titleOfAbout),
                        storyDesc.description.split("\\n").map(function (d, i) {
                            return React.createElement("span", { key: i },
                                d,
                                React.createElement("br", null));
                        }))
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
                otherStories && otherStories.map(function (s) {
                    var nameForUrl = s.storyName;
                    var nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
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
                                        React.createElement(react_router_dom_1.Link, { to: "/folktales/" + nameForUrl },
                                            React.createElement("img", { src: consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png", width: "90%", alt: nameToShow, title: nameToShow, style: { marginLeft: "10px", marginBottom: "10px" } }))),
                                    React.createElement("td", null,
                                        s.description.split("\\n").map(function (d, i) {
                                            return React.createElement("span", { key: i, style: { color: "black" } },
                                                d,
                                                React.createElement("br", null));
                                        }),
                                        React.createElement("div", { className: "center" },
                                            React.createElement("p", { style: { margin: "20px" } },
                                                React.createElement(react_router_dom_1.Link, { to: "/folktales/" + nameForUrl },
                                                    "Read ",
                                                    nameToShow,
                                                    " >>")))))))
                        :
                            React.createElement("div", null,
                                React.createElement("b", null,
                                    React.createElement("h3", { style: { color: "black", marginBottom: "20px" } }, nameToShow)),
                                React.createElement(react_router_dom_1.Link, { to: "/folktales/" + nameForUrl },
                                    React.createElement("img", { src: consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png", width: "90%", alt: nameToShow, title: nameToShow })),
                                React.createElement("div", { style: { textAlign: "left", margin: "10px" } }, s.description.split("\\n").map(function (d, i) {
                                    return React.createElement("span", { key: i, style: { color: "black" } },
                                        d,
                                        React.createElement("br", null));
                                })),
                                React.createElement("p", null,
                                    React.createElement(react_router_dom_1.Link, { to: "/folktales/" + nameForUrl },
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
    };
    return Stories;
}(React.Component));
;
var Sentences = /** @class */ (function (_super) {
    __extends(Sentences, _super);
    function Sentences() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sentences.prototype.render = function () {
        var _a = this.props, storyId = _a.storyId, sentences = _a.sentences, words = _a.words, langState = _a.langState, audioFolder = _a.audioFolder;
        var isLoading = !sentences || sentences.length <= 0;
        return (React.createElement("div", { style: { textAlign: "left" } }, isLoading ?
            React.createElement("div", { className: "center" },
                React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" }))
            :
                sentences && sentences.map(function (s) {
                    return React.createElement("span", { key: s.lineNumber },
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
                        React.createElement("hr", null));
                })));
    };
    return Sentences;
}(React.Component));
;
var AudioContol = /** @class */ (function (_super) {
    __extends(AudioContol, _super);
    function AudioContol(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showControl: false
        };
        _this.refAudio = React.createRef();
        return _this;
    }
    AudioContol.prototype.componentDidMount = function () {
        if (!this.refAudio)
            return;
        var audio = this.refAudio.current;
        audio.load();
    };
    AudioContol.prototype.render = function () {
        var _this = this;
        var audioFolder = this.props.audioFolder;
        var audioPath = consts.BLOB_URL + "/folktalesAudio/" + audioFolder + "/folktale-audio" + this.props.s.lineNumber + ".m4a";
        return (React.createElement("audio", { ref: this.refAudio, src: audioPath, style: { width: "100%", height: "30px", marginTop: "5px" }, onCanPlayThrough: function () {
                _this.setState({ showControl: true });
            }, controls: this.state.showControl }));
    };
    return AudioContol;
}(React.Component));
var WordList = /** @class */ (function (_super) {
    __extends(WordList, _super);
    function WordList(props) {
        var _this = _super.call(this, props) || this;
        _this.showWordList = function () {
            _this.setState({ showWordList: true });
        };
        _this.hideWordList = function () {
            _this.setState({ showWordList: false });
        };
        _this.state = {
            showWordList: false
        };
        return _this;
    }
    WordList.prototype.render = function () {
        var _this = this;
        return (React.createElement("span", null,
            this.props.words && this.props.words.filter(function (w) {
                return w.lineNumber === _this.props.s.lineNumber;
            }).length > 0 ?
                this.state.showWordList ?
                    React.createElement("button", { style: { marginTop: 5, marginBottom: 2, height: 28, paddingTop: 0, color: "white" }, className: "btn btn-dark btn-xs", onClick: this.hideWordList }, "\u25B2\u3000Hide word list")
                    :
                        React.createElement("button", { style: { marginTop: 5, height: 28, paddingTop: 0, color: "white" }, className: "btn btn-dark btn-xs", onClick: this.showWordList }, "\u25BC\u3000Show word list")
                :
                    null,
            React.createElement("div", null, this.state.showWordList ?
                React.createElement("div", { className: "center", style: { backgroundColor: "#f8f7f8" } },
                    React.createElement("table", null,
                        React.createElement("tbody", null, this.props.words && this.props.words.filter(function (w) {
                            return w.lineNumber === _this.props.s.lineNumber;
                        }).map(function (w) {
                            return React.createElement("tr", { key: w.wordNumber },
                                React.createElement("td", { style: { textAlign: "center", minWidth: 100, border: "1px solid" } },
                                    w.kanji,
                                    React.createElement("br", null),
                                    w.hiragana ?
                                        "(" + w.hiragana + ")"
                                        :
                                            null),
                                React.createElement("td", { style: { paddingLeft: 3, paddingRight: 3, border: "1px solid" } }, w.english));
                        }))))
                :
                    null)));
    };
    return WordList;
}(React.Component));
var PleaseScrollDown = /** @class */ (function (_super) {
    __extends(PleaseScrollDown, _super);
    function PleaseScrollDown(props) {
        return _super.call(this, props) || this;
    }
    PleaseScrollDown.prototype.render = function () {
        var _a = this.props, screenWidth = _a.screenWidth, pleaseScrollDown = _a.pleaseScrollDown;
        return (React.createElement("div", { style: {
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: pleaseScrollDown ? 999999990 : 0,
                width: screenWidth + "px",
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
    };
    return PleaseScrollDown;
}(React.Component));
var FooterMenu = /** @class */ (function (_super) {
    __extends(FooterMenu, _super);
    function FooterMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.showLangMenu = function () {
            _this.setState({ showLangMenu: !_this.state.showLangMenu });
        };
        _this.state = {
            showLangMenu: true,
        };
        return _this;
    }
    FooterMenu.prototype.render = function () {
        var _this = this;
        var showLangMenu = this.state.showLangMenu;
        var _a = this.props, screenWidth = _a.screenWidth, langState = _a.langState, showFooterMenu = _a.showFooterMenu;
        var tableWidth = (screenWidth > 730) ? 730 : screenWidth;
        var buttonWidth = (tableWidth / 4) - 4;
        var tableLeft = (screenWidth > 730) ? (screenWidth - tableWidth) / 2 - 10 : (screenWidth - tableWidth) / 2;
        var tdStyle = { width: buttonWidth + "px" };
        return (React.createElement("div", { style: {
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: showFooterMenu ? 999999999 : 0,
                width: screenWidth + "px",
                height: "50px",
                backgroundColor: "white",
                opacity: showFooterMenu ? 1.0 : 0,
                transition: showFooterMenu ? "all 2s ease" : "all 2s ease",
            } },
            React.createElement("table", { style: {
                    position: "fixed",
                    bottom: 3,
                    left: tableLeft + "px",
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
                                React.createElement("button", { className: "btn btn-danger", style: { width: "100%", fontSize: "small", opacity: !langState.kanji ? 0.3 : 1 }, onClick: function () { return _this.props.onClickLangBtn("kanji"); } },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "K"),
                                    "anji")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-warning", style: { width: "100%", fontSize: "small", color: "white", backgroundColor: "#d9c402", opacity: !langState.hiragana ? 0.3 : 1 }, onClick: function () { return _this.props.onClickLangBtn("hiragana"); } },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "H"),
                                    "iragana")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-success", style: { width: "100%", fontSize: "small", opacity: !langState.romaji ? 0.3 : 1 }, onClick: function () { return _this.props.onClickLangBtn("romaji"); } },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "R"),
                                    "omaji")),
                            React.createElement("td", { style: tdStyle },
                                React.createElement("button", { className: "btn btn-primary", style: { width: "100%", fontSize: "small", opacity: !langState.english ? 0.3 : 1 }, onClick: function () { return _this.props.onClickLangBtn("english"); } },
                                    React.createElement("b", { style: { fontSize: "x-large" } }, "E"),
                                    "nglish")))
                        :
                            null))));
    };
    return FooterMenu;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.stories; }, function (dispatch) { return redux_1.bindActionCreators(storiesStore.actionCreators, dispatch); })(Stories);
