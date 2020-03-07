"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_helmet_1 = require("react-helmet");
var GoogleAd_1 = require("./GoogleAd");
var consts = __importStar(require("../common/consts"));
var PageHeader = function (props) {
    if (GoogleAd_1.isGoogleAdsDisplayed && props.noindex) {
        // noindexのページにAdsenseの自動広告が引き継がれそうになった場合は、リロードして消す
        window.location.reload();
        return null;
    }
    var topUrl = consts.TOP_URL;
    return (<div className="application">
            <react_helmet_1.Helmet>
                {props.title ?
        <title>{props.title}</title>
        :
            null}
                {props.desc ?
        <meta name="description" content={props.desc}/>
        :
            null}
                {props.noindex ?
        <meta name="robots" content="noindex"/>
        :
            null}
                {props.title ?
        <meta property="og:title" content={props.title}/>
        :
            null}
                {props.isHome ?
        <meta property="og:type" content="website"/>
        :
            <meta property="og:type" content="article"/>}
                {props.desc ?
        <meta property="og:description" content={props.desc}/>
        :
            null}
                {props.img ?
        <meta property="og:image" content={props.img}/>
        :
            null}
                <meta property="og:url" content={topUrl + window.location.pathname}/>
            </react_helmet_1.Helmet>
        </div>);
};
exports.default = PageHeader;
