import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import * as vocabStore from '../store/VocabQuizStore';
import '../css/VocabQuiz.css';
import './parts/PleaseScrollDown.css';
import AllVocabList from './parts/VocabQuiz/AllVocabList';
import CharacterComment from './parts/VocabQuiz/CharacterComment';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';

type Props = vocabStore.IVocabQuizState & vocabStore.IActionCreators & {
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
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        });
    }

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = (today.getMonth() + today.getDate());
        const mod = todayNumber % 27;
        if (mod > 13) return 2;
        if (mod > 5) return 3;
        return 1;
    }

    render() {
        const { screenWidth, imgNumber } = this.state;
        return (
            <div className="center">
                <Head
                    title="Japanese Vocabulary Quiz"
                    desc={"Free app to learn Japanese vocabulary! Try to get a perfect score on all the quizzes!"}
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    {"Home"}
                                </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                {"Japanese Vocabulary Quiz"}
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
                        {"Japanese Vocabulary Quiz"}
                    </h1>
                    <br />
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment="Try to get a perfect score on all the quizzes!"
                    />
                    <br />
                    <AllVocabList
                        criteriaRef={this.ref}
                    />
                    <hr />
                    <Link to="/vocabulary-list">
                        <button
                            className="btn btn-primary btn-lg btn-block"
                        >
                            {"Checke All Vocabulary Lists"}
                        </button>
                    </Link>
                    <hr />
                    <div style={{ fontSize: "x-large", margin: "20px" }}>
                        <Link to="/folktales">Learn Japanese from Japanese folktales >></Link>
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
};

export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(VocabQuizTop);