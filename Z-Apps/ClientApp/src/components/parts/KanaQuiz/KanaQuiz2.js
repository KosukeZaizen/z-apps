import React from 'react';

export default class Quiz2 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            ANSWER_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block active",
        };
        this.state = {
            gameCount: 0,
        };
        this.correct = 0;
        this.incorrectList = {};

        this.question = "";
        this.btn1Value = "";
        this.btn2Value = "";
        this.btn3Value = "";
        this.btn4Value = "";

        this.indexQ = 0;

        this.listAll = Object.assign({}, props.consts.KANA_LIST);
        this.listTmp = Object.assign({}, props.consts.KANA_LIST);
        this.initSet();
    }

    initSet() {
        let aryKeys = Object.keys(this.listAll);
        this.indexQ = aryKeys[Math.floor(Math.random() * aryKeys.length)];

        this.question = this.listTmp[this.indexQ];
        delete this.listAll[this.indexQ];

        //ボタン値セット
        for (let i = 0; i < 4; i++) {
            let aryKeys = Object.keys(this.listAll);
            let index = aryKeys[Math.floor(Math.random() * aryKeys.length)];
            let j = i + 1;
            this[`btn${j}Value`] = index;
            delete this.listAll[index];
        }

        //問題と一致するボタンの設置
        let q = Math.floor(Math.random() * 4) + 1;
        this[`btn${q}Value`] = this.indexQ;

        this.listAll = Object.assign({}, this.props.consts.KANA_LIST);
    }

    onClickBtn(i) {
        let maxGame = this.props.maxChar;

        let question = this.question;
        let answer = this[`btn${i}Value`];

        if (question === this.listAll[answer]) {
            this.correct += 1;
            alert('Correct!');
        } else {
            this.incorrectList[this.indexQ] = question;
            alert('Incorrect!\n\nCorrect answer:\n    ' + question + ' -> ' + this.indexQ);
        }

        if (this.correct + Object.keys(this.incorrectList).length  === maxGame ) {
            this.props.changePage(3);
            this.props.setScore(this.correct);
            /*
            var htmlInc = "";
            if(this.incorrectList){
                htmlInc = this.incorrectList ? "<h3>Characters you should remember:</h3>" : "";
            }

            htmlInc += "<h1><table style='font-size: 15pt;'>";
            for (let key in this.incorrectList) {
                htmlInc = htmlInc + "<tr><td>&nbsp;&nbsp;&nbsp;" + this.incorrectList[key] + "</td><td> :   </td><td>" + key + "</td>";
            }
            htmlInc = htmlInc + "</table></h1>";
            */
            this.props.setIncorrectList(this.incorrectList);
        } else {
            delete this.listAll[this.indexQ];
            this.initSet();
        }
        this.setState({ gameCount: this.state.gameCount + 1,});
    }

    render() {

        let correct = this.correct;
        let incorrect = Object.keys(this.incorrectList).length || 0;
        let currentGame = correct + incorrect + 1;
        let maxGame = this.props.maxChar;

        return (
            <div id="disp2">
                Progress:&nbsp;
                    {currentGame}/{maxGame}
                <br />

                Correct:&nbsp;
                    {correct}
                &nbsp;&nbsp;&nbsp;
                Incorrect:&nbsp;
                    {incorrect}
                <br />
                <br />

                Question:<br />
                <b className="question">{this.question}</b>
                <br />
                <br />

                Which is the correct Romaji for the {this.props.consts.KANA_TYPE} character above?<br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button
                                    className={this.consts.ANSWER_BUTTON_PRIMARY}
                                    onClick={() => this.onClickBtn(1)}
                                >
                                    {this.btn1Value}
                                </button>
                            </td>
                            <td>
                                <button
                                    className={this.consts.ANSWER_BUTTON_PRIMARY}
                                    onClick={() => this.onClickBtn(2)}
                                >
                                    {this.btn2Value}
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    className={this.consts.ANSWER_BUTTON_PRIMARY}
                                    onClick={() => this.onClickBtn(3)}
                                >
                                    {this.btn3Value}
                                </button>
                            </td>
                            <td>
                                <button
                                    className={this.consts.ANSWER_BUTTON_PRIMARY}
                                    onClick={() => this.onClickBtn(4)}
                                >
                                    {this.btn4Value}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export { Quiz2 };