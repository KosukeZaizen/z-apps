import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/StoriesTopStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Imgs from './parts/Stories/imgs/ImportImgs';

class StoriesTop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: parseInt(window.innerWidth, 10),
        };

        this.props.loadAllStories();

        let timer = 0;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: parseInt(window.innerWidth, 10),
        });
    }

    render() {
        const allStories = this.props.allStories;
        const { screenWidth } = this.state;
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
                        <b>Japanese Folktales</b>
                    </h1>
                    <br />
                    {
                        allStories && allStories.map(s =>
                            <a key={s.storyId} href={`/folktales/${s.storyName}`}>
                                <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                    {
                                        screenWidth > 380 ?
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td width="50%">
                                                            <img
                                                                src={Imgs[s.storyName]}
                                                                width="90%"
                                                                alt={s.storyName}
                                                                title={s.storyName}
                                                            />
                                                        </td>
                                                        <td>
                                                            {
                                                                s.description.split("\\n").map((d, i) =>
                                                                    <span key={i} style={{ color: "black" }}>
                                                                        {d}<br />
                                                                    </span>
                                                                )
                                                            }
                                                            <p>Read {s.storyName} >></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td colspan="2" style={{textAlign:"center"}}>
                                                            <b>
                                                                <h2 style={{ color: "black", marginBottom:"10px" }}>{s.storyName}</h2>
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%">
                                                            <img
                                                                src={Imgs[s.storyName]}
                                                                width="90%"
                                                                alt={s.storyName}
                                                                title={s.storyName}
                                                            />
                                                        </td>
                                                        <td>
                                                            {
                                                                s.description.split("\\n").map((d, i) =>
                                                                    <span key={i} style={{ color: "black" }}>
                                                                        {d}<br />
                                                                    </span>
                                                                )
                                                            }
                                                            <p>Read {s.storyName.split("-").join(" ")} >></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            }
                                    </div>
                            </a>
                        )
                    }
                </div>
            </center>
        );
    }
};

export default connect(
    state => state.storiesTop,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesTop);