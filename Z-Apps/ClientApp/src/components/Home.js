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
var react_router_dom_1 = require("react-router-dom");
require("../css/Home.css");
var reactstrap_1 = require("reactstrap");
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Home.prototype.render = function () {
        return (<div className="home">
                <Helmet_1.default title="Lingual Ninja" desc="Free applications to learn Japanese, made by Kosuke Zaizen! I hope you enjoy!" isHome={true}/>
                <center>
                    <h1>Welcome to<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Lingual Ninja!</h1>
                    <div className="initial-message">
                        <p className="no-margin">Applications to learn Japanese,<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                            made by <react_router_dom_1.Link to="/developer">Kosuke Zaizen</react_router_dom_1.Link>.</p>
                        <p className="no-margin">I hope you enjoy!</p>
                    </div>

                    <div ref={this.ref} id="scrollTargetId">
                        <react_router_dom_1.Link to="/hiragana-quiz">
                            <reactstrap_1.Card body style={{ backgroundColor: '#333', borderColor: '#333', color: "white" }}>
                                <reactstrap_1.CardTitle>Hiragana / Katakana Quiz</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>An app to remember Hiragana and Katakana! I hope this will help you to study.</reactstrap_1.CardText>
                                <reactstrap_1.Button color="secondary">Try!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>
                        <br />

                        <react_router_dom_1.Link to="/folktales">
                            <reactstrap_1.Card body inverse color="primary">
                                <reactstrap_1.CardTitle>Japanese Folktales</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>An app to learn Japanese from folktales. You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!</reactstrap_1.CardText>
                                <reactstrap_1.Button color="secondary">Try!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>
                        <br />

                        <react_router_dom_1.Link to="/kanji-converter">
                            <reactstrap_1.Card body inverse color="success">
                                <reactstrap_1.CardTitle>Kanji Converter</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>A converter to change Kanji to Hiragana and Romaji. Use to know how to read Kanji!</reactstrap_1.CardText>
                                <reactstrap_1.Button color="secondary">Try!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>
                        <br />

                        <react_router_dom_1.Link to="/romaji-converter">
                            <reactstrap_1.Card body inverse color="danger">
                                <reactstrap_1.CardTitle>Romaji Converter</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>A converter to change Hiragana and Katakana to Romaji. Use when you need to know Romaji!</reactstrap_1.CardText>
                                <reactstrap_1.Button>Try!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>
                        <br />

                        <react_router_dom_1.Link to="/ninja">
                            <reactstrap_1.Card body inverse color="warning">
                                <reactstrap_1.CardTitle>Lingual Ninja Game</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>Action game! Be a Ninja, and collect the scrolls in Japan!</reactstrap_1.CardText>
                                <reactstrap_1.Button color="secondary">Play!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>
                        <br />

                        <react_router_dom_1.Link to="/color-code">
                            <reactstrap_1.Card body inverse color="info">
                                <reactstrap_1.CardTitle>Color Code Getter</reactstrap_1.CardTitle>
                                <reactstrap_1.CardText>Get the Color Code of your favolite color!</reactstrap_1.CardText>
                                <reactstrap_1.Button color="secondary">Try!</reactstrap_1.Button>
                            </reactstrap_1.Card>
                        </react_router_dom_1.Link>

                    </div>
                </center>
                <br />
                <FaceBook_1.default />
                <PleaseScrollDown_1.default criteriaRef={this.ref} targetId="scrollTargetId"/>
            </div>);
    };
    return Home;
}(React.Component));
exports.default = Home;
