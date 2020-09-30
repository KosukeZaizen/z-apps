import * as React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="center">
                <div className="container text-muted">
                    <span className="text-muted">
                        Copyright <Link to="/developer">Kosuke Zaizen</Link>.
                        All rights reserved.
                        <span className="hidden-xs">　　</span>
                        <span className="visible-xs">
                            <br />
                        </span>
                    </span>
                    <Link to="/terms">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
}
