import * as React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import { getParams } from "../common/functions";
import "../css/Terms.css";
import Head from "./parts/Helmet";
const img404 = require("../img/404.png");

const NotFound = () => {
    const params = getParams();

    return (
        <div>
            <Head title="404" noindex={true} />
            <div className="center">
                <h1>Page not found!</h1>
                <hr />
                <img src={img404} width="50%" alt="404 error" />
                <h2>
                    No match for <code>{params && params["p"]}</code>
                </h2>
                <p>Please check if the url is correct!</p>
                <Link to="/">
                    <Button color="primary" style={{ width: "50%" }}>
                        <b>Home</b>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default NotFound;
