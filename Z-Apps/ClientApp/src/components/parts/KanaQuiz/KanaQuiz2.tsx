import * as React from "react";

type btnKey = "btn1Value" | "btn2Value" | "btn3Value" | "btn4Value";
interface Props {
    consts: any;
    maxChar: number;
    changePage: any;
    setScore: any;
    setIncorrectList: any;
}
export default class Quiz2 extends React.Component<
    Props,
    {
        gameCount: number;
    }
> {
    consts: {
        ANSWER_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block active";
    };
    correct: number;
    incorrectList: any;
    question: string;
    btn1Value: string;
    btn2Value: string;
    btn3Value: string;
    btn4Value: string;
    indexQ: number | string;
    listAll: any;
    listTmp: any;

    constructor(props: Props) {
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
        let aryKeys = Object.keys(this.listTmp);
        this.indexQ = aryKeys[Math.floor(Math.random() * aryKeys.length)];

        this.question = this.listTmp[this.indexQ];
        delete this.listAll[this.indexQ];

        //ボタン値セット
        for (let i = 0; i < 4; i++) {
            let aryKeys = Object.keys(this.listAll);
            let index = aryKeys[Math.floor(Math.random() * aryKeys.length)];
            let j = i + 1;
            this[`btn${j}Value` as btnKey] = index;
            delete this.listAll[index];
        }

        //問題と一致するボタンの設置
        let q = Math.floor(Math.random() * 4) + 1;
        this[`btn${q}Value` as btnKey] = this.indexQ;

        this.listAll = Object.assign({}, this.props.consts.KANA_LIST);
    }

    onClickBtn(i: number) {
        let maxGame = this.props.maxChar;

        let question = this.question;
        let answer = this[`btn${i}Value` as btnKey];

        if (question === this.listTmp[answer]) {
            this.correct += 1;
            alert("Correct!");
        } else {
            this.incorrectList[this.indexQ] = question;
            alert(
                "Incorrect!\n\nCorrect answer:\n    " +
                    question +
                    " -> " +
                    this.indexQ
            );
        }

        if (this.correct + Object.keys(this.incorrectList).length === maxGame) {
            this.props.changePage(3);
            this.props.setScore(this.correct);
            this.props.setIncorrectList(this.incorrectList);
        } else {
            delete this.listTmp[this.indexQ];
            this.initSet();
        }
        this.setState({ gameCount: this.state.gameCount + 1 });
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
                &nbsp;&nbsp;&nbsp; Incorrect:&nbsp;
                {incorrect}
                <br />
                <br />
                Question:
                <br />
                <b className="question">{this.question}</b>
                <br />
                <br />
                Which is the correct Romaji for the{" "}
                {this.props.consts.KANA_TYPE} character above?
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button
                                    className={
                                        this.consts.ANSWER_BUTTON_PRIMARY
                                    }
                                    onClick={() => this.onClickBtn(1)}
                                >
                                    {this.btn1Value}
                                </button>
                            </td>
                            <td>
                                <button
                                    className={
                                        this.consts.ANSWER_BUTTON_PRIMARY
                                    }
                                    onClick={() => this.onClickBtn(2)}
                                >
                                    {this.btn2Value}
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    className={
                                        this.consts.ANSWER_BUTTON_PRIMARY
                                    }
                                    onClick={() => this.onClickBtn(3)}
                                >
                                    {this.btn3Value}
                                </button>
                            </td>
                            <td>
                                <button
                                    className={
                                        this.consts.ANSWER_BUTTON_PRIMARY
                                    }
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
