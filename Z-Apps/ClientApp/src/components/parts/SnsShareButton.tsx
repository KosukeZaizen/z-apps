import * as React from 'react';
import * as consts from '../common/consts';

type TFBProps = {
    style: React.CSSProperties;
    urlToShare: string;
}
export const FBShareBtn = (props: TFBProps) => {
    const { style, urlToShare } = props;

    return (
        <a
            href={`https://www.facebook.com/share.php?u=${urlToShare}`}
            rel="nofollow"
            target="_blank"
        >
            <img
                src={consts.BLOB_URL + "/vocabulary-quiz/img/shareOnFacebook.png"}
                alt="Share on Facebook"
                style={style}
            />
        </a>
    );
}

type TTWProps = {
    style: React.CSSProperties;
    urlToShare: string;
    textToShare: string;
}
export const TwitterShareBtn = (props: TTWProps) => {
    const { style, urlToShare, textToShare } = props;

    return (
        <a
        href={`https://twitter.com/share?url=${urlToShare}&text=${textToShare}`}
        rel="nofollow"
        target="_blank"
    >
        <img
            src={consts.BLOB_URL + "/vocabulary-quiz/img/shareOnTwitter.png"}
            alt="Share on Twitter"
            style={style}
        />
    </a>
    );
}