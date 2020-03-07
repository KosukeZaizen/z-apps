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
require("../css/Developer.css");
var KosukeZaizen_jpg_1 = __importDefault(require("../img/KosukeZaizen.jpg"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
function SayHello() {
    return (<p>
            <b>Hello! I'm Kosuke Zaizen!</b><br />
            <br />
            Thank you for using Lingual Ninja!<br />
            I am a Japanese software engineer.<br />
            Lingual Ninja is a website for Japanese learners.<br />
            I hope Lingual Ninja can help!
        </p>);
}
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Developer.prototype.render = function () {
        return (<div className="developer">
                <Helmet_1.default title="Kosuke Zaizen" desc="I am a Japanese software engineer. Lingual Ninja is a website for Japanese learners. I hope Lingual Ninja can help!"/>
                <center>
                    <h1>Kosuke Zaizen</h1>

                    <div className="contents">
                        <hr id="scrollTargetId"/>
                        <span className='hidden-xs'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img width="200px" src={KosukeZaizen_jpg_1.default} alt="Kosuke Zaizen"/>
                                        </td>
                                        <td className="tdExplanation" valign="top">
                                            <SayHello />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                        <span className='visible-xs'>
                            <center>
                                <img width="200px" src={KosukeZaizen_jpg_1.default} alt="Kosuke Zaizen"/>
                                <br /><br />
                                <SayHello />
                            </center>
                        </span>
                        <hr ref={this.ref}/>
                        <br />
                        <center>
                            <p className="no-margin">
                                To contact me, please write a message<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                                using the link below:</p><br />
                            <b><a href="https://uni-browser.lingual-ninja.com/?pageId=4" target="_blank" rel="noopener noreferrer">Contact uni-browser >></a></b>

                            <br /><br /><br />
                            <p className="no-margin">
                                Also, I am writing a blog for people<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                                studying Japanese:</p><br />
                            <b><a href="https://www.lingual-ninja.com/" target="_blank" rel="noopener noreferrer">Lingual Ninja! >></a></b>
                            <br /><br />
                            <FaceBook_1.default />
                        </center>
                    </div>
                    <PleaseScrollDown_1.default criteriaRef={this.ref} targetId="scrollTargetId"/>
                </center>
            </div>);
    };
    return Developer;
}(React.Component));
exports.default = Developer;
