import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import { bindActionCreators } from "redux";
import * as consts from "../../common/consts";
import { ApplicationState } from "../../store/configureStore";
import * as vocabStore from "../../store/VocabQuizStore";
import { vocab, vocabGenre } from "../../types/vocab";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import { AnchorLink, HashScroll } from "../parts/HashScroll";
import Head from "../parts/Helmet";
import PleaseScrollDown from "../parts/PleaseScrollDown";
import "../parts/PleaseScrollDown.css";
import { YouTubeVideo } from "../parts/YouTubeVideo";

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: Location;
    };
type State = {
    screenWidth: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabList extends React.Component<Props, State> {
    refForScroll: React.RefObject<HTMLHeadingElement>;
    refForReturnToIndex: React.RefObject<HTMLHeadingElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            pleaseScrollDown: false,
            imgNumber: this.getImgNumber(),
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

        this.refForScroll = React.createRef();
        this.refForReturnToIndex = React.createRef();
    }

    componentDidMount() {
        this.props.loadAllGenres();
        this.props.loadAllVocabs();

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

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate();
        const mod = todayNumber % 27;
        if (mod > 13) return 1;
        if (mod > 5) return 3;
        return 2;
    };

    render() {
        const { allVocabs, allGenres, location } = this.props;
        const { screenWidth, imgNumber } = this.state;
        return (
            <div className="center">
                <Head
                    title="Japanese Vocabulary List"
                    desc={
                        "Free web app to learn Japanese vocabulary! Try to memorize all the vocabulary using the quizzes!"
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
                                {"Japanese Vocabulary List"}
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
                        className="whiteShadow"
                    >
                        {"Japanese Vocabulary List"}
                    </h1>
                    <br />
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment={
                            <div
                                style={{
                                    textAlign: "left",
                                    padding: "0 8px",
                                }}
                            >
                                Free web app to learn Japanese vocabulary!
                                <br />
                                Try to get a perfect score on all the quizzes!
                            </div>
                        }
                    />
                    <span id="indexOfVocabLists"></span>
                    <AllVocabList
                        allVocabs={allVocabs}
                        allGenres={allGenres}
                        criteriaRef={this.refForScroll}
                        refForReturnToIndex={this.refForReturnToIndex}
                        screenWidth={screenWidth}
                    />
                    <hr />
                    <FolktaleMenu screenWidth={screenWidth} />
                    <br />
                    <FB />
                    <PleaseScrollDown
                        criteriaRef={this.refForScroll}
                        screenWidth={screenWidth}
                        targetId="h1title"
                    />
                    <ReturnToIndex
                        screenWidth={screenWidth}
                        refForReturnToIndex={this.refForReturnToIndex}
                    />
                    <SeasonAnimation
                        frequencySec={2}
                        screenWidth={screenWidth}
                    />
                </div>
                <HashScroll
                    location={location}
                    allLoadFinished={
                        allGenres?.length > 0 && allVocabs?.length > 0
                    }
                />
            </div>
        );
    }
}

type TReturnToIndexProps = {
    screenWidth: number;
    refForReturnToIndex: React.RefObject<HTMLElement>;
};
type TReturnToIndexState = {
    showReturnToIndex: boolean;
};
class ReturnToIndex extends React.Component<
    TReturnToIndexProps,
    TReturnToIndexState
> {
    constructor(props: TReturnToIndexProps) {
        super(props);
        this.state = {
            showReturnToIndex: false,
        };

        window.addEventListener("scroll", this.judge);
    }

    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.judge();
            }, i * 1000);
        }
    }

    componentDidUpdate(previousProps: TReturnToIndexProps) {
        if (
            previousProps.refForReturnToIndex?.current !==
            this.props.refForReturnToIndex?.current
        ) {
            this.judge();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.judge);
    }

    judge = () => {
        const { refForReturnToIndex } = this.props;
        const elem = refForReturnToIndex?.current;
        if (!elem) return;

        const height = window.innerHeight;

        const offsetY = elem.getBoundingClientRect().top;
        const t_position = offsetY - height;

        if (t_position >= 0) {
            // 上側の時
            this.setState({
                showReturnToIndex: false,
            });
        } else {
            // 下側の時
            this.setState({
                showReturnToIndex: true,
            });
        }
    };

    render() {
        const { screenWidth } = this.props;
        const { showReturnToIndex } = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: showReturnToIndex ? 99999900 : 0,
                    width: `${screenWidth}px`,
                    height: "50px",
                    opacity: showReturnToIndex ? 1.0 : 0,
                    transition: "all 2s ease",
                    fontSize: "large",
                    backgroundColor: "#EEEEEE",
                }}
            >
                <AnchorLink targetHash={`#indexOfVocabLists`}>
                    {"▲ Return to the index ▲"}
                </AnchorLink>
            </div>
        );
    }
}

type TAllVocabListProps = {
    allGenres: vocabGenre[];
    allVocabs: vocab[];
    excludeGenreId?: number;
    criteriaRef?: React.RefObject<HTMLHeadingElement>;
    refForReturnToIndex?: React.RefObject<HTMLHeadingElement>;
    screenWidth: number;
};
function AllVocabList({
    allGenres: vocabGenres,
    allVocabs,
    criteriaRef,
    refForReturnToIndex,
    screenWidth,
}: TAllVocabListProps) {
    return (
        <>
            <hr />
            <div
                style={{
                    border: "5px double #333333",
                    margin: "10px",
                    padding: "10px",
                }}
                ref={criteriaRef}
            >
                <b>{"Index"}</b>
                <br />
                {vocabGenres && vocabGenres.length > 0 ? (
                    vocabGenres.map((g, idx) => {
                        return (
                            <span key={g.genreId}>
                                <AnchorLink targetHash={`#${g.genreName}`}>
                                    {g.genreName
                                        .split("_")
                                        .map(
                                            t =>
                                                t &&
                                                t[0].toUpperCase() + t.substr(1)
                                        )
                                        .join(" ")}
                                </AnchorLink>
                                {idx !== vocabGenres.length - 1 && " / "}
                            </span>
                        );
                    })
                ) : (
                    <ShurikenProgress key="circle" size="10%" />
                )}
            </div>
            <hr />
            <span ref={refForReturnToIndex}></span>
            {vocabGenres && vocabGenres.length > 0 ? (
                vocabGenres.map(g => {
                    const vocabList = allVocabs?.filter(
                        vl => vl.genreId === g.genreId
                    );
                    return (
                        <EachGenre
                            key={g.genreId}
                            g={g}
                            vocabList={vocabList}
                            screenWidth={screenWidth}
                        />
                    );
                })
            ) : (
                <ShurikenProgress key="circle" size="20%" />
            )}
        </>
    );
}

type TEachGenreProps = {
    g: vocabGenre;
    vocabList: vocab[];
    screenWidth: number;
};
function EachGenre(props: TEachGenreProps) {
    const { g, vocabList, screenWidth } = props;

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };
    const vocabPercentage =
        Number(localStorage.getItem(`vocab-quiz-percentage-${g.genreId}`)) || 0;
    const kanjiPercentage =
        Number(localStorage.getItem(`kanji-quiz-percentage-${g.genreId}`)) || 0;

    return (
        <div>
            <h2
                id={g.genreName}
                style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                {"Japanese Vocabulary List for " +
                    g.genreName
                        .split("_")
                        .map(t => t && t[0].toUpperCase() + t.substr(1))
                        .join(" ")}
            </h2>
            <TableContainer component={Paper}>
                <Table
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                >
                    <TableHead>
                        <TableRow style={{ backgroundColor: "papayawhip" }}>
                            <TableCell style={tableHeadStyle} align="center">
                                Your Vocabulary Score
                            </TableCell>
                            <TableCell style={tableHeadStyle} align="center">
                                Your Kanji Score
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                style={
                                    vocabPercentage === 100
                                        ? {
                                              ...tableElementStyle,
                                              fontWeight: "bold",
                                              color: "green",
                                          }
                                        : tableElementStyle
                                }
                                align="center"
                            >
                                {vocabPercentage + " %"}
                            </TableCell>
                            <TableCell
                                style={
                                    kanjiPercentage === 100
                                        ? {
                                              ...tableElementStyle,
                                              fontWeight: "bold",
                                              color: "green",
                                          }
                                        : tableElementStyle
                                }
                                align="center"
                            >
                                {kanjiPercentage + " %"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableElementStyle} align="center">
                                <Link to={`/vocabulary-quiz/${g.genreName}`}>
                                    <Button color="primary">
                                        {"Try Vocab Quiz"}
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell style={tableElementStyle} align="center">
                                <Link to={`/kanji-quiz/${g.genreName}`}>
                                    <Button color="primary">
                                        {"Try Kanji Quiz"}
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {g.youtube && (
                <LazyLoad>
                    <YouTubeVideo
                        videoId={g.youtube}
                        screenWidth={screenWidth}
                        pageNameForLog={`vocabList ${g.genreName}`}
                        style={{ marginTop: 10, marginBottom: 15 }}
                    />
                </LazyLoad>
            )}
            <VList g={g} vocabList={vocabList} />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableElementStyle} align="center">
                                <Link to={`/vocabulary-quiz/${g.genreName}`}>
                                    <Button color="primary">
                                        {"Try Vocab Quiz"}
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell style={tableElementStyle} align="center">
                                <Link to={`/kanji-quiz/${g.genreName}`}>
                                    <Button color="primary">
                                        {"Try Kanji Quiz"}
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
        </div>
    );
}

type TVListProps = { g: vocabGenre; vocabList: vocab[] };
function VList(props: TVListProps) {
    const { g, vocabList } = props;

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };

    const savedVocabIds = localStorage.getItem(
        `vocab-quiz-incorrectIds-${g.genreId}`
    );
    const vocabIncorrectIds: number[] =
        (savedVocabIds && JSON.parse(savedVocabIds)) || [];
    const savedKanjiIds = localStorage.getItem(
        `kanji-quiz-incorrectIds-${g.genreId}`
    );
    const kanjiIncorrectIds: number[] =
        (savedKanjiIds && JSON.parse(savedKanjiIds)) || [];

    return vocabList && vocabList.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
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
                                    kanjiIncorrectIds.includes(v.vocabId)
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
                                    vocabIncorrectIds.includes(v.vocabId)
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
                            <TableCell style={tableElementStyle} align="center">
                                {v.english}
                            </TableCell>
                            <TableCell style={tableElementStyle} align="center">
                                <LazyLoad>
                                    <Speaker v={v} g={g} />
                                </LazyLoad>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <ShurikenProgress key="circle" size="20%" />
    );
}

interface SpeakerProps {
    v: vocab;
    g: vocabGenre;
}
class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    vocabSound?: HTMLAudioElement;
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);

        this.state = {
            showImg: false,
        };

        this.didUnmount = false;
    }

    componentDidMount = () => {
        this.loadSound();
    };

    loadSound = () => {
        const { v, g } = this.props;

        this.vocabSound = new Audio();
        this.vocabSound.preload = "none";
        this.vocabSound.autoplay = false;
        this.vocabSound.src = `${consts.BLOB_URL}/vocabulary-quiz/audio/${g.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;

        this.vocabSound.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
        };
        this.vocabSound.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this;
        return showImg ? (
            <img
                alt="vocab speaker"
                src={consts.BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30, cursor: "pointer" }}
                onClick={() => {
                    vocabSound && vocabSound.play();
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

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabList);
