import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import '../css/HiraganaQuiz.css';

let objConst = {};

class HiraganaQuiz extends React.Component {

    constructor(props) {
        super(props);
        objConst = {
        };
        this.state = {
        };
    }


    render() {
        return (
            <div className="hiragana-quiz" >
                <p>Hello</p>
            </div>
        );
    }
}

export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(HiraganaQuiz);
