import React from 'react';
import { connect } from 'react-redux';
import { Page1 } from './parts/Ninja/Page1';
import { Page2 } from './parts/Ninja/Page2';
import '../css/NinjaGame.css';


class NinjaGame extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };
        this.state = {
            curPage: 1,
            stage: 1,
            ninja: {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: 5,
            },
        };
    }

    changePage(num) {
        this.setState({ curPage: num, });
    }

    changeStage(num, ninja) {
        this.setState({
            stage: num,
            ninja: ninja,
        });
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
                <Pages
                    state={this.state}
                    changePage={(i) => { this.changePage(i) }}
                />
            </center>
        )
    }
};

function Pages(props) {
    if (props.state.curPage === 1) {
        return (
            <Page1
                changePage={(i) => { props.changePage(i) }}
            />
        );
    } else if (props.state.curPage === 2) {
        return (
            <Page2
                changeStage={(i) => { props.changeStage(i) }}
                ninja={props.state.ninja}
            />
        );
    }
}

export default connect()(NinjaGame);