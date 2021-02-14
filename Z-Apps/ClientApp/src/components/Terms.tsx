import * as React from "react";
import { Link } from "react-router-dom";
import "../css/Terms.css";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";

export default class Terms extends React.Component {
    ref: React.RefObject<HTMLHRElement>;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <div className="terms">
                <Head
                    title="Terms of Use"
                    desc="Lingual Ninja - The ownership of website and Responsibility"
                />
                <div className="center">
                    <h1 id="scrollTargetId" style={{ lineHeight: 1.2 }}>
                        Lingual Ninja{" "}
                        <span style={{ display: "block" }}>Terms of Use</span>
                    </h1>
                    <div className="contents">
                        <hr />
                        <h2>The ownership of website</h2>
                        <p>
                            This website is developed and owned by{" "}
                            <Link to="/developer">Kosuke Zaizen</Link>. When you
                            want to use any quotes, images, or programs, you
                            must get approval from the owner.
                        </p>
                        <hr ref={this.ref} />
                        <h2>Responsibility</h2>
                        <p>
                            If user experiences trouble including defects or
                            bugs, the owner of this website can't be held
                            liable. It will be user's responsibility.
                        </p>
                        <hr />
                        <h2>Contact</h2>
                        If you have trouble, please contact using this link:
                        <br />
                        <a
                            href="https://uni-browser.lingual-ninja.com/?pageId=4"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {"　uni-browser >>"}
                        </a>
                    </div>
                    <PleaseScrollDown
                        criteriaRef={this.ref}
                        targetId="scrollTargetId"
                    />
                </div>
            </div>
        );
    }
}
