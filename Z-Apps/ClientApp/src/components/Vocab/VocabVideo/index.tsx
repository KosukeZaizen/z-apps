import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import Head from "../../parts/Helmet";
import { HideHeaderAndFooter } from "../../parts/Layout";
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

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
        match: { params: { [key: string]: string } };
    };
type State = {
    genreName: string;
    screenWidth: number;
    currentPage: Page;
};

class VocabVideo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const genreName: string = params.genreName.toString().split("#")[0];

        this.state = {
            genreName,
            screenWidth: window.innerWidth,
            currentPage: Page.menu,
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

    componentDidMount() {
        const { loadVocabs } = this.props;
        const { genreName } = this.state;
        loadVocabs(genreName);

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
        const { vocabGenre, vocabList, vocabSounds } = this.props;
        const { screenWidth, currentPage } = this.state;

        const genreName =
            (vocabGenre && vocabGenre.genreName) || this.state.genreName || "";
        const titleToShowUpper = genreName
            .split("_")
            .map(t => t && t[0].toUpperCase() + t.substr(1))
            .join(" ");
        const titleToShowLower = genreName.split("_").join(" ");

        let pageContent: React.ReactNode;
        switch (currentPage) {
            case Page.menu: {
                pageContent = (
                    <MenuPage
                        changePage={this.changePage}
                        vocabSounds={vocabSounds}
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
                        titleToShowUpper={titleToShowUpper}
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                    />
                );
                break;
            }
        }

        return (
            <div>
                <Head noindex />
                <HideHeaderAndFooter />
                <StopAnimation />
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

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabVideo);
