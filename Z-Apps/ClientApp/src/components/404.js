import React from 'react';
import { connect } from 'react-redux';
import '../css/Terms.css';
import img404 from '../img/404.png';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const NotFound = props => (
    <div>
        <center>
            <h1>Page not found!</h1>
            <hr />
            <img
                src={img404}
                width="50%"
            />
            <p>Please check if the url is correct!</p><br />
            <Link to="/">
                <Button color="primary">Home</Button>
            </Link>
        </center>
    </div>
);

export default connect()(NotFound);
