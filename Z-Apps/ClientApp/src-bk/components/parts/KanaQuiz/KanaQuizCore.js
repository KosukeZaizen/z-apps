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
const KanaQuiz1_1 = require("./KanaQuiz1");
const KanaQuiz2_1 = require("./KanaQuiz2");
const KanaQuiz3_1 = require("./KanaQuiz3");
class QuizCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            maxChar: 0,
            score: 0,
            incorrectList: "",
        };
    }
    setScore(num) {
        this.setState({ score: num, });
    }
    setIncorrectList(obj) {
        this.setState({ incorrectList: obj, });
    }
    changePage(num) {
        this.setState({ pageNum: num, });
    }
    setMaxChar(num) {
        this.setState({ maxChar: num, });
    }
    render() {
        if (this.state.pageNum === 1) {
            return (React.createElement(KanaQuiz1_1.Quiz1, { consts: this.props.consts, changePage: (i) => this.changePage(i), setMaxChar: (i) => this.setMaxChar(i) }));
        }
        else if (this.state.pageNum === 2) {
            return (React.createElement(KanaQuiz2_1.Quiz2, { consts: this.props.consts, maxChar: this.state.maxChar, changePage: (i) => this.changePage(i), setIncorrectList: (obj) => this.setIncorrectList(obj), setScore: (i) => this.setScore(i) }));
        }
        else if (this.state.pageNum === 3) {
            return (React.createElement(KanaQuiz3_1.Quiz3, { consts: this.props.consts, changePage: (i) => this.changePage(i), maxChar: this.state.maxChar, score: this.state.score, incorrectList: this.state.incorrectList }));
        }
    }
}
exports.default = QuizCore;
exports.QuizCore = QuizCore;
