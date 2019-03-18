import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import { QuizCore } from './parts/KanaQuiz/KanaQuizCore';
import './parts/KanaQuiz/KanaQuiz.css';


class HiraganaQuiz extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
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
    }

    render() {
        return (
            <center className="kana-quiz" >
                <QuizCore
                    consts={this.consts}
                    changePage={this.changePage}
                />
            </center>
        );
    }
}

export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(HiraganaQuiz);
