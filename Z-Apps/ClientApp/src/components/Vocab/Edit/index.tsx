import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import Head from "../../parts/Helmet";

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

        return (
            <div>
                <Head noindex />
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
                    Hello
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabVideo);
