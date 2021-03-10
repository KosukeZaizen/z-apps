import React from "react";
import { sendClientOpeLog } from "../../../common/functions";

export const YouTubeAd = ({ width }: { width?: number }) => (
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
                width: width || "100%",
                height: width || "100%",
                margin: "7px 0",
            }}
        />
    </a>
);
