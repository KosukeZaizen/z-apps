import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const styles = StyleSheet.create({
    sp: {
        "@media (max-width: 600px)": {
            marginTop: 8,
        },
    },
});

export default function Footer() {
    return (
        <footer className="footer">
            <div className="center">
                <div className="container text-muted">
                    Copyright <Link to="/developer">Kosuke Zaizen</Link>. All
                    rights reserved.{" "}
                    <Link
                        to="/terms"
                        style={{ display: "inline-block" }}
                        className={css(styles.sp)}
                    >
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}
