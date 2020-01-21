import React from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo1 from './parts/Ninja/img/logo.png';
import logo2 from './parts/Ninja2/img/logo.png';
import logo3 from './parts/Ninja3/img/logo.png';
import Head from './parts/Helmet';
import { isGoogleAdsDisplayed } from './parts/GoogleAd';
import FB from './parts/FaceBook';

const NinjaGameTop = () => {

    if (isGoogleAdsDisplayed) {
        // Adsenseが表示されているときに遷移があった場合はリロードし、
        // 自動広告によってゲームが邪魔されることを防ぐ
        window.location.reload();

        return (
            <center>
                <CircularProgress key="circle" size="20%" />
            </center>
        );
    }

    return (
        <div className="ninjaGameTop" style={{ fontSize: "large" }}>
            <Head
                title="Lingual Ninja Games"
                desc="Japanese action game! Be a Ninja, and collect the scrolls in Japan!"
            />
            <center><h1>Lingual Ninja Games</h1></center>
            <br />
            <Link to="/ninja1">
                Chapter1: Scrolls Of The Four Elements<br />
                <img width="100%" src={logo1} alt="Ninja Game 1" />
            </Link>
            <br />
            <br />
            <Link to="/ninja2">
                Chapter2: Castle Of The Maze<br />
                <img width="100%" src={logo2} alt="Ninja Game 2" />
            </Link>
            <br />
            <br />
            <Link to="/ninja3">
                Chapter3: Frozen Nightmare<br />
                <img width="100%" src={logo3} alt="Ninja Game 3" />
            </Link>
            <br />
            <br />
            <FB />
        </div>
    );
}

export default NinjaGameTop;