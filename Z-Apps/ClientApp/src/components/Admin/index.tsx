import * as React from "react";
import { Link } from "react-router-dom";
import Helmet from "../parts/Helmet";

export default function Admin() {
    return (
        <div>
            <Helmet title="admin" noindex />
            <ul>
                <li>
                    <Link to="/apiCache">Api Cache</Link>
                </li>
                <li>
                    <Link to="/opeLogTable">Ope Log</Link>
                </li>
                <li>
                    <Link to="/game-to-learn-japanese">Game to learn</Link>
                </li>
            </ul>
        </div>
    );
}
