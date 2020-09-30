import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle } from "reactstrap";
import { bindActionCreators } from "redux";
import { TReducers } from "../store/configureStore";
import * as vocabStore from "../store/VocabQuizStore";
import FB from "./parts/FaceBook";
import GoogleAd from "./parts/GoogleAd";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";
import "./parts/PleaseScrollDown.css";
import AllKanjiList from "./parts/VocabQuiz/AllKanjiList";
import CharacterComment from "./parts/VocabQuiz/CharacterComment";

type Props = vocabStore.IVocabQuizState &
    vocabStore.IActionCreators & {
        location: { pathname: string };
    };
type State = {
    screenWidth: number;
    screenHeight: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabQuizTop extends React.Component<Props, State> {
    ref: React.RefObject<HTMLHeadingElement>;

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pleaseScrollDown: false,
            imgNumber: this.getImgNumber(),
        };

        let timer;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };

        this.ref = React.createRef();
    }

    componentDidMount() {
        this.props.loadAllGenres();

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    changeScreenSize = () => {
        if (
            this.state.screenWidth !== window.innerWidth ||
            this.state.screenHeight !== window.innerHeight
        ) {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        }
    };

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate();
        const mod = todayNumber % 27;
        if (mod > 13) return 3;
        if (mod > 5) return 1;
        return 2;
    };

    render() {
        const { allGenres } = this.props;
        const { screenWidth, imgNumber } = this.state;
        return (
            <div className="center">
                <Head
                    title="Japanese Kanji Quiz"
                    desc={
                        "Free app to learn Japanese Kanji! Try to get a perfect score on all the quizzes!"
                    }
                />
                <div style={{ maxWidth: 700 }}>
                    <div
                        className="breadcrumbs"
                        itemScope
                        itemType="https://schema.org/BreadcrumbList"
                        style={{ textAlign: "left" }}
                    >
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                to="/"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">{"Home"}</span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <span
                                itemProp="name"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                {"Japanese Kanji Quiz"}
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1
                        id="h1title"
                        style={{
                            margin: "25px",
                            lineHeight: screenWidth > 500 ? "45px" : "40px",
                            fontWeight: "bold",
                        }}
                    >
                        {"Japanese Kanji Quiz"}
                    </h1>
                    <br />
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment={
                            <p>
                                Free app to learn Japanese Kanji!
                                <br />
                                Try to get a perfect score on all the quizzes!
                            </p>
                        }
                    />
                    <br />
                    <AllKanjiList
                        allGenres={allGenres}
                        criteriaRef={this.ref}
                    />
                    <hr />
                    <Link to="/vocabulary-list">
                        <button className="btn btn-primary btn-lg btn-block">
                            {"Check All Vocabulary Lists"}
                        </button>
                    </Link>
                    <hr />
                    <Link to={`/vocabulary-quiz`}>
                        <Card
                            body
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#333",
                                color: "white",
                            }}
                        >
                            <CardTitle>Japanese Vocabulary Quiz</CardTitle>
                            <p>
                                Free app to learn Japanese vocabulary!
                                <br />
                                Try to get a perfect score on all the quizzes!
                            </p>
                            <Button color="secondary">
                                Try Vocabulary Quiz
                            </Button>
                        </Card>
                    </Link>
                    <hr />
                    <div style={{ fontSize: "x-large", margin: "20px" }}>
                        <Link to="/folktales">
                            {"Learn Japanese from Japanese folktales >>"}
                        </Link>
                    </div>
                    <br />
                    <FB />
                    <br />
                    <GoogleAd />
                    <PleaseScrollDown
                        criteriaRef={this.ref}
                        screenWidth={screenWidth}
                        targetId="h1title"
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(VocabQuizTop);
