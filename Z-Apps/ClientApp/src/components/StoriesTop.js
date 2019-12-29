import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/StoriesTopStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import FB from './parts/FaceBook';
import GoogleAd from './parts/GoogleAd';
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
        const { allStories } = this.props;
        const { screenWidth } = this.state;
        const styleForAboutTitle = {
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
        };
        return (
            <center>
                <Head
                    title="Japanese Folktales"
                    desc="Free application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="http://data-vocabulary.org/Breadcrumb" style={{ textAlign: "left" }}>
                        <Link to="/" itemProp="url" style={{ marginRight: "5px", marginLeft: "5px" }}>
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
                    <p style={styleForAboutTitle}>
                            Free app to learn Japanese from folktales!<br />
                            You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!
                    </p>
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
                        allStories && allStories.map(s => {
                            const nameForUrl = s.storyName;
                            const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
                            const nameForImg = s.storyName.split("--").join("_");

                            return (
                                <div key={s.storyId} style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                    {
                                        screenWidth > 500 ?
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <center>
                                                                <h2 style={{ color: "black", marginBottom: "20px" }}>
                                                                    <b>{nameToShow}</b>
                                                                </h2>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="50%">
                                                            <Link to={`/folktales/${nameForUrl}`}>
                                                                <img
                                                                    src={Imgs[nameForImg]}
                                                                    width="90%"
                                                                    alt={nameToShow}
                                                                    title={nameToShow}
                                                                    style={{ marginLeft: "10px", marginBottom: "10px" }}
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {
                                                                s.description.split("\\n").map((d, i) =>
                                                                    <span key={i} style={{ color: "black" }}>
                                                                        {d}<br />
                                                                    </span>
                                                                )
                                                            }
                                                            <center>
                                                                <p style={{ margin: "20px" }}>
                                                                    <Link to={`/folktales/${nameForUrl}`}>Read {nameToShow} >></Link>
                                                                </p>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            <div>
                                                <b>
                                                    <h2 style={{ color: "black", marginBottom: "20px" }}>{nameToShow}</h2>
                                                </b>
                                                <Link to={`/folktales/${nameForUrl}`}>
                                                    <img
                                                        src={Imgs[nameForImg]}
                                                        width="90%"
                                                        alt={nameToShow}
                                                        title={nameToShow}
                                                    />
                                                </Link>
                                                <div style={{ textAlign: "left", margin: "10px" }}>
                                                    {
                                                        s.description.split("\\n").map((d, i) =>
                                                            <span key={i} style={{ color: "black" }}>
                                                                {d}<br />
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                                <p>
                                                    <Link to={`/folktales/${nameForUrl}`}>Read {nameToShow} >></Link>
                                                </p>
                                            </div>
                                    }
                                </div>
                            );
                        }
                        )
                    }
                </div>
                <FB />
                <br />
                <GoogleAd />
            </center>
        );
    }
};

export default connect(
    state => state.storiesTop,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesTop);