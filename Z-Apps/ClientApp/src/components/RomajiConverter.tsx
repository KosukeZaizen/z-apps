import * as React from "react";
import "../css/RomajiConverter.css";
import FB from "./parts/FaceBook";
import Head from "./parts/Helmet";

let objConst: any = {};

class RomajiConverter extends React.Component<
    {},
    {
        prompt: string;
        textVal: string;
        inputColor: string;
    }
> {
    constructor(props: {}) {
        super(props);

        objConst = {
            objTwoChars: {
                きゃ: "kya",
                きゅ: "kyu",
                きょ: "kyo",
                しゃ: "sha",
                しゅ: "shu",
                しょ: "sho",
                ちゃ: "cha",
                ちゅ: "chu",
                ちょ: "cho",
                にゃ: "nya",
                にゅ: "nyu",
                にょ: "nyo",
                ひゃ: "hya",
                ひゅ: "hyu",
                ひょ: "hyo",
                みゃ: "mya",
                みゅ: "myu",
                みょ: "myo",
                りゃ: "rya",
                りゅ: "ryu",
                りょ: "ryo",
                ぎゃ: "gya",
                ぎゅ: "gyu",
                ぎょ: "gyo",
                じゃ: "ja",
                じゅ: "ju",
                じょ: "jo",
                びゃ: "bya",
                びゅ: "byu",
                びょ: "byo",
                ぴゃ: "pya",
                ぴゅ: "pyu",
                ぴょ: "pyo",
                じぇ: "jie",
                ちぇ: "chie",
                てぃ: "tei",
                でぃ: "dei",
                でゅ: "deyu",
                ふぁ: "fua",
                ふぃ: "fui",
                ふぇ: "fue",
                ふぉ: "fuo",
                ゔぁ: "bua",
                ゔぃ: "bui",
                ゔぇ: "bue",
                ゔぉ: "buo",
            },
            objTwoChars_K: {
                キャ: "kya",
                キュ: "kyu",
                キョ: "kyo",
                シャ: "sha",
                シュ: "shu",
                ショ: "sho",
                チャ: "cha",
                チュ: "chu",
                チョ: "cho",
                ニャ: "nya",
                ニュ: "nyu",
                ニョ: "nyo",
                ヒャ: "hya",
                ヒュ: "hyu",
                ヒョ: "hyo",
                ミャ: "mya",
                ミュ: "myu",
                ミョ: "myo",
                リャ: "rya",
                リュ: "ryu",
                リョ: "ryo",
                ギャ: "gya",
                ギュ: "gyu",
                ギョ: "gyo",
                ジャ: "ja",
                ジュ: "ju",
                ジョ: "jo",
                ビャ: "bya",
                ビュ: "byu",
                ビョ: "byo",
                ピャ: "pya",
                ピュ: "pyu",
                ピョ: "pyo",
                ジェ: "jie",
                チェ: "chie",
                ティ: "tei",
                ディ: "dei",
                デュ: "deyu",
                ファ: "fua",
                フィ: "fui",
                フェ: "fue",
                フォ: "fuo",
                ヴァ: "bua",
                ヴィ: "bui",
                ヴェ: "bue",
                ヴォ: "buo",
            },
            objOneChar: {
                あ: "a",
                い: "i",
                う: "u",
                え: "e",
                お: "o",
                か: "ka",
                き: "ki",
                く: "ku",
                け: "ke",
                こ: "ko",
                さ: "sa",
                し: "shi",
                す: "su",
                せ: "se",
                そ: "so",
                た: "ta",
                ち: "chi",
                つ: "tsu",
                て: "te",
                と: "to",
                な: "na",
                に: "ni",
                ぬ: "nu",
                ね: "ne",
                の: "no",
                は: "ha",
                ひ: "hi",
                ふ: "fu",
                へ: "he",
                ほ: "ho",
                ま: "ma",
                み: "mi",
                む: "mu",
                め: "me",
                も: "mo",
                や: "ya",
                ゆ: "yu",
                よ: "yo",
                ら: "ra",
                り: "ri",
                る: "ru",
                れ: "re",
                ろ: "ro",
                わ: "wa",
                "ゐ ": "i",
                ゑ: "e",
                を: "o",
                が: "ga",
                ぎ: "gi",
                ぐ: "gu",
                げ: "ge",
                ご: "go",
                ざ: "za",
                じ: "ji",
                ず: "zu",
                ぜ: "ze",
                ぞ: "zo",
                だ: "da",
                ぢ: "ji",
                づ: "zu",
                で: "de",
                ど: "do",
                ば: "ba",
                び: "bi",
                ぶ: "bu",
                べ: "be",
                ぼ: "bo",
                ぱ: "pa",
                ぴ: "pi",
                ぷ: "pu",
                ぺ: "pe",
                ぽ: "po",
                ゔ: "bu",
                ー: "",
            },
            objOneChar_K: {
                ア: "a",
                イ: "i",
                ウ: "u",
                エ: "e",
                オ: "o",
                カ: "ka",
                キ: "ki",
                ク: "ku",
                ケ: "ke",
                コ: "ko",
                サ: "sa",
                シ: "shi",
                ス: "su",
                セ: "se",
                ソ: "so",
                タ: "ta",
                チ: "chi",
                ツ: "tsu",
                テ: "te",
                ト: "to",
                ナ: "na",
                ニ: "ni",
                ヌ: "nu",
                ネ: "ne",
                ノ: "no",
                ハ: "ha",
                ヒ: "hi",
                フ: "fu",
                ヘ: "he",
                ホ: "ho",
                マ: "ma",
                ミ: "mi",
                ム: "mu",
                メ: "me",
                モ: "mo",
                ヤ: "ya",
                ユ: "yu",
                ヨ: "yo",
                ラ: "ra",
                リ: "ri",
                ル: "ru",
                レ: "re",
                ロ: "ro",
                ワ: "wa",
                "ヰ ": "i",
                ヱ: "e",
                ヲ: "o",
                ガ: "ga",
                ギ: "gi",
                グ: "gu",
                ゲ: "ge",
                ゴ: "go",
                ザ: "za",
                ジ: "ji",
                ズ: "zu",
                ゼ: "ze",
                ゾ: "zo",
                ダ: "da",
                ヂ: "ji",
                ヅ: "zu",
                デ: "de",
                ド: "do",
                バ: "ba",
                ビ: "bi",
                ブ: "bu",
                ベ: "be",
                ボ: "bo",
                パ: "pa",
                ピ: "pi",
                プ: "pu",
                ペ: "pe",
                ポ: "po",
                ヴ: "bu",
                ー: "",
            },
            objM: { んb: "mb", んm: "mm", んp: "mp" },
            objM_K: { ンb: "mb", ンm: "mm", ンp: "mp" },
            objN: { ん: "n" },
            objN_K: { ン: "n" },
            objLongSound: { oo: "o", ou: "o", uu: "u" },
            objChangeLine: {
                "<br />": "\n",
                "<br/>": "\n",
                "<br>": "\n",
                '<p class="line-wrap">': "",
                "</p>": "",
            },

            MSG_PROMPT:
                "Please type or paste the sentences of [Hiragana] or [Katakana] here.",
            MSG_NO_COPY_TARGET:
                "There are no Romaji characters to copy!\r\nPlease input Hiragana or Katakana!",
            MSG_COPY_DONE: "Copy completed!\r\nYou can paste it anywhere.",
            MSG_COPY_ERR:
                "Sorry!\r\nYou can not use the copy function with this web browser.\r\nPlease copy it manually.",

            BTN_LABEL: "Click here to copy Romaji!",

            COPY_BUTTON: "btn btn-info btn-lg btn-block",

            ioArea: [],
        };

        this.state = {
            textVal: "",
            prompt: objConst.MSG_PROMPT,
            inputColor: "redChar",
        };
        this.setStateTextVal = this.setStateTextVal.bind(this);
        this.initText = this.initText.bind(this);
    }

    initText() {
        if (this.state.prompt === objConst.MSG_PROMPT) {
            this.setState({
                prompt: "",
                inputColor: "blackChar",
            });
        }
    }

    // State(textVal)を変更
    setStateTextVal(textVal: any) {
        let textVal_r = textVal;

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

        this.setState({
            textVal: textVal_r,
            prompt: textVal,
        });
    }

    convertSmallTsu(text: string) {
        text = convertChars(text, { っch: "tch", ッch: "tch" });

        let arrText = text.split("");
        for (let index in arrText) {
            if (arrText[index] === "っ" || arrText[index] === "ッ") {
                arrText[index] = arrText[Number(index) + 1] || "";
            }
        }
        return arrText.join("");
    }

    onScrollInput() {
        getIoElement();
        objConst.ioArea[1].scrollTop = objConst.ioArea[0].scrollTop;
    }

    onClickCopy() {
        let strTarget = getCopyTarget();

        if (strTarget.trim() === "") {
            alert(objConst.MSG_NO_COPY_TARGET);
        } else {
            if (execCopy(strTarget)) {
                alert(objConst.MSG_COPY_DONE);
            } else {
                alert(objConst.MSG_COPY_ERR);
            }
        }
    }

    //ローマ字変換アプリの表示
    render() {
        return (
            <div className="romaji-converter center">
                <Head
                    title="Romaji Converter"
                    desc="A converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!"
                />
                <h1 style={{ fontWeight: "bold", lineHeight: 1.2 }}>
                    Romaji Converter
                </h1>
                <span className="redChar">※ Please also check the result.</span>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <div className="center">
                                    Hiragana
                                    <br />
                                    or
                                    <br />
                                    Katakana
                                </div>
                            </th>
                            <th>
                                <div className="center">Romaji</div>
                            </th>
                        </tr>
                        <tr>
                            <td className="row">
                                <ChildInput
                                    inputColor={this.state.inputColor}
                                    prompt={this.state.prompt}
                                    onChange={e => {
                                        this.setStateTextVal(e);
                                    }}
                                    onFocus={e => {
                                        this.initText();
                                    }}
                                    onScroll={this.onScrollInput}
                                />
                            </td>
                            <td className="tdOutput">
                                <Child textVal={this.state.textVal} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    id="btnCopy"
                    onClick={this.onClickCopy}
                    className={objConst.COPY_BUTTON}
                >
                    {objConst.BTN_LABEL}
                </button>
                <br />
                If you want to check Romaji chart, please check this:{" "}
                <a
                    href="https://www.lingual-ninja.com/2018/07/romaji.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <b>{"Romaji Chart >>"}</b>
                </a>
                <br />
                <br />
                <FB />
            </div>
        );
    }
}

//入力エリアの定義（※props経由で親を参照できる）
class ChildInput extends React.Component<{
    inputColor: string;
    prompt: string;
    onChange: (e: any) => void;
    onFocus: (e: any) => void;
    onScroll: () => void;
}> {
    _onChange(e: any) {
        this.props.onChange(e.target.value);
    }

    _onFocus(e: any) {
        this.props.onFocus(e.target.value);
    }

    _onScroll() {
        this.props.onScroll();
    }

    //入力エリアの表示
    render() {
        return (
            <div className="t-area-center center">
                <textarea
                    id="inputArea"
                    className={this.props.inputColor}
                    onChange={e => {
                        this._onChange(e);
                    }}
                    onFocus={e => {
                        this._onFocus(e);
                    }}
                    onScroll={() => {
                        this._onScroll();
                    }}
                    value={this.props.prompt}
                />
            </div>
        );
    }
}

//ローマ字出力エリア
class Child extends React.Component<{
    textVal: string;
}> {
    render() {
        var lines = this.props.textVal.split("\n").map(function (line, index) {
            return (
                <p key={index} className="line-wrap">
                    {line}
                    <br />
                </p>
            );
        });
        return (
            <div id="outputArea" className="lines">
                {lines}
            </div>
        );
    }
}

function getIoElement() {
    if (objConst.ioArea.length < 2) {
        objConst.ioArea[0] = document.getElementById("inputArea");
        objConst.ioArea[1] = document.getElementById("outputArea");
    }
}

function convertChars(text: string, obj: any) {
    for (let key in obj) {
        let arrText = text.split(key);
        text = arrText.join(obj[key]);
    }
    return text;
}

function getCopyTarget() {
    getIoElement();
    return convertChars(objConst.ioArea[1].innerHTML, objConst.objChangeLine);
}

function execCopy(string: string) {
    var tmp = document.createElement("div");
    var pre = document.createElement("pre");

    pre.style.webkitUserSelect = "auto";
    pre.style.userSelect = "auto";

    tmp.appendChild(pre).textContent = string;

    var s = tmp.style;
    s.position = "fixed";
    s.right = "200%";

    document.body.appendChild(tmp);

    void document.getSelection()?.selectAllChildren(tmp);

    var result = document.execCommand("copy");

    document.body.removeChild(tmp);

    return result;
}
export default RomajiConverter;
