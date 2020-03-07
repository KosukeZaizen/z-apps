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
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var StoriesTopStore_1 = require("../store/StoriesTopStore");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var GoogleAd_1 = __importDefault(require("./parts/GoogleAd"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var consts = __importStar(require("./common/consts"));
var StoriesTop = /** @class */ (function (_super) {
    __extends(StoriesTop, _super);
    function StoriesTop(props) {
        var _this = _super.call(this, props) || this;
        _this.changeScreenSize = function () {
            _this.setState({
                screenWidth: parseInt(window.innerWidth, 10),
            });
        };
        _this.state = {
            screenWidth: parseInt(window.innerWidth, 10),
        };
        _this.props.loadAllStories();
        var timer = 0;
        window.onresize = function () {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                _this.changeScreenSize();
            }, 100);
        };
        _this.ref = React.createRef();
        return _this;
    }
    StoriesTop.prototype.render = function () {
        var allStories = this.props.allStories;
        var screenWidth = this.state.screenWidth;
        var styleForAboutTitle = {
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
        };
        return (<center>
                <Helmet_1.default title="Japanese Folktales" desc="Free application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"/>
                <div style={{ maxWidth: 700 }}>
                    <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                        <span itemprop="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <react_router_dom_1.Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                <span itemProp="name">
                                    Home
                                </span>
                            </react_router_dom_1.Link>
                            <meta itemProp="position" content="1"/>
                        </span>
                        ＞
                        <span itemprop="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                                Japanese Folktales
                            </span>
                            <meta itemProp="position" content="2"/>
                        </span>
                    </div>
                    <h1 style={{
            margin: "30px",
            lineHeight: "40px",
        }}>
                        <b>Japanese Folktales</b>
                    </h1>
                    <p style={styleForAboutTitle}>
                        Free app to learn Japanese from folktales!<br />
                        You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!
                    </p>
                    <br />
                    {allStories && allStories.length > 0 ?
            null
            :
                <center>
                                <CircularProgress_1.default key="circle" size="20%"/>
                            </center>}
                    <div id="scrollTargetId" ref={this.ref}>
                        {allStories && allStories.map(function (s) {
            var nameForUrl = s.storyName;
            var nameToShow = s.storyName.split("--").join(" - ").split("_").join(" ");
            return (<div key={s.storyId} style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333" }}>
                                        {screenWidth > 500 ?
                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <center>
                                                                    <h2 style={{ color: "black", marginBottom: "20px" }}>
                                                                        <b>{nameToShow}</b>
                                                                    </h2>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="50%">
                                                                <react_router_dom_1.Link to={"/folktales/" + nameForUrl}>
                                                                    <img src={consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png"} width="90%" alt={nameToShow} title={nameToShow} style={{ marginLeft: "10px", marginBottom: "10px" }}/>
                                                                </react_router_dom_1.Link>
                                                            </td>
                                                            <td>
                                                                {s.description.split("\\n").map(function (d, i) {
                    return <span key={i} style={{ color: "black" }}>
                                                                            {d}<br />
                                                                        </span>;
                })}
                                                                <center>
                                                                    <p style={{ margin: "20px" }}>
                                                                        <react_router_dom_1.Link to={"/folktales/" + nameForUrl}>Read {nameToShow} >></react_router_dom_1.Link>
                                                                    </p>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                :
                    <div>
                                                    <b>
                                                        <h2 style={{ color: "black", marginBottom: "20px" }}>{nameToShow}</h2>
                                                    </b>
                                                    <react_router_dom_1.Link to={"/folktales/" + nameForUrl}>
                                                        <img src={consts.BLOB_URL + "/folktalesImg/" + nameForUrl.split("--")[0] + ".png"} width="90%" alt={nameToShow} title={nameToShow}/>
                                                    </react_router_dom_1.Link>
                                                    <div style={{ textAlign: "left", margin: "10px" }}>
                                                        {s.description.split("\\n").map(function (d, i) {
                        return <span key={i} style={{ color: "black" }}>
                                                                    {d}<br />
                                                                </span>;
                    })}
                                                    </div>
                                                    <p>
                                                        <react_router_dom_1.Link to={"/folktales/" + nameForUrl}>Read {nameToShow} >></react_router_dom_1.Link>
                                                    </p>
                                                </div>}
                                    </div>);
        })}
                    </div>
                </div>
                <FaceBook_1.default />
                <br />
                <GoogleAd_1.default />
                <PleaseScrollDown_1.default criteriaRef={this.ref} screenWidth={screenWidth}/>
            </center>);
    };
    return StoriesTop;
}(React.Component));
;
exports.default = react_redux_1.connect(function (state) { return state.storiesTop; }, function (dispatch) { return redux_1.bindActionCreators(StoriesTopStore_1.actionCreators, dispatch); })(StoriesTop);
