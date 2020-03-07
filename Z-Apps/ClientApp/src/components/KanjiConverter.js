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
var KanjiConverter_1 = require("../store/KanjiConverter");
require("../css/KanjiConverter.css");
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var objConst = {};
var KanjiConverter = /** @class */ (function (_super) {
    __extends(KanjiConverter, _super);
    function KanjiConverter(props) {
        var _this = _super.call(this, props) || this;
        objConst = {
            objTwoChars: { "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo", "しゃ": "sha", "しゅ": "shu", "しょ": "sho", "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho", "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo", "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo", "みゃ": "mya", "みゅ": "myu", "みょ": "myo", "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo", "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo", "じゃ": "ja", "じゅ": "ju", "じょ": "jo", "びゃ": "bya", "びゅ": "byu", "びょ": "byo", "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo", "じぇ": "jie", "ちぇ": "chie", "てぃ": "tei", "でぃ": "dei", "でゅ": "deyu", "ふぁ": "fua", "ふぃ": "fui", "ふぇ": "fue", "ふぉ": "fuo", "ゔぁ": "bua", "ゔぃ": "bui", "ゔぇ": "bue", "ゔぉ": "buo" },
            objTwoChars_K: { "キャ": "kya", "キュ": "kyu", "キョ": "kyo", "シャ": "sha", "シュ": "shu", "ショ": "sho", "チャ": "cha", "チュ": "chu", "チョ": "cho", "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo", "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo", "ミャ": "mya", "ミュ": "myu", "ミョ": "myo", "リャ": "rya", "リュ": "ryu", "リョ": "ryo", "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo", "ジャ": "ja", "ジュ": "ju", "ジョ": "jo", "ビャ": "bya", "ビュ": "byu", "ビョ": "byo", "ピャ": "pya", "ピュ": "pyu", "ピョ": "pyo", "ジェ": "jie", "チェ": "chie", "ティ": "tei", "ディ": "dei", "デュ": "deyu", "ファ": "fua", "フィ": "fui", "フェ": "fue", "フォ": "fuo", "ヴァ": "bua", "ヴィ": "bui", "ヴェ": "bue", "ヴォ": "buo" },
            objOneChar: { "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o", "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko", "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so", "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to", "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no", "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho", "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo", "や": "ya", "ゆ": "yu", "よ": "yo", "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro", "わ": "wa", "ゐ ": "i", "ゑ": "e", "を": "o", "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go", "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo", "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do", "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo", "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po", "ゔ": "bu", "ー": "" },
            objOneChar_K: { "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o", "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko", "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so", "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to", "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no", "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho", "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo", "ヤ": "ya", "ユ": "yu", "ヨ": "yo", "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro", "ワ": "wa", "ヰ ": "i", "ヱ": "e", "ヲ": "o", "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go", "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo", "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do", "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo", "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po", "ヴ": "bu", "ー": "" },
            objM: { "んb": "mb", "んm": "mm", "んp": "mp" },
            objM_K: { "ンb": "mb", "ンm": "mm", "ンp": "mp" },
            objN: { "ん": "n" },
            objN_K: { "ン": "n" },
            objLongSound: { "oo": "o", "ou": "o", "uu": "u" },
            objChangeLine: { "<br />": "\n", "<br/>": "\n", "<br>": "\n", '<p class="line-wrap">': "", "</p>": "" },
            MSG_PROMPT: "Please type or paste sentences, including Kanji here!\n(Max 250 characters)\nThen push the [Convert] button below.",
            MSG_TYPE_KANJI: "Please input Kanji before pushing [Convert] button!",
            MSG_NO_COPY_TARGET: "There are no Romaji characters to copy!\r\nPlease input Kanji and push [Convert] button!",
            MSG_COPY_DONE: "Copy completed!\r\nYou can paste it anywhere.",
            MSG_COPY_ERR: "Sorry!\r\nYou can not use the copy function with this web browser.\r\nPlease copy it manually.",
            COPY_BTN_LABEL: "Click here to copy Romaji!",
            CONVERT_BTN_LABEL: "⇓　　Convert!　　⇓",
            CONVERT_BUTTON: "btn btn-dark btn-lg btn-block",
            COPY_BUTTON: "btn btn-info btn-lg btn-block",
            ioArea: []
        };
        _this.result = "";
        _this.textVal = "";
        _this.state = {
            inputKanji: objConst.MSG_PROMPT,
            inputColor: "redChar",
        };
        _this.setStateTextVal = _this.setStateTextVal.bind(_this);
        _this.initText = _this.initText.bind(_this);
        _this.onChangeKanji = _this.onChangeKanji.bind(_this);
        _this.onClickConvert = _this.onClickConvert.bind(_this);
        _this.ref = React.createRef();
        return _this;
    }
    KanjiConverter.prototype.initText = function () {
        if (this.state.inputKanji === objConst.MSG_PROMPT) {
            this.setState({
                inputKanji: "",
                inputColor: "blackChar",
            });
        }
    };
    KanjiConverter.prototype.onChangeKanji = function (kanjiVal) {
        this.setState({ inputKanji: kanjiVal.target.value });
    };
    // State(textVal)を変更
    KanjiConverter.prototype.setStateTextVal = function (textVal) {
        var textVal_r = textVal;
        textVal_r = convertChars(textVal_r, objConst.objTwoChars_K);
        textVal_r = convertChars(textVal_r, objConst.objTwoChars);
        textVal_r = convertChars(textVal_r, objConst.objOneChar);
        textVal_r = convertChars(textVal_r, objConst.objOneChar_K);
        textVal_r = convertChars(textVal_r, objConst.objM);
        textVal_r = convertChars(textVal_r, objConst.objM_K);
        textVal_r = convertChars(textVal_r, objConst.objN);
        textVal_r = convertChars(textVal_r, objConst.objN_K);
        textVal_r = this.convertSmallTsu(textVal_r);
        textVal_r = convertChars(textVal_r, objConst.objLongSound);
        this.textVal = textVal_r;
    };
    KanjiConverter.prototype.convertSmallTsu = function (text) {
        text = convertChars(text, { "っch": "tch", "ッch": "tch" });
        var arrText = text.split("");
        for (var index in arrText) {
            if (arrText[index] === "っ" || arrText[index] === "ッ") {
                arrText[index] = arrText[Number(index) + 1] || "";
            }
        }
        return arrText.join("");
    };
    KanjiConverter.prototype.onScrollInput = function () {
        getIoElement();
        objConst.ioArea[1].scrollTop = objConst.ioArea[0].scrollTop;
    };
    KanjiConverter.prototype.onClickConvert = function () {
        if (this.state.inputKanji === objConst.MSG_PROMPT || this.state.inputKanji === "") {
            alert(objConst.MSG_TYPE_KANJI);
        }
        else {
            this.props.requestKanjiConvert(this.state.inputKanji);
        }
    };
    KanjiConverter.prototype.onClickCopy = function () {
        var strTarget = getCopyTarget();
        if (strTarget.trim() === "") {
            alert(objConst.MSG_NO_COPY_TARGET);
        }
        else {
            if (execCopy(strTarget)) {
                alert(objConst.MSG_COPY_DONE);
            }
            else {
                alert(objConst.MSG_COPY_ERR);
            }
        }
    };
    //ローマ字変換アプリの表示
    KanjiConverter.prototype.render = function () {
        var _this = this;
        this.props.convertedWords.map(function (w) {
            return _this.result = w.convertedWord;
        });
        this.result && this.setStateTextVal(this.result);
        return (<center className="kanji-converter">
                <Helmet_1.default title="Kanji Converter" desc="A converter to change Kanji to Hiragana and Romaji. Use to know how to read Kanji!"/>
                <h1>
                    <b>Kanji<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Converter</b>
                </h1>
                <span className="redChar" id="scrollTargetId">※ Please also check the result.</span><br />

                <table className="kanji-table" ref={this.ref}>
                    <tbody>
                        <tr>
                            <th>
                                <center>Kanji</center>
                            </th>
                        </tr>
                        <tr>
                            <td className="row">
                                <textarea id="inputKanji" onChange={function (e) { _this.onChangeKanji(e); }} className={this.state.inputColor} value={this.state.inputKanji} onFocus={function (e) { _this.initText(e); }} maxlength="250"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="btnConvert" onClick={function (e) { _this.onClickConvert(e); }} className={objConst.CONVERT_BUTTON}>
                    {objConst.CONVERT_BTN_LABEL}
                </button>
                {this.props.isLoading ? <span>Loading...</span> : []}
                <table className="result-table">
                    <tbody>
                        <tr>
                            <th>
                                <center>Hiragana</center>
                            </th>
                            <th>
                                <center>Romaji</center>
                            </th>
                        </tr>
                        <tr>
                            <td className="row">
                                <ChildInput onScroll={this.onScrollInput} result={this.result}/>
                            </td>
                            <td className="tdOutput">
                                <Child textVal={this.textVal}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="btnCopy" onClick={this.onClickCopy} className={objConst.COPY_BUTTON}>{objConst.COPY_BTN_LABEL}</button>
                <br />
                <p className="no-margin">
                    If you want to know about Kanji,<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                    please check this:
                    </p>
                <a href="https://www.lingual-ninja.com/2018/09/what-is-kanji-why-is-kanji-necessary.html" target="_blank" rel="noopener noreferrer"><b>What is Kanji? >></b></a>
                <br />
                <br />
                <FaceBook_1.default />
                <br />
                
                <div className="yahoo-div">
                    <span className="yahoo-text">Supported by Yahoo! デベロッパーネットワーク　ルビ振りAPI<br />
                        <a href="https://developer.yahoo.co.jp/about">
                            <img src="https://s.yimg.jp/images/yjdn/yjdn_attbtn1_125_17.gif" title="Webサービス by Yahoo! JAPAN" alt="Web Services by Yahoo! JAPAN" width="125" height="17" border="0" className="yahoo"/>
                        </a>
                    </span>
                </div>
                
                <PleaseScrollDown_1.default criteriaRef={this.ref} targetId="scrollTargetId"/>
            </center>);
    };
    return KanjiConverter;
}(React.Component));
;
//入力エリアの定義（※props経由で親を参照できる）
var ChildInput = /** @class */ (function (_super) {
    __extends(ChildInput, _super);
    function ChildInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildInput.prototype._onScroll = function () {
        this.props.onScroll();
    };
    //入力エリアの表示
    ChildInput.prototype.render = function () {
        var _this = this;
        return (<center className="t-area-center">
                <textarea id="inputArea" className={this.props.inputColor} onScroll={function () { _this._onScroll(); }} value={this.props.result}/>
            </center>);
    };
    return ChildInput;
}(React.Component));
;
//ローマ字出力エリア
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.render = function () {
        var lines = this.props.textVal.split('\n').map(function (line, index) {
            return <p key={index} className="line-wrap">{line}<br /></p>;
        });
        return <div id="outputArea" className="lines">{lines}</div>;
    };
    return Child;
}(React.Component));
;
function getIoElement() {
    if (objConst.ioArea.length < 2) {
        objConst.ioArea[0] = document.getElementById("inputArea");
        objConst.ioArea[1] = document.getElementById("outputArea");
    }
}
function convertChars(text, obj) {
    for (var key in obj) {
        var arrText = text.split(key);
        text = arrText.join(obj[key]);
    }
    return text;
}
function getCopyTarget() {
    getIoElement();
    return convertChars(objConst.ioArea[1].innerHTML, objConst.objChangeLine);
}
function execCopy(string) {
    var tmp = document.createElement("div");
    var pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    var s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    var result = document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
}
exports.default = react_redux_1.connect(function (state) { return state.kanjiConverter; }, function (dispatch) { return redux_1.bindActionCreators(KanjiConverter_1.actionCreators, dispatch); })(KanjiConverter);
