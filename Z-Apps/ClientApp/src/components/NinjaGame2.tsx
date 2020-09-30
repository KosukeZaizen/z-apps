import * as React from "react";
import "../css/NinjaGame2.css";
import { getParams } from "./common/functions";
import Head from "./parts/Helmet";
import { Page1 } from "./parts/Ninja2/Page1";
import { Page2 } from "./parts/Ninja2/Page2";

class NinjaGame extends React.Component {
    readElementScroll: any[];

    constructor(props) {
        super(props);

        let ninja;
        let stage;

        const initialNinja = {
            size: 12,
            speedX: 0,
            speedY: 0,
            posX: 145,
            posY: 60,
            readScroll: [],
            boolLeft: true,
        };

        //セーブデータ読み込み
        const saveData = localStorage.getItem("saveData2");

        //セーブデータがあればそれを設定
        const objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            ninja = objSaveData.ninja || initialNinja;
            stage = objSaveData.stage || 1;
        } else {
            ninja = initialNinja;
            stage = 1;
        }

        //urlパラメータ取得
        const params = getParams();
        const lang = !!params ? params["l"] : "";

        this.state = {
            language: lang,
            curPage: 1,
            stage: stage, //デバッグ用（通常時1）★
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
        let style: any = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: 9999999,
            userSelect: "none",
            touchCallout: "none",
        };

        return (
            <div className="center" id="ninja-game" style={style}>
                <Head
                    title="Lingual Ninja Games - Castle Of The Maze"
                    desc="Japanese action game! Be a ninja, and defeat the enemy in the castle!"
                />
                <Pages
                    state={this.state}
                    changePage={(i, lang) => {
                        this.changePage(i, lang);
                    }}
                    changeStage={(i, j) => {
                        this.changeStage(i, j);
                    }}
                    readElementScroll={this.readElementScroll}
                />
            </div>
        );
    }
}

function Pages(props) {
    if (props.state.curPage === 2 || !!props.state.language) {
        return (
            <Page2
                changeStage={(i, j) => {
                    props.changeStage(i, j);
                }}
                ninja={props.state.ninja}
                stage={props.state.stage}
                readElementScroll={props.readElementScroll}
                language={props.state.language}
            />
        );
    } else if (props.state.curPage === 1) {
        return (
            <Page1
                changePage={(i, lang) => {
                    props.changePage(i, lang);
                }}
            />
        );
    }
}
export default NinjaGame;
