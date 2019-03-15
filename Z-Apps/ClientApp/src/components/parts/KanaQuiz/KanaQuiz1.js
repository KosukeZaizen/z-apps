import React from 'react';


export default class Quiz1 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            START_BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            maxChar: 0,
        };
    }

    startGame(maxChar) {
        this.props.setMaxChar(maxChar);
        this.props.changePage(2);
    }

    render() {
        return (
            <div id="disp1">
                <h1>{this.props.consts.KANA_TYPE} Quiz!</h1>
                <p>
                    Please bookmark this page to remember all {this.props.consts.KANA_TYPE} characters!
                </p>
                <br />
                <button
                    id="btn10"
                    onClick={() => this.startGame(10) }
                    className={this.consts.START_BUTTON_PRIMARY}
                >
                    Random 10 characters
                </button>
                <br />

                <button
                    id="btn30"
                    onClick={() => this.startGame(30)}
                    className={this.consts.START_BUTTON_SUCCESS}
                >
                    Random 30 characters
                </button>
                <br />

                <button
                    id="btn102"
                    onClick={() => this.startGame(102)}
                    className={this.consts.START_BUTTON_DANGER}
                >
                    All {this.props.consts.KANA_TYPE} characters
                </button>
                <br />
                <hr />
                <br />
                <button
                    id="btnOther"
                    onClick={() => "start(102)"}
                    className={this.consts.START_BUTTON_DARK}
                >
                    {this.props.consts.OTHER_KANA_TYPE} Quiz
                </button>
                <br />
            </div>
        );
    }
}

export { Quiz1 };