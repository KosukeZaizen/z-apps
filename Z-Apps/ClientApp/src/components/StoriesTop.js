import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                <Head
                    title="Japanese Folktales"
                    desc="Free application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="http://data-vocabulary.org/Breadcrumb" style={{textAlign:"left"}}>
                        <Link to="/" itemProp="url" style={{ marginRight: "5px", marginLeft: "5px"}}>
                            <span itemProp="title">
                                Home
                            </span>
                        </Link>
                        ＞
                        <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                            Japanese Folktales
                        </span>
                    </div>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "40px",
                    }}>
                        <b>Japanese Folktales</b>
                    </h1>
                    <br />
                    {
                        allStories && allStories.length > 0 ?
                            null
                            :
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                    }
                    {
                        allStories && allStories.map(s =>
                            <a key={s.storyId} href={`/folktales/${s.storyName}`}>
                                <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                    {
                                        screenWidth > 500 ?
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <center>
                                                                <h2 style={{ color: "black", marginBottom: "20px" }}>
                                                                    <b>{s.storyName.split("_").join(" ")}</b>
                                                                </h2>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%">
                                                            <img
                                                                src={Imgs[s.storyName]}
                                                                width="90%"
                                                                alt={s.storyName.split("_").join(" ")}
                                                                title={s.storyName.split("_").join(" ")}
                                                                style={{marginLeft:"10px",marginBottom:"10px"}}
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
                                                            <center><p style={{ margin: "20px" }}>Read {s.storyName.split("_").join(" ")} >></p></center>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            <div>
                                                <b>
                                                    <h2 style={{ color: "black", marginBottom: "20px" }}>{s.storyName.split("_").join(" ")}</h2>
                                                </b>
                                                <img
                                                    src={Imgs[s.storyName]}
                                                    width="90%"
                                                    alt={s.storyName.split("_").join(" ")}
                                                    title={s.storyName.split("_").join(" ")}
                                                />
                                                <div style={{ textAlign: "left", margin: "10px" }}>
                                                    {
                                                        s.description.split("\\n").map((d, i) =>
                                                            <span key={i} style={{ color: "black" }}>
                                                                {d}<br />
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                                <p>Read {s.storyName.split("_").join(" ")} >></p>
                                            </div>
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