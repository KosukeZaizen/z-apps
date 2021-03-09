import React, { useEffect } from "react";
import { sendClientOpeLog } from "../../../common/functions";

export const PopupAd = () => {
    const [isShown, setIsShown] = React.useState(false);
    const [isTimerStarted, setIsTimerStarted] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            const showAd = () => {
                const savedDate = localStorage.getItem("YouTubeAdClosed");
                if (savedDate) {
                    const date = new Date(savedDate);
                    const dif = new Date().getTime() - date.getTime();
                    if (dif < 1000 * 60 * 60 * 24) {
                        return;
                    }
                }
                setIsTimerStarted(true);
                setTimeout(() => setIsShown(true), 10);
            };
            var body = document.querySelector("body");
            if (!body) {
                return;
            }
            body.onscroll = showAd;
        }, 30 * 1000);
    }, []);

    const maxWidth = 500;
    const shorterLine = Math.min(window.innerWidth, window.innerHeight);
    const adWidth = shorterLine < maxWidth ? window.innerWidth : maxWidth;

    const close = () => {
        localStorage.setItem("YouTubeAdClosed", new Date().toISOString());
        setIsTimerStarted(false);
    };

    return isTimerStarted ? (
        <div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: isShown ? 1 : 0,
                transition: "2s",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "gray",
                    opacity: 0.5,
                }}
            ></div>

            <div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: adWidth - 20,
                        height: adWidth,
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        zIndex: 2147483647,
                    }}
                    onClick={ev => ev.stopPropagation()}
                >
                    <a
                        href="http://www.youtube.com/channel/UCii35PcojqMUNkSRalUw35g?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => {
                            setTimeout(() => {
                                sendClientOpeLog("click YouTube channel");
                            }, 1000);
                        }}
                    >
                        <img
                            src="https://lingualninja.blob.core.windows.net/lingual-storage/appsPublic/ad/ad1.png"
                            alt="Lingual Ninja YouTube Channel"
                            style={{
                                width: adWidth - 60,
                                height: adWidth - 60,
                                margin: "7px 0",
                            }}
                        />
                    </a>
                    <div
                        onClick={close}
                        style={{ cursor: "pointer", color: "black" }}
                    >
                        Close
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
