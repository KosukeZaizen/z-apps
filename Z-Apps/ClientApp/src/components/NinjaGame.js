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
            language: "English",
            curPage: 1,
            //stage: 14,//デバッグ用（通常時1）★
            stage: 1,
            ninja: {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: 5,
                //readScroll: ["火の書", "風の書", "水の書","地の書"],//デバッグ用（通常時空配列[]）★
                readScroll: [],
            },
        };
    }

    changePage(num, lang) {
        this.setState({
            curPage: num,
            language: lang,
        });
    }

    changeStage(num, ninja) {
        this.setState({
            stage: num,
            ninja: ninja,
            curPage: 2,
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
                    changePage={(i,lang) => { this.changePage(i,lang) }}
                    changeStage={(i, j) => { this.changeStage(i, j) }}
                    changeLanguage={() => { this.changeLanguage()}}
                />
            </center>
        )
    }
};

function Pages(props) {
    if (props.state.curPage === 1) {
        return (
            <Page1
                changePage={(i,lang) => { props.changePage(i,lang) }}
            />
        );
    } else if (props.state.curPage === 2) {
        return (
            <Page2
                changeStage={(i, j) => { props.changeStage(i, j) }}
                ninja={props.state.ninja}
                stage={props.state.stage}
                language={props.state.language}
            />
        );
    }
}

export default connect()(NinjaGame);