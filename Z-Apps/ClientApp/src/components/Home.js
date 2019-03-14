import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Home.css';


const Home = props => (
    <div className="home">
        <center>
            <h1>Welcome to <span className="type-shine">Z-Apps</span>!</h1>
            <p>These are applications made by Kosuke Zaizen.</p>
            <p>I hope you enjoy them!</p><br />
            <Link to="/romaji-converter">Romaji Converter >></Link>
        </center>
    </div>
);

export default connect()(Home);
