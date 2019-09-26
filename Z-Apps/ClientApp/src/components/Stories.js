import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/StoriesStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';

class Stories extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match
        const storyName = params.storyName.toString();

        this.state = {
            storyName: storyName,
        };
    }

    componentWillMount() {
        this.props.requestKanjiConvert(this.state.storyName);
    }

    render() {
        const title = this.props.pageContents.storyName;
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
                    <span>
                        <CircularProgress key="circle" size="20%" />
                    </span>
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