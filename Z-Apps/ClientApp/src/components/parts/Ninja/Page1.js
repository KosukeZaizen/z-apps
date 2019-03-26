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
                <span onClick={() => { this.props.changePage(2) }}>
                <img width="100%" src={logo} alt="Shuriken Master" />
                <button
                    className={this.consts.BTN_START_STYLE}
                >
                    {this.consts.BTN_START_LABEL}
                    </button>
                    </span>
                <br />

                <center>
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