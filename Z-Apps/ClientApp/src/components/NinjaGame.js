import React from 'react';
import { Page1 } from './parts/Ninja/Page1';
import { Page2 } from './parts/Ninja/Page2';
import '../css/NinjaGame.css';
import Head from './parts/Helmet';

class NinjaGame extends React.Component {

    constructor(props) {
        super(props);

        let ninja;
        let stage;

        //セーブデータ読み込み
        const saveData = localStorage.getItem('saveData1');
        if (saveData) {
            //セーブデータがあればそれを設定
            const objSaveData = JSON.parse(saveData);
            ninja = objSaveData.ninja || {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: -20,
                readScroll: [],
            };
            stage = objSaveData.stage || 1;
        } else {
            //セーブデータがなければ、初期値を設定
            ninja = {
                size: 12,
                speedX: 0,
                speedY: 0,
                posX: 145,
                posY: -20,
                readScroll: [],
            };
            stage = 1;
        }
        this.state = {
            language: "English",
            curPage: 1,
            stage: stage,//デバッグ用（通常時1）★
            //stage: 1,
            ninja: ninja,
        };
        this.readElementScroll = [];
    }

    changePage(num, lang) {
        this.setState({
            curPage: num,
            language: lang,
        });
    }

    changeStage(num, ninja) {
        this.readElementScroll = [];
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
                <Head
                    title="Lingual Ninja Games"
                />
                <Pages
                    state={this.state}
                    changePage={(i, lang) => { this.changePage(i, lang) }}
                    changeStage={(i, j) => { this.changeStage(i, j) }}
                    changeLanguage={() => { this.changeLanguage() }}
                    readElementScroll={this.readElementScroll}
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
                readElementScroll={props.readElementScroll}
                language={props.state.language}
            />
        );
    }
}
export default NinjaGame;