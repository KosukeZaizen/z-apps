import React, { CSSProperties } from "react";
import { BLOB_URL } from "../../../common/consts";
import { sendClientOpeLog } from "../../../common/functions";
import { ATargetBlank } from "../Link/ATargetBlank";

export const YouTubeAd = ({
    width,
    style,
}: {
    width?: number | string;
    style?: CSSProperties;
}) => (
    <ATargetBlank
        nofollow
        href="http://www.youtube.com/channel/UCii35PcojqMUNkSRalUw35g?sub_confirmation=1"
        onClick={() => {
            setTimeout(() => {
                sendClientOpeLog("click YouTube channel", "from popup");
            }, 1000);
        }}
        style={{ maxWidth: 500, ...style }}
    >
        <img
            src={`${BLOB_URL}/appsPublic/ad/ad1.png`}
            alt="Lingual Ninja YouTube Channel"
            style={{
                width: width || "100%",
                height: "auto",
                margin: "7px 0",
            }}
        />
    </ATargetBlank>
);
