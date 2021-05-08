import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BLOB_URL } from "../../../common/consts";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import { sound, vocab, vocabGenre } from "../../../types/vocab";
import Head from "../../parts/Helmet";
import { HideHeaderAndFooter } from "../../parts/HideHeaderAndFooter";
import { LastPage } from "./LastPage";
import { ListPage } from "./ListPage";
import { MenuPage } from "./MenuPage";
import { QuizPage } from "./QuizPage";
import { TitlePage } from "./TitlePage";

export const Page = {
    menu: 0,
    title: 1,
    list: 2,
    quiz: 3,
    last: 4,
};
export type Page = typeof Page[keyof typeof Page];

export type ChangePage = (nextPage: Page) => void;

type Props = {
    location: { pathname: string };
    match: { params: { [key: string]: string } };
};
type State = {
    genreName: string;
    screenWidth: number;
    currentPage: Page;
    vocabList: vocab[];
    vocabGenre?: vocabGenre;
    vocabSounds: sound[];
};

class VocabVideo extends React.Component<Props, State> {
    music: sound = getAudio({
        src: `${BLOB_URL}/vocabulary-quiz/music.mp3`,
    });

    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const genreName: string = params.genreName.toString().split("#")[0];

        this.state = {
            genreName,
            screenWidth: window.innerWidth,
            currentPage: Page.menu,
            vocabList: [],
            vocabGenre: undefined,
            vocabSounds: [],
        };

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
    }

    loadVocab = async () => {
        const {
            match: { params },
        } = this.props;
        const genreName: string = params.genreName.toString().split("#")[0];
        const res = await fetch(
            `api/VocabQuiz/GetQuizDataWithoutCache/${genreName}`
        );
        const result: {
            vocabList: vocab[];
            vocabGenre: vocabGenre;
        } = await res.json();

        this.makeSound(result);
        this.setState(result);
    };

    makeSound = ({
        vocabList,
        vocabGenre,
    }: {
        vocabList: vocab[];
        vocabGenre: vocabGenre;
    }) => {
        const vocabSounds: sound[] = [];

        vocabList.length > 0 &&
            vocabList.forEach((v: vocab) => {
                vocabSounds[v.vocabId] = getAudio({
                    src: `${BLOB_URL}/vocabulary-quiz/audio/${vocabGenre.genreName}/Japanese-vocabulary${v.vocabId}.m4a`,
                });
            });

        this.setState({ vocabSounds });
    };

    componentDidMount() {
        this.loadVocab();

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    changeScreenSize = () => {
        if (this.state.screenWidth !== window.innerWidth) {
            this.setState({
                screenWidth: window.innerWidth,
            });
        }
    };

    changePage = (nextPage: Page) => {
        this.setState({ currentPage: nextPage });
    };

    render() {
        const { music } = this;
        const {
            vocabGenre,
            vocabList,
            vocabSounds,
            screenWidth,
            currentPage,
        } = this.state;

        const genreName =
            (vocabGenre && vocabGenre.genreName) || this.state.genreName || "";
        const titleToShowUpper = genreName
            .split("_")
            .map(t => t && t[0].toUpperCase() + t.substr(1))
            .join(" ");

        let pageContent: React.ReactNode;
        switch (currentPage) {
            case Page.menu: {
                pageContent = (
                    <MenuPage
                        changePage={this.changePage}
                        vocabSounds={vocabSounds}
                        music={music}
                    />
                );
                break;
            }
            case Page.title: {
                pageContent = (
                    <TitlePage
                        titleToShowUpper={titleToShowUpper}
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                        vocabList={vocabList}
                        music={music}
                    />
                );
                break;
            }
            case Page.list: {
                pageContent = (
                    <ListPage
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                        vocabList={vocabList}
                        vocabSounds={vocabSounds.map(s => s?.audio)}
                    />
                );
                break;
            }
            case Page.quiz: {
                pageContent = (
                    <QuizPage
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                        vocabList={vocabList}
                        vocabSounds={vocabSounds.map(s => s?.audio)}
                    />
                );
                break;
            }
            case Page.last: {
                pageContent = (
                    <LastPage
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                        music={music}
                    />
                );
                break;
            }
        }

        return (
            <div>
                <Head noindex />
                <HideHeaderAndFooter />
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {pageContent}
                </div>
            </div>
        );
    }
}

function getAudio({ src }: { src: string }) {
    const audio = new window.Audio();
    audio.preload = "none";
    audio.autoplay = false;
    audio.src = src;
    return { audio, playable: false };
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabVideo);
