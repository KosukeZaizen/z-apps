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
var KatakanaQuiz = /** @class */ (function (_super) {
    __extends(KatakanaQuiz, _super);
    function KatakanaQuiz(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            KANA_TYPE: "Katakana",
            OTHER_KANA_TYPE: "Hiragana",
            KANA_LIST: { a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ', ka: 'カ', ki: 'キ', ku: 'ク', ke: 'ケ', ko: 'コ', sa: 'サ', shi: 'シ', su: 'ス', se: 'セ', so: 'ソ', ta: 'タ', chi: 'チ', tsu: 'ツ', te: 'テ', to: 'ト', na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ', ha: 'ハ', hi: 'ヒ', fu: 'フ', he: 'ヘ', ho: 'ホ', ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ', ya: 'ヤ', yu: 'ユ', yo: 'ヨ', ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ', wa: 'ワ', wo: 'ヲ', n: 'ン', ga: 'ガ', gi: 'ギ', gu: 'グ', ge: 'ゲ', go: 'ゴ', za: 'ザ', ji: 'ジ', zu: 'ズ', ze: 'ゼ', zo: 'ゾ', da: 'ダ', de: 'デ', do: 'ド', ba: 'バ', bi: 'ビ', bu: 'ブ', be: 'ベ', bo: 'ボ', pa: 'パ', pi: 'ピ', pu: 'プ', pe: 'ペ', po: 'ポ', kya: 'キャ', kyu: 'キュ', kyo: 'キョ', sha: 'シャ', shu: 'シュ', sho: 'ショ', cha: 'チャ', chu: 'チュ', cho: 'チョ', nya: 'ニャ', nyu: 'ニュ', nyo: 'ニョ', hya: 'ヒャ', hyu: 'ヒュ', hyo: 'ヒョ', mya: 'ミャ', myu: 'ミュ', myo: 'ミョ', rya: 'リャ', ryu: 'リュ', ryo: 'リョ', gya: 'ギャ', gyu: 'ギュ', gyo: 'ギョ', ja: 'ジャ', ju: 'ジュ', jo: 'ジョ', bya: 'ビャ', byu: 'ビュ', byo: 'ビョ', pya: 'ピャ', pyu: 'ピュ', pyo: 'ピョ' },
            OBJ_LINKS: {
                "Katakana chart": "https://www.lingual-ninja.com/2018/08/katakana-chart.html",
                "Japlish - Eat a Pee Man!?": "https://www.lingual-ninja.com/2018/09/japlish-wasei-eigo.html",
            }
        };
        return _this;
    }
    KatakanaQuiz.prototype.render = function () {
        return (<center className="kana-quiz">
                <Helmet_1.default title="Katakana Quiz" desc="An app to remember Katakana! I hope this will help you to study!"/>
                <KanaQuizCore_1.QuizCore consts={this.consts} changePage={this.changePage}/>
                <br />
                <FaceBook_1.default />
                <br />
                <GoogleAd_1.default />
            </center>);
    };
    return KatakanaQuiz;
}(React.Component));
exports.default = KatakanaQuiz;
