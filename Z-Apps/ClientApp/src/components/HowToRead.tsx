import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import * as storiesStore from '../store/StoriesStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './parts/PleaseScrollDown.css';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import * as consts from './common/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CharacterComment from './parts/VocabQuiz/CharacterComment';


type Props = storiesStore.StoriesState & storiesStore.IActionCreators & {
    location: { pathname: string };
};
type State = {
    word: string;
    furigana: string;
    romaji: string;
    screenWidth: number;
    screenHeight: number;
    imgNumber: number;
};

class HowToRead extends React.Component<Props, State> {
    refSentences: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);

        const { params } = props.match;
        const word = params.word?.toString()?.split("#")[0] || "";

        this.state = {
            word,
            furigana: "",
            romaji: "",
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            imgNumber: this.getImgNumber(word?.length),
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
    }
    
    componentDidMount() {
        const getData = async () => {

            const url = `api/Wiki/GetEnglishWord?word=${this.state.word}`;
            const response = await fetch(url);
            const xml = await response.text();

            if (!xml) {
                window.location.href = `/not-found?p=${window.location.pathname}`;
                return;
            }

            const parser = new DOMParser();
            const word = parser.parseFromString(xml, "text/xml");

            const getInnerHTML = (type: string) =>
                Array.prototype.map.call(word?.getElementsByTagName(type), (w: HTMLElement) => w?.innerHTML)?.join(" ");

            const furigana = getInnerHTML("Furigana");
            const romaji = getInnerHTML("Roman");

            this.setState({ furigana, romaji });
        }
        getData();

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    componentDidUpdate(preciousProps) {
        if (preciousProps.location !== this.props.location) {
            const word = this.props.location.pathname.split("/").filter(a => a).pop();
            this.setState({
                word: word,
            });
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

    getImgNumber = (num: number = 0) => {
        const today = new Date();
        const todayNumber = (today.getMonth() + today.getDate() + num);
        const mod = todayNumber % 27;
        if (mod > 13) return 1;
        if (mod > 5) return 2;
        return 3;
    }

    render() {
        const { screenWidth, furigana, romaji, word, imgNumber } = this.state;

        const title = `How to read ${word} in the alphabet and hiragana`;

        const desc = word && `How to read the Japanese word, ${word}, in the alphabet(Romaji) and Hiragana!`;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };

        return (
            <div className="center">
                <Head
                    title={title}
                    desc={desc}
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
                            <Link to="/how-to-read-japanese" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    {"How to read Japanese"}
                                </span>
                                <meta itemProp="position" content="2" />
                            </Link>
                        </span>
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                {title}
                            </span>
                            <meta itemProp="position" content="3" />
                        </span>
                    </div>
                    <h1 style={{
                        margin: "25px",
                        lineHeight: screenWidth > 500 ? "45px" : "35px",
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'papayawhip' }}>
                                    <TableCell style={tableHeadStyle} align="center">Kanji</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Alphabet (Romaji)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={tableElementStyle} align="center">{word}</TableCell>
                                    <TableCell style={tableElementStyle} align="center">{furigana || <CircularProgress key="circle" size="30px" />}</TableCell>
                                    <TableCell style={tableElementStyle} align="center">{romaji || <CircularProgress key="circle" size="30px" />}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment={
                            <p>
                                How to read <span
                                    style={{
                                        fontWeight: "bold",
                                        display: "inline-block"
                                    }}
                                >{word}</span> is <span
                                    style={{
                                        fontWeight: "bold",
                                        display: "inline-block"
                                    }}
                                >"{furigana}"</span> in Hiragana, and <span
                                    style={{
                                        fontWeight: "bold",
                                        display: "inline-block"
                                    }}
                                >"{romaji}"</span> in the alphabet(Romaji)!
                                </p>
                        }
                    />
                    <p></p>
                    <br />
                    <hr />
                    <Link to="/vocabulary-list">
                        <Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                            <CardTitle>Japanese Vocabulary List</CardTitle>
                            <CardText>Basic Japanese Vocabulary List!<br />Try to memorize all the vocabulary by using the quizzes!</CardText>
                            <Button color="secondary">Try!</Button>
                        </Card>
                    </Link>
                    <hr />
                    <FB />
                    <br />
                </div>
            </div>
        );
    }
};

export default connect(
    (state: TReducers) => state.stories,
    dispatch => bindActionCreators(storiesStore.actionCreators as any, dispatch)
)(HowToRead);