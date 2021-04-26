import * as React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardText from "reactstrap/lib/CardText";
import CardTitle from "reactstrap/lib/CardTitle";
import { cFetch } from "../common/util/cFetch";
import "../css/Home.css";
import { Page } from "./Articles";
import { ArticlesList } from "./Articles/Top";
import { SeasonAnimation } from "./parts/Animations/SeasonAnimation";
import { Author } from "./parts/Author";
import CharacterComment from "./parts/CharacterComment";
import FB from "./parts/FaceBook";
import { FolktaleMenu } from "./parts/FolktaleMenu";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";

export default class Home extends React.Component<
    {},
    {
        screenWidth: number;
        imgNumber: 1 | 2 | 3;
        articles: Page[];
    }
> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            imgNumber: this.getImgNumber(),
            articles: [],
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
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }

        void this.fetchArticles();
    }

    fetchArticles = async () => {
        const url = "api/Articles/GetNewArticles?num=10";
        const response: Response = await cFetch(url);
        const articles: Page[] = await response.json();

        this.setState({ articles });
    };

    changeScreenSize = () => {
        if (this.state.screenWidth !== window.innerWidth) {
            this.setState({
                screenWidth: window.innerWidth,
            });
        }
    };

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate();
        const mod = todayNumber % 27;
        if (mod > 25) return 3;
        if (mod > 23) return 2;
        return 1;
    };

    render() {
        const { screenWidth, imgNumber, articles } = this.state;
        const isWide = screenWidth > 991;
        const cardMargin = 5;
        return (
            <div className="home">
                <Head
                    title="Lingual Ninja - Learn Japanese Online"
                    desc="Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!"
                    isHome={true}
                />
                <div style={{ textAlign: "center" }}>
                    <h1 className="whiteShadow" style={{ lineHeight: 1.3 }}>
                        Welcome to{" "}
                        <span style={{ display: "inline-block" }}>
                            Lingual Ninja!
                        </span>
                    </h1>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment={
                            <span>
                                Free web app to learn Japanese,
                                <br />
                                made by{" "}
                                <Link to="/developer">Kosuke Zaizen</Link>.
                                <br />I hope you enjoy!
                            </span>
                        }
                        style={isWide ? {} : { margin: "auto auto 40px auto" }}
                    />
                    <div ref={this.ref} id="scrollTargetId">
                        <FolktaleMenu screenWidth={screenWidth} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: isWide ? "row" : "column",
                            }}
                        >
                            <Link
                                to="/hiragana-katakana"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    style={{
                                        backgroundColor: "#333",
                                        borderColor: "#333",
                                        color: "white",
                                        height: "100%",
                                    }}
                                >
                                    <CardTitle>Hiragana / Katakana</CardTitle>
                                    <CardText>
                                        A web app to remember Hiragana and
                                        Katakana! Let's test your memory of
                                        Hiragana and Katakana!
                                    </CardText>
                                    <Button
                                        color="secondary"
                                        style={{ marginTop: "auto" }}
                                    >
                                        Try!
                                    </Button>
                                </Card>
                            </Link>

                            <Link
                                to="/vocabulary-list"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    inverse
                                    color="primary"
                                    style={{ height: "100%" }}
                                >
                                    <CardTitle>
                                        Japanese Vocabulary List
                                    </CardTitle>
                                    <CardText>
                                        Basic Japanese Vocabulary List! Try to
                                        memorize all the vocabulary by using the
                                        quizzes!
                                    </CardText>
                                    <Button
                                        color="secondary"
                                        style={{ marginTop: "auto" }}
                                    >
                                        Try!
                                    </Button>
                                </Card>
                            </Link>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: isWide ? "row" : "column",
                            }}
                        >
                            <Link
                                to="/vocabulary-quiz"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    inverse
                                    color="success"
                                    style={{ height: "100%" }}
                                >
                                    <CardTitle>
                                        Japanese Vocabulary Quiz
                                    </CardTitle>
                                    <CardText>
                                        A web app to learn basic Japanese
                                        vocabulary! Try to get a perfect score
                                        on all the quizzes!
                                    </CardText>
                                    <Button
                                        style={{ marginTop: "auto" }}
                                        color="secondary"
                                    >
                                        Try!
                                    </Button>
                                </Card>
                            </Link>

                            <Link
                                to="/kanji-quiz"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    inverse
                                    color="danger"
                                    style={{ height: "100%" }}
                                >
                                    <CardTitle>Japanese Kanji Quiz</CardTitle>
                                    <CardText>
                                        A web app to learn Japanese Kanji
                                        characters! Try to get a perfect score
                                        on all the quizzes!
                                    </CardText>
                                    <Button
                                        color="secondary"
                                        style={{ marginTop: "auto" }}
                                    >
                                        Try!
                                    </Button>
                                </Card>
                            </Link>

                            <Link
                                to="/ninja"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    style={{
                                        backgroundColor: "#333",
                                        borderColor: "#333",
                                        color: "white",
                                        height: "100%",
                                    }}
                                >
                                    <CardTitle>Lingual Ninja Game</CardTitle>
                                    <CardText>
                                        Action game! Be a Ninja, and collect the
                                        scrolls in Japan!
                                    </CardText>
                                    <Button
                                        color="secondary"
                                        style={{ marginTop: "auto" }}
                                    >
                                        Play!
                                    </Button>
                                </Card>
                            </Link>
                        </div>

                        <CharacterComment
                            style={{ marginTop: 20, marginBottom: 20 }}
                            screenWidth={screenWidth}
                            imgNumber={imgNumber - 1 || 3}
                            comment={"Enjoy studying Japanese!"}
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: isWide ? "row" : "column",
                            }}
                        >
                            <Link
                                to="/kanji-converter"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    inverse
                                    color="primary"
                                    style={{ height: "100%" }}
                                >
                                    <CardTitle>Kanji Converter</CardTitle>
                                    <CardText>
                                        A converter to change Kanji to Hiragana
                                        and Romaji. Use to know how to read
                                        Kanji!
                                    </CardText>
                                    <Button
                                        color="secondary"
                                        style={{ marginTop: "auto" }}
                                    >
                                        Try!
                                    </Button>
                                </Card>
                            </Link>

                            <Link
                                to="/romaji-converter"
                                style={{ margin: cardMargin, flex: 1 }}
                            >
                                <Card
                                    body
                                    inverse
                                    color="success"
                                    style={{ height: "100%" }}
                                >
                                    <CardTitle>Romaji Converter</CardTitle>
                                    <CardText>
                                        A converter to change Hiragana and
                                        Katakana to Romaji. Use when you need to
                                        know Romaji!
                                    </CardText>
                                    <Button style={{ marginTop: "auto" }}>
                                        Try!
                                    </Button>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
                <Author screenWidth={screenWidth} />
                <hr />
                <section
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxWidth: 900,
                    }}
                >
                    <h2
                        className="markdownH2"
                        style={{ marginBottom: 55, textAlign: "center" }}
                    >
                        New Articles
                    </h2>
                    <ArticlesList
                        titleH={"h3"}
                        articles={articles}
                        screenWidth={screenWidth}
                    />
                    <div style={{ textAlign: "center", marginBottom: 50 }}>
                        <Link
                            to="/articles"
                            style={{
                                fontSize: "xx-large",
                            }}
                        >
                            {"More articles about Japan >>"}
                        </Link>
                    </div>
                </section>
                <FB />
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    targetId="scrollTargetId"
                />
                <SeasonAnimation frequencySec={2} screenWidth={screenWidth} />
            </div>
        );
    }
}
