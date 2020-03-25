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
const storiesEditStore = __importStar(require("../store/StoriesEditStore"));
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const consts = __importStar(require("./common/consts"));
class StoriesEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeImportData = (event) => {
            this.setState({ importData: event.target.value });
        };
        this.import = () => {
            const { addLine, removeBlankLine, translateAllSentences, saveWidhoutConfirmation } = this.props;
            const importedSentences = this.state.importData.replace("\r", "").split("\n");
            const importedSentencesWithoutBlank = importedSentences.filter(s => s);
            importedSentencesWithoutBlank.map((s, idx) => {
                addLine(idx, s);
            });
            removeBlankLine();
            translateAllSentences(saveWidhoutConfirmation);
            this.setState({ imported: true });
        };
        const { params } = props.match;
        const storyName = params.storyName.toString();
        this.state = {
            storyName: storyName,
            importData: "",
            imported: false,
        };
        this.screenHeight = window.innerHeight;
        this.props.loadStory(this.state.storyName);
        this.props.setInitialToken();
    }
    componentDidUpdate() {
        if (this.props.storyDesc.storyId) {
            if (!this.props.sentences || this.props.sentences.length <= 0) {
                this.props.loadSentences(this.props.storyDesc.storyId);
                this.props.loadWords(this.props.storyDesc.storyId);
            }
        }
    }
    render() {
        const storyName = this.props.storyDesc.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const showSentences = this.props.sentences && this.props.sentences.length > 0 && this.props.words && this.props.words.length > 0;
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: title + " Story", noindex: true }),
            React.createElement("div", { style: { width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: -1 } }),
            React.createElement("div", { style: { maxWidth: 1000 } },
                React.createElement("div", { className: "breadcrumbs", style: { textAlign: "left", color: "white" } },
                    React.createElement(react_router_dom_1.Link, { to: "/", style: { marginRight: "5px", marginLeft: "5px" } },
                        React.createElement("span", null, "Home")),
                    "\uFF1E",
                    React.createElement(react_router_dom_1.Link, { to: "/folktalesEdit", style: { marginRight: "5px", marginLeft: "5px" } },
                        React.createElement("span", null, "Japanese Folktales")),
                    "\uFF1E",
                    React.createElement("span", { style: { marginRight: "5px", marginLeft: "5px" } }, title)),
                React.createElement("h1", { style: {
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    } },
                    React.createElement("b", null, title)),
                React.createElement("br", null),
                this.props.sentences.filter(s => s && s.kanji.length > 0).length <= 0 &&
                    React.createElement("span", null,
                        React.createElement("b", { style: { color: "white" } }, "Import"),
                        React.createElement("br", null),
                        React.createElement("textarea", { rows: 10, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }, value: this.state.importData, onChange: this.handleChangeImportData }),
                        React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: this.import },
                            React.createElement("b", null, "Import")),
                        React.createElement("br", null),
                        React.createElement("br", null)),
                this.state.storyName ?
                    React.createElement("img", { src: `${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`, width: "100px" })
                    :
                        null,
                React.createElement("br", null),
                this.screenHeight < 750 ?
                    React.createElement("div", { style: {
                            color: "red",
                        } },
                        React.createElement("br", null),
                        React.createElement("b", null, "\u2193 Please scroll down \u2193"))
                    :
                        null,
                React.createElement("br", null),
                this.props.storyDesc.description ?
                    React.createElement(Description, { desc: this.props.storyDesc.description, handleChangeDesc: this.props.handleChangeDesc })
                    :
                        null,
                React.createElement("br", null),
                showSentences ?
                    React.createElement(Sentences, { storyId: this.props.storyDesc.storyId, sentences: this.props.sentences, loadSentences: this.props.loadSentences, words: this.props.words, loadWords: this.props.loadWords, handleChangeSentence: this.props.handleChangeSentence, addLine: this.props.addLine, handleChangeWord: this.props.handleChangeWord, addWord: this.props.addWord, removeWord: this.props.removeWord, removeLine: this.props.removeLine, translate: this.props.translate, translateWord: this.props.translateWord, isTranslating: this.props.isTranslating, mergeWord: this.props.mergeWord })
                    :
                        React.createElement("div", { className: "center" },
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })),
                React.createElement("input", { type: "text", value: this.props.token, onChange: this.props.handleChangeToken }),
                React.createElement("br", null),
                React.createElement("div", { style: {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99999999,
                        backgroundColor: "black",
                        width: "100%",
                    } },
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: this.props.save },
                        React.createElement("b", null, "Save")),
                    "\"\u3000\"",
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: this.props.register },
                        React.createElement("b", null, "Register")),
                    "\"\u3000\"",
                    React.createElement("a", { href: "/sitemapEdit", target: "_blank", rel: "noopener" },
                        React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs" },
                            React.createElement("b", null, "Sitemap")))))));
    }
}
;
class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" } },
            React.createElement("textarea", { rows: 10, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }, value: this.props.desc, onChange: this.props.handleChangeDesc })));
    }
}
class Sentences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { style: { textAlign: "left" } }, this.props.sentences && this.props.sentences.map((s, i) => React.createElement("span", { key: s.lineNumber },
            React.createElement("table", { style: { width: "100%" } },
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "\uFF2B:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.kanji, onChange: (e) => this.props.handleChangeSentence(e, i, "kanji"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))),
                    React.createElement("tr", null,
                        React.createElement("td", null),
                        React.createElement("td", { style: { textAlign: "left" } },
                            React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.translate(s) },
                                React.createElement("b", null, "\u2193\u3000Translate Sentence\u3000\u2193")),
                            this.props.isTranslating ? React.createElement("span", { style: { color: "white", marginLeft: 20 } }, "Translating...") : null,
                            React.createElement("div", { style: { textAlign: "right", float: "right" } },
                                React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.removeLine(s.lineNumber) },
                                    React.createElement("b", null, "Remove Sentence"))))),
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "\uFF28:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.hiragana, onChange: (e) => this.props.handleChangeSentence(e, i, "hiragana"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))),
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "\uFF32:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.romaji, onChange: (e) => this.props.handleChangeSentence(e, i, "romaji"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))),
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "\uFF25:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.english, onChange: (e) => this.props.handleChangeSentence(e, i, "english"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))))),
            this.props.words && this.props.words.length > 0 ?
                React.createElement(WordList, { words: this.props.words, s: s, storyId: this.props.storyId, handleChangeWord: this.props.handleChangeWord, addWord: this.props.addWord, removeWord: this.props.removeWord, translateWord: this.props.translateWord, mergeWord: this.props.mergeWord })
                :
                    null,
            React.createElement("button", { style: { marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.addLine(s.lineNumber) },
                React.createElement("b", null, "Add Line")),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("hr", null)))));
    }
}
;
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
            showWordList: true,
        };
    }
    render() {
        return (React.createElement("span", null,
            React.createElement("br", null),
            React.createElement("div", { style: { backgroundColor: "#1b181b" } }, this.state.showWordList ?
                React.createElement("div", { className: "center" },
                    React.createElement("table", { style: { border: 1, width: "100%", borderCollapse: "collapse" } },
                        React.createElement("tbody", null, this.props.words && this.props.words.filter((w) => w.lineNumber === this.props.s.lineNumber).sort((a, b) => a.wordNumber - b.wordNumber).map((w, i) => React.createElement("tr", { key: w.wordNumber },
                            React.createElement("td", { style: { width: "10px" } },
                                React.createElement("button", { style: { height: "100%", paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.mergeWord(w.lineNumber, w.wordNumber) },
                                    React.createElement("b", null, "M"))),
                            React.createElement("td", { style: { width: "20%" } },
                                React.createElement("textarea", { value: w.kanji, onChange: (e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "kanji"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } })),
                            React.createElement("td", { style: { width: "10px" } },
                                React.createElement("button", { style: { height: "100%", paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.translateWord(w) },
                                    React.createElement("b", null, "\u21D2"))),
                            React.createElement("td", { style: { width: "23%" } },
                                React.createElement("textarea", { value: w.hiragana, onChange: (e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "hiragana"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } })),
                            React.createElement("td", null,
                                React.createElement("textarea", { value: w.english, onChange: (e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "english"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } })),
                            React.createElement("td", { style: { width: "10px" } },
                                React.createElement("button", { style: { height: "100%", paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.removeWord(w.lineNumber, w.wordNumber) },
                                    React.createElement("b", null, "\uFF0D"))),
                            React.createElement("td", { style: { width: "10px" } },
                                React.createElement("button", { style: { height: "100%", paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => this.props.addWord(w.lineNumber, w.wordNumber) },
                                    React.createElement("b", null, "\uFF0B"))))))))
                :
                    null)));
    }
}
exports.default = react_redux_1.connect(state => state["storiesEdit"], dispatch => redux_1.bindActionCreators(storiesEditStore.actionCreators, dispatch))(StoriesEdit);
