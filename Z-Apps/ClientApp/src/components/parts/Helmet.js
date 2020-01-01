import React from 'react';
import { Helmet } from 'react-helmet';
import { isGoogleAdsDisplayed } from './GoogleAd';

const PageHeader = props => {

    if (isGoogleAdsDisplayed && props.noindex) {
        // noindexのページにAdsenseの自動広告が引き継がれそうになった場合は、リロードして消す
        window.location.reload();
        return null;
    }

    const topUrl = "https://z-apps.lingual-ninja.com"

    return (
        <div className="application">
            <Helmet>
                {
                    props.title ?
                        <title>{props.title}</title>
                        :
                        null
                }
                {
                    props.desc ?
                        <meta name="description" content={props.desc} />
                        :
                        null
                }
                {
                    props.noindex ?
                        <meta name="robots" content="noindex" />
                        :
                        null
                }
                {
                    props.title ?
                        <meta property="og:title" content={props.title} />
                        :
                        null
                }
                {
                    props.isHome ?
                        <meta property="og:type" content="website" />
                        :
                        <meta property="og:type" content="article" />
                }
                {
                    props.desc ?
                        <meta property="og:description" content={props.desc} />
                        :
                        null
                }
                {
                    props.img ?
                        <meta property="og:image" content={topUrl + props.img} />
                        :
                        null
                }
                <meta property="og:url" content={topUrl + window.location.pathname} />
            </Helmet>
        </div>
    );
};
export default PageHeader;