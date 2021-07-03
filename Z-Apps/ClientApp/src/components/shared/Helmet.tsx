import * as React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { isGoogleAdsDisplayed } from "./GoogleAd";

export const Helmet = (props: {
    noindex?: boolean;
    title?: string;
    desc?: string;
    isHome?: boolean;
    img?: string;
}) => {
    if (isGoogleAdsDisplayed && props.noindex) {
        // noindexのページにAdsenseの自動広告が引き継がれそうになった場合は、リロードして消す
        window.location.reload();
        return null;
    }

    return (
        <div className="application">
            <ReactHelmet>
                {props.title ? <title>{props.title}</title> : null}
                {props.desc ? (
                    <meta name="description" content={props.desc} />
                ) : null}
                {props.noindex ? (
                    <meta name="robots" content="noindex" />
                ) : null}
            </ReactHelmet>
        </div>
    );
};
export default Helmet;
