import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import FB from "./parts/FaceBook";
import Head from "./parts/Helmet";

class HowToReadTop extends React.Component<
    {},
    {
        words: string[];
    }
> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);

        this.state = {
            words: [],
        };

        this.ref = React.createRef();
    }

    componentDidMount() {
        const getData = async () => {
            const url = `api/Wiki/GetAllWords?num=1000`;
            const response = await fetch(url);
            const words = await response.json();

            this.setState({
                words: words.sort().reverse(),
            });

            setTimeout(async () => {
                const url = `api/Wiki/GetAllWords?num=0`;
                const response = await fetch(url);
                const words = await response.json();

                this.setState({
                    words: words.sort().reverse(),
                });
            }, 1000);
        };
        getData();
    }

    render() {
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
                    desc="Free website to learn how to read Japanese! You can learn a lot of Japanese words from this page!"
                    noindex
                />
                <div style={{ maxWidth: 700 }}>
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
                                How to read Japanese
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1
                        style={{
                            margin: "30px",
                            lineHeight: "40px",
                        }}
                    >
                        <b>How to read Japanese</b>
                    </h1>
                    <p style={styleForAboutTitle}>
                        Free website to learn how to read Japanese!
                        <br />
                        You can learn a lot of Japanese words from this page!
                    </p>
                    <br />
                    {this.state.words.length > 0 ? (
                        this.state.words.map(w => (
                            <div key={w}>
                                <a
                                    href={
                                        "how-to-read-japanese/" +
                                        encodeURIComponent(w)
                                    }
                                >
                                    {w}
                                </a>
                            </div>
                        ))
                    ) : (
                        <CircularProgress key="circle" size="20%" />
                    )}
                    <hr />
                    <div style={{ fontSize: "x-large", margin: "20px" }}>
                        <Link to="/folktales">
                            {"Learn Japanese from Japanese folktales >>"}
                        </Link>
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
                </div>
                <FB />
            </div>
        );
    }
}

export default HowToReadTop;
