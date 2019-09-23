import React from 'react';
import { Helmet } from 'react-helmet';

const PageHeader = props => {
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