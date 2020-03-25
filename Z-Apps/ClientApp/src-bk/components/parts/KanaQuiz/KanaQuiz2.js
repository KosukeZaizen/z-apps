"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
class Quiz2 extends React.Component {
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
        let aryKeys = Object.keys(this.listTmp);
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
        if (question === this.listTmp[answer]) {
            this.correct += 1;
            alert('Correct!');
        }
        else {
            this.incorrectList[this.indexQ] = question;
            alert('Incorrect!\n\nCorrect answer:\n    ' + question + ' -> ' + this.indexQ);
        }
        if (this.correct + Object.keys(this.incorrectList).length === maxGame) {
            this.props.changePage(3);
            this.props.setScore(this.correct);
            this.props.setIncorrectList(this.incorrectList);
        }
        else {
            delete this.listTmp[this.indexQ];
            this.initSet();
        }
        this.setState({ gameCount: this.state.gameCount + 1, });
    }
    render() {
        let correct = this.correct;
        let incorrect = Object.keys(this.incorrectList).length || 0;
        let currentGame = correct + incorrect + 1;
        let maxGame = this.props.maxChar;
        return (React.createElement("div", { id: "disp2" },
            "Progress:\u00A0",
            currentGame,
            "/",
            maxGame,
            React.createElement("br", null),
            "Correct:\u00A0",
            correct,
            "\u00A0\u00A0\u00A0 Incorrect:\u00A0",
            incorrect,
            React.createElement("br", null),
            React.createElement("br", null),
            "Question:",
            React.createElement("br", null),
            React.createElement("b", { className: "question" }, this.question),
            React.createElement("br", null),
            React.createElement("br", null),
            "Which is the correct Romaji for the ",
            this.props.consts.KANA_TYPE,
            " character above?",
            React.createElement("br", null),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: () => this.onClickBtn(1) }, this.btn1Value)),
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: () => this.onClickBtn(2) }, this.btn2Value))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: () => this.onClickBtn(3) }, this.btn3Value)),
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: () => this.onClickBtn(4) }, this.btn4Value)))))));
    }
}
exports.default = Quiz2;
exports.Quiz2 = Quiz2;
