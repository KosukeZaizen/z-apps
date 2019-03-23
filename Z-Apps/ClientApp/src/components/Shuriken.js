import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Shuriken.css';


const Shuriken = props => (
    <div className="home">
        <center>
            <h1>Shuriken!</h1>
        </center>
    </div>
);

export default connect()(Shuriken);
