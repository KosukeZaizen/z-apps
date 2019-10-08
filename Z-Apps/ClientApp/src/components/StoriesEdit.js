import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/StoriesStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Imgs from './parts/Stories/imgs/ImportImgs';

class Stories extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match;
        const storyName = params.storyName.toString();
        this.state = {
            storyName: storyName,
        };

        this.screenHeight = parseInt(window.innerHeight, 10);

        this.state = {
            ...this.state,
            kanji: true,
            hiragana: true,
            romaji: false,
            english: true,
        };

        this.props.loadStory(this.state.storyName);
    }

    unescapeHTML(html) {
        const escapeEl = document.createElement("textarea");
        escapeEl.innerHTML = html;
        return escapeEl.textContent;
    }

    componentDidUpdate() {
        if (this.props.storyDesc.storyId) {
            if (!this.props.sentences || this.props.sentences.length <= 0) {
                this.props.loadSentences(this.props.storyDesc.storyId);
                this.props.loadWords(this.props.storyDesc.storyId);
            }
        }
    }

    render() {
        const storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("-").join(" ");
        const showSentences = this.props.sentences && this.props.sentences.length > 0 && this.props.words && this.props.words.length > 0;
        return (
            <center>
                <Head
                    title={title}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position:"fixed", top:0, right:0, zIndex:"-1" }}>
                </div>
                <div style={{ maxWidth: 1000 }}>
                    <div className="breadcrumbs" itemScope itemType="http://data-vocabulary.org/Breadcrumb" style={{ textAlign: "left", color: "white" }}>
                        <Link to="/" itemProp="url" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="title">
                                Home
                            </span>
                        </Link>
                        ＞
                        <Link to="/folktales" itemProp="url" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="title">
                                Japanese Folktales
                            </span>
                        </Link>
                        ＞
                        <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                            {title}
                        </span>
                    </div>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    {
                        this.state.storyName ?
                            <img
                                src={Imgs[this.state.storyName]}
                                width="100px"
                                alt={this.state.storyName}
                                title={this.state.storyName}
                            />
                            :
                            null
                    }
                    <br />
                    {
                        this.screenHeight < 750 ?
                            <div style={{
                                color: "red",
                            }}>
                                <br />
                                <b>↓ Please scroll down ↓</b>
                            </div>
                            :
                            null
                    }
                    <br />
                    {
                        this.props.storyDesc.description ?
                            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" }}>
                                <textarea
                                    rows="5"
                                    style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                    defaultValue={this.unescapeHTML(this.props.storyDesc.description.split("\\n").join("&#13;&#10;"))}
                                />
                            </div>
                            :
                            null
                    }
                    <br />
                    {
                        showSentences ?
                            <Sentences
                                storyId={this.props.storyDesc.storyId}
                                sentences={this.props.sentences}
                                loadSentences={this.props.loadSentences.bind(this)}
                                words={this.props.words}
                                loadWords={this.props.loadWords.bind(this)}
                            />
                            :
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                    }
                </div>
            </center>
        );
    }
};

class Sentences extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sentences: this.props.sentences,
            words: this.props.words,
        };
    }

    handleChangeSentence = (event, i, lang) => {
        const s = this.state.sentences.concat();
        s[i][lang] = event.target.value;
        this.setState({ sentences: s });
    }

    handleChangeWord = (event, lineNumber, wordNumber, lang) => {
        const w = this.state.words.concat();

        for (let key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber === wordNumber) {
                w[key][lang] = event.target.value;
            }
        }
        this.setState({ words: w });
    }

    addLine = (previousLineNumber) => {
        const s = this.state.sentences.concat();
        for (let key in s) {
            if (s[key].lineNumber > previousLineNumber) {
                s[key].lineNumber++;
            }
        }
        const sToAdd = {
            storyId: s[0],
            lineNumber: previousLineNumber + 1,
            kanji: "",
            hiragana: "",
            romaji: "",
            english: "",
        }
        s.splice(previousLineNumber, 0, sToAdd);
        this.setState({ sentences: s });

        const w = this.state.words.concat();
        for (let key in w) {
            if (w[key].lineNumber > previousLineNumber) {
                w[key].lineNumber++;
            }
        }
        const wToAdd = {
            storyId: s[0],
            lineNumber: previousLineNumber + 1,
            wordNumber: 1,
            kanji: "",
            hiragana: "",
            english: "",
        }
        w.splice(previousLineNumber, 0, wToAdd);
        this.setState({ words: w });
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                {
                    this.state.sentences && this.state.sentences.map((s,i) =>
                        <span key={s.lineNumber}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｋ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.kanji}
                                            onChange={(e) => this.handleChangeSentence(e, i,"kanji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｈ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.hiragana}
                                            onChange={(e) => this.handleChangeSentence(e, i, "hiragana")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｒ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.romaji}
                                            onChange={(e) => this.handleChangeSentence(e, i, "romaji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｅ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.english}
                                            onChange={(e) => this.handleChangeSentence(e, i, "english")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                            {
                                this.state.words && this.state.words.length > 0 ?
                                <WordList
                                        words={this.state.words}
                                        s={s}
                                        loadSentences={this.props.loadSentences}
                                        storyId={this.props.storyId}
                                        handleChangeWord={this.handleChangeWord}
                                    />
                                    :
                                    null
                            }
                            <button
                                style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                                className="btn btn-dark btn-xs"
                                onClick={() => this.addLine(s.lineNumber)}
                            ><b>Add Line</b>
                            </button>

                            <hr />
                        </span>
                    )
                }
            </div>
        );
    }
};

class WordList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showWordList: true,
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
                                style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                                className="btn btn-dark btn-xs"
                                onClick={this.hideWordList}
                            >
                                ▲　Hide word list
                            </button>
                            :
                            <button
                                style={{ marginTop: 10, height: 28, paddingTop: 0, color: "black" }}
                                className="btn btn-dark btn-xs"
                                onClick={this.showWordList}
                            >
                                ▼　Show word list
                            </button>
                        :
                        null
                }
                <div style={{ backgroundColor: "#1b181b" }}>
                    {
                        this.state.showWordList ?
                            <center>
                                <table border="1" style={{ width:"100%", borderCollapse: "collapse" }}>
                                    <tbody>
                                        {
                                            this.props.words && this.props.words.filter((w) =>
                                                w.lineNumber === this.props.s.lineNumber
                                            ).map((w,i) =>
                                                <tr key={w.wordNumber}>
                                                    <td width="20%">
                                                        <textarea
                                                            value={w.kanji}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "kanji")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td width="23%">
                                                        <textarea
                                                            value={w.hiragana}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "hiragana")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            value={w.english}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "english")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
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

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);