import React from 'react';
import { connect } from 'react-redux';
import { Page1 } from './parts/Ninja/Page1';
import { Page2 } from './parts/Ninja/Page2';
import { RotatePhone } from './parts/Ninja/RotateSmartphone';
import '../css/NinjaGame.css';


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

    render() {
        let style = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: 9999999,
        };

        return (
            <center id="ninja-game" style={style}>
                <RotatePhone />
                <Pages
                    curPage={this.state.curPage}
                    changePage={(i) => { this.changePage(i) }}
                />
            </center>
        )
    }
};

function Pages(props) {
    if (props.curPage === 1) {
        return (
            <Page1 changePage={(i) => { props.changePage(i) }} />
        );
    } else if (props.curPage === 2) {
        return (
            <Page2 />
        );
    }
}



export default connect()(NinjaGame);
