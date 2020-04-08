import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import * as vocabStore from '../store/VocabQuizStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import '../css/VocabQuiz.css';
import './parts/PleaseScrollDown.css';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';
import * as consts from './common/consts';
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
    refSentences: React.RefObject<HTMLDivElement>;

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

        this.refSentences = React.createRef();
    }

    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
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
        if (mod > 5) return 2;
        return 3;
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
                pageData = <div>hello!</div>;
                break;
            default:
                pageData = <Page1
                    vocabList={vocabList}
                    screenWidth={screenWidth}
                    imgNumber={imgNumber}
                    changePage={changePage}
                />;
        }

        return (
            <div className="center">
                <Head
                    title={"Japanese Vocabulary Quiz - " + titleToShowUpper}
                    desc={"Free app to remember Japanese " + titleToShowLower + "vocabulary!"}
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
                            <Link to="/vocabulary-quiz" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    {"Japanese Vocabulary Quiz"}
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
                    <h1 style={{
                        margin: "25px",
                        lineHeight: screenWidth > 500 ? "45px" : "40px",
                    }}>
                        <b>{"Japanese Vocabulary Quiz - " + titleToShowUpper}</b>
                    </h1>
                    <br />
                    {pageData}
                    <br />
                    <FB />
                    <br />
                    <GoogleAd />
                    {/* <PleaseScrollDown
                        criteriaRef={this.ref}
                        screenWidth={screenWidth}
                    /> */}
                </div>
            </div>
        );
    }
};

function Page1(props) {
    const { vocabList, screenWidth, imgNumber, changePage } = props;

    const tableHeadStyle: React.CSSProperties = {
        fontSize: "medium",
        fontWeight: "bold",
    };
    const tableElementStyle: React.CSSProperties = {
        fontSize: "medium",
    };

    return (
        <>
            <CharacterComment
                screenWidth={screenWidth}
                imgNumber={imgNumber}
                comment="Before starting the vocabulary quiz, please remember the vocabularies list below!"
            />
            <div style={{
                textAlign: "right"
            }}>
                <button
                    onClick={() => changePage(2)}
                    className="btn btn-primary"
                    style={{ marginBottom: 10, marginTop: 10 }}
                >
                    {"Start the vocabulary quiz anyway >>"}
                </button>
            </div>
            <br />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'papayawhip' }}>
                            <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                            <TableCell style={tableHeadStyle} align="center">Meaning</TableCell>
                            <TableCell style={tableHeadStyle} align="center">Sound</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            vocabList.length > 0 ?
                                vocabList.map((v: vocab) => (
                                    <TableRow key={v.vocabId}>
                                        <TableCell style={tableElementStyle} align="center">{v.hiragana}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">{v.english}</TableCell>
                                        <TableCell style={tableElementStyle} align="center"></TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell style={tableElementStyle}></TableCell>
                                    <TableCell style={tableElementStyle} align="center"><CircularProgress key="circle" size="20%" /></TableCell>
                                    <TableCell style={tableElementStyle}></TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <button
                id="btn10"
                onClick={() => changePage(2)}
                className="btn btn-primary btn-lg btn-block"
            >
                Start the Vocabulary Quiz
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

function CharacterComment(props) {
    const { imgNumber, screenWidth, comment } = props;
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 450,
        }}>
            <div>
                <img
                    src={`${consts.BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="ninja"
                    style={{
                        width: screenWidth * 2 / 10,
                        maxWidth: 120,
                        height: "auto"
                    }}
                />
            </div>
            <div className="chatting" style={{ verticalAlign: "middle", }}>
                <div className="says" style={{
                    width: screenWidth * 7 / 10,
                    maxWidth: 420,
                }}>
                    <p>{comment}</p>
                </div>
            </div>
        </div>
    );
}

export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(VocabQuiz);