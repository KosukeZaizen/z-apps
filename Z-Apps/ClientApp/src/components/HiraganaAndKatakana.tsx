import * as React from 'react';
import { Link } from 'react-router-dom';
import './parts/KanaQuiz/KanaQuiz.css';
import FB from './parts/FaceBook';
import GoogleAd from './parts/GoogleAd';
import Head from './parts/Helmet';
import CharacterComment from './parts/VocabQuiz/CharacterComment';
import PleaseScrollDown from './parts/PleaseScrollDown';
import { Button } from 'reactstrap';

type TState = {
    screenWidth: number;
    screenHeight: number;
    pleaseScrollDown: boolean;
    imgNumber: number;
};
class HiraganaAndKatakana extends React.Component<{}, TState> {
    ref: React.RefObject<HTMLHeadingElement>;

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pleaseScrollDown: false,
            imgNumber: this.getImgNumber(),
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
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    changeScreenSize = () => {
        if (this.state.screenWidth !== window.innerWidth || this.state.screenHeight !== window.innerHeight) {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        }
    }

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = (today.getMonth() + today.getDate());
        const mod = todayNumber % 27;
        if (mod > 20) return 1;
        if (mod > 8) return 2;
        return 3;
    }

    render() {
        const { screenWidth, imgNumber } = this.state;

        return (
            <div className="kana-quiz center">
                <Head
                    title="Hiragana / Katakana Quiz"
                    desc="Free app to remember Japanese Hiragana and Katakana characters! Try to get a perfect score on all the quizzes!"
                />
                <div style={{ maxWidth: "700px" }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    {"Home"}
                                </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                {"Hiragana and Katakana"}
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1
                        id="h1title"
                        style={{
                            margin: "25px",
                            lineHeight: "45px",
                            fontWeight: "bold",
                        }}
                    >
                        {"Hiragana and Katakana"}
                    </h1>
                    <br />
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment={["Free app to remember Japanese Hiragana and Katakana characters!", <br />, "Try to get a perfect score on all the quizzes!"]}
                    />
                    <br />

                    <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                        <h2 ref={this.ref}>Hiragana</h2>
                        <div style={{ margin: "10px" }}>Hiragana is the most basic character in the Japanese language!<br />Let's test your memory of Hiragana!</div>
                        <Link to="/hiragana-quiz">
                            <Button style={{ margin: 5 }} color="primary">Hiragana Quiz</Button>
                        </Link>
                        <a href="https://www.lingual-ninja.com/2018/07/hiragana-list.html">
                            <Button style={{ margin: 5 }} color="primary">Hiragana Chart</Button>
                        </a>
                    </div>
                    <hr />

                    <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                        <h2>Katakana</h2>
                        <div style={{ margin: "10px" }}>Katakana is similar to Hiragana!<br />Try to get a perfect score!</div>
                        <Link to="/katakana-quiz">
                            <Button style={{ margin: 5 }} color="success">Katakana Quiz</Button>
                        </Link>
                        <a href="https://www.lingual-ninja.com/2018/08/katakana-chart.html">
                            <Button style={{ margin: 5 }} color="success">Katakana Chart</Button>
                        </a>
                    </div>
                    <hr />

                    <Link to="/vocabulary-list">
                        <button
                            className="btn btn-dark btn-lg btn-block"
                        >
                            {"Japanese Vocabulary List"}
                        </button>
                    </Link>
                    <hr />
                </div>
                <div style={{ fontSize: "x-large", margin: "20px" }}>
                    <Link to="/folktales">Learn Japanese from Japanese folktales >></Link>
                </div>
                <br />
                <FB />
                <br />
                <GoogleAd />
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    screenWidth={screenWidth}
                    targetId="h1title"
                />
            </div>
        );
    }
}
export default HiraganaAndKatakana;