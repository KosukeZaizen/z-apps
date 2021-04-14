import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../common/animation";
import * as consts from "../common/consts";
import { ApplicationState } from "../store/configureStore";
import * as vocabStore from "../store/VocabQuizStore";
import CharacterComment from "./parts/CharacterComment";
import Head from "./parts/Helmet";
import { HideHeaderAndFooter } from "./parts/Layout";
import "./parts/PleaseScrollDown.css";

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
        match: { params: { [key: string]: string } };
    };
type State = {
    genreName: string;
    screenWidth: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabVideo extends React.Component<Props, State> {
    correctSounds = [new Audio(), new Audio()];
    ref: React.RefObject<HTMLHeadingElement>;

    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const genreName: string = params.genreName.toString().split("#")[0];

        this.state = {
            genreName,
            screenWidth: window.innerWidth,
            pleaseScrollDown: false,
            imgNumber: this.getImgNumber(genreName?.length),
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

        this.ref = React.createRef();
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
        this.correctSounds[0].src =
            consts.BLOB_URL + "/appsPublic/sound/correctSound.mp3";
        this.correctSounds[1].src =
            consts.BLOB_URL + "/appsPublic/sound/incorrectSound.mp3";
        this.correctSounds.forEach(s => s.load);
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
                imgNumber: this.getImgNumber(genreName?.length),
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

    getImgNumber = (num: number = 0) => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate() + num;
        const mod = todayNumber % 27;
        if (mod > 13) return 1;
        if (mod > 5) return 2;
        return 3;
    };

    render() {
        const {
            vocabGenre,
            currentPage,
            changePage,
            vocabList,
            vocabSounds,
        } = this.props;
        const { screenWidth, imgNumber } = this.state;

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
                    <Page1
                        titleToShowUpper={titleToShowUpper}
                        screenWidth={screenWidth}
                    />
                </div>
            </div>
        );
    }
}

function Page1({
    titleToShowUpper,
    screenWidth,
}: {
    titleToShowUpper: string;
    screenWidth: number;
}) {
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
                <p>{"Japanese Vocabulary Quiz"}</p>
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
