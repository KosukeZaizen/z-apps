import React from 'react';
import { connect } from 'react-redux';
import { Page1 } from './parts/Ninja/Page1';
import { Page2 } from './parts/Ninja/Page2';
import '../css/Shuriken.css';


class NinjaGame extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };
        this.state = {
            curPage: 1,
        };
    }

    changePage(num) {
        this.setState({ curPage: num, });
    }

    //入力エリアの表示
    render() {
        if (this.state.curPage === 1) {
            return (
                <Page1 changePage={(i) => { this.changePage(i) }} />
            );
        } else if (this.state.curPage === 2) {
            return (
                <Page2 />
            );
        }
    }
};

export default connect()(NinjaGame);
