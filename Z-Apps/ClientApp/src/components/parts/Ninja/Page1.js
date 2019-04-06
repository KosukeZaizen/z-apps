import React from 'react';
import logo from './img/logo.png';


export default class Page1 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            BTN_START_STYLE: "btn btn-dark btn-lg btn-block",
            BTN_START_LABEL: "Game start!",
        };
        this.state = {
        };
    }

    render() {
        return (
            <div id="page1">
                <h1>Which language do you prefer?</h1>
                <span onClick={() => { this.props.changePage(2, "English") }}>
                    <button
                        className={this.consts.BTN_START_STYLE}
                    >
                        {"English"}
                    </button>
                </span>
                <span onClick={() => { this.props.changePage(2, "Japanese") }}>
                    <button
                        className={this.consts.BTN_START_STYLE}
                    >
                        {"Japanese"}
                    </button>
                </span>
            <br />
                <img width="100%" src={logo} alt="Shuriken Master" />

                <br />
                <span onClick={() => { this.props.changePage(2, "Japanese") }}>
                    Japanese
                    </span>

                <center style={{color:"white"}}>
                    If you want to be a real Ninja,<br />
                    please check this:<br />
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

export { Page1 };