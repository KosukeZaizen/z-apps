import * as React from "react";
import GoogleAds from "react-google-ads";
import { GOOGLE_ADS_CLIENT, GOOGLE_ADS_SLOT } from "../../common/privateConsts";

export let isGoogleAdsDisplayed: boolean;

interface Props {
    style?: React.CSSProperties;
}

export default class GoogleAd extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        // コンポーネント外でのAdsense表示判定のため、Adsenseの状態を変数としてexport
        isGoogleAdsDisplayed = true;
    }

    render() {
        const { style } = this.props;
        return (
            <aside style={style}>
                <GoogleAds
                    client={GOOGLE_ADS_CLIENT}
                    slot={GOOGLE_ADS_SLOT}
                    className="adsbygoogle"
                    format="auto"
                    style={{ display: "block" }}
                />
            </aside>
        );
    }
}
