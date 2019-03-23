import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page1 } from './parts/Shuriken/Page1';
import { Page2 } from './parts/Shuriken/Page2';
import '../css/Shuriken.css';


class ShurikenGame extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };
        this.state = {
            curPage: 1,
        };
    }

    //入力エリアの表示
    render() {
        if (this.state.curPage === 1) {
            return (
                <Page1 />
            );
        } else if (this.state.curPage === 2) {
            return (
                <Page1 />
            );
        }
    }
};

export default connect()(ShurikenGame);
