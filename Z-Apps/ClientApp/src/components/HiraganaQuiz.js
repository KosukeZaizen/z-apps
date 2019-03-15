import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import '../css/HiraganaQuiz.css';

let objConst = {};

class HiraganaQuiz extends React.Component {

    constructor(props) {
        super(props);
        objConst = {
            START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            START_BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
        };
    }


    render() {
        return (
            <center className="hiragana-quiz" >
                <div id="disp1">
                    <h1>Hiragana Quiz!</h1>
                    <p>
                        Please bookmark this page to remember all Hiragana characters!
                        </p>
                    <br />
                    <button
                        id="btn10"
                        onClick={() => "start(10)"}
                        className={objConst.START_BUTTON_PRIMARY}
                    >
                        Random 10 characters
                        </button>
                    <br />

                    <button
                        id="btn30"
                        onClick={() => "start(30)"}
                        className={objConst.START_BUTTON_SUCCESS}
                    >
                        Random 30 characters
                    </button>
                    <br />

                    <button
                        id="btn102"
                        onClick={() => "start(102)"}
                        className={objConst.START_BUTTON_DANGER}
                    >All Hiragana characters</button>
                    <br />
                    <hr />
                    <br />
                    <button
                        id="btnKatakana"
                        onClick={() => "start(102)"}
                        className={objConst.START_BUTTON_DARK}
                    >Katakana Quiz</button>
                    <br />
                    &nbsp; &nbsp;<a href="https://lingualninja.blogspot.com/2018/08/katakana-quiz.html"><u></u></a><br />
                    <br /></div>
                <div id="disp2" className="disp-non">
                    Progress:&nbsp;<span id="progress">
                        0</span>/<span id="max">
                        102</span>
                    <br />
                    Correct:&nbsp;<span id="correct">
                        0</span>&nbsp;&nbsp;&nbsp;
Incorrect:&nbsp;<span id="incorrect">
                        0</span><br />
                    <br />
                    Question:
<br />
                    <div id="header">
                        <h1 id="question">
                            あ</h1>
                    </div>
                    <br />
                    Which is the correct Romaji for the Hiragana character above?
<br />
                    <br />
                    &nbsp; &nbsp; 1. <input id="button1" onClick={() => null} type="button" value="" /><br />
                    <br />
                    &nbsp; &nbsp; 2. <input id="button2" onClick={() => null} type="button" value="" /><br />
                    <br />
                    &nbsp; &nbsp; 3. <input id="button3" onClick={() => null} type="button" value="" /><br />
                    <br />
                    &nbsp; &nbsp; 4. <input id="button4" onClick={() => null} type="button" value="" /><br />
                    <br /></div>
                <div id="disp3" className="disp-non">
                    <h1>
                        Your score is:<br />
                        &nbsp; &nbsp;<span id="score"></span>
                        /
<span id="maxScore"></span></h1>
                    <br />
                    <div id="incList">
                    </div>
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input onClick={() => null} type="button" value="Retry" />
                    <br />
                    <br />
                    <div className="related-articles">
                        <b><span className="font-large">Related articles:</span></b><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp; <u><a href="https://lingualninja.blogspot.com/2018/08/katakana-quiz.html" target="_blank">Katakana quiz &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp; <u><a href="https://lingualninja.blogspot.com/2018/07/hiragana-list.html" target="_blank">Hiragana chart &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp;&nbsp;<u><a href="https://lingualninja.blogspot.com/2018/07/dull-sound.html" target="_blank">Dull sound &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp;&nbsp;<u><a href="https://lingualninja.blogspot.com/2018/07/p-sound.html" target="_blank">P-sound &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp;&nbsp;<u><a href="https://lingualninja.blogspot.com/2018/07/syllabic-nasal.html" target="_blank">Syllabic nasal &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp; <u><a href="https://lingualninja.blogspot.com/2018/07/contracted-sound.html" target="_blank">Contracted sound &gt;&gt;</a></u></span><br />
                        <br />
                        <span className="font-large">&nbsp; &nbsp; <u><a href="https://lingualninja.blogspot.com/2018/07/romaji.html" target="_blank">Romaji chart&nbsp;&gt;&gt;</a></u></span></div>
                    <br /></div>
                <script type="text/javascript" src="hiraganaQuiz.js" defer></script>
            </center>
        );
    }
}

export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(HiraganaQuiz);
