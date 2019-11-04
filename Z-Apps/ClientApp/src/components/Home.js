import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Head from './parts/Helmet';

const Home = props => (
    <div className="home">
        <Head
            title="Lingual Ninja"
            desc="Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!"
        />
        <center>
            <h1>Welcome to<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Lingual Ninja!</h1>
            <div className="initial-message">
                <p className="no-margin">Applications to learn Japanese,<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                    made by <Link to="/developer">Kosuke Zaizen</Link>.</p>
                <p className="no-margin">I hope you enjoy!</p>
            </div>

            <Link to="/hiragana-quiz">
                <Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                    <CardTitle>Hiragana / Katakana Quiz</CardTitle>
                    <CardText>An app to remember Hiragana and Katakana! I hope this will help you to study.</CardText>
                    <Button color="secondary">Try!</Button>
                </Card>
            </Link>
            <br />

            <Link to="/folktales">
                <Card body inverse color="primary">
                    <CardTitle>Japanese Folktales</CardTitle>
                    <CardText>An app to learn Japanese from folktales. You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!</CardText>
                    <Button color="secondary">Try!</Button>
                </Card>
            </Link>
            <br />

            <Link to="/kanji-converter">
                <Card body inverse color="success">
                    <CardTitle>Kanji Converter</CardTitle>
                    <CardText>A converter to change Kanji to Hiragana and Romaji. Use to know how to read Kanji!</CardText>
                    <Button color="secondary">Try!</Button>
                </Card>
            </Link>
            <br />

            <Link to="/romaji-converter">
                <Card body inverse color="danger">
                    <CardTitle>Romaji Converter</CardTitle>
                    <CardText>A converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!</CardText>
                    <Button>Try!</Button>
                </Card>
            </Link>
            <br />

            <Link to="/ninja">
                <Card body inverse color="warning">
                    <CardTitle>Lingual Ninja Game</CardTitle>
                    <CardText>Action game! Be a Ninja, and collect the scrolls in Japan!</CardText>
                    <Button color="secondary">Play!</Button>
                </Card>
            </Link>
            <br />

            <Link to="/color-code">
                <Card body inverse color="info">
                    <CardTitle>Color Code Getter</CardTitle>
                    <CardText>Get the Color Code of your favolite color!</CardText>
                    <Button color="secondary">Try!</Button>
                </Card>
            </Link>

        </center>
    </div>
);
export default Home;