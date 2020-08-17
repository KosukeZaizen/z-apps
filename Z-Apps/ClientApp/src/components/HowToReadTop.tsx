import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../store/configureStore';
import { actionCreators } from '../store/StoriesTopStore';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import FB from './parts/FaceBook';
import GoogleAd from './parts/GoogleAd';
import PleaseScrollDown from './parts/PleaseScrollDown';
import * as consts from './common/consts';
import { storyDesc } from '../types/stories';

class HowToReadTop extends React.Component {
    ref: React.RefObject<HTMLDivElement>;
    props: {
        loadAllStories: () => void,
        allStories: storyDesc[],
    };
    state: {
        screenWidth: number;
        words: string[];
    };

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            words: [],
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

    componentDidMount() {
        const getData = async () => {

            const url = `api/Wiki/GetAllWords?num=1000`;
            const response = await fetch(url);
            const words = await response.json();

            this.setState({
                words: words.sort().reverse()
            });

            setTimeout(async () => {
                const url = `api/Wiki/GetAllWords?num=0`;
                const response = await fetch(url);
                const words = await response.json();

                this.setState({
                    words: words.sort().reverse()
                });
            }, 1000);
        }
        getData();
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: window.innerWidth
        });
    }

    render() {
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
                    title="How to read Japanese"
                    desc="Free web site to learn how to read Japanese! You can learn a lot of Japanese words from this page!"
                    noindex
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
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                How to read Japanese
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "40px",
                    }}>
                        <b>How to read Japanese</b>
                    </h1>
                    <p style={styleForAboutTitle}>
                        Free web site to learn how to read Japanese!<br />
                        You can learn a lot of Japanese words from this page!
                    </p>
                    <br />
                    {
                        this.state.words.length > 0
                            ? this.state.words.map(w =>
                                <div key={w}>
                                    <a href={"how-to-read-japanese/" + encodeURIComponent(w)}>
                                        {w}
                                    </a>
                                </div>
                            )
                            : <CircularProgress key="circle" size="20%" />
                    }
                    <hr />
                    <Link to="/vocabulary-list">
                        <Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                            <CardTitle>Japanese Vocabulary List</CardTitle>
                            <CardText>Basic Japanese Vocabulary List!<br />Try to memorize all the vocabulary by using the quizzes!</CardText>
                            <Button color="secondary">Try!</Button>
                        </Card>
                    </Link>
                    <hr />
                </div>
                <FB />
                <br />
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    screenWidth={screenWidth}
                />
            </div>
        );
    }
};

export default connect(
    (state: TReducers) => state.storiesTop,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(HowToReadTop);