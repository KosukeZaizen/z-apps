import React from 'react';
import { Page1 } from './parts/Ninja3/Page1';
import { Page2 } from './parts/Ninja3/Page2';
import * as Consts from './parts/Ninja3/Consts'
import { getParams } from './common/functions';
import '../css/NinjaGame2.css';//CSSは2のもの

class NinjaGame extends React.Component {

    constructor(props) {
        super(props);

        let ninja;
        let stage;

        const initialNinja = {
            size: 12,
            speedX: 0,
            speedY: 0,
            posX: 145,
            posY: -20,
            //readScroll: [],
            readScroll: ["飛び石の書"],//デバッグ用
            boolLeft: true,
            snow: true,
        };

        //セーブデータ読み込み
        const saveData = localStorage.getItem(Consts.SAVE_NAME);

        //セーブデータがあればそれを設定
        const objSaveData = JSON.parse(saveData);
        if (objSaveData && false) {
            ninja = objSaveData.ninja || initialNinja;
            stage = objSaveData.stage || 1;
        } else {
            ninja = initialNinja;
            stage = 1;
        }

        //urlパラメータ取得
        const params = getParams();
        const lang = (params) ? params.l : "";

        this.state = {
            language: lang,
            curPage: 1,
            //stage: stage,
            stage: 15,//デバッグ用★
            ninja: ninja,
        };
        this.readElementScroll = [];

        this.changePage = this.changePage.bind(this);
        this.changeStage = this.changeStage.bind(this);
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
    if (props.state.curPage === 2 || props.state.language) {
        return (
            <Page2
                changeStage={(i, j) => { props.changeStage(i, j) }}
                ninja={props.state.ninja}
                stage={props.state.stage}
                readElementScroll={props.readElementScroll}
                language={props.state.language}
            />
        );
    } else if (props.state.curPage === 1) {
        return (
            <Page1
                changePage={(i, lang) => { props.changePage(i, lang) }}
            />
        );
    }
}
export default NinjaGame;