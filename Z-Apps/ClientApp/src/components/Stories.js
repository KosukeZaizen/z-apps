import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/StoriesStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';

class Stories extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match;
        const storyName = params.storyName.toString();

        this.state = {
            storyName: storyName,
        };
        this.props.loadStory(this.state.storyName);
    }

    render() {
        const storyName = this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("-").join(" ");
        return (
            <center>
                <div style={{ maxWidth: 700 }}>
                    <Head
                        title={title}
                        desc={this.props.storyDesc.description}
                    />
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                    }}>
                        <b>{title}</b>
                    </h1>
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
        };
        this.props.loadSentences(this.props.storyId);
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
                                        <tr style={{ backgroundColor: "#f0f8ff" }}>
                                            <td><b>Ｋ:　</b></td>
                                            <td>{s.kanji}</td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#ffffe0" }}>
                                            <td><b>Ｈ:　</b></td>
                                            <td>{s.hiragana}</td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#fff0f2" }}>
                                            <td><b>Ｒ:　</b></td>
                                            <td>{s.romaji}</td>
                                        </tr>
                                        <tr style={{ backgroundColor: "#f0fff2" }}>
                                            <td><b>Ｅ:　</b></td>
                                            <td>{s.english}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                            </span>
                        )
                }
            </div>
        );
    }
};

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);