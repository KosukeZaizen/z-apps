import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo1 from './parts/Ninja/img/logo.png';
import logo2 from './parts/Ninja2/img/logo.png';

const NinjaGameTop = props => (
    <div className="ninjaGameTop" style={{ fontSize: "large" }}>
        <center><h1>Lingual Ninja Games</h1></center>
        <Link to="/ninja1">
            Chapter1: Scrolls Of The Four Elements<br />
            <img width="100%" src={logo1} alt="Ninja Game 1" />
        </Link>
        <br />
        <br />
        <Link to="/ninja2">
            Chapter2: Castle Of The Maze<br />
            <img width="100%" src={logo2} alt="Ninja Game 2" />
        </Link>
    </div>
);

export default connect()(NinjaGameTop);