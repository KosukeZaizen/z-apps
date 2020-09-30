import * as React from "react";
import "../css/Developer.css";
import FB from "./parts/FaceBook";
import Head from "./parts/Helmet";
import PleaseScrollDown from "./parts/PleaseScrollDown";
const image = require("../img/KosukeZaizen.jpg");

function SayHello() {
    return (
        <p>
            <b>Hello! I'm Kosuke Zaizen!</b>
            <br />
            <br />
            Thank you for using Lingual Ninja!
            <br />
            I am a Japanese software engineer.
            <br />
            Lingual Ninja is a website for Japanese learners.
            <br />I hope Lingual Ninja can help!
        </p>
    );
}

export default class Developer extends React.Component {
    ref: React.RefObject<HTMLHRElement>;

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <div className="developer">
                <Head
                    title="Kosuke Zaizen"
                    desc="I am a Japanese software engineer. Lingual Ninja is a website for Japanese learners. I hope Lingual Ninja can help!"
                />
                <div className="center">
                    <h1>Kosuke Zaizen</h1>

                    <div className="contents">
                        <hr id="scrollTargetId" />
                        <span className="hidden-xs">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                width="200px"
                                                src={image}
                                                alt="Kosuke Zaizen"
                                            />
                                        </td>
                                        <td
                                            className="tdExplanation"
                                            valign="top"
                                        >
                                            <SayHello />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                        <span className="visible-xs">
                            <div className="center">
                                <img
                                    width="200px"
                                    src={image}
                                    alt="Kosuke Zaizen"
                                />
                                <br />
                                <br />
                                <SayHello />
                            </div>
                        </span>
                        <hr ref={this.ref} />
                        <br />
                        <div className="center">
                            <p className="no-margin">
                                I am writing a blog for people
                                <span className="hidden-xs"> </span>
                                <span className="visible-xs">
                                    <br />
                                </span>
                                studying Japanese!:
                            </p>
                            <br />
                            <b>
                                <a
                                    href="https://www.lingual-ninja.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {"Lingual Ninja! >>"}
                                </a>
                            </b>

                            <br />
                            <br />
                            <br />
                            <p className="no-margin">
                                Also, this is my Japanese blog!:
                            </p>
                            <br />
                            <b>
                                <a
                                    href="https://web.lingual-ninja.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {"IT / Web技術 >>"}
                                </a>
                            </b>

                            <br />
                            <br />
                            <hr />
                            <FB />
                        </div>
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
