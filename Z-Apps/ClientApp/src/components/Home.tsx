import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import "../css/Home.css";
import FB from "./parts/FaceBook";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";
import CharacterComment from "./parts/VocabQuiz/CharacterComment";

export default class Home extends React.Component<
    {},
    {
        screenWidth: number;
        imgNumber: 1 | 2 | 3;
    }
> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            imgNumber: this.getImgNumber(),
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
    }

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
        if (mod > 35) return 3;
        if (mod > 30) return 2;
        return 1;
    };

    render() {
        const { screenWidth, imgNumber } = this.state;
        return (
            <div className="home">
                <Head
                    title="Lingual Ninja"
                    desc="Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!"
                    isHome={true}
                />
                <div style={{ textAlign: "center" }}>
                    <h1>
                        Welcome to<span className="hidden-xs"> </span>
                        <span className="visible-xs">
                            <br />
                        </span>
                        Lingual Ninja!
                    </h1>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment={
                            <p>
                                Free app to learn Japanese,
                                {screenWidth < 800 ? <br /> : " "}
                                made by{" "}
                                <Link to="/developer">Kosuke Zaizen</Link>.
                                <br />I hope you enjoy!
                            </p>
                        }
                    />
                    <br />
                    <div ref={this.ref} id="scrollTargetId">
                        <Link to="/folktales">
                            <Card
                                body
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333",
                                    color: "white",
                                }}
                            >
                                <CardTitle>Japanese Folktales</CardTitle>
                                <CardText>
                                    An app to learn Japanese from folktales. You
                                    can read traditional Japanese folktales in
                                    English, Hiragana, Kanji, and Romaji!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/hiragana-katakana">
                            <Card body inverse color="primary">
                                <CardTitle>Hiragana / Katakana</CardTitle>
                                <CardText>
                                    An app to remember Hiragana and Katakana!
                                    Let's test your memory of Hiragana and
                                    Katakana!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/vocabulary-quiz">
                            <Card body inverse color="success">
                                <CardTitle>Japanese Vocabulary Quiz</CardTitle>
                                <CardText>
                                    An app to learn basic Japanese vocabulary!
                                    Try to get a perfect score on all the
                                    quizzes!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/kanji-quiz">
                            <Card body inverse color="danger">
                                <CardTitle>Japanese Kanji Quiz</CardTitle>
                                <CardText>
                                    An app to learn Japanese Kanji characters!
                                    Try to get a perfect score on all the
                                    quizzes!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

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
                                    Basic Japanese Vocabulary List! Try to
                                    memorize all the vocabulary by using the
                                    quizzes!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/kanji-converter">
                            <Card body inverse color="primary">
                                <CardTitle>Kanji Converter</CardTitle>
                                <CardText>
                                    A converter to change Kanji to Hiragana and
                                    Romaji. Use to know how to read Kanji!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/romaji-converter">
                            <Card body inverse color="success">
                                <CardTitle>Romaji Converter</CardTitle>
                                <CardText>
                                    A converter to change Hiragana and Katakana
                                    to Romaji. Use when you need to know Romaji!
                                </CardText>
                                <Button>Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/ninja">
                            <Card body inverse color="danger">
                                <CardTitle>Lingual Ninja Game</CardTitle>
                                <CardText>
                                    Action game! Be a Ninja, and collect the
                                    scrolls in Japan!
                                </CardText>
                                <Button color="secondary">Play!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/dictionary">
                            <Card
                                body
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333",
                                    color: "white",
                                }}
                            >
                                <CardTitle>Japanese Dictionary</CardTitle>
                                <CardText>
                                    An app to learn the meaning of Japanese
                                    words!
                                </CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                    </div>
                </div>
                <br />
                <FB />
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    targetId="scrollTargetId"
                />
            </div>
        );
    }
}
