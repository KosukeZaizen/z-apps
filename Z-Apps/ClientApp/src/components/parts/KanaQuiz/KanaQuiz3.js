import React from 'react';
import { Link } from 'react-router-dom';

class IncorrectTable extends React.Component {
    /*
    var htmlInc = "";
    if (this.incorrectList) {
    htmlInc = this.incorrectList ? "<h3>Characters you should remember:</h3>" : "";
    }

    htmlInc += "<h1><table style='font-size: 15pt;'>";
    for (let key in this.incorrectList) {
    htmlInc = htmlInc + "<tr><td>&nbsp;&nbsp;&nbsp;" + this.incorrectList[key] + "</td><td> :   </td><td>" + key + "</td>";
    }
    htmlInc = htmlInc + "</table></h1>";
    */

    render() {
        let top = "";
        if (Object.keys(this.props.incorrectList).length > 0) {
            top = "Characters you should remember:";
        }

        let trList = [];
        for (let key in this.props.incorrectList) {
            trList.push(<tr key={key}><td>{this.props.incorrectList[key]}</td><td>:</td><td>{key}</td></tr>);
        }

        return (
            <div>
                {top}
                <table>
                    <tbody>
                        {trList}
                    </tbody>
                </table>
            </div>
        );
    }
}


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
                <IncorrectTable incorrectList={this.props.incorrectList} />
                <br />
                <button onClick={() => { this.props.changePage(1) }} type="button">Retry</button>
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