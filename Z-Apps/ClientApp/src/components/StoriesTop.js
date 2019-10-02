import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/StoriesStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Imgs from './parts/Stories/imgs/ImportImgs';

class Stories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
        this.props.loadStories();
    }

    render() {
        const { stories } = this.props;
        return (
            <center>
                <div style={{ maxWidth: 700 }}>
                    <Head
                        title="Japanese Folktales"
                        desc="Free application to learn Japanese language from the folktales. You can read Japanese folktales in English, Hiragana, Kanji, and Romaji!"
                    />
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                    }}>
                        <b>"Japanese Folktales"</b>
                    </h1>
                    <br />
                    {
                        stories && stories.map(s =>
                            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img
                                                    src={Imgs[s.storyName]}
                                                    width="90%"
                                                    alt={s.storyName}
                                                    title={s.storyName}
                                                />
                                            </td>
                                            <td>
                                                {
                                                    s.storyDesc.description.split("\\n").map((d, i) =>
                                                        <span key={i} style={{color:"black"}}>
                                                            {d}<br />
                                                        </span>
                                                    )
                                                }
                                                <p>Read {s.storyName && s.storyName.split("-").join(" ")} >></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </center>
        );
    }
};

export default connect(
    state => state.stories,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Stories);