"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __importStar(require("react"));
var react_google_ads_1 = __importDefault(require("react-google-ads"));
var privateConsts_1 = require("../common/privateConsts");
var GoogleAd = /** @class */ (function (_super) {
    __extends(GoogleAd, _super);
    function GoogleAd() {
        var _this = _super.call(this) || this;
        // コンポーネント外でのAdsense表示判定のため、Adsenseの状態を変数としてexport
        exports.isGoogleAdsDisplayed = true;
        return _this;
    }
    GoogleAd.prototype.render = function () {
        return (<react_google_ads_1.default client={privateConsts_1.GOOGLE_ADS_CLIENT} slot={privateConsts_1.GOOGLE_ADS_SLOT} className="adsbygoogle" format="auto" style={{ display: 'block' }}/>);
    };
    return GoogleAd;
}(React.Component));
exports.default = GoogleAd;
