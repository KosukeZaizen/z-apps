import React from 'react';
import logo from './img/logo.png';


export default class Page1 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            BTN_START_CLASS: "btn btn-dark btn-lg btn-block",
            BTN_START_LABEL: "Game start!",
        };
        this.state = {
            topImage: true,
        };
    }

    hideTopImage() {
        this.setState({ topImage: false, });
    }

    render() {
        return (
            <div id="page1">
                <span onClick={() => { this.hideTopImage() }}>
                    <TopImage topImage={this.state.topImage} />
                </span>
                <br />
                <br />
                <h1 style={{ color: "white", }}>Which language do you prefer?</h1>
                <br />
                <span onClick={() => { this.props.changePage(2, "English") }}>
                    <button
                        className={this.consts.BTN_START_CLASS}
                    >
                        {"English"}
                    </button>
                </span>
                <br />
                <span onClick={() => { this.props.changePage(2, "Japanese") }}>
                    <button
                        className={this.consts.BTN_START_CLASS}
                    >
                        {"日本語"}
                    </button>
                </span>
                <br />
                <center style={{color:"white"}}>
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
        return <img width="100%" src={logo} alt="Shuriken Master" />;
    } else {
        return <span></span>;
    }
}

export { Page1 };