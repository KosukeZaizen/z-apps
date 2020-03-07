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
require("../css/Terms.css");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var PleaseScrollDown_1 = __importDefault(require("./parts/PleaseScrollDown"));
var Terms = /** @class */ (function (_super) {
    __extends(Terms, _super);
    function Terms(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Terms.prototype.render = function () {
        return (<div className="terms">
                <Helmet_1.default title="Terms of Use" desc="Lingual Ninja - The ownership of website and Responsibility"/>
                <center>
                    <h1 id="scrollTargetId">Lingual Ninja<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Terms of Use</h1>
                    <div className="contents">
                        <hr />
                        <h2>The ownership of website</h2>
                        <p>This website is developed and owned by <react_router_dom_1.Link to="/developer">Kosuke Zaizen</react_router_dom_1.Link>.
                When you want to use any quotes, images, or programs, you must get approval from the owner.</p>
                        <hr ref={this.ref}/>
                        <h2>Responsibility</h2>
                        <p>If user experiences trouble including defects or bugs,
                            the owner of this website can't be held liable.
                    It will be user's responsibility.</p>
                        <hr />
                        <h2>Contact</h2>
                        If you have trouble, please contact using this link:<br />
                        <a href="https://uni-browser.lingual-ninja.com/?pageId=4" target="_blank" rel="noopener noreferrer">　uni-browser >></a>
                    </div>
                    <PleaseScrollDown_1.default criteriaRef={this.ref} targetId="scrollTargetId"/>
                </center>
            </div>);
    };
    return Terms;
}(React.Component));
exports.default = Terms;
