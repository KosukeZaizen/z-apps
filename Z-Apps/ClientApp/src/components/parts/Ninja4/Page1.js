import React from 'react';
import logo from './img/logo.png';


export default class Page1 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            BTN_START_CLASS: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            topImage: true,
        };
    }

    hideTopImage() {
        this.setState({ topImage: false, });
    }

    render() {
        const bottomMargin = {
            marginBottom: 10,
        };
        const screenHeight = parseInt(window.innerHeight, 10);
        return (
            <div id="page1">
                <span onClick={() => { this.hideTopImage() }}>
                    <TopImage topImage={this.state.topImage} />
                </span>
                <br />
                <br />
                <h2 style={{ color: "white", marginBottom: 10, }} >Which language do you prefer?</h2>
                {
                    screenHeight > 360 ?
                        <span>
                            <span onClick={() => { this.props.changePage(2, "English") }}>
                                <button
                                    style={bottomMargin}
                                    className={this.consts.BTN_START_CLASS}
                                >
                                    {"English"}
                                </button>
                            </span>
                            <span onClick={() => { this.props.changePage(2, "Japanese") }}>
                                <button
                                    style={bottomMargin}
                                    className={this.consts.BTN_START_CLASS}
                                >
                                    {"日本語"}
                                </button>
                            </span>
                        </span>
                        :
                        <span>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <span onClick={() => { this.props.changePage(2, "English") }}>
                                                <button
                                                    style={{ ...bottomMargin, width: "80%" }}
                                                    className={this.consts.BTN_START_CLASS}
                                                >
                                                    {"English"}
                                                </button>
                                            </span>
                                        </td>
                                        <td align="center">
                                            <span onClick={() => { this.props.changePage(2, "Japanese") }}>
                                                <button
                                                    style={{ ...bottomMargin, width: "80%" }}
                                                    className={this.consts.BTN_START_CLASS}
                                                >
                                                    {"日本語"}
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                }
                <br />
                <center style={{ color: "white" }}>
                    If you want to be a real Ninja, please check this:<br />
                    <a
                        href="https://www.lingual-ninja.com/2018/09/how-to-be-ninja.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        How to be a Ninja >>
                        </a>
                </center>
                <br />
                <br />
            </div>
        );
    }
}

function TopImage(props) {
    if (props.topImage) {
        return <img width="100%" src={logo} alt="Japanese Ninja Game" />;
    } else {
        return <span></span>;
    }
}

export { Page1 };