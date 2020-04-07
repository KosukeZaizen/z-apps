import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import * as vocabStore from '../store/VocabQuizStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './parts/PleaseScrollDown.css';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';
import * as consts from './common/consts';
import { vocabGenre, vocab } from '../types/vocab';

import { makeStyles } from '@material-ui/core/styles';
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
};

class Stories extends React.Component<Props, State> {
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

    render() {
        const { vocabGenre: vocabGenre } = this.props;
        const vocabList: vocab[] = this.props.vocabList.sort((a, b) => a.order - b.order);
        const { screenWidth } = this.state;

        const genreName: string = (vocabGenre && vocabGenre.genreName) || this.state.genreName || "";
        const titleToShowUpper: string = genreName.split("_").map(t => t && (t[0].toUpperCase() + t.substr(1))).join(" ");
        const titleToShowLower: string = genreName.split("_").join(" ");

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
                    title={"Japanese Vocabulary Quiz - " + titleToShowUpper}
                    desc={"Free app to remember Japanese " + titleToShowLower + "vocabulary!"}
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    Home
                            </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link to="/vocabulary-quiz" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    Japanese Vocabulary Quiz
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
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{backgroundColor:'papayawhip'}}>
                                    <TableCell style={tableHeadStyle} align="center">Hiragana</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Meaning</TableCell>
                                    <TableCell style={tableHeadStyle} align="center">Sound</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vocabList.map((v: vocab) => (
                                    <TableRow key={v.vocabId}>
                                        <TableCell style={tableElementStyle} align="center">{v.hiragana}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">{v.english}</TableCell>
                                        <TableCell style={tableElementStyle} align="center"></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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


export default connect(
    (state: TReducers) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators as any, dispatch)
)(Stories);