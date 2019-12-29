import React from 'react';
import { Helmet } from 'react-helmet';
import { isGoogleAdsDisplayed } from './GoogleAd';

const PageHeader = props => {

    if (isGoogleAdsDisplayed && props.noindex) {
        // noindexのページにAdsenseの自動広告が引き継がれそうになった場合は、リロードして消す
        window.location.reload();
        return null;
    }

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
            </Helmet>
        </div>
    );
};
export default PageHeader;