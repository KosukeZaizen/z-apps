import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class GameOver extends React.Component {

    getParams() {
        let arg = {};
        let pair = window.location.search.substring(1).split('&');
        for (let i = 0; pair[i]; i++) {
            let kv = pair[i].split('=');
            arg[kv[0]] = kv[1];
        }
        return arg;
    }

    render() {
        this.consts = {
            BTN_START_CLASS: "btn btn-primary btn-lg btn-block",
        };
        const bottomMargin = {
            marginBottom: 20,
        };

        //urlパラメータ取得
        const params = this.getParams();

        const game = params.g || "";
        const lang = params.l || "";

        const gameUrl = "/" + game + "?l=" + lang;

        let title;
        let msgButton;
        if (lang === "Japanese") {
            title = "ゲームオーバー";
            msgButton = "続きから再開";
        } else {
            title = "Oops! You touched the enemy!";
            msgButton = "Continue the game";
        }

        return (
            <center>
                <Link to={gameUrl}>
                    <h2 style={bottomMargin} >{title}</h2>
                    <div className="contents">
                        <button className={this.consts.BTN_START_CLASS} >
                            {msgButton}
                        </button>
                    </div>
                </Link>
            </center>
        );
    }
}

export default connect()(GameOver);
