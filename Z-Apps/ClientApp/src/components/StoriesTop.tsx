import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { bindActionCreators } from "redux";
import * as consts from "../common/consts";
import { TReducers } from "../store/configureStore";
import { actionCreators } from "../store/StoriesTopStore";
import { storyDesc } from "../types/stories";
import FB from "./parts/FaceBook";
import GoogleAd from "./parts/GoogleAd";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";

interface StoriesTopProps {
    loadAllStories: () => void;
    allStories: storyDesc[];
}
class StoriesTop extends React.Component<
    StoriesTopProps,
    { screenWidth: number }
> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: StoriesTopProps) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
        };

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };

        this.ref = React.createRef();
    }

    componentDidMount() {
        this.props.loadAllStories();
    }

    changeScreenSize = () => {
        this.setState({
            screenWidth: window.innerWidth,
        });
    };

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
                <main style={{ maxWidth: 700 }}>
                    <div
                        className="breadcrumbs"
                        itemScope
                        itemType="https://schema.org/BreadcrumbList"
                        style={{ textAlign: "left" }}
                    >
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                to="/"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">Home</span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <span
                                itemProp="name"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                Japanese Folktales
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1
                        style={{
                            margin: "30px",
                            lineHeight: "40px",
                            fontWeight: "bolder",
                        }}
                    >
                        Japanese Folktales
                    </h1>
                    <p style={styleForAboutTitle}>
                        Free app to learn Japanese from folktales!
                        <br />
                        You can read traditional Japanese folktales in English,
                        Hiragana, Kanji, and Romaji!
                    </p>
                    <br />
                    {allStories && allStories.length > 0 ? null : (
                        <div className="center">
                            <CircularProgress key="circle" size="20%" />
                        </div>
                    )}
                    <div id="scrollTargetId" ref={this.ref}>
                        {allStories &&
                            allStories
                                .sort((a, b) => {
                                    if (!a.order) {
                                        return 1;
                                    } else if (!b.order) {
                                        return -1;
                                    } else {
                                        return a.order - b.order;
                                    }
                                })
                                .map(s => {
                                    const nameForUrl = s.storyName;
                                    const nameToShow = s.storyName
                                        .split("--")
                                        .join(" - ")
                                        .split("_")
                                        .join(" ");

                                    return (
                                        <article
                                            key={s.storyId}
                                            style={{
                                                padding: "10px",
                                                marginBottom: "10px",
                                                border: "5px double #333333",
                                            }}
                                        >
                                            {screenWidth > 500 ? (
                                                <>
                                                    <h2
                                                        style={{
                                                            color: "black",
                                                            margin:
                                                                "0 20px 20px",
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                        className="center"
                                                    >
                                                        {nameToShow}
                                                    </h2>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style={{
                                                                        width:
                                                                            "50%",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/folktales/${nameForUrl}`}
                                                                    >
                                                                        <img
                                                                            src={`${
                                                                                consts.BLOB_URL
                                                                            }/folktalesImg/${
                                                                                nameForUrl.split(
                                                                                    "--"
                                                                                )[0]
                                                                            }.png`}
                                                                            width="90%"
                                                                            alt={
                                                                                nameToShow
                                                                            }
                                                                            title={
                                                                                nameToShow
                                                                            }
                                                                            style={{
                                                                                marginLeft:
                                                                                    "10px",
                                                                                marginBottom:
                                                                                    "10px",
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        textAlign:
                                                                            "left",
                                                                    }}
                                                                >
                                                                    {s.description
                                                                        .split(
                                                                            "\\n"
                                                                        )
                                                                        .map(
                                                                            (
                                                                                d,
                                                                                i
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        d
                                                                                    }
                                                                                    <br />
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    <div className="center">
                                                                        <p
                                                                            style={{
                                                                                margin:
                                                                                    "20px",
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                to={`/folktales/${nameForUrl}`}
                                                                            >{`Read ${nameToShow} >>`}</Link>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </>
                                            ) : (
                                                <>
                                                    <h2
                                                        style={{
                                                            color: "black",
                                                            marginBottom:
                                                                "20px",
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                    >
                                                        {nameToShow}
                                                    </h2>
                                                    <Link
                                                        to={`/folktales/${nameForUrl}`}
                                                    >
                                                        <img
                                                            src={`${
                                                                consts.BLOB_URL
                                                            }/folktalesImg/${
                                                                nameForUrl.split(
                                                                    "--"
                                                                )[0]
                                                            }.png`}
                                                            width="90%"
                                                            alt={nameToShow}
                                                            title={nameToShow}
                                                        />
                                                    </Link>
                                                    <div
                                                        style={{
                                                            textAlign: "left",
                                                            margin: "10px",
                                                        }}
                                                    >
                                                        {s.description
                                                            .split("\\n")
                                                            .map((d, i) => (
                                                                <span
                                                                    key={i}
                                                                    style={{
                                                                        color:
                                                                            "black",
                                                                    }}
                                                                >
                                                                    {d}
                                                                    <br />
                                                                </span>
                                                            ))}
                                                    </div>
                                                    <p>
                                                        <Link
                                                            to={`/folktales/${nameForUrl}`}
                                                        >{`Read ${nameToShow} >>`}</Link>
                                                    </p>
                                                </>
                                            )}
                                        </article>
                                    );
                                })}
                    </div>
                    <hr />
                    <Link to="/vocabulary-list">
                        <Card
                            body
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#333",
                                color: "white",
                            }}
                        >
                            <CardTitle>Japanese Vocabulary List</CardTitle>
                            <CardText>
                                Basic Japanese Vocabulary List!
                                <br />
                                Try to memorize all the vocabulary by using the
                                quizzes!
                            </CardText>
                            <Button color="secondary">Try!</Button>
                        </Card>
                    </Link>
                    <hr />
                </main>
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
}

export default connect(
    (state: TReducers) => state.storiesTop,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesTop);
