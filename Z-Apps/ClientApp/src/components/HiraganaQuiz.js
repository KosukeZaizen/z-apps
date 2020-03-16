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
var KanaQuizCore_1 = require("./parts/KanaQuiz/KanaQuizCore");
require("./parts/KanaQuiz/KanaQuiz.css");
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var GoogleAd_1 = __importDefault(require("./parts/GoogleAd"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var HiraganaQuiz = /** @class */ (function (_super) {
    __extends(HiraganaQuiz, _super);
    function HiraganaQuiz(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            KANA_TYPE: "Hiragana",
            OTHER_KANA_TYPE: "Katakana",
            KANA_LIST: { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お', ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ', sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ', ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と', na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の', ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ', ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も', ya: 'や', yu: 'ゆ', yo: 'よ', ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ', wa: 'わ', wo: 'を', n: 'ん', ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご', za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ', da: 'だ', de: 'で', do: 'ど', ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ', pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ', kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ', sha: 'しゃ', shu: 'しゅ', sho: 'しょ', cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ', hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ', mya: 'みゃ', myu: 'みゅ', myo: 'みょ', rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ', gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ', ja: 'じゃ', ju: 'じゅ', jo: 'じょ', bya: 'びゃ', byu: 'びゅ', byo: 'びょ', pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ' },
            OBJ_LINKS: {
                "Hiragana chart": "https://www.lingual-ninja.com/2018/07/hiragana-list.html",
                "Dull sound": "https://www.lingual-ninja.com/2018/07/dull-sound.html",
                "P-sound": "https://www.lingual-ninja.com/2018/07/p-sound.html",
                "Syllabic nasal": "https://www.lingual-ninja.com/2018/07/syllabic-nasal.html",
                "Contracted sound": "https://www.lingual-ninja.com/2018/07/contracted-sound.html",
                "Romaji chart": "https://www.lingual-ninja.com/2018/07/romaji.html"
            }
        };
        return _this;
    }
    HiraganaQuiz.prototype.render = function () {
        return (React.createElement("div", { className: "kana-quiz center" },
            React.createElement(Helmet_1.default, { title: "Hiragana Quiz", desc: "An app to remember Hiragana! I hope this will help you to study!" }),
            React.createElement(KanaQuizCore_1.QuizCore, { consts: this.consts }),
            React.createElement("br", null),
            React.createElement(FaceBook_1.default, null),
            React.createElement("br", null),
            React.createElement(GoogleAd_1.default, null)));
    };
    return HiraganaQuiz;
}(React.Component));
exports.default = HiraganaQuiz;
