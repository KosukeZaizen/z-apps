import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import * as vocabStore from '../store/VocabQuizStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/VocabQuiz.css';
import './parts/PleaseScrollDown.css';
import AllKanjiList from './parts/VocabQuiz/AllKanjiList';
import AllVocabList from './parts/VocabQuiz/AllVocabList';
import CharacterComment from './parts/VocabQuiz/CharacterComment';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';
import * as consts from './common/consts';
import { shuffle } from './common/functions';
import { vocab } from '../types/vocab';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type Props = vocabStore.IVocabQuizState & vocabStore.IActionCreators & {
    location: { pathname: string };
};
type State = {
    genreName: string;
    screenWidth: number;
    screenHeight: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabQuiz extends React.Component<Props, State> {
    correctSounds = [new Audio(), new Audio()];
    vocabSounds: HTMLAudioElement[] = [];
    ref: React.RefObject<HTMLHeadingElement>;

    constructor(props) {
        super(props);

        const { params } = props.match;
        const genreName = params.genreName.toString().split("#")[0];
        this.props.loadVocabs(genreName);

        this.state = {
            genreName: genreName,
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
        this.correctSounds[0].src = consts.BLOB_URL + "/appsPublic/sound/correctSound.mp3";
        this.correctSounds[1].src = consts.BLOB_URL + "/appsPublic/sound/incorrectSound.mp3";
        this.correctSounds.forEach(s => s.load);
    }

    componentDidUpdate(preciousProps) {
        if (preciousProps.location !== this.props.location) {
            const genreName = this.props.location.pathname.split("/").filter(a => a).pop();
            this.setState({
                genreName: genreName,
            });
            this.props.loadVocabs(genreName);
        }
    }

    changeScreenSize = () => {
        if (this.state.screenWidth !== window.innerWidth || this.state.screenHeight !== window.innerHeight) {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        }
    }

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = (today.getMonth() + today.getDate());
        const mod = todayNumber % 27;
        if (mod > 13) return 3;
        if (mod > 5) return 2;
        return 1;
    }

    render() {
        const { vocabGenre, currentPage, changePage } = this.props;
        const vocabList: vocab[] = this.props.vocabList.sort((a, b) => a.order - b.order);
        const { screenWidth, imgNumber } = this.state;

        const genreName: string = (vocabGenre && vocabGenre.genreName) || this.state.genreName || "";
        const titleToShowUpper: string = genreName.split("_").map(t => t && (t[0].toUpperCase() + t.substr(1))).join(" ");
        const titleToShowLower: string = genreName.split("_").join(" ");

        let pageData: JSX.Element;
        switch (currentPage) {
            case 2:
                pageData = <Page2
                    vocabList={vocabList}
                    changePage={changePage}
                    screenWidth={screenWidth}
                    imgNumber={imgNumber}
                    correctSounds={this.correctSounds}
                    vocabSounds={this.vocabSounds}
                />;
                break;
            case 3:
                pageData = <Page3
                    vocabList={vocabList}
                    changePage={changePage}
                    screenWidth={screenWidth}
                    imgNumber={imgNumber}
                    vocabSounds={this.vocabSounds}
                />;
                break;
            default:
                vocabList.length > 0 && vocabList.forEach(v => {
                    this.vocabSounds[v.vocabId] = new Audio();
                    this.vocabSounds[v.vocabId].preload = "none";
                    this.vocabSounds[v.vocabId].autoplay = false;
                    this.vocabSounds[v.vocabId].src = `${consts.BLOB_URL}/vocabulary-quiz/audio/${vocabGenre.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;
                });
                pageData = <Page1
                    vocabList={vocabList}
                    screenWidth={screenWidth}
                    imgNumber={imgNumber}
                    changePage={changePage}
                    vocabSounds={this.vocabSounds}
                    criteriaRef={this.ref}
                />;
        }

        return (
            <div className="center">
                <Head
                    title={"Japanese Kanji Quiz - " + titleToShowUpper}
                    desc={"Free app to remember Kanji for " + titleToShowLower + "! Try to get a perfect score on all the quizzes!"}
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
                            <Link to="/kanji-quiz" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    {"Kanji Quiz"}
                                </span>
                                <meta itemProp="position" content="2" />
                            </Link>
                        </span>
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                {titleToShowUpper}
                            </span>
                            <meta itemProp="position" content="3" />
                        </span>
                    </div>
                    <h1
                        id="h1title"
                        style={{
                            margin: "25px",
                            lineHeight: screenWidth > 500 ? "45px" : "40px",
                        }}
                    >
                        <b>{"Japanese Kanji Quiz - " + titleToShowUpper}</b>
                    </h1>
                    <br />
                    {vocabList && vocabList.length > 0 ? pageData : <CircularProgress key="circle" size="20%" />}
                    <hr />
                    <h2 style={{ fontWeight: "bold", margin: 20 }}>Other Kanji Genres</h2>
                    <AllKanjiList excludeGenreId={vocabGenre && vocabGenre.genreId} />
                    <hr />
                    <h2 style={{ fontWeight: "bold", margin: 20 }}>Vocabulary Quiz</h2>
                    <AllVocabList />
                    <br />
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment="Try to get a perfect score on all the quizzes!"
                    />
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

function Page1(props) {
    const { vocabList, screenWidth, imgNumber, changePage, vocabSounds, criteriaRef } = props;

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };

    const incorrectIds: number[] = JSON.parse(localStorage.getItem(`kanji-quiz-incorrectIds-${vocabList[0].genreId}`)) || [];

    return (
        <>
            <CharacterComment
                screenWidth={screenWidth}
                imgNumber={imgNumber}
                comment="Before starting the Kanji quiz, please remember the Kanji list below!"
            />
            <div style={{
                textAlign: "right"
            }}>
                <button
                    onClick={() => changePage(2)}
                    className="btn btn-primary"
                    style={{ marginBottom: 25, marginTop: 20 }}
                >
                    {"Start the Kanji quiz anyway >>"}
                </button>
            </div>
            <TableContainer component={Paper} ref={criteriaRef}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'papayawhip' }}>
                            <TableCell style={tableHeadStyle} align="center">Kanji</TableCell>
                            <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                            <TableCell style={tableHeadStyle} align="center">Meaning</TableCell>
                            <TableCell style={tableHeadStyle} align="center">Sound</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            vocabList.map((v: vocab) => (
                                <TableRow key={v.vocabId}>
                                    <TableCell style={incorrectIds.includes(v.vocabId) ? { ...tableElementStyle, color: "red", fontWeight: "bold" } : tableElementStyle} align="center">{v.kanji}</TableCell>
                                    <TableCell style={incorrectIds.includes(v.vocabId) ? { ...tableElementStyle, color: "red", fontWeight: "bold" } : tableElementStyle} align="center">{v.hiragana}</TableCell>
                                    <TableCell style={incorrectIds.includes(v.vocabId) ? { ...tableElementStyle, color: "red", fontWeight: "bold" } : tableElementStyle} align="center">{v.english}</TableCell>
                                    <TableCell style={tableElementStyle} align="center">
                                        <Speaker
                                            vocabSound={vocabSounds[v.vocabId]}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <button
                onClick={() => changePage(2)}
                className="btn btn-primary btn-lg btn-block"
            >
                Start the Kanji Quiz
            </button>
            <br />
            <CharacterComment
                screenWidth={screenWidth}
                imgNumber={(imgNumber - 1) || 3}
                comment={imgNumber === 1 ? "Try your best!" : "Good luck!"}
            />
        </>
    );
}

class Speaker extends React.Component<{
    vocabSound: HTMLAudioElement;
},{
    showImg: boolean;
}> {

    constructor(props){
        super(props);
        this.state = {
            showImg: false,
        };
        
        props.vocabSound.oncanplaythrough = () => {
            this.setState({ showImg: true }); 
        };
        props.vocabSound.load();
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this.props;
        return showImg ?
            <img
                alt="kanji speaker"
                src={consts.BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30 }}
                onClick={() => { vocabSound && vocabSound.play(); }}
            />
            :
            <CircularProgress key="circle" size="20%" />
    }
}

class Page2 extends React.Component<{
    vocabList: vocab[];
    changePage: (nextPage: vocabStore.TPageNumber) => void;
    screenWidth: number;
    imgNumber: number;
    correctSounds: HTMLAudioElement[];
    vocabSounds: HTMLAudioElement[];
},{
    correctIds: number[];
    incorrectIds: number[];
    vocabToShow: vocab;
    mode: number;
    buttons: JSX.Element[];
    vocabToBeAsked: vocab;
}> {

    constructor(props){
        super(props);

        const {vocabList, vocabSounds} = props;
        const firstButtonsAndVocabs = this.makeButtons([], [], vocabList);

        this.state = {
            correctIds: [],
            incorrectIds: [],
            vocabToShow: null,
            mode: 0,//0:quiz, 1:correct/2:incorrect
            buttons: firstButtonsAndVocabs.resultButtons,
            vocabToBeAsked: firstButtonsAndVocabs.resultVocabToBeAsked,
        };
    }

    makeButtons = (correctIds: number[], incorrectIds: number[], vocabsForQuiz: vocab[]) => {
        const { vocabList, correctSounds, vocabSounds } = this.props;

        const getRandItem = (vs: vocab[]) => vs[Math.floor(Math.random() * vs.length)];
        const resultVocabToBeAsked = getRandItem(vocabsForQuiz);
        let survivedVocabs = vocabList.filter(v => v && v.vocabId !== resultVocabToBeAsked.vocabId);

        const vocabsOfChoice: vocab[] = [];
        const resultButtons = [
            <button
                key={3}
                onClick={() => {
                    const sound = correctSounds[0];
                    sound.onended = (e) => {
                        vocabSounds[resultVocabToBeAsked.vocabId] && vocabSounds[resultVocabToBeAsked.vocabId].play();
                        sound.onended = null;
                    };
                    sound.play();

                    this.setState({
                        vocabToShow: resultVocabToBeAsked,
                        correctIds: [...correctIds, resultVocabToBeAsked.vocabId],
                        mode: 1,
                    });
                    if (vocabSounds[resultVocabToBeAsked.vocabId]) {
                        vocabSounds[resultVocabToBeAsked.vocabId].pause();
                        vocabSounds[resultVocabToBeAsked.vocabId].currentTime = 0;
                    }
                }}
                className="btn btn-primary btn-lg btn-block"
                style={{ maxWidth: 300 }}
            >
                {resultVocabToBeAsked.hiragana}
            </button>
        ];

        for (let i = 0; i < 3; i = (i + 1) | 0) {
            const vocabToPush = getRandItem(survivedVocabs);
            vocabsOfChoice.push(vocabToPush);

            resultButtons.push(
                <button
                    key={i}
                    onClick={() => {
                        const sound = correctSounds[1];
                        sound.onended = (e) => {
                            vocabSounds[resultVocabToBeAsked.vocabId] && vocabSounds[resultVocabToBeAsked.vocabId].play();
                            sound.onended = null;
                        };
                        sound.play();

                        this.setState({
                            vocabToShow: resultVocabToBeAsked,
                            incorrectIds: [...[...incorrectIds, resultVocabToBeAsked.vocabId], resultVocabToBeAsked.vocabId],
                            mode: 2,
                        });
                        if (vocabSounds[resultVocabToBeAsked.vocabId]) {
                            vocabSounds[resultVocabToBeAsked.vocabId].pause();
                            vocabSounds[resultVocabToBeAsked.vocabId].currentTime = 0;
                        }
                    }}
                    className="btn btn-primary btn-lg btn-block"
                    style={{ maxWidth: 300 }}
                >
                    {vocabToPush.hiragana}
                </button>
            );

            survivedVocabs = survivedVocabs.filter(v => !vocabsOfChoice.includes(v));
        }
        return { resultButtons: shuffle(resultButtons), resultVocabToBeAsked };
    }

    render(){
        setTimeout(() => {
            try { (document.activeElement as HTMLElement).blur(); } catch (e) { }
        }, 300);

        const { vocabList, screenWidth, imgNumber, vocabSounds, changePage, correctSounds } = this.props;
        const { correctIds, incorrectIds, vocabToShow, mode, buttons, vocabToBeAsked } = this.state;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };

        let content: JSX.Element;
        if (mode === 0) {
            //Quiz
            content = <div>
                <CharacterComment
                    screenWidth={screenWidth}
                    imgNumber={(((imgNumber - 1) || 3) - 1) | 3}
                    comment="Choose the Hiragana for the Kanji!"
                />
                <p style={{ fontSize: "xx-large", fontWeight: "bold" }}>{vocabToBeAsked.kanji}</p>
                {buttons}
                <br />
                <p
                    style={{ color: "#007bff" }}
                    onClick={() => {
                        const sure = window.confirm("Your progress will not be saved.\nAre you sure you want to return?");
                        if(sure){
                            changePage(1);
                        }
                    }}
                >Return to Kanji List >></p>
            </div>
        } else {
            //Correct,Incorrect
            const rand = Math.floor(Math.random() * 3);
            content = <div>
                <CharacterComment
                    screenWidth={screenWidth}
                    imgNumber={(((imgNumber - 1) || 3) - 1) | 3}
                    comment={mode === 1 ? ["Good!", "Nice!", "Excellent!"][rand] : "Oops!"}
                />
                {
                    mode === 1 ?
                        <p style={{ fontSize: "xx-large", fontWeight: "bold", color: "green" }}>{"Correct!"}</p>
                        :
                        <p style={{ fontSize: "xx-large", fontWeight: "bold", color: "red" }}>{"Incorrect!"}</p>
                }
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'papayawhip' }}>
                                <TableCell style={tableHeadStyle} align="center">Kanji</TableCell>
                                <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                                <TableCell style={tableHeadStyle} align="center">Meaning</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableElementStyle} align="center">{vocabToShow.kanji}</TableCell>
                                <TableCell style={tableElementStyle} align="center">{vocabToShow.hiragana}</TableCell>
                                <TableCell style={tableElementStyle} align="center">{vocabToShow.english}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <button
                    onClick={() => {
                        const finishedIds: number[] = [...correctIds, ...incorrectIds];
                        const vocabsForQuiz = vocabList.filter(v => !( finishedIds && finishedIds.includes(v.vocabId)));

                        if (vocabsForQuiz.length <= 0) {
                            const cr = correctIds.length;
                            const inc = incorrectIds.length;
                            const percentage = Math.floor(100 * cr / (cr + inc));
                            localStorage.setItem(
                                `kanji-quiz-percentage-${vocabList[0].genreId}`,
                                JSON.stringify(percentage)
                            );
                            localStorage.setItem(
                                `kanji-quiz-incorrectIds-${vocabList[0].genreId}`,
                                JSON.stringify(incorrectIds)
                            );
                            if (vocabSounds[vocabToBeAsked.vocabId]) {
                                vocabSounds[vocabToBeAsked.vocabId].pause();
                                vocabSounds[vocabToBeAsked.vocabId].currentTime = 0;
                            }
                            changePage(3);
                            return;
                        }
                        
                        correctSounds.forEach(s => {
                            s.pause();
                            s.currentTime = 0;
                        });
                        if (vocabSounds[vocabToShow.vocabId]) {
                            vocabSounds[vocabToShow.vocabId].pause();
                            vocabSounds[vocabToShow.vocabId].currentTime = 0;
                        }

                        const { resultButtons, resultVocabToBeAsked } = this.makeButtons(correctIds, incorrectIds, vocabsForQuiz);
                        
                        this.setState({ 
                            mode: 0, 
                            buttons: resultButtons,  
                            vocabToBeAsked: resultVocabToBeAsked
                        });
                    }}
                    className="btn btn-dark btn-lg btn-block"
                >
                    {"Next"}
                </button>
                <br />
            </div>
        }
        return content;
    }
}

type TPage3Props = {
    vocabList: vocab[];
    changePage: (nextPage: vocabStore.TPageNumber) => void;
    screenWidth: number;
    imgNumber: number;
    vocabSounds: HTMLAudioElement[];
};
function Page3(props: TPage3Props) {
    const { vocabList, screenWidth, imgNumber, vocabSounds, changePage } = props;
    const percentage = Number(localStorage.getItem(`kanji-quiz-percentage-${vocabList[0].genreId}`));
    const incorrectIds = JSON.parse(localStorage.getItem(`kanji-quiz-incorrectIds-${vocabList[0].genreId}`));

    let comment: string;
    if (percentage === 100) {
        comment = "Perfect!";
    } else if (percentage > 80) {
        comment = "Very good!";
    } else if (percentage > 60) {
        comment = "Good!";
    } else if (percentage > 30) {
        comment = "Nice try!";
    } else {
        comment = "I'm sorry!";
    }

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };

    return (
        <>
            <p style={{ fontSize: "x-large", fontWeight: "bold" }}>Your score is:</p>
            <p style={{ fontSize: "xx-large", fontWeight: "bold" }}>{percentage} %</p>
            {incorrectIds && incorrectIds.length > 0 &&
                <>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={(imgNumber - 1) || 3}
                        comment={comment + " You should remember the Kanji below!"}
                    />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'papayawhip' }}>
                                    <TableCell style={tableHeadStyle} align="center">Kanji</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Meaning</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Sound</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    vocabList.filter(v => incorrectIds.includes(v.vocabId)).map((v: vocab) => (
                                        <TableRow key={v.vocabId}>
                                            <TableCell style={tableElementStyle} align="center">{v.kanji}</TableCell>
                                            <TableCell style={tableElementStyle} align="center">{v.hiragana}</TableCell>
                                            <TableCell style={tableElementStyle} align="center">{v.english}</TableCell>
                                            <TableCell style={tableElementStyle} align="center">
                                                <img
                                                    alt="kanji speaker"
                                                    src={consts.BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                                                    style={{ width: "60%", maxWidth: 30 }}
                                                    onClick={() => { vocabSounds[v.vocabId] && vocabSounds[v.vocabId].play(); }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            <br />
            <button
                onClick={() => { changePage(2) }}
                className="btn btn-primary btn-lg btn-block"
            >
                Retry
            </button>
        </>
    );
}



export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(VocabQuiz);