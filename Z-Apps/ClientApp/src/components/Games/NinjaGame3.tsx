import * as React from "react";
import { StopAnimation } from "../../common/animation";
import { getParams } from "../../common/functions";
import "../../css/NinjaGame2.css"; //CSSは2のもの
import Head from "../parts/Helmet";
import { HideHeaderAndFooter } from "../parts/HideHeaderAndFooter";
import * as Consts from "../parts/Ninja3/Consts";
import { Page1 } from "../parts/Ninja3/Page1";
import { Page2 } from "../parts/Ninja3/Page2";

interface Ninja {
    size: number;
    speedX: number;
    speedY: number;
    posX: number;
    posY: number;
    readScroll: string[];
    boolLeft: boolean;
    snow: boolean;
    lang?: string;
    push?: Function;
}
interface Props {
    history: { push: Function };
}
interface State {
    curPage: number;
    language: string;
    ninja: Ninja;
    stage: number;
}
class NinjaGame extends React.Component<Props, State> {
    readElementScroll: any[];

    constructor(props: Props) {
        super(props);

        let ninja: Ninja;
        let stage: number;

        const initialNinja: Ninja = {
            size: 12,
            speedX: 0,
            speedY: 0,
            posX: 145,
            posY: -20,
            readScroll: [],
            //readScroll: ["飛び石の術", "半化の術", "踏みつけの術"],//デバッグ用★
            boolLeft: true,
            snow: true,
        };

        //セーブデータ読み込み
        const saveData = localStorage.getItem(Consts.SAVE_NAME);

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

        let lang;
        if (ninja && ninja.lang) {
            //セーブデータからlangが読み込めた場合
            lang = ninja.lang;
        } else {
            //urlパラメータ取得
            const params = getParams();
            lang = params ? params["l"] : "";
        }

        //デバッグ用★
        /*
        stage = 4;
        ninja.snow = false;
        */

        this.state = {
            language: lang,
            curPage: 1,
            stage: stage,
            ninja: ninja,
        };
        this.readElementScroll = [];

        this.changePage = this.changePage.bind(this);
        this.changeStage = this.changeStage.bind(this);
    }

    changePage(num: number, lang: string) {
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
            backgroundColor: "white",
            zIndex: 1000000009,
            userSelect: "none",
            touchCallout: "none",
        };

        return (
            <div className="center" id="ninja-game" style={style}>
                <Head
                    title="Lingual Ninja Games - Frozen Nightmare"
                    desc="Japanese action game! Be a ninja, and save the village from the monsters!"
                />
                <HideHeaderAndFooter />
                <StopAnimation />
                <Pages
                    state={this.state}
                    changePage={(i: number, lang: string) => {
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
    changePage: (num: number, lang: string) => void;
    changeStage: (num: number, ninja: Ninja) => void;
    readElementScroll: string[];
}) {
    if (props.state.curPage === 2 || props.state.language) {
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
                changePage={(i: number, lang: string) => {
                    props.changePage(i, lang);
                }}
            />
        );
    }
    return null;
}
export default NinjaGame;
