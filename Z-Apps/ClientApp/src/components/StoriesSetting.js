import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/StoriesSetting';

let objConst = {};

class StoriesSetting extends React.Component {

    constructor(props) {
        super(props);

        this.result = "";
        this.textVal = "";

        this.state = {
            inputKanji: objConst.MSG_PROMPT,
            inputColor: "redChar",
        };

        this.initText = this.initText.bind(this);
        this.onChangeKanji = this.onChangeKanji.bind(this);
        this.onClickConvert = this.onClickConvert.bind(this);
    }

    initText() {
        if (this.state.inputKanji === objConst.MSG_PROMPT) {
            this.setState({
                inputKanji: "",
                inputColor: "blackChar",
            });
        }
    }

    onChangeKanji(kanjiVal) {
        this.setState({ inputKanji: kanjiVal.target.value });
    }

    onClickConvert() {
        this.props.requestKanjiConvert(this.state.inputKanji);
    }

    render() {
        this.props.pageContents.map(w =>
            this.result = w.kanji
        )

        return (
            <center className="kanji-converter">
                <h1>
                    <b>Lingual Ninja<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Stories</b>
                </h1>
                <textarea
                    id="inputKanji"
                    onChange={(e) => { this.onChangeKanji(e) }}
                    className={this.state.inputColor}
                    value={this.state.inputKanji}
                    onFocus={(e) => { this.initText(e) }}
                    maxlength="250"
                />
                <button
                    id="btnConvert"
                    onClick={(e) => { this.onClickConvert(e) }}
                >
                    "ボタン"
                </button>
                {this.props.isLoading ? <span>Loading...</span> : []}
                <ChildInput
                    result={this.result}
                />
            </center >
        );
    }
};

//出力エリアの定義
class ChildInput extends React.Component {

    _onScroll() {
        this.props.onScroll();
    }

    render() {
        return (
            <center className="t-area-center">
                <textarea
                    id="inputArea"
                    value={this.props.result}
                />
            </center>
        );
    }
};

export default connect(
    state => state.storiesSetting,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesSetting);