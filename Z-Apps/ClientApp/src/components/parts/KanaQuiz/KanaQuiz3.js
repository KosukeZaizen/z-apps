import React from 'react';
import { Link } from 'react-router-dom';

export default class Quiz3 extends React.Component {
    render() {
        return (
            <div id="disp3">
                <h1>
                    Your score is:<br />
                    &nbsp; &nbsp;{this.props.score}
                    /
                    {this.props.maxChar}</h1>
                <br />
                {this.props.incorrectTable}
                <br />
                <button onClick={() => { this.props.changePage(1)}} type="button">Retry</button>
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
        );
    }
}

export { Quiz3 };