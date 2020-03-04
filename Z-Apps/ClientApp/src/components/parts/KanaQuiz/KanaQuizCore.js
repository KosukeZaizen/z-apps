import * as React from 'react';
import { Quiz1 } from './KanaQuiz1';
import { Quiz2 } from './KanaQuiz2';
import { Quiz3 } from './KanaQuiz3';


export default class QuizCore extends React.Component {

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
            return (
                <Quiz1
                    consts={this.props.consts}
                    changePage={(i) => this.changePage(i)}
                    setMaxChar={(i) => this.setMaxChar(i)}
                />
            );
        } else if (this.state.pageNum === 2) {
            return (
                <Quiz2
                    consts={this.props.consts}
                    maxChar={this.state.maxChar}
                    changePage={(i) => this.changePage(i)}
                    setIncorrectList={(obj) => this.setIncorrectList(obj)}
                    setScore={(i) => this.setScore(i)}
                />
            );
        } else if (this.state.pageNum === 3) {
            return (
                <Quiz3
                    consts={this.props.consts}
                    changePage={(i) => this.changePage(i)}
                    maxChar={this.state.maxChar}
                    score={this.state.score}
                    incorrectList={this.state.incorrectList}
                />
            );
        }
    }
}

export { QuizCore };