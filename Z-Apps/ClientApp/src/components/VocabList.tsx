import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TReducers } from '../store/configureStore';
import * as vocabStore from '../store/VocabQuizStore';
import '../css/VocabQuiz.css';
import './parts/PleaseScrollDown.css';
import CharacterComment from './parts/VocabQuiz/CharacterComment';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';
import { vocabGenre, vocab } from '../types/vocab';
import { reloadAndRedirect_OneTimeReload } from './common/functions';
import * as consts from './common/consts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

type Props = vocabStore.IVocabQuizState & vocabStore.IActionCreators & {
    location: { pathname: string };
};
type State = {
    screenWidth: number;
    screenHeight: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};

class VocabList extends React.Component<Props, State> {
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
        if (mod > 13) return 1;
        if (mod > 5) return 3;
        return 2;
    }

    render() {
        const { loadAllGenres, allGenres } = this.props;
        const { screenWidth, imgNumber } = this.state;
        return (
            <div className="center">
                <Head
                    title="Japanese Vocabulary List"
                    desc={"Free app to learn Japanese vocabulary! Try to memorize all the vocabulary using the quizzes!"}
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
                        ref={this.ref}
                    >
                        {"Japanese Vocabulary List"}
                    </h1>
                    <br />
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment="Try to get a perfect score on all the quizzes!"
                    />
                    <AllVocabList
                        allGenres={allGenres}
                        loadAllGenres={loadAllGenres}
                        criteriaRef={this.ref}
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


class AllVocabList extends React.Component<{
    loadAllGenres: () => void;
    allGenres: vocabGenre[];
    excludeGenreId?: number;
    criteriaRef?: React.RefObject<HTMLHeadingElement>
}, {
    vocabLists: vocab[]
}> {

    constructor(props) {
        super(props);
        this.state = {
            vocabLists: [],
        };
    }

    componentDidMount() {
        this.loadAllVocabs();
    }

    loadAllVocabs = async () => {
        try {
            this.props.loadAllGenres();

            const url2 = `api/VocabQuiz/GetAllVocabs`;
            fetch(url2).then(async (res) => {
                res && this.setState({ vocabLists: await res.json() });
            });
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    }

    render() {
        const { allGenres: vocabGenres } = this.props;

        return (<>
            <hr />
            <div style={{ border: "5px double #333333", margin: "10px", padding: "10px" }}>
                <b>{"Index"}</b><br />
                {
                    vocabGenres && vocabGenres.length > 0 ?
                        <ul style={{ display: "inline" }}>
                            {
                                vocabGenres.map((g, idx) => {
                                    return (
                                        <li key={g.genreId} style={{ display: "inline" }}>
                                            <AnchorLink href={`#${g.genreName}`}>{g.genreName.split("_").map(t => t && (t[0].toUpperCase() + t.substr(1))).join(" ")}</AnchorLink>
                                            {(idx !== (vocabGenres.length - 1)) && " / "}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        :
                        <CircularProgress key="circle" size="10%" />
                }
            </div>
            <hr />
            {vocabGenres && vocabGenres.length > 0 ? vocabGenres.map(g => {
                const vocabList = this.state.vocabLists.filter(vl => vl.genreId === g.genreId);
                return (
                    <EachGenre
                        key={g.genreId}
                        g={g}
                        vocabList={vocabList}
                    />
                );
            })
                :
                <CircularProgress key="circle" size="20%" />}
        </>);
    }
}

class EachGenre extends React.Component<{ g: vocabGenre; vocabList: vocab[] }> {

    render() {
        const { g, vocabList } = this.props;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };
        const vocabPercentage = (Number(localStorage.getItem(`vocab-quiz-percentage-${g.genreId}`)) || 0);
        const kanjiPercentage = (Number(localStorage.getItem(`kanji-quiz-percentage-${g.genreId}`)) || 0);

        return (
            <div>
                <h2 id={g.genreName} style={{ fontWeight: "bold", marginTop: "20px", marginBottom: "20px" }}>{"Japanese Vocabulary List for " + g.genreName.split("_").map(t => t && (t[0].toUpperCase() + t.substr(1))).join(" ")}</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'papayawhip' }}>
                                <TableCell style={tableHeadStyle} align="center">Your Vocabulary Score</TableCell>
                                <TableCell style={tableHeadStyle} align="center">Your Kanji Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={vocabPercentage === 100 ? { ...tableElementStyle, fontWeight: "bold", color: "green" } : tableElementStyle} align="center">{vocabPercentage + " %"}</TableCell>
                                <TableCell style={kanjiPercentage === 100 ? { ...tableElementStyle, fontWeight: "bold", color: "green" } : tableElementStyle} align="center">{kanjiPercentage + " %"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableElementStyle} align="center">
                                    <Link to={`/vocabulary-quiz/${g.genreName}`}>
                                        <button className="btn btn-primary">
                                            {"Try the Vocab Quiz"}
                                        </button>
                                    </Link>
                                </TableCell>
                                <TableCell style={tableElementStyle} align="center">
                                    <Link to={`/kanji-quiz/${g.genreName}`}>
                                        <button className="btn btn-primary">
                                            {"Try the Kanji Quiz"}
                                        </button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <VList
                    g={g}
                    vocabList={vocabList}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableElementStyle} align="center">
                                    <Link to={`/vocabulary-quiz/${g.genreName}`}>
                                        <button className="btn btn-primary">
                                            {"Try the Vocab Quiz"}
                                        </button>
                                    </Link>
                                </TableCell>
                                <TableCell style={tableElementStyle} align="center">
                                    <Link to={`/kanji-quiz/${g.genreName}`}>
                                        <button className="btn btn-primary">
                                            {"Try the Kanji Quiz"}
                                        </button>
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
}

class VList extends React.Component<{ g: vocabGenre; vocabList: vocab[] }, { vocabList: vocab[] }> {
    vocabSounds: HTMLAudioElement[] = [];

    constructor(props) {
        super(props);
    }

    render() {

        const { g, vocabList } = this.props;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };

        const vocabIncorrectIds: number[] = JSON.parse(localStorage.getItem(`vocab-quiz-incorrectIds-${g.genreId}`)) || [];
        const kanjiIncorrectIds: number[] = JSON.parse(localStorage.getItem(`kanji-quiz-incorrectIds-${g.genreId}`)) || [];

        return (
            vocabList && vocabList.length > 0 ?
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
                                vocabList.map((v: vocab) => (
                                    <TableRow key={v.vocabId}>
                                        <TableCell style={kanjiIncorrectIds.includes(v.vocabId) ? { ...tableElementStyle, color: "red", fontWeight: "bold" } : tableElementStyle} align="center">{v.kanji}</TableCell>
                                        <TableCell style={vocabIncorrectIds.includes(v.vocabId) ? { ...tableElementStyle, color: "red", fontWeight: "bold" } : tableElementStyle} align="center">{v.hiragana}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">{v.english}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">
                                            <Speaker
                                                v={v}
                                                g={g}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <CircularProgress key="circle" size="20%" />
        );
    }
}

class Speaker extends React.Component<{
    v: vocab;
    g: vocabGenre;
}, {
    showImg: boolean;
}> {
    vocabSound: HTMLAudioElement;

    constructor(props) {
        super(props);

        const { v, g } = props;

        this.state = {
            showImg: false,
        };

        this.vocabSound = new Audio();
        this.vocabSound.preload = "none";
        this.vocabSound.autoplay = false;
        this.vocabSound.src = `${consts.BLOB_URL}/vocabulary-quiz/audio/${g.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;

        this.vocabSound.oncanplaythrough = () => {
            this.setState({ showImg: true });
        };
        this.vocabSound.load();
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this;
        return showImg ?
            <img
                alt="vocab speaker"
                src={consts.BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30 }}
                onClick={() => { vocabSound && vocabSound.play(); }}
            />
            :
            <CircularProgress key="circle" size="20%" />
    }
}

export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(VocabList);