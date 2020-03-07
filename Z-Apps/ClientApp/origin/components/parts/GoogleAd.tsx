import * as React from 'react';
import GoogleAds from 'react-google-ads'
import { GOOGLE_ADS_CLIENT, GOOGLE_ADS_SLOT } from '../common/privateConsts';

export let isGoogleAdsDisplayed;

export default class GoogleAd extends React.Component {

    constructor(props) {
        super(props);
        // コンポーネント外でのAdsense表示判定のため、Adsenseの状態を変数としてexport
        isGoogleAdsDisplayed = true;
    }

    render() {
        return (
            <GoogleAds
                client={GOOGLE_ADS_CLIENT}
                slot={GOOGLE_ADS_SLOT}
                className="adsbygoogle"
                format="auto"
                style={{ display: 'block' }}
            />
        );
    }
}