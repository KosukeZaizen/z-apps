import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/StoriesStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './parts/PleaseScrollDown.css';
import Head from './parts/Helmet';
import GoogleAd from './parts/GoogleAd';
import FB from './parts/FaceBook';
import * as consts from './common/consts';

class Stories extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match;
        const storyName = params.storyName.toString().split("#")[0];
        this.props.loadStory(storyName);

        this.state = {
            storyName: storyName,
            screenWidth: parseInt(window.innerWidth, 10),
            screenHeight: parseInt(window.innerHeight, 10),
            pleaseScrollDown: false,
            showFooterMenu: false,
        };

        this.screenHeight = parseInt(window.innerHeight, 10);

        const saveData = localStorage.getItem("folktales-languages");
        const objSaveData = JSON.parse(saveData);
        if (objSaveData) {
            this.state = {
                ...this.state,
                kanji: objSaveData.kanji == null ? true : objSaveData.kanji,
                hiragana: objSaveData.hiragana == null ? true : objSaveData.hiragana,
                romaji: objSaveData.romaji == null ? false : objSaveData.romaji,
                english: objSaveData.english == null ? true : objSaveData.english,
            };
        } else {
            this.state = {
                ...this.state,
                kanji: true,
                hiragana: true,
                romaji: true,
                english: true,
            };
        }

        let timer = 0;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };

        window.addEventListener('scroll', this.judgeFooter);
        this.refSentences = React.createRef();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.judgeFooter);
    }

    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.judgeFooter();
            }, i * 1000);
        }
    }

    componentDidUpdate(preciousProps) {
        if (preciousProps.location !== this.props.location) {
            const storyName = this.props.location.pathname.split("/").filter(a => a).pop();
            this.setState({
                storyName: storyName,
            });
            this.props.loadStory(storyName);
        }
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: parseInt(window.innerWidth, 10),
            screenHeight: parseInt(window.innerHeight, 10),
        });
    }

    judgeFooter = () => {
        if (!this.refSentences) return;

        const divSentences = this.refSentences.current;
        if (!divSentences) return;

        const { screenHeight } = this.state;
        const offsetY = divSentences.getBoundingClientRect().top;
        const t_height = divSentences.offsetHeight;
        const t_position = offsetY - screenHeight;

        if (t_position >= 0) {
            // sentencesよりも上側の時
            this.setState({
                pleaseScrollDown: true,
                showFooterMenu: false
            });
        } else if (-screenHeight > (t_position + t_height)) {
            // sentencesよりも下側の時
            this.setState({
                pleaseScrollDown: false,
                showFooterMenu: false
            });
        } else {
            // sentencesが画面内
            this.setState({
                pleaseScrollDown: false,
                showFooterMenu: true
            });
        }
    }

    onClickLangBtn = (btnType) => {

        let saveData;
        switch (btnType) {

            case "kanji":
                saveData = {
                    kanji: !this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ kanji: !this.state.kanji, });
                break;

            case "hiragana":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: !this.state.hiragana,
                    romaji: this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ hiragana: !this.state.hiragana, });
                break;

            case "romaji":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: !this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ romaji: !this.state.romaji, });
                break;

            case "english":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: this.state.romaji,
                    english: !this.state.english,
                };
                this.setState({ english: !this.state.english, });
                break;

            default:
        }

        localStorage.setItem("folktales-languages", JSON.stringify(saveData));
    }

    render() {
        const storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const titleOfAbout = storyName.split("--")[0].split("_").join(" ");
        const styleForAboutTitle = {
            fontSize: "large",
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
            fontWeight: "bold",
        };
        const styleForStoryTitle = {
            fontSize: "x-large",
            fontWeight: "bold",
        };
        const { screenWidth, pleaseScrollDown, showFooterMenu } = this.state;
        const { storyDesc, sentences, words, otherStories } = this.props;
        return (
            <center>
                <Head
                    title={title + " Story | Japanese Folktales"}
                    desc={storyDesc.description && storyDesc.description.split("\\n").join(" ")}
                    img={`${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`}
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemprop="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="name">
                                Home
                            </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        ＞
                        <span itemprop="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <Link to="/folktales" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="name">
                                Japanese Folktales
                            </span>
                            <meta itemprop="position" content="2" />
                        </Link>
                        </span>
                        ＞
                        <span itemprop="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                {title}
                            </span>
                            <meta itemprop="position" content="3" />
                        </span>
                    </div>
                    <h1 style={{
                        margin: "25px",
                        lineHeight: screenWidth > 500 ? "45px" : "35px",
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    {
                        this.state.storyName ?
                            <img
                                src={`${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`}
                                width="90%"
                                alt={title}
                                title={title}
                            />
                            :
                            null
                    }
                    <br />
                    <br />
                    {
                        storyDesc.description ?
                            <div
                                style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}
                                id="aboutFolktale"
                            >
                                <h2 style={styleForAboutTitle}>About {titleOfAbout}</h2>
                                {
                                    storyDesc.description.split("\\n").map((d, i) =>
                                        <span key={i}>
                                            {d}<br />
                                        </span>
                                    )
                                }
                            </div>
                            :
                            null
                    }
                    <br />
                    <div ref={this.refSentences}>
                        {
                            storyDesc.storyId ?
                                <div>
                                    <span style={{ textAlign: "left" }}><h2 style={styleForStoryTitle}>{title + " Story"}</h2></span>
                                    <br />
                                    <Sentences
                                        storyId={storyDesc.storyId}
                                        sentences={sentences}
                                        words={words}
                                        langState={this.state}
                                        audioFolder={storyName && storyName.split("--")[0]}
                                    />
                                </div>
                                :
                                <center>
                                    <CircularProgress key="circle" size="20%" />
                                </center>
                        }
                    </div>
                    {
                        otherStories && otherStories.length > 0 ?
                            <div style={{ textAlign: "left", marginTop: "30px", marginBottom: "20px" }}>
                                <h2 style={styleForStoryTitle}>More folktales</h2>
                            </div>
                            :
                            null
                    }
                    {
                        otherStories && otherStories.map(s => {
                            const nameForUrl = s.storyName;
                            const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");

                            return (
                                <div key={s.storyId} style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                    {
                                        screenWidth > 500 ?
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <center>
                                                                <h3 style={{ color: "black", marginBottom: "20px" }}>
                                                                    <b>{nameToShow}</b>
                                                                </h3>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%">
                                                            <Link to={`/folktales/${nameForUrl}`}>
                                                                <img
                                                                    src={`${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`}
                                                                    width="90%"
                                                                    alt={nameToShow}
                                                                    title={nameToShow}
                                                                    style={{ marginLeft: "10px", marginBottom: "10px" }}
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {
                                                                s.description.split("\\n").map((d, i) =>
                                                                    <span key={i} style={{ color: "black" }}>
                                                                        {d}<br />
                                                                    </span>
                                                                )
                                                            }
                                                            <center>
                                                                <p style={{ margin: "20px" }}>
                                                                    <Link to={`/folktales/${nameForUrl}`}>Read {nameToShow} >></Link>
                                                                </p>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            <div>
                                                <b>
                                                    <h3 style={{ color: "black", marginBottom: "20px" }}>{nameToShow}</h3>
                                                </b>
                                                <Link to={`/folktales/${nameForUrl}`}>
                                                    <img
                                                        src={`${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`}
                                                        width="90%"
                                                        alt={nameToShow}
                                                        title={nameToShow}
                                                    />
                                                </Link>
                                                <div style={{ textAlign: "left", margin: "10px" }}>
                                                    {
                                                        s.description.split("\\n").map((d, i) =>
                                                            <span key={i} style={{ color: "black" }}>
                                                                {d}<br />
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                                <p>
                                                    <Link to={`/folktales/${nameForUrl}`}>Read {nameToShow} >></Link>
                                                </p>
                                            </div>
                                    }
                                </div>
                            );
                        }
                        )
                    }
                    <Link
                        to="/folktales"
                        style={{ fontSize: "x-large" }}
                    >
                        All folktales >>
                    </Link>
                    <br /><br />
                    <FB />
                    <br />
                    <GoogleAd />
                    <FooterMenu
                        onClickLangBtn={this.onClickLangBtn}
                        langState={this.state}
                        screenWidth={screenWidth}
                        showFooterMenu={showFooterMenu}
                    />
                    <PleaseScrollDown
                        pleaseScrollDown={pleaseScrollDown}
                        screenWidth={screenWidth}
                    />
                </div>
            </center>
        );
    }
};

class Sentences extends React.Component {

    render() {
        const { storyId, sentences, words, langState, audioFolder } = this.props;
        const isLoading = !sentences || sentences.length <= 0;

        return (
            <div style={{ textAlign: "left" }}>
                {
                    isLoading ?
                        <center>
                            <CircularProgress key="circle" size="20%" />
                        </center>
                        :
                        sentences && sentences.map(s =>
                            <span key={s.lineNumber}>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        {
                                            langState.kanji ?
                                                <tr style={{ backgroundColor: "#fff0f2" }}>
                                                    <td><b>Ｋ:　</b></td>
                                                    <td>{s.kanji}</td>
                                                </tr>
                                                :
                                                null
                                        }
                                        {
                                            langState.hiragana ?
                                                <tr style={{ backgroundColor: "#ffffe0" }}>
                                                    <td><b>Ｈ:　</b></td>
                                                    <td>{s.hiragana}</td>
                                                </tr>
                                                :
                                                null
                                        }
                                        {
                                            langState.romaji ?
                                                <tr style={{ backgroundColor: "#f0fff2" }}>
                                                    <td><b>Ｒ:　</b></td>
                                                    <td>{s.romaji}</td>
                                                </tr>
                                                :
                                                null
                                        }
                                        {
                                            langState.english ?
                                                <tr style={{ backgroundColor: "#f0f8ff" }}>
                                                    <td><b>Ｅ:　</b></td>
                                                    <td>{s.english}</td>
                                                </tr>
                                                :
                                                null
                                        }
                                    </tbody>
                                </table>
                                <AudioContol
                                    s={s}
                                    audioFolder={audioFolder}
                                />
                                <WordList
                                    words={words}
                                    s={s}
                                    storyId={storyId}
                                />
                                <hr />
                            </span>
                        )
                }
            </div>
        );
    }
};

class AudioContol extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showControl: false
        };
    }

    render() {
        const { audioFolder } = this.props;
        const audioPath = `${consts.BLOB_URL}/folktalesAudio/${audioFolder}/folktale-audio${this.props.s.lineNumber}.m4a`;

        return (
            <audio
                preload={true}
                src={audioPath}
                style={{ width: "100%", height: "30px", marginTop: "5px" }}
                onCanPlayThrough={() => {
                    this.setState({ showControl: true});
                }}
                controls={this.state.showControl}
            />
        );
    }
}

class WordList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showWordList: false
        };
    }

    showWordList = () => {
        this.setState({ showWordList: true });
    }

    hideWordList = () => {
        this.setState({ showWordList: false });
    }

    render() {
        return (
            <span>
                {
                    this.props.words && this.props.words.filter(w =>
                        w.lineNumber === this.props.s.lineNumber
                    ).length > 0 ?
                        this.state.showWordList ?
                            <button
                                style={{ marginTop: 5, marginBottom: 2, height: 28, paddingTop: 0, color: "white" }}
                                className="btn btn-dark btn-xs"
                                onClick={this.hideWordList}
                            >
                                ▲　Hide word list
                            </button>
                            :
                            <button
                                style={{ marginTop: 5, height: 28, paddingTop: 0, color: "white" }}
                                className="btn btn-dark btn-xs"
                                onClick={this.showWordList}
                            >
                                ▼　Show word list
                            </button>
                        :
                        null
                }
                <div style={{ backgroundColor: "#f8f7f8" }}>
                    {
                        this.state.showWordList ?
                            <center>
                                <table border="1" style={{ borderCollapse: "collapse" }}>
                                    <tbody>
                                        {
                                            this.props.words && this.props.words.filter(w =>
                                                w.lineNumber === this.props.s.lineNumber
                                            ).map(w =>
                                                <tr key={w.wordNumber}>
                                                    <td style={{ textAlign: "center", minWidth: 100 }}>
                                                        {w.kanji}<br />
                                                        {
                                                            w.hiragana ?
                                                                `(${w.hiragana})`
                                                                :
                                                                null
                                                        }
                                                    </td>
                                                    <td style={{ paddingLeft: 3, paddingRight: 3 }}>{w.english}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </center>
                            :
                            null
                    }
                </div>
            </span>
        )
    }
}

class PleaseScrollDown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { screenWidth, pleaseScrollDown } = this.props

        return (
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: pleaseScrollDown ? 999999990 : 0,
                width: `${screenWidth}px`,
                height: "70px",
                opacity: pleaseScrollDown ? 1.0 : 0,
                transition: pleaseScrollDown ? "all 2s ease" : "all 2s ease",
                fontSize: "x-large",
                backgroundColor: "#EEEEEE",
                borderRadius: "30px 30px 0px 0px",
            }}>
                <span
                    id="pleaseScroll"
                >
                    <span></span>
                    <AnchorLink href='#aboutFolktale'>Scroll</AnchorLink>
                </span>
            </div>
        )
    }
}

class FooterMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLangMenu: true,
        };
    }

    showLangMenu = () => {
        this.setState({ showLangMenu: !this.state.showLangMenu })
    }

    render() {
        const { showLangMenu } = this.state;
        const { screenWidth, langState, showFooterMenu } = this.props
        const tableWidth = (screenWidth > 730) ? 730 : screenWidth;
        const buttonWidth = (tableWidth / 4) - 4;
        const tableLeft = (screenWidth > 730) ? (screenWidth - tableWidth) / 2 - 10 : (screenWidth - tableWidth) / 2;
        const tdStyle = { width: `${buttonWidth}px` };

        return (
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: showFooterMenu ? 999999999 : 0,
                width: `${screenWidth}px`,
                height: "50px",
                backgroundColor: "white",
                opacity: showFooterMenu ? 1.0 : 0,
                transition: showFooterMenu ? "all 2s ease" : "all 2s ease",
            }}>
                <table style={{
                    position: "fixed",
                    bottom: 3,
                    left: `${tableLeft}px`,
                    width: tableWidth,
                    backgroundColor: "#e7e9e7",
                    border: "1px solid gray",
                }}>
                    <tbody>
                        <tr width="100%" onClick={this.showLangMenu}>
                            <td colSpan="4" style={{ padding: 3 }}>
                                {
                                    showLangMenu ?
                                        <center>
                                            ▼ Select the languages to read ▼
                                    </center>
                                        :
                                        <center>
                                            ▲ Show language menu ▲
                                    </center>
                                }
                            </td>
                        </tr>
                        {
                            showLangMenu ?
                                <tr>
                                    <td style={tdStyle}>
                                        <button
                                            className="btn btn-danger"
                                            style={{ width: "100%", fontSize: "small", opacity: !langState.kanji ? 0.3 : 1 }}
                                            onClick={() => this.props.onClickLangBtn("kanji")}
                                        >
                                            <b style={{ fontSize: "x-large" }}>K</b>anji
                                </button>
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            className="btn btn-warning"
                                            style={{ width: "100%", fontSize: "small", color: "white", backgroundColor: "#d9c402", opacity: !langState.hiragana ? 0.3 : 1 }}
                                            onClick={() => this.props.onClickLangBtn("hiragana")}
                                        >
                                            <b style={{ fontSize: "x-large" }}>H</b>iragana
                                </button>
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            className="btn btn-success"
                                            style={{ width: "100%", fontSize: "small", opacity: !langState.romaji ? 0.3 : 1 }}
                                            onClick={() => this.props.onClickLangBtn("romaji")}
                                        >
                                            <b style={{ fontSize: "x-large" }}>R</b>omaji
                                </button>
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: "100%", fontSize: "small", opacity: !langState.english ? 0.3 : 1 }}
                                            onClick={() => this.props.onClickLangBtn("english")}
                                        >
                                            <b style={{ fontSize: "x-large" }}>E</b>nglish
                                </button>
                                    </td>
                                </tr>
                                :
                                null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);