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
        const storyName = this.props.pageContents.storyName || this.state.storyName || "";
        const title = storyName.split("-").join(" ");
        return (
            <center>
                <div style={{ maxWidth: 700 }}>
                    <Head
                        title={title}
                        desc={this.props.pageContents.description}
                    />
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    {
                        this.props.pageContents.description ?
                            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                {
                                    this.props.pageContents.description.split("\\n").map((d, i) =>
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
                    <div style={{ textAlign: "left" }}>
                        {this.props.isLoading ?
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                            :
                            this.props.pageContents.sentences && this.props.pageContents.sentences.map(s =>
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
                </div>
            </center>
        );
    }
};

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);