import React from 'react';
import { Link } from 'react-router-dom';
import { getParams } from './common/functions';

class GameOver extends React.Component {

    render() {
        this.consts = {
            BTN_START_CLASS: "btn btn-primary btn-lg btn-block",
        };
        const bottomMargin = {
            marginBottom: 20,
        };

        //urlパラメータ取得
        const params = getParams();

        const game = params.g || "";
        const lang = params.l || "";

        const gameUrl = "/" + game + "?l=" + lang;

        let title;
        let msgButton;
        if (lang === "Japanese") {
            title = "Oops!　ゲームオーバー!";
            msgButton = "続きから再開";
        } else {
            title = "Oops! Game over!";
            msgButton = "Continue the game";
        }

        return (
            <center>
                <h2 style={bottomMargin} >{title}</h2>
                <Link to={gameUrl}>
                    <button className={this.consts.BTN_START_CLASS} >
                        {msgButton}
                    </button>
                </Link>
            </center>
        );
    }
}
export default GameOver;