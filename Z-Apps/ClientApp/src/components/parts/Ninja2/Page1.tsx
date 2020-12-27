import * as React from "react";
import { appsPublicImg } from "../../../common/consts";
const logo = appsPublicImg + "game-logo-2.png";

export default class Page1 extends React.Component {
    consts: any;
    state: any;
    props: any;

    constructor(props: any) {
        super(props);
        this.consts = {
            BTN_START_CLASS: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            topImage: true,
        };
    }

    hideTopImage() {
        this.setState({ topImage: false });
    }

    render() {
        const bottomMargin = {
            marginBottom: 10,
        };
        const screenHeight = window.innerHeight;
        return (
            <div id="page1">
                <span
                    onClick={() => {
                        this.hideTopImage();
                    }}
                >
                    <TopImage topImage={this.state.topImage} />
                </span>
                <h2 style={{ color: "white", marginBottom: 10 }}>
                    Which language do you prefer?
                </h2>
                {screenHeight > 360 ? (
                    <span>
                        <span
                            onClick={() => {
                                this.props.changePage(2, "English");
                            }}
                        >
                            <button
                                style={bottomMargin}
                                className={this.consts.BTN_START_CLASS}
                            >
                                {"English"}
                            </button>
                        </span>
                        <span
                            onClick={() => {
                                this.props.changePage(2, "Japanese");
                            }}
                        >
                            <button
                                style={bottomMargin}
                                className={this.consts.BTN_START_CLASS}
                            >
                                {"日本語"}
                            </button>
                        </span>
                    </span>
                ) : (
                    <span>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <span
                                            onClick={() => {
                                                this.props.changePage(
                                                    2,
                                                    "English"
                                                );
                                            }}
                                        >
                                            <button
                                                style={{
                                                    ...bottomMargin,
                                                    width: "80%",
                                                }}
                                                className={
                                                    this.consts.BTN_START_CLASS
                                                }
                                            >
                                                {"English"}
                                            </button>
                                        </span>
                                    </td>
                                    <td align="center">
                                        <span
                                            onClick={() => {
                                                this.props.changePage(
                                                    2,
                                                    "Japanese"
                                                );
                                            }}
                                        >
                                            <button
                                                style={{
                                                    ...bottomMargin,
                                                    width: "80%",
                                                }}
                                                className={
                                                    this.consts.BTN_START_CLASS
                                                }
                                            >
                                                {"日本語"}
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </span>
                )}
                <br />
                <div className="center" style={{ color: "white" }}>
                    If you want to be a real Ninja, please check this:
                    <br />
                    <a
                        href="https://www.lingual-ninja.com/2018/09/how-to-be-ninja.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {"How to be a Ninja >>"}
                    </a>
                </div>
                <br />
                <br />
            </div>
        );
    }
}

function TopImage(props: any) {
    if (props.topImage) {
        return (
            <h1>
                <img
                    width="100%"
                    src={logo}
                    alt="Lingual Ninja Games - Castle Of The Maze"
                />
            </h1>
        );
    } else {
        return <span></span>;
    }
}

export { Page1 };
