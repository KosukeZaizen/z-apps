import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appsPublicImg } from "../../common/consts";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import FB from "../parts/FaceBook";
import { isGoogleAdsDisplayed } from "../parts/GoogleAd";
import Head from "../parts/Helmet";

const logo1 = appsPublicImg + "game-logo-1.png";
const logo2 = appsPublicImg + "game-logo-2.png";
const logo3 = appsPublicImg + "game-logo-3.png";

const NinjaGameTop = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                setWidth(window.innerWidth);
            }, 100);
        };

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setWidth(window.innerWidth);
            }, i * 1000);
        }

        return () => {
            window.onresize = null;
        };
    }, []);

    if (isGoogleAdsDisplayed) {
        // Adsenseが表示されているときに遷移があった場合はリロードし、
        // 自動広告によってゲームが邪魔されることを防ぐ
        window.location.reload();

        return (
            <div className="center">
                <ShurikenProgress key="circle" size="20%" />
            </div>
        );
    }

    return (
        <div className="ninjaGameTop" style={{ fontSize: "large" }}>
            <Head
                title="Lingual Ninja Games"
                desc="Japanese action game! Be a Ninja, and collect the scrolls in Japan!"
            />
            <div className="center" style={{ marginTop: 15 }}>
                <h1>Lingual Ninja Games</h1>
            </div>
            <br />
            <Link to="/ninja1">
                Chapter1: Scrolls Of The Four Elements
                <br />
                <img width="100%" src={logo1} alt="Ninja Game 1" />
            </Link>
            <br />
            <br />
            <Link to="/ninja2">
                Chapter2: Castle Of The Maze
                <br />
                <img width="100%" src={logo2} alt="Ninja Game 2" />
            </Link>
            <br />
            <br />
            <Link to="/ninja3">
                Chapter3: Frozen Nightmare
                <br />
                <img width="100%" src={logo3} alt="Ninja Game 3" />
            </Link>
            <br />
            <br />
            <FB />
            <SeasonAnimation frequencySec={2} screenWidth={width} />
        </div>
    );
};

export default NinjaGameTop;
