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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Quiz2 = /** @class */ (function (_super) {
    __extends(Quiz2, _super);
    function Quiz2(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            ANSWER_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block active",
        };
        _this.state = {
            gameCount: 0,
        };
        _this.correct = 0;
        _this.incorrectList = {};
        _this.question = "";
        _this.btn1Value = "";
        _this.btn2Value = "";
        _this.btn3Value = "";
        _this.btn4Value = "";
        _this.indexQ = 0;
        _this.listAll = Object.assign({}, props.consts.KANA_LIST);
        _this.listTmp = Object.assign({}, props.consts.KANA_LIST);
        _this.initSet();
        return _this;
    }
    Quiz2.prototype.initSet = function () {
        var aryKeys = Object.keys(this.listTmp);
        this.indexQ = aryKeys[Math.floor(Math.random() * aryKeys.length)];
        this.question = this.listTmp[this.indexQ];
        delete this.listAll[this.indexQ];
        //ボタン値セット
        for (var i = 0; i < 4; i++) {
            var aryKeys_1 = Object.keys(this.listAll);
            var index = aryKeys_1[Math.floor(Math.random() * aryKeys_1.length)];
            var j = i + 1;
            this["btn" + j + "Value"] = index;
            delete this.listAll[index];
        }
        //問題と一致するボタンの設置
        var q = Math.floor(Math.random() * 4) + 1;
        this["btn" + q + "Value"] = this.indexQ;
        this.listAll = Object.assign({}, this.props.consts.KANA_LIST);
    };
    Quiz2.prototype.onClickBtn = function (i) {
        var maxGame = this.props.maxChar;
        var question = this.question;
        var answer = this["btn" + i + "Value"];
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
    };
    Quiz2.prototype.render = function () {
        var _this = this;
        var correct = this.correct;
        var incorrect = Object.keys(this.incorrectList).length || 0;
        var currentGame = correct + incorrect + 1;
        var maxGame = this.props.maxChar;
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
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: function () { return _this.onClickBtn(1); } }, this.btn1Value)),
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: function () { return _this.onClickBtn(2); } }, this.btn2Value))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: function () { return _this.onClickBtn(3); } }, this.btn3Value)),
                        React.createElement("td", null,
                            React.createElement("button", { className: this.consts.ANSWER_BUTTON_PRIMARY, onClick: function () { return _this.onClickBtn(4); } }, this.btn4Value)))))));
    };
    return Quiz2;
}(React.Component));
exports.Quiz2 = Quiz2;
exports.default = Quiz2;
