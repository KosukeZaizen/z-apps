import React from 'react';
import '../css/Terms.css';
import img404 from '../img/404.png';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getParams } from './common/functions';
import { Redirect } from 'react-router';

export const NotFound = props => {
    const params = getParams();

    return (
        <div>
            <center>
                <h1>Page not found!</h1>
                <hr />
                <img
                    src={img404}
                    width="50%"
                />
                <h2>No match for <code>{params && params.p}</code></h2>
                <p>Please check if the url is correct!</p>
                <Link to="/">
                    <Button color="primary" style={{ width: "50%" }}><b>Home</b></Button>
                </Link>
            </center>
        </div>
    )
};

export const NotFoundRedirect = ({ location }) => <Redirect to={`/not-found?p=${location.pathname}`} />