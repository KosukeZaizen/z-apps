import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../common/animation";
import { ApplicationState } from "../store/configureStore";
import * as vocabStore from "../store/VocabQuizStore";
import CharacterComment from "./parts/CharacterComment";
import Head from "./parts/Helmet";
import { HideHeaderAndFooter } from "./parts/Layout";
import "./parts/PleaseScrollDown.css";

const Page = {
    menu: 0,
    title: 1,
    list: 2,
    quiz: 3,
    last: 4,
};
type Page = typeof Page[keyof typeof Page];

type ChangePage = (nextPage: Page) => void;

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
        const { loadVocabs, loadAllGenres, loadAllVocabs } = this.props;
        const { genreName } = this.state;
        loadVocabs(genreName);
        loadAllGenres();
        setTimeout(loadAllVocabs, 15000);

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    componentDidUpdate(previousProps: Props) {
        if (previousProps.location !== this.props.location) {
            const genreName =
                this.props.location.pathname
                    .split("/")
                    .filter(a => a)
                    .pop()
                    ?.split("#")
                    .pop() || "";
            this.setState({
                genreName,
            });
            this.props.loadVocabs(genreName);
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
                pageContent = <MenuPage changePage={this.changePage} />;
                break;
            }
            case Page.title: {
                pageContent = (
                    <Page1
                        titleToShowUpper={titleToShowUpper}
                        screenWidth={screenWidth}
                        changePage={this.changePage}
                    />
                );
                break;
            }
            case Page.list: {
                pageContent = <div>hello</div>;
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

function MenuPage({ changePage }: { changePage: ChangePage }) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    return isButtonShown ? (
        <>
            <button
                onClick={() => {
                    setTimeout(() => {
                        changePage(Page.title);
                    }, 3000);
                    setIsButtonShown(false);
                }}
            >
                Title Page
            </button>
        </>
    ) : null;
}

function Page1({
    titleToShowUpper,
    screenWidth,
    changePage,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    changePage: ChangePage;
}) {
    useEffect(() => {
        setTimeout(() => {
            changePage(Page.list);
        }, 4000);
    }, []);

    return (
        <div>
            <h1
                id="h1title"
                style={{
                    marginBottom: 100,
                    fontWeight: "bold",
                    fontSize: 90,
                }}
            >
                {"Japanese Vocabulary Quiz"}
            </h1>
            <CharacterComment
                imgNumber={1}
                screenWidth={screenWidth}
                comment={titleToShowUpper.split(" ").map((t, i) => {
                    const str = i ? " " + t : t;
                    return t.includes("-") ? (
                        <span style={{ display: "inline-block" }}>{str}</span>
                    ) : (
                        str
                    );
                })}
                style={{ maxWidth: 1000, marginBottom: 40 }}
                commentStyle={{
                    fontSize: 100,
                    fontWeight: "bold",
                    maxWidth: 900,
                    marginLeft: 40,
                    textAlign: "center",
                }}
            />
        </div>
    );
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabVideo);
