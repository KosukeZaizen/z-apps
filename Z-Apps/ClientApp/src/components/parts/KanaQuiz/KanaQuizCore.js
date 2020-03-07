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
var KanaQuiz1_1 = require("./KanaQuiz1");
var KanaQuiz2_1 = require("./KanaQuiz2");
var KanaQuiz3_1 = require("./KanaQuiz3");
var QuizCore = /** @class */ (function (_super) {
    __extends(QuizCore, _super);
    function QuizCore(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pageNum: 1,
            maxChar: 0,
            score: 0,
            incorrectList: "",
        };
        return _this;
    }
    QuizCore.prototype.setScore = function (num) {
        this.setState({ score: num, });
    };
    QuizCore.prototype.setIncorrectList = function (obj) {
        this.setState({ incorrectList: obj, });
    };
    QuizCore.prototype.changePage = function (num) {
        this.setState({ pageNum: num, });
    };
    QuizCore.prototype.setMaxChar = function (num) {
        this.setState({ maxChar: num, });
    };
    QuizCore.prototype.render = function () {
        var _this = this;
        if (this.state.pageNum === 1) {
            return (<KanaQuiz1_1.Quiz1 consts={this.props.consts} changePage={function (i) { return _this.changePage(i); }} setMaxChar={function (i) { return _this.setMaxChar(i); }}/>);
        }
        else if (this.state.pageNum === 2) {
            return (<KanaQuiz2_1.Quiz2 consts={this.props.consts} maxChar={this.state.maxChar} changePage={function (i) { return _this.changePage(i); }} setIncorrectList={function (obj) { return _this.setIncorrectList(obj); }} setScore={function (i) { return _this.setScore(i); }}/>);
        }
        else if (this.state.pageNum === 3) {
            return (<KanaQuiz3_1.Quiz3 consts={this.props.consts} changePage={function (i) { return _this.changePage(i); }} maxChar={this.state.maxChar} score={this.state.score} incorrectList={this.state.incorrectList}/>);
        }
    };
    return QuizCore;
}(React.Component));
exports.QuizCore = QuizCore;
exports.default = QuizCore;
