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

        const params = this.getParams();

        const game = params.g || "";
        const lang = params.l || "";

        //urlパラメータ取得
        const gameUrl = "/" + game + "?l=" + lang;

        return (
            <center>
                <Link to={gameUrl}>
                    <h2 style={bottomMargin} >Oops! You touched the enemy!</h2>
                    <div className="contents">
                        <button className={this.consts.BTN_START_CLASS} >
                            {"Continue the game"}
                        </button>
                    </div>
                </Link>
            </center>
        );
    }
}

export default connect()(GameOver);
