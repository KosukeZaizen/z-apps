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
        return (
            <center>
                <Head
                    title="Lingual Ninja Stories"
                />
                <h1 style={{
                    margin: "30px",
                    lineHeight: "30px",
                }}>
                    <b>Lingual Ninja<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Stories</b>
                </h1>
                <br />
                {this.props.isLoading ?
                    <span>
                        <CircularProgress key="circle" size="20%" />
                    </span>
                    :
                    this.props.pageContents.map(s =>
                        <ul key={s.lineNumber}>
                            <li>{s.kanji}</li>
                            <li>{s.hiragana}</li>
                            <li>{s.romaji}</li>
                            <li>{s.english}</li>
                        </ul>
                    )
                }
            </center >
        );
    }
};

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);