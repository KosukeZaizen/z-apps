import React from 'react';
import { Card, Button, CardText, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';


class IncorrectTable extends React.Component {

    render() {
        let top = "Characters you should remember:";
        let trList = [];
        for (let key in this.props.incorrectList) {
            trList.push(<tr key={key}><td>{this.props.incorrectList[key]}</td><td>:</td><td>{key}</td></tr>);
        }

        return (
            <Card body inverse color="success">
                <CardHeader tag="h3">{top}</CardHeader>
                <CardBody>
                    <CardText>
                        <table>
                            <tbody>
                                {trList}
                            </tbody>
                        </table>
                    </CardText>
                    <Button onClick={() => { this.props.changePage(1) }} type="button">Retry</Button>
                </CardBody>
            </Card>
        );
    }
}


class RelatedArticles extends React.Component {

    render() {
        let linkList = [];
        for (let key in this.props.objLinks) {
            linkList.push(
                <div>
                <span className="font-large">
                    &nbsp; &nbsp;
                    <u>
                            <a href={this.props.objLinks[key]} target="_blank" rel="noopener noreferrer">
                                {key} &gt;&gt;
                            </a>
                    </u>
                </span>
                <br />
                </div>
                );
        }

        return (
            <div className="related-articles">
                <b><span className="font-large">Related articles:</span></b><br />
                <br />
                {}
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
                {
                    Object.keys(this.props.incorrectList).length > 0 &&
                    <IncorrectTable
                        incorrectList={this.props.incorrectList}
                        changePage={(i) => { this.props.changePage(i) }}
                    />
                }
                <br />
                <br />
                <div className="related-articles">
                    <b><span className="font-large">Related articles:</span></b><br />
                    <br />
                    <RelatedArticles objLinks={this.props.objLinks} />
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