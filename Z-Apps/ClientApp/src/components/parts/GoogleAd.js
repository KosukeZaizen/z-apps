import React from 'react';
import GoogleAds from 'react-google-ads'
import { GOOGLE_ADS_CLIENT, GOOGLE_ADS_SLOT } from '../common/privateConsts';

export default class GoogleAd extends React.Component {
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