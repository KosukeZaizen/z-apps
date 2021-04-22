import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardTitle from "reactstrap/lib/CardTitle";
import { bindActionCreators } from "redux";
import * as consts from "../../common/consts";
import { sendClientOpeLog, shuffle } from "../../common/functions";
import { ApplicationState } from "../../store/configureStore";
import * as vocabStore from "../../store/VocabQuizStore";
import { sound, vocab, vocabGenre } from "../../types/vocab";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import Head from "../parts/Helmet";
import PleaseScrollDown from "../parts/PleaseScrollDown";
import "../parts/PleaseScrollDown.css";
import { FBShareBtn, TwitterShareBtn } from "../parts/SnsShareButton";
import AllKanjiList from "../parts/VocabQuiz/AllKanjiList";
import AllVocabList from "../parts/VocabQuiz/AllVocabList";

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
    } & { match: { params: { [key: string]: string } } };
type State = {
    genreName: string;
    screenWidth: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabQuiz extends React.Component<Props, State> {
    correctSounds = [new Audio(), new Audio()];
    ref: React.RefObject<HTMLHeadingElement>;

    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const genreName = params.genreName.toString().split("#")[0];

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
            this.props.loadAllGenres();
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
        if (mod > 13) return 3;
        if (mod > 5) return 1;
        return 2;
    };

    render() {
        const {
            vocabGenre,
            currentPage,
            changePage,
            allGenres,
            vocabList,
            vocabSounds,
        } = this.props;
        const { screenWidth, imgNumber } = this.state;

        const genreName: string =
            (vocabGenre && vocabGenre.genreName) || this.state.genreName || "";
        const titleToShowUpper: string = genreName
            .split("_")
            .map(t => t && t[0].toUpperCase() + t.substr(1))
            .join(" ");
        const titleToShowLower: string = genreName.split("_").join(" ");

        let pageData: JSX.Element;
        switch (currentPage) {
            case 2:
                pageData = (
                    <Page2
                        vocabList={vocabList}
                        changePage={changePage}
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        correctSounds={this.correctSounds}
                        vocabSounds={vocabSounds?.map(a => a.audio)}
                    />
                );
                break;
            case 3:
                pageData = (
                    <Page3
                        vocabList={vocabList}
                        changePage={changePage}
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        vocabSounds={vocabSounds?.map(a => a.audio)}
                        vocabGenre={vocabGenre}
                        titleToShowUpper={titleToShowUpper}
                    />
                );
                break;
            default:
                pageData = (
                    <Page1
                        vocabList={vocabList}
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        changePage={changePage}
                        vocabSounds={vocabSounds}
                        criteriaRef={this.ref}
                    />
                );
        }

        return (
            <div className="center">
                <Head
                    title={"Japanese Kanji Quiz - " + titleToShowUpper}
                    desc={
                        "Free web app to remember Kanji for " +
                        titleToShowLower +
                        "! Try to get a perfect score on all the quizzes!"
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
                            <Link
                                to="/kanji-quiz"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">{"Kanji Quiz"}</span>
                                <meta itemProp="position" content="2" />
                            </Link>
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
                        className="whiteShadow"
                    >
                        <b>{"Japanese Kanji Quiz - " + titleToShowUpper}</b>
                    </h1>
                    <br />
                    {vocabList && vocabList.length > 0 ? (
                        pageData
                    ) : (
                        <ShurikenProgress key="circle" size="20%" />
                    )}
                    <hr />
                    <h2 style={{ fontWeight: "bold", margin: 20 }}>
                        Other Kanji Genres
                    </h2>
                    <AllKanjiList
                        allGenres={allGenres}
                        excludeGenreId={vocabGenre && vocabGenre.genreId}
                    />
                    <hr />
                    <h2 style={{ fontWeight: "bold", margin: 20 }}>
                        Vocabulary Quiz
                    </h2>
                    <AllVocabList allGenres={allGenres} />
                    <br />
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment="Try to get a perfect score on all the quizzes!"
                    />
                    <hr />
                    <Link to="/vocabulary-list">
                        <button className="btn btn-primary btn-lg btn-block">
                            {"Check All Vocabulary Lists"}
                        </button>
                    </Link>
                    <hr />
                    <FolktaleMenu screenWidth={screenWidth} />
                    <br />
                    <FB />
                    <PleaseScrollDown
                        criteriaRef={this.ref}
                        screenWidth={screenWidth}
                        targetId="h1title"
                    />
                    <SeasonAnimation
                        frequencySec={2}
                        screenWidth={screenWidth}
                    />
                </div>
            </div>
        );
    }
}

type TPage1Props = {
    vocabList: vocab[];
    screenWidth: number;
    imgNumber: number;
    changePage: (nextPage: vocabStore.TPageNumber) => void;
    vocabSounds: sound[];
    criteriaRef: React.RefObject<HTMLHeadingElement>;
};
function Page1(props: TPage1Props) {
    const {
        vocabList,
        screenWidth,
        imgNumber,
        changePage,
        vocabSounds,
        criteriaRef,
    } = props;

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };

    const savedItem = localStorage.getItem(
        `kanji-quiz-incorrectIds-${vocabList[0].genreId}`
    );
    const incorrectIds: number[] = (savedItem && JSON.parse(savedItem)) || [];

    return (
        <>
            <CharacterComment
                screenWidth={screenWidth}
                imgNumber={imgNumber}
                comment="Before starting the Kanji quiz, please remember the Kanji list below!"
                commentStyle={{ textAlign: "left", padding: "15px 20px" }}
            />
            <div
                style={{
                    textAlign: "right",
                }}
            >
                <button
                    onClick={() => {
                        changePage(2);
                        setTimeout(() => {
                            sendClientOpeLog("start quiz");
                        }, 1000);
                    }}
                    className="btn btn-primary"
                    style={{ marginBottom: 25, marginTop: 20 }}
                >
                    {"Start the Kanji quiz anyway >>"}
                </button>
            </div>
            <TableContainer component={Paper} ref={criteriaRef}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "papayawhip" }}>
                            <TableCell style={tableHeadStyle} align="center">
                                Kanji
                            </TableCell>
                            <TableCell style={tableHeadStyle} align="center">
                                Hiragana
                            </TableCell>
                            <TableCell style={tableHeadStyle} align="center">
                                Meaning
                            </TableCell>
                            <TableCell style={tableHeadStyle} align="center">
                                Sound
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vocabList.map((v: vocab) => (
                            <TableRow key={v.vocabId}>
                                <TableCell
                                    style={
                                        incorrectIds.includes(v.vocabId)
                                            ? {
                                                  ...tableElementStyle,
                                                  color: "red",
                                                  fontWeight: "bold",
                                              }
                                            : tableElementStyle
                                    }
                                    align="center"
                                >
                                    {v.kanji}
                                </TableCell>
                                <TableCell
                                    style={
                                        incorrectIds.includes(v.vocabId)
                                            ? {
                                                  ...tableElementStyle,
                                                  color: "red",
                                                  fontWeight: "bold",
                                              }
                                            : tableElementStyle
                                    }
                                    align="center"
                                >
                                    {v.hiragana}
                                </TableCell>
                                <TableCell
                                    style={
                                        incorrectIds.includes(v.vocabId)
                                            ? {
                                                  ...tableElementStyle,
                                                  color: "red",
                                                  fontWeight: "bold",
                                              }
                                            : tableElementStyle
                                    }
                                    align="center"
                                >
                                    {v.english}
                                </TableCell>
                                <TableCell
                                    style={tableElementStyle}
                                    align="center"
                                >
                                    <Speaker
                                        vocabSound={vocabSounds[v.vocabId]}
                                        vocabId={v.vocabId}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <button
                onClick={() => {
                    changePage(2);
                    setTimeout(() => {
                        sendClientOpeLog("start quiz");
                    }, 1000);
                }}
                className="btn btn-primary btn-lg btn-block"
            >
                Start the Kanji Quiz
            </button>
            <br />
            <CharacterComment
                screenWidth={screenWidth}
                imgNumber={imgNumber - 1 || 3}
                comment={imgNumber === 1 ? "Try your best!" : "Good luck!"}
            />
        </>
    );
}

interface SpeakerProps {
    vocabSound: sound;
    vocabId: number;
}
class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);
        this.state = {
            showImg: props.vocabSound.playable,
        };
        this.didUnmount = false;
    }

    componentDidMount() {
        setTimeout(this.loadSound);
    }

    componentDidUpdate(previous: SpeakerProps) {
        if (previous.vocabSound.audio !== this.props.vocabSound.audio) {
            this.setState({ showImg: false });
            setTimeout(this.loadSound);
        }
    }

    loadSound = () => {
        const { vocabSound } = this.props;
        vocabSound.audio.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
            vocabSound.playable = true;
        };
        vocabSound.audio.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this.props;
        return showImg ? (
            <img
                alt="kanji speaker"
                src={consts.BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30, cursor: "pointer" }}
                onClick={() => {
                    void vocabSound?.audio?.play();
                }}
            />
        ) : (
            <ShurikenProgress
                key="circle"
                size="100%"
                style={{ width: "60%", maxWidth: 30 }}
            />
        );
    }
}

interface Page2Props {
    vocabList: vocab[];
    changePage: (nextPage: vocabStore.TPageNumber) => void;
    screenWidth: number;
    imgNumber: number;
    correctSounds: HTMLAudioElement[];
    vocabSounds: HTMLAudioElement[];
}
class Page2 extends React.Component<
    Page2Props,
    {
        correctIds: number[];
        incorrectIds: number[];
        vocabToShow?: vocab;
        mode: number;
        buttons: JSX.Element[];
        vocabToBeAsked: vocab;
    }
> {
    constructor(props: Page2Props) {
        super(props);

        const { vocabList } = props;
        const firstButtonsAndVocabs = this.makeButtons([], [], vocabList);

        this.state = {
            correctIds: [],
            incorrectIds: [],
            vocabToShow: undefined,
            mode: 0, //0:quiz, 1:correct/2:incorrect
            buttons: firstButtonsAndVocabs.resultButtons,
            vocabToBeAsked: firstButtonsAndVocabs.resultVocabToBeAsked,
        };
    }

    makeButtons = (
        correctIds: number[],
        incorrectIds: number[],
        vocabsForQuiz: vocab[]
    ) => {
        const { vocabList, correctSounds, vocabSounds } = this.props;

        const getRandItem = (vs: vocab[]) =>
            vs[Math.floor(Math.random() * vs.length)];
        const resultVocabToBeAsked = getRandItem(vocabsForQuiz);
        let survivedVocabs = vocabList.filter(
            v => v && v.vocabId !== resultVocabToBeAsked.vocabId
        );

        const vocabsOfChoice: vocab[] = [];
        const resultButtons = [
            <button
                key={3}
                onClick={() => {
                    try {
                        const sound = correctSounds[0];
                        sound.onended = e => {
                            vocabSounds[resultVocabToBeAsked.vocabId] &&
                                vocabSounds[
                                    resultVocabToBeAsked.vocabId
                                ].play();
                            sound.onended = null;
                        };
                        sound.play();

                        this.setState({
                            vocabToShow: resultVocabToBeAsked,
                            correctIds: [
                                ...correctIds,
                                resultVocabToBeAsked.vocabId,
                            ],
                            mode: 1,
                        });
                        if (vocabSounds[resultVocabToBeAsked.vocabId]) {
                            vocabSounds[resultVocabToBeAsked.vocabId].pause();
                            vocabSounds[
                                resultVocabToBeAsked.vocabId
                            ].currentTime = 0;
                        }
                    } catch (e) {
                        //
                    }
                }}
                className="btn btn-primary btn-lg btn-block"
                style={{ maxWidth: 300 }}
            >
                {resultVocabToBeAsked.hiragana}
            </button>,
        ];

        for (let i = 0; i < 3; i = (i + 1) | 0) {
            const vocabToPush = getRandItem(survivedVocabs);
            vocabsOfChoice.push(vocabToPush);

            resultButtons.push(
                <button
                    key={i}
                    onClick={() => {
                        try {
                            const sound = correctSounds[1];
                            sound.onended = e => {
                                vocabSounds[resultVocabToBeAsked.vocabId] &&
                                    vocabSounds[
                                        resultVocabToBeAsked.vocabId
                                    ].play();
                                sound.onended = null;
                            };
                            sound.play();

                            this.setState({
                                vocabToShow: resultVocabToBeAsked,
                                incorrectIds: [
                                    ...incorrectIds,
                                    resultVocabToBeAsked.vocabId,
                                ],
                                mode: 2,
                            });
                            if (vocabSounds[resultVocabToBeAsked.vocabId]) {
                                vocabSounds[
                                    resultVocabToBeAsked.vocabId
                                ].pause();
                                vocabSounds[
                                    resultVocabToBeAsked.vocabId
                                ].currentTime = 0;
                            }
                        } catch (e) {
                            //
                        }
                    }}
                    className="btn btn-primary btn-lg btn-block"
                    style={{ maxWidth: 300 }}
                >
                    {vocabToPush.hiragana}
                </button>
            );

            survivedVocabs = survivedVocabs.filter(
                v => !vocabsOfChoice.includes(v)
            );
        }
        return { resultButtons: shuffle(resultButtons), resultVocabToBeAsked };
    };

    render() {
        setTimeout(() => {
            try {
                (document.activeElement as HTMLElement).blur();
            } catch (e) {}
        }, 300);

        const {
            vocabList,
            screenWidth,
            imgNumber,
            vocabSounds,
            changePage,
            correctSounds,
        } = this.props;
        const {
            correctIds,
            incorrectIds,
            vocabToShow,
            mode,
            buttons,
            vocabToBeAsked,
        } = this.state;

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
            content = (
                <div>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={((imgNumber - 1 || 3) - 1) | 3}
                        comment="Choose the Hiragana for the Kanji!"
                    />
                    <p style={{ fontSize: "xx-large", fontWeight: "bold" }}>
                        {vocabToBeAsked.kanji}
                    </p>
                    {buttons}
                    <br />
                    <p
                        style={{ color: "#007bff", cursor: "pointer" }}
                        onClick={() => {
                            const sure = window.confirm(
                                "Your progress will not be saved.\nAre you sure you want to return?"
                            );
                            if (sure) {
                                changePage(1);
                            }
                        }}
                    >
                        {"Return to Kanji List >>"}
                    </p>
                    <br />
                </div>
            );
        } else {
            //Correct,Incorrect
            const rand = Math.floor(Math.random() * 3);
            content = (
                <div>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={((imgNumber - 1 || 3) - 1) | 3}
                        comment={
                            mode === 1
                                ? ["Good!", "Nice!", "Excellent!"][rand]
                                : "Oops!"
                        }
                    />
                    {mode === 1 ? (
                        <p
                            style={{
                                fontSize: "xx-large",
                                fontWeight: "bold",
                                color: "green",
                            }}
                        >
                            {"Correct!"}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: "xx-large",
                                fontWeight: "bold",
                                color: "red",
                            }}
                        >
                            {"Incorrect!"}
                        </p>
                    )}
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow
                                    style={{ backgroundColor: "papayawhip" }}
                                >
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Kanji
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Hiragana
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Meaning
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        style={tableElementStyle}
                                        align="center"
                                    >
                                        {vocabToShow?.kanji}
                                    </TableCell>
                                    <TableCell
                                        style={tableElementStyle}
                                        align="center"
                                    >
                                        {vocabToShow?.hiragana}
                                    </TableCell>
                                    <TableCell
                                        style={tableElementStyle}
                                        align="center"
                                    >
                                        {vocabToShow?.english}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <button
                        onClick={() => {
                            const finishedIds: number[] = [
                                ...correctIds,
                                ...incorrectIds,
                            ];
                            const vocabsForQuiz = vocabList.filter(
                                v =>
                                    !(
                                        finishedIds &&
                                        finishedIds.includes(v.vocabId)
                                    )
                            );

                            correctSounds.forEach(s => {
                                s.pause();
                                s.currentTime = 0;
                            });
                            const stopSound = (v?: vocab) => {
                                if (v && vocabSounds[v.vocabId]) {
                                    vocabSounds[v.vocabId].pause();
                                    vocabSounds[v.vocabId].currentTime = 0;
                                }
                            };

                            if (vocabsForQuiz.length <= 0) {
                                const cr = correctIds.length;
                                const inc = incorrectIds.length;
                                const percentage = Math.floor(
                                    (100 * cr) / (cr + inc)
                                );
                                localStorage.setItem(
                                    `kanji-quiz-percentage-${vocabList[0].genreId}`,
                                    JSON.stringify(percentage)
                                );
                                localStorage.setItem(
                                    `kanji-quiz-incorrectIds-${vocabList[0].genreId}`,
                                    JSON.stringify(incorrectIds)
                                );

                                stopSound(vocabToBeAsked);
                                changePage(3);
                                return;
                            }

                            stopSound(vocabToShow);

                            const {
                                resultButtons,
                                resultVocabToBeAsked,
                            } = this.makeButtons(
                                correctIds,
                                incorrectIds,
                                vocabsForQuiz
                            );

                            this.setState({
                                mode: 0,
                                buttons: resultButtons,
                                vocabToBeAsked: resultVocabToBeAsked,
                            });
                        }}
                        className="btn btn-dark btn-lg btn-block"
                    >
                        {"Next"}
                    </button>
                    <br />
                </div>
            );
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
    vocabGenre: vocabGenre;
    titleToShowUpper: string;
};
function Page3(props: TPage3Props) {
    const {
        vocabList,
        screenWidth,
        imgNumber,
        vocabSounds,
        changePage,
        vocabGenre,
        titleToShowUpper,
    } = props;
    const percentage = Number(
        localStorage.getItem(`kanji-quiz-percentage-${vocabGenre.genreId}`)
    );
    const savedItem = localStorage.getItem(
        `kanji-quiz-incorrectIds-${vocabGenre.genreId}`
    );
    const incorrectIds = savedItem && JSON.parse(savedItem);

    const [didSendOpeLog, setDidSendOpeLog] = useState(false);
    setTimeout(() => {
        if (!window.location.href.includes(vocabGenre.genreName)) return;
        didSendOpeLog ||
            sendClientOpeLog("finish kanji quiz", `percentage: ${percentage}%`);
        setDidSendOpeLog(true);
    }, 1000);

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
    const shareButtonStyle: React.CSSProperties = {
        width: "200px",
        margin: "5px",
    };

    return (
        <>
            <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
                Your score is:
            </p>
            <p style={{ fontSize: "xx-large", fontWeight: "bold" }}>
                {percentage} %
            </p>
            <FBShareBtn
                urlToShare={
                    "https://www.lingual-ninja.com/vocabulary-quiz/" +
                    vocabGenre.genreName
                }
                style={shareButtonStyle}
            />
            <br />
            <TwitterShareBtn
                urlToShare={
                    "https://www.lingual-ninja.com/vocabulary-quiz/" +
                    vocabGenre.genreName
                }
                textToShare={`I got ${percentage}％ on the Japanese Kanji Quiz for ${titleToShowUpper}!`}
                style={shareButtonStyle}
            />
            <br />
            <br />
            {incorrectIds && incorrectIds.length > 0 && (
                <>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber - 1 || 3}
                        comment={
                            <p>
                                {comment}
                                <br />
                                You should remember the{" "}
                                <span
                                    style={{ fontWeight: "bold", color: "red" }}
                                >
                                    red Kanji
                                </span>{" "}
                                below!
                            </p>
                        }
                    />
                    <br />
                    <button
                        onClick={() => {
                            changePage(2);
                        }}
                        className="btn btn-primary btn-block"
                    >
                        {"Retry"}
                    </button>
                    <br />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow
                                    style={{ backgroundColor: "papayawhip" }}
                                >
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Kanji
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Hiragana
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Meaning
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Sound
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vocabList
                                    .sort((v1, v2) =>
                                        incorrectIds.includes(v1.vocabId) ===
                                        incorrectIds.includes(v2.vocabId)
                                            ? 0
                                            : incorrectIds.includes(v1.vocabId)
                                            ? -1
                                            : 1
                                    )
                                    .map((v: vocab) => (
                                        <TableRow key={v.vocabId}>
                                            <TableCell
                                                style={
                                                    incorrectIds.includes(
                                                        v.vocabId
                                                    )
                                                        ? {
                                                              ...tableElementStyle,
                                                              color: "red",
                                                              fontWeight:
                                                                  "bold",
                                                          }
                                                        : tableElementStyle
                                                }
                                                align="center"
                                            >
                                                {v.kanji}
                                            </TableCell>
                                            <TableCell
                                                style={
                                                    incorrectIds.includes(
                                                        v.vocabId
                                                    )
                                                        ? {
                                                              ...tableElementStyle,
                                                              color: "red",
                                                              fontWeight:
                                                                  "bold",
                                                          }
                                                        : tableElementStyle
                                                }
                                                align="center"
                                            >
                                                {v.hiragana}
                                            </TableCell>
                                            <TableCell
                                                style={
                                                    incorrectIds.includes(
                                                        v.vocabId
                                                    )
                                                        ? {
                                                              ...tableElementStyle,
                                                              color: "red",
                                                              fontWeight:
                                                                  "bold",
                                                          }
                                                        : tableElementStyle
                                                }
                                                align="center"
                                            >
                                                {v.english}
                                            </TableCell>
                                            <TableCell
                                                style={tableElementStyle}
                                                align="center"
                                            >
                                                <img
                                                    alt="kanji speaker"
                                                    src={
                                                        consts.BLOB_URL +
                                                        "/vocabulary-quiz/img/speaker.png"
                                                    }
                                                    style={{
                                                        width: "60%",
                                                        maxWidth: 30,
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        vocabSounds[
                                                            v.vocabId
                                                        ] &&
                                                            vocabSounds[
                                                                v.vocabId
                                                            ].play();
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
            <br />
            <button
                onClick={() => {
                    changePage(2);
                }}
                className="btn btn-primary btn-lg btn-block"
            >
                {"Retry"}
            </button>
            <hr />
            <Link to={`/vocabulary-quiz/${vocabGenre.genreName}`}>
                <Card
                    body
                    style={{
                        backgroundColor: "#333",
                        borderColor: "#333",
                        color: "white",
                    }}
                >
                    <CardTitle>
                        Learn the meaning of the vocabulary for{" "}
                        {titleToShowUpper}
                    </CardTitle>
                    <Button color="secondary">Try Vocab Quiz</Button>
                </Card>
            </Link>
        </>
    );
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabQuiz);
