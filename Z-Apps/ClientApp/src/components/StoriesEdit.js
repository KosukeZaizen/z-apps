import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/StoriesEditStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as consts from './common/consts';

class StoriesEdit extends React.Component {

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
        this.props.setInitialToken();
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
        const storyName = this.props.storyDesc.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const showSentences = this.props.sentences && this.props.sentences.length > 0 && this.props.words && this.props.words.length > 0;
        return (
            <center>
                <Head
                    title={title + " Story"}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position:"fixed", top:0, right:0, zIndex:"-1" }}>
                </div>
                <div style={{ maxWidth: 1000 }}>
                    <div className="breadcrumbs" style={{ textAlign: "left", color: "white" }}>
                        <Link to="/" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span>
                                Home
                            </span>
                        </Link>
                        ＞
                        <Link to="/folktalesEdit" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span>
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
                                src={`${consts.BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`}
                                width="100px"
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
                            <Description
                                desc={this.props.storyDesc.description}
                                handleChangeDesc={this.props.handleChangeDesc}
                            />
                            :
                            null
                    }
                    <br />
                    {
                        showSentences ?
                            <Sentences
                                storyId={this.props.storyDesc.storyId}
                                sentences={this.props.sentences}
                                loadSentences={this.props.loadSentences}
                                words={this.props.words}
                                loadWords={this.props.loadWords}
                                handleChangeSentence={this.props.handleChangeSentence}
                                addLine={this.props.addLine}
                                handleChangeWord={this.props.handleChangeWord}
                                addWord={this.props.addWord}
                                removeWord={this.props.removeWord}
                                removeLine={this.props.removeLine}
                                translate={this.props.translate}
                                translateWord={this.props.translateWord}
                                isTranslating={this.props.isTranslating}
                                mergeWord={this.props.mergeWord}
                            />
                            :
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                    }
                    <input
                        type="text"
                        value={this.props.token}
                        onChange={this.props.handleChangeToken}
                    />
                    <br />
                    <button
                        style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                        className="btn btn-dark btn-xs"
                        onClick={() => this.props.save()}
                    >
                        <b>Save</b>
                    </button>
                    "　"
                    <button
                        style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                        className="btn btn-dark btn-xs"
                        onClick={() => this.props.register()}
                    >
                        <b>Register</b>
                    </button>
                </div>
            </center>
        );
    }
};

class Description extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" }}>
                <textarea
                    rows="10"
                    style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                    value={this.props.desc}
                    onChange={this.props.handleChangeDesc}
                />
            </div>
        )
    }
}

class Sentences extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                {
                    this.props.sentences && this.props.sentences.map((s,i) =>
                        <span key={s.lineNumber}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｋ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.kanji}
                                            onChange={(e) => this.props.handleChangeSentence(e, i,"kanji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td style={{textAligh: "left"}}>
                                            <button
                                                style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                                                className="btn btn-dark btn-xs"
                                                onClick={() => this.props.translate(s)}
                                            >
                                                <b>↓　Translate Sentence　↓</b>
                                            </button>
                                            {this.props.isTranslating ? <span style={{ color: "white", marginLeft:20 }}>Translating...</span> : null}
                                            <div style={{ textAligh: "right", float:"right" }}>
                                                <button
                                                    style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                                                    className="btn btn-dark btn-xs"
                                                    onClick={() => this.props.removeLine(s.lineNumber)}
                                                >
                                                    <b>Remove Sentence</b>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｈ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.hiragana}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "hiragana")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｒ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.romaji}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "romaji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｅ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.english}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "english")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                            {
                                this.props.words && this.props.words.length > 0 ?
                                <WordList
                                        words={this.props.words}
                                        s={s}
                                        storyId={this.props.storyId}
                                        handleChangeWord={this.props.handleChangeWord}
                                        addWord={this.props.addWord}
                                        removeWord={this.props.removeWord}
                                        translateWord={this.props.translateWord}
                                        mergeWord={this.props.mergeWord}
                                    />
                                    :
                                    null
                            }
                            <button
                                style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                                className="btn btn-dark btn-xs"
                                onClick={() => this.props.addLine(s.lineNumber)}
                            >
                                <b>Add Line</b>
                            </button>

                            <br /><br />
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
                <br />
                <div style={{ backgroundColor: "#1b181b" }}>
                    {
                        this.state.showWordList ?
                            <center>
                                <table border="1" style={{ width:"100%", borderCollapse: "collapse" }}>
                                    <tbody>
                                        {
                                            this.props.words && this.props.words.filter((w) =>
                                                w.lineNumber === this.props.s.lineNumber
                                            ).sort((a, b) =>
                                                a.wordNumber - b.wordNumber
                                            ).map((w, i) =>
                                                <tr key={w.wordNumber}>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.mergeWord(w.lineNumber, w.wordNumber)}
                                                        ><b>M</b>
                                                        </button>
                                                    </td>
                                                    <td width="20%">
                                                        <textarea
                                                            value={w.kanji}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "kanji")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.translateWord(w)}
                                                        ><b>⇒</b>
                                                        </button>
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
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.removeWord(w.lineNumber, w.wordNumber)}
                                                        ><b>－</b>
                                                        </button>
                                                    </td>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.addWord(w.lineNumber, w.wordNumber)}
                                                        ><b>＋</b>
                                                        </button>
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
    state => state.storiesEdit,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesEdit);