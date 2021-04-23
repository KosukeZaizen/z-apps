import * as React from "react";
import { StopAnimation } from "../../common/animation";
import "../../css/NinjaGame.css";
import Head from "../parts/Helmet";
import { HideHeaderAndFooter } from "../parts/HideHeaderAndFooter";
import { Page1 } from "../parts/Ninja/Page1";
import { Game, Page2 } from "../parts/Ninja/Page2";

export type Language = "English" | "Japanese";
export interface Ninja {
    game?: Game;
    size: number;
    speedX: number;
    speedY: number;
    posX: number;
    posY: number;
    readScroll: string[];
}
interface Props {
    curPage: number;
    language: Language;
}
interface State {
    language: Language;
    curPage: number;
    stage: number;
    ninja: Ninja;
}
class NinjaGame extends React.Component<Props, State> {
    readElementScroll: any[];

    constructor(props: Props) {
        super(props);

        let ninja: Ninja;
        let stage: number;

        //セーブデータ読み込み
        const saveData = localStorage.getItem("saveData1");
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
                    title="Lingual Ninja Games - Scrolls of The Four Elements"
                    desc="Japanese action game! Be a Ninja, and collect the scrolls in Japan!"
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
    changePage: (i: number, lang: Language) => void;
    changeStage: (i: number, j: Ninja) => void;
    readElementScroll: string[];
}) {
    if (props.state.curPage === 1) {
        return (
            <Page1
                changePage={(i: number, lang: Language) => {
                    props.changePage(i, lang);
                }}
            />
        );
    } else if (props.state.curPage === 2) {
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
    }
    return null;
}
export default NinjaGame;
