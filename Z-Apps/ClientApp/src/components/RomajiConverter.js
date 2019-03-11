import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import '../css/RomajiConverter.css';


// 親：<Parent />の定義
class Parent extends React.Component {
    // State（※状態は親が管理）
    // この値はブラウザを閉じたり、リロードするまでは保持される
    constructor(props) {
        super(props);
        this.state = {
            textVal: "",
            children: [],
        };
        this.setStateTextVal = this.setStateTextVal.bind(this);
    }

    // State(textVal)を変更
    setStateTextVal(textVal) {
        this.setState({ textVal: textVal, });
    }

    // State(children)を変更
    setStateChildren(textVal) {
        var textVals = this.state.children.concat(textVal);
        this.setState({ children: textVals, });
    }

    // <Parent />の表示
    // ここで子となる<ChildInput />と<Child />を記述
    render() {
        return (
            <div>
                <p>入力してEnterキーを押す</p>
                <ChildInput
                    onChange={(e) => { this.setStateTextVal(e) }}
                    onSave={(e) => { this.setStateChildren(e) }}
                />
                <Child textVal={this.state.textVal} children={this.state.children} />
            </div>
        );
    }
};

// 子1：<ChildInput />の定義（※props経由で親を参照できる）
class ChildInput extends React.Component {
    _onChange(e) {
        this.props.onChange(e.target.value);
    }

    _onKeyDown(e) {
        if (e.keyCode === 13) { // Enterキー
            this.props.onSave(e.target.value);
            e.target.value = "";
        }
    }

    // <ChildInput />の表示
    render() {
        return (
            <input
                type="text"
                onChange={(e) => { this._onChange(e) }}
                onKeyDown={(e) => { this._onKeyDown(e) }} />
        );
    }
};

// 子2：<Child />の定義（※props経由で親を参照できる）
class Child extends React.Component {
    // <Child />の表示
    render() {
        var key = 0;
        var textVals = this.props.children.map(function (textVal) {
            // 時間が同じ。つまり、キーが押されるごとに、まとめて再描画されていることに注目
            //（サーバーサイドっぽいと言われる所以）
            var date = new Date().toString();
            return <li key={key++}>{key}.{textVal}({date})</li>;
        });

        return (
            <div>
                <p>{this.props.textVal}</p>
                <ul>{textVals}</ul>
            </div>
        );
    }
};


export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Parent);
