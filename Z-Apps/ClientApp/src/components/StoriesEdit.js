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

    render() {
        const storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("-").join(" ");
        return (
            <center>
                <Head
                    title={title}
                    noindex={true}
                />
                <div style={{ maxWidth: 1000 }}>
                    <div className="breadcrumbs" itemScope itemType="http://data-vocabulary.org/Breadcrumb" style={{ textAlign: "left" }}>
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
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    {
                        this.state.storyName ?
                            <img
                                src={Imgs[this.state.storyName]}
                                width="90%"
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
                            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                {
                                    this.props.storyDesc.description.split("\\n").map((d, i) =>
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
                    {
                        this.props.storyDesc.storyId ?
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
        this.props.loadSentences(this.props.storyId);
    }

    componentDidUpdate() {
        if (this.props.sentences && this.props.sentences.length > 0) {
            if (!this.props.words || this.props.words.length <= 0) {
                this.props.loadWords(this.props.storyId);
            }
        }
    }

    render() {
        const isLoading = !this.props.sentences || this.props.sentences.length <= 0;

        return (
            <div style={{ textAlign: "left" }}>
                {
                    isLoading ?
                        <center>
                            <CircularProgress key="circle" size="20%" />
                        </center>
                        :
                        this.props.sentences && this.props.sentences.map(s =>
                            <span key={s.lineNumber}>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr style={{ backgroundColor: "#fff0f2" }}>
                                            <td width="20px"><b>Ｋ:　</b></td>
                                            <td><input type="text" defaultValue={s.kanji} style={{ width: "100%" }} /></td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#ffffe0" }}>
                                            <td width="20px"><b>Ｈ:　</b></td>
                                            <td><input type="text" defaultValue={s.hiragana} style={{ width: "100%" }} /></td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#f0fff2" }}>
                                            <td width="20px"><b>Ｒ:　</b></td>
                                            <td><input type="text" defaultValue={s.romaji} style={{ width: "100%" }} /></td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#f0f8ff" }}>
                                            <td width="20px"><b>Ｅ:　</b></td>
                                            <td><input type="text" defaultValue={s.english} style={{ width: "100%" }} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <WordList
                                    words={this.props.words}
                                    s={s}
                                    loadSentences={this.props.loadSentences}
                                    storyId={this.props.storyId}
                                />
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
            showWordList: true
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
                                style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "white" }}
                                className="btn btn-dark btn-xs"
                                onClick={this.hideWordList}
                            >
                                ▲　Hide word list
                            </button>
                            :
                            <button
                                style={{ marginTop: 10, height: 28, paddingTop: 0, color: "white" }}
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

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);