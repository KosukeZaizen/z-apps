import * as React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import * as consts from "../../common/consts";
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

    const topUrl = consts.TOP_URL;

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
                {props.title ? (
                    <meta property="og:title" content={props.title} />
                ) : null}
                {props.isHome ? (
                    <meta property="og:type" content="website" />
                ) : (
                    <meta property="og:type" content="article" />
                )}
                {props.desc ? (
                    <meta property="og:description" content={props.desc} />
                ) : null}
                {props.img ? (
                    <meta property="og:image" content={props.img} />
                ) : null}
                <meta
                    property="og:url"
                    content={topUrl + window.location.pathname}
                />
            </ReactHelmet>
        </div>
    );
};
export default Helmet;
