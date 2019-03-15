import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


const Home = props => (
    <div className="home">
        <center>
            <h1>Welcome to<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Z-Apps!</h1>
            <div className="initial-message">
            <p className="no-margin">These are applications made by <Link to="/developer">Kosuke Zaizen</Link>.</p>
                <p className="no-margin">I hope you enjoy them!</p>
            </div>

            <Link className="app-button" to="/romaji-converter">
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle>Romaji Converter</CardTitle>
                    <CardText>This is a converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!</CardText>
                    <Button>Try!</Button>
                </Card>
            </Link>
            <br />
            <Link to="/hiragana-quiz">
                <Card body inverse color="primary">
                    <CardTitle>Hiragana Quiz</CardTitle>
                    <CardText>This is an app to remember Hiragana! I hope it helps you study somehow.</CardText>
                    <Button color="secondary">Try!</Button>
                </Card>
            </Link>
            <br />
            <Card body inverse color="success">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="secondary">Button</Button>
            </Card>

            {/*}
            <br />
            <Card body inverse color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="secondary">Button</Button>
            </Card>
            <br />
            <Card body inverse color="warning">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="secondary">Button</Button>
            </Card>
            <br />
            <Card body inverse color="danger">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="secondary">Button</Button>
            </Card>
            */}

        </center>
    </div>
);

export default connect()(Home);
