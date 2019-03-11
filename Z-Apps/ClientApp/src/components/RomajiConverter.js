import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import '../css/RomajiConverter.css';

const objTwoChars = { "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo", "しゃ": "sha", "しゅ": "shu", "しょ": "sho", "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho", "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo", "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo", "みゃ": "mya", "みゅ": "myu", "みょ": "myo", "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo", "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo", "じゃ": "ja", "じゅ": "ju", "じょ": "jo", "びゃ": "bya", "びゅ": "byu", "びょ": "byo", "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo", "じぇ": "jie", "ちぇ": "chie", "てぃ": "tei", "でぃ": "dei", "でゅ": "deyu", "ふぁ": "fua", "ふぃ": "fui", "ふぇ": "fue", "ふぉ": "fuo", "ゔぁ": "bua", "ゔぃ": "bui", "ゔぇ": "bue", "ゔぉ": "buo" };
const objTwoChars_K = { "キャ": "kya", "キュ": "kyu", "キョ": "kyo", "シャ": "sha", "シュ": "shu", "ショ": "sho", "チャ": "cha", "チュ": "chu", "チョ": "cho", "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo", "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo", "ミャ": "mya", "ミュ": "myu", "ミョ": "myo", "リャ": "rya", "リュ": "ryu", "リョ": "ryo", "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo", "ジャ": "ja", "ジュ": "ju", "ジョ": "jo", "ビャ": "bya", "ビュ": "byu", "ビョ": "byo", "ピャ": "pya", "ピュ": "pyu", "ピョ": "pyo", "ジェ": "jie", "チェ": "chie", "ティ": "tei", "ディ": "dei", "デュ": "deyu", "ファ": "fua", "フィ": "fui", "フェ": "fue", "フォ": "fuo", "ヴァ": "bua", "ヴィ": "bui", "ヴェ": "bue", "ヴォ": "buo" };
const objOneChar = { "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o", "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko", "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so", "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to", "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no", "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho", "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo", "や": "ya", "ゆ": "yu", "よ": "yo", "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro", "わ": "wa", "ゐ ": "i", "ゑ": "e", "を": "o", "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go", "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo", "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do", "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo", "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po", "ゔ": "bu", "ー": "" };
const objOneChar_K = { "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o", "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko", "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so", "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to", "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no", "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho", "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo", "ヤ": "ya", "ユ": "yu", "ヨ": "yo", "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro", "ワ": "wa", "ヰ ": "i", "ヱ": "e", "ヲ": "o", "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go", "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo", "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do", "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo", "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po", "ヴ": "bu", "ー": "" };
const objM = { "んb": "mb", "んm": "mm", "んp": "mp" };
const objM_K = { "ンb": "mb", "ンm": "mm", "ンp": "mp" };
const objN = { "ん": "n" };
const objN_K = { "ン": "n" };
const objLongSound = { "oo": "o", "ou": "o", "uu": "u" };

const MSG_PROMPT = "Please type or paste the sentences of [Hiragana] or [Katakana] here.";

let ioArea = [];

// 親：<Parent />の定義
class Parent extends React.Component {

    // State（※状態は親が管理）
    // この値はブラウザを閉じたり、リロードするまでは保持される
    constructor(props) {
        super(props);
        this.state = {
            textVal: "",
            prompt: MSG_PROMPT,
            inputColor: "redChar",
        };
        this.setStateTextVal = this.setStateTextVal.bind(this);
        this.initText = this.initText.bind(this);
    }


    initText() {
        if (this.state.prompt === MSG_PROMPT) {
            this.setState({
                prompt: "",
                inputColor: "blackChar",
            });
        }
    }


    // State(textVal)を変更
    setStateTextVal(textVal) {

        let textVal_r = textVal;

        textVal_r = this.convertChars(textVal_r, objTwoChars_K);
        textVal_r = this.convertChars(textVal_r, objTwoChars);

        textVal_r = this.convertChars(textVal_r, objOneChar);
        textVal_r = this.convertChars(textVal_r, objOneChar_K);

        textVal_r = this.convertChars(textVal_r, objM);
        textVal_r = this.convertChars(textVal_r, objM_K);

        textVal_r = this.convertChars(textVal_r, objN);
        textVal_r = this.convertChars(textVal_r, objN_K);

        textVal_r = this.convertSmallTsu(textVal_r);

        textVal_r = this.convertChars(textVal_r, objLongSound);

        this.setState({
            textVal: textVal_r,
            prompt: textVal,
        });
    }

    convertChars(text, obj) {
        for (let key in obj) {
            let arrText = text.split(key);
            text = arrText.join(obj[key]);
        }
        return text;
    }

    convertSmallTsu(text) {
        text = this.convertChars(text, { "っch": "tch", "ッch": "tch" });

        let arrText = text.split("");
        for (let index in arrText) {
            if (arrText[index] === "っ" || arrText[index] === "ッ") {
                arrText[index] = arrText[Number(index) + 1] || "";
            }
        }
        return arrText.join("");
    }


    onScrollInput() {
        if (ioArea.length < 2) {
            console.log("get io");
            ioArea[0] = document.getElementById("inputArea");
            ioArea[1] = document.getElementById("outputArea");
        }
        ioArea[1].scrollTop = ioArea[0].scrollTop;
    }


    // <Parent />の表示
    // ここで子となる<ChildInput />と<Child />を記述
    render() {
        return (
            <center>
                <h1>
                    <b>Romaji<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Converter</b>
                </h1>
                <br />
                <span className="redChar">※ Please also check the result by yourself.</span>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <center>Hiragana<br />or<br />Katakana</center>
                            </th>
                            <th>
                                <center>Romaji</center>
                            </th>
                        </tr>
                        <tr>
                            <td className="row">
                                <ChildInput
                                    inputColor={this.state.inputColor}
                                    prompt={this.state.prompt}
                                    onChange={(e) => { this.setStateTextVal(e) }}
                                    onFocus={(e) => { this.initText(e) }}
                                    onScroll={this.onScrollInput}
                                />
                            </td>
                            <td className="tdOutput">
                                <Child
                                    textVal={this.state.textVal}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
};

// 子1：<ChildInput />の定義（※props経由で親を参照できる）
class ChildInput extends React.Component {
    _onChange(e) {
        this.props.onChange(e.target.value);
    }

    _onFocus(e) {
        this.props.onFocus(e.target.value);
    }

    _onScroll() {
        this.props.onScroll();
    }

    _onKeyDown(e) {
        if (e.keyCode === 13) { // Enterキー
            //this.props.onSave(e.target.value);
            //e.target.value = "";
        }
    }

    // <ChildInput />の表示
    render() {
        return (
            <center className="t-area-center">
                <textarea
                    id="inputArea"
                    className={this.props.inputColor}
                    onChange={(e) => { this._onChange(e) }}
                    onKeyDown={(e) => { this._onKeyDown(e) }}
                    onFocus={(e) => { this._onFocus(e) }}
                    onScroll={() => { this._onScroll() }}
                    value={this.props.prompt}
                />
            </center>
        );
    }
};


// 子2：<Child />の定義（※props経由で親を参照できる）
class Child extends React.Component {
    // <Child />の表示
    render() {
        var lines = this.props.textVal.split('\n').map(function (line, index) {
            return <p key={index} className="line-wrap">{line}<br /></p>;
        });
        return <div id="outputArea" className="lines">{lines}</div>;
    }
};


export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Parent);

