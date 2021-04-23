import * as React from "react";
import { StopAnimation } from "../../common/animation";
import { getParams } from "../../common/functions";
import "../../css/NinjaGame2.css";
import Head from "../parts/Helmet";
import { HideHeaderAndFooter } from "../parts/HideHeaderAndFooter";
import { Page1 } from "../parts/Ninja2/Page1";
import { Page2 } from "../parts/Ninja2/Page2";

export type Language = string;
export interface Ninja {
    size: number;
    speedX: number;
    speedY: number;
    posX: number;
    posY: number;
    readScroll: string[];
    boolLeft: boolean;
    fireBallCount?: any;
    game?: any;
    push?: Function;
}
interface Props {
    history: { push: Function };
}
interface State {
    curPage: number;
    language: Language;
    ninja: Ninja;
    stage: number;
}
class NinjaGame extends React.Component<Props, State> {
    readElementScroll: string[];

    constructor(props: Props) {
        super(props);

        let ninja: Ninja;
        let stage: number;

        const initialNinja: Ninja = {
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
        const objSaveData = saveData && JSON.parse(saveData);
        if (objSaveData) {
            ninja = objSaveData.ninja || initialNinja;
            stage = objSaveData.stage || 1;
        } else {
            ninja = initialNinja;
            stage = 1;
        }

        //リダイレクトのためのpush関数を追加
        ninja.push = props.history.push;

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

    changePage(num: number, lang: Language) {
        this.setState({
            curPage: num,
            language: lang,
        });
    }

    changeStage(num: number, ninja: Ninja) {
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
            zIndex: 1000000009,
            userSelect: "none",
            touchCallout: "none",
        };

        return (
            <div className="center" id="ninja-game" style={style}>
                <Head
                    title="Lingual Ninja Games - Castle Of The Maze"
                    desc="Japanese action game! Be a ninja, and defeat the enemy in the castle!"
                />
                <HideHeaderAndFooter />
                <StopAnimation />
                <Pages
                    state={this.state}
                    changePage={(i: number, lang: Language) => {
                        this.changePage(i, lang);
                    }}
                    changeStage={(i: number, j: Ninja) => {
                        this.changeStage(i, j);
                    }}
                    readElementScroll={this.readElementScroll}
                />
            </div>
        );
    }
}

function Pages(props: {
    state: State;
    changeStage: (i: number, j: Ninja) => void;
    changePage: (i: number, lang: Language) => void;
    readElementScroll: string[];
}) {
    if (props.state.curPage === 2 || !!props.state.language) {
        return (
            <Page2
                changeStage={(i: number, j: Ninja) => {
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
                changePage={(i: number, lang: Language) => {
                    props.changePage(i, lang);
                }}
            />
        );
    }
    return null;
}
export default NinjaGame;
