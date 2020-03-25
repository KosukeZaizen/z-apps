import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/StoriesTopStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import FB from './parts/FaceBook';
import GoogleAd from './parts/GoogleAd';
import PleaseScrollDown from './parts/PleaseScrollDown';
import * as consts from './common/consts';

class StoriesTop extends React.Component {
    ref: React.RefObject<HTMLDivElement>;
    props: {
        loadAllStories: () => void,
        allStories: {
            storyName: string,
            storyId: number,
            description: string,
        }[],
    };
    state: {screenWidth: number};

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
        };

        let timer;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };

        this.ref = React.createRef();
    }

    componentDidMount(){
        this.props.loadAllStories();
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: window.innerWidth
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
            <div className="center">
                <Head
                    title="Japanese Folktales"
                    desc="Free application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"
                />
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    Home
                                </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        ＞
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                Japanese Folktales
                            </span>
                            <meta itemProp="position" content="2" />
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
                            <div className="center">
                                <CircularProgress key="circle" size="20%" />
                            </div>
                    }
                    <div id="scrollTargetId" ref={this.ref}>
                        {
                            allStories && allStories.map(s => {
                                const nameForUrl = s.storyName;
                                const nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");

                                return (
                                    <div key={s.storyId} style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                        {
                                            screenWidth > 500 ?
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <div className="center">
                                                                    <h2 style={{ color: "black", marginBottom: "20px" }}>
                                                                        <b>{nameToShow}</b>
                                                                    </h2>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width:"50%"}}>
                                                                <Link to={`/folktales/${nameForUrl}`}>
                                                                    <img
                                                                        src={`${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`}
                                                                        width="90%"
                                                                        alt={nameToShow}
                                                                        title={nameToShow}
                                                                        style={{ marginLeft: "10px", marginBottom: "10px" }}
                                                                    />
                                                                </Link>
                                                            </td>
                                                            <td style={{textAlign: "left"}}>
                                                                {
                                                                    s.description.split("\\n").map((d, i) =>
                                                                        <span key={i} style={{ color: "black" }}>
                                                                            {d}<br />
                                                                        </span>
                                                                    )
                                                                }
                                                                <div className="center">
                                                                    <p style={{ margin: "20px" }}>
                                                                        <Link to={`/folktales/${nameForUrl}`}>Read {nameToShow} >></Link>
                                                                    </p>
                                                                </div>
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
                                                            src={`${consts.BLOB_URL}/folktalesImg/${nameForUrl.split("--")[0]}.png`}
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
                </div>
                <FB />
                <br />
                <GoogleAd />
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    screenWidth={screenWidth}
                />
            </div>
        );
    }
};

export default connect(
    state => state["storiesTop"],
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesTop);