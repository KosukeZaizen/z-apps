import * as React from "react";
import * as consts from "../../common/consts";
import { sendClientOpeLog } from "../../common/functions";
import { ATargetBlank } from "./Link/ATargetBlank";

type TFBProps = {
    style: React.CSSProperties;
    urlToShare: string;
};
export const FBShareBtn = (props: TFBProps) => {
    const { style, urlToShare } = props;

    return (
        <ATargetBlank
            href={`https://www.facebook.com/share.php?u=${urlToShare}`}
            nofollow
        >
            <img
                src={
                    consts.BLOB_URL + "/vocabulary-quiz/img/shareOnFacebook.png"
                }
                alt="Share on Facebook"
                style={style}
                onClick={() => {
                    setTimeout(() => {
                        sendClientOpeLog("facebook share button");
                    }, 1000);
                }}
            />
        </ATargetBlank>
    );
};

type TTWProps = {
    style: React.CSSProperties;
    urlToShare: string;
    textToShare: string;
};
export const TwitterShareBtn = (props: TTWProps) => {
    const { style, urlToShare, textToShare } = props;

    return (
        <ATargetBlank
            href={`https://twitter.com/share?url=${urlToShare}&text=${textToShare}&hashtags=nihongo,Japanese,LingualNinja`}
            nofollow
        >
            <img
                src={
                    consts.BLOB_URL + "/vocabulary-quiz/img/shareOnTwitter.png"
                }
                alt="Share on Twitter"
                style={style}
                onClick={() => {
                    setTimeout(() => {
                        sendClientOpeLog("twitter share button");
                    }, 1000);
                }}
            />
        </ATargetBlank>
    );
};
