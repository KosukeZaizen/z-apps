import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import FB from './parts/FaceBook';
import Head from './parts/Helmet';
import PleaseScrollDown from './parts/PleaseScrollDown';

export default class Home extends React.Component {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <div className="home">
                <Head
                    title="Lingual Ninja"
                    desc="Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!"
                    isHome={true}
                />
                <div style={{textAlign: "center"}}>
                    <h1>Welcome to<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Lingual Ninja!</h1>
                    <div className="initial-message">
                        <p className="no-margin">Applications to learn Japanese,<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                            made by <Link to="/developer">Kosuke Zaizen</Link>.</p>
                        <p className="no-margin">I hope you enjoy!</p>
                    </div>

                    <div ref={this.ref} id="scrollTargetId">
                        <Link to="/hiragana-katakana">
                            <Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                                <CardTitle>Hiragana / Katakana</CardTitle>
                                <CardText>An app to remember Hiragana and Katakana! Let's test your memory of Hiragana and Katakana!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/vocabulary-list">
                            <Card body inverse color="primary">
                                <CardTitle>Japanese Vocabulary List</CardTitle>
                                <CardText>Japanese Vocabulary List! Try to memorize all the vocabulary using the quizzes!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/vocabulary-quiz">
                            <Card body inverse color="success">
                                <CardTitle>Japanese Vocabulary Quiz</CardTitle>
                                <CardText>An app to learn basic Japanese vocabulary! Try to get a perfect score on all the quizzes!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/kanji-quiz">
                            <Card body inverse color="danger">
                                <CardTitle>Japanese Kanji Quiz</CardTitle>
                                <CardText>An app to learn Japanese Kanji characters! Try to get a perfect score on all the quizzes!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/folktales">
                            <Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                                <CardTitle>Japanese Folktales</CardTitle>
                                <CardText>An app to learn Japanese from folktales. You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/kanji-converter">
                            <Card body inverse color="primary">
                                <CardTitle>Kanji Converter</CardTitle>
                                <CardText>A converter to change Kanji to Hiragana and Romaji. Use to know how to read Kanji!</CardText>
                                <Button color="secondary">Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/romaji-converter">
                            <Card body inverse color="success">
                                <CardTitle>Romaji Converter</CardTitle>
                                <CardText>A converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!</CardText>
                                <Button>Try!</Button>
                            </Card>
                        </Link>
                        <br />

                        <Link to="/ninja">
                            <Card body inverse color="danger">
                                <CardTitle>Lingual Ninja Game</CardTitle>
                                <CardText>Action game! Be a Ninja, and collect the scrolls in Japan!</CardText>
                                <Button color="secondary">Play!</Button>
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