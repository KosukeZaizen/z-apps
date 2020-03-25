"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_google_ads_1 = __importDefault(require("react-google-ads"));
const privateConsts_1 = require("../common/privateConsts");
class GoogleAd extends React.Component {
    constructor(props) {
        super(props);
        // コンポーネント外でのAdsense表示判定のため、Adsenseの状態を変数としてexport
        exports.isGoogleAdsDisplayed = true;
    }
    render() {
        return (React.createElement(react_google_ads_1.default, { client: privateConsts_1.GOOGLE_ADS_CLIENT, slot: privateConsts_1.GOOGLE_ADS_SLOT, className: "adsbygoogle", format: "auto", style: { display: 'block' } }));
    }
}
exports.default = GoogleAd;
