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
    }

    componentWillMount() {
        this.props.loadStory(this.state.storyName);
    }

    render() {
        const storyName = this.props.pageContents.storyName || "";
        const title = storyName.split("-").join(" ");
        return (
            <div>
                <Head
                    title={title}
                    desc={this.props.pageContents.description}
                />
                <center>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                    }}>
                        <b>{title}</b>
                    </h1>
                    <br />
                    {
                        this.props.pageContents.description && this.props.pageContents.description.split("\\n").map(d =>
                            <span>
                                {d}<br />
                            </span>
                        )
                    }
                </center >
                <br />
                <br />
                {this.props.isLoading ?
                    <center>
                        <CircularProgress key="circle" size="20%" />
                    </center>
                    :
                    this.props.pageContents.sentences && this.props.pageContents.sentences.map(s =>
                        <ul key={s.lineNumber}>
                            <li>{s.kanji}</li>
                            <li>{s.hiragana}</li>
                            <li>{s.romaji}</li>
                            <li>{s.english}</li>
                        </ul>
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