import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/SiteMapEditStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as consts from './common/consts';

class SiteMapEdit extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match;
        const storyName = "Momotaro";
        this.state = {
            storyName: storyName,
            importData: "",
            imported: false,
        };

        this.screenHeight = parseInt(window.innerHeight, 10);

        this.props.loadSitemap();
        this.props.setInitialToken();
    }

    render() {
        return (
            <center>
                <Head
                    title={"edit sitemap"}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: "-1" }}>
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
                            edit sitemap
                        </span>
                    </div>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    }}>
                        <b>Edit Sitemap</b>
                    </h1>
                    <br />
                    {
                        showSentences ?
                            <Sentences
                                sitemap={this.props.sitemap}
                                handleChangeSitemap={this.props.handleChangeSitemap}
                                addLine={this.props.addLine}
                                removeLine={this.props.removeLine}
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
                    <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99999999,
                        backgroundColor: "black",
                        width: "100%",
                    }}>
                        <button
                            style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                            className="btn btn-dark btn-xs"
                            onClick={this.props.save}
                        >
                            <b>Save</b>
                        </button>
                        "　"
                    <button
                            style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                            className="btn btn-dark btn-xs"
                            onClick={this.props.register}
                        >
                            <b>Register</b>
                        </button>
                    </div>
                </div>
            </center>
        );
    }
};
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
                    this.props.sitemap && this.props.sitemap.map((s, i) =>
                        <span key={s.loc}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>loc:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.loc}
                                            onChange={(e) => this.props.handleChangeSitemap(e, i, "loc")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td style={{ textAligh: "left" }}>
                                            <div style={{ textAligh: "right", float: "right" }}>
                                                <button
                                                    style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                                                    className="btn btn-dark btn-xs"
                                                    onClick={() => this.props.removeLine(s.loc)}
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
                                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
)(SiteMapEdit);