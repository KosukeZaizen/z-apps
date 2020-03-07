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
var react_anchor_link_smooth_scroll_1 = __importDefault(require("react-anchor-link-smooth-scroll"));
require("./PleaseScrollDown.css");
var PleaseScrollDown = /** @class */ (function (_super) {
    __extends(PleaseScrollDown, _super);
    function PleaseScrollDown(props) {
        var _this = _super.call(this, props) || this;
        _this.judge = function () {
            var _a = _this.props, screenHeight = _a.screenHeight, criteriaRef = _a.criteriaRef;
            var elem = criteriaRef && criteriaRef.current;
            if (!elem)
                return;
            var height = screenHeight || parseInt(window.innerHeight, 10);
            var offsetY = elem.getBoundingClientRect().top;
            var t_position = offsetY - height;
            if (t_position >= 0) {
                // 上側の時
                _this.setState({
                    pleaseScrollDown: true,
                });
            }
            else {
                // 下側の時
                _this.setState({
                    pleaseScrollDown: false,
                });
            }
        };
        _this.state = {
            pleaseScrollDown: false,
        };
        window.addEventListener('scroll', _this.judge);
        return _this;
    }
    PleaseScrollDown.prototype.componentDidMount = function () {
        var _this = this;
        for (var i = 0; i < 5; i++) {
            setTimeout(function () {
                _this.judge();
            }, i * 1000);
        }
    };
    PleaseScrollDown.prototype.componentDidUpdate = function (preciousProps) {
        if (preciousProps.criteriaRef.current !== this.props.criteriaRef.current) {
            this.judge();
        }
    };
    PleaseScrollDown.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.judge);
    };
    PleaseScrollDown.prototype.render = function () {
        var pleaseScrollDown = this.state.pleaseScrollDown;
        var _a = this.props, screenWidth = _a.screenWidth, criteriaRef = _a.criteriaRef, targetId = _a.targetId;
        var elem = criteriaRef && criteriaRef.current;
        var width = screenWidth || parseInt(window.innerWidth, 10);
        if (!elem)
            return null;
        return (<center>
                <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: pleaseScrollDown ? 999999990 : 0,
            width: width + "px",
            height: "70px",
            opacity: pleaseScrollDown ? 1.0 : 0,
            transition: "all 2s ease",
            fontSize: "x-large",
            backgroundColor: "#EEEEEE",
            borderRadius: "30px 30px 0px 0px",
        }}>
                    <span id="pleaseScroll">
                        <span></span>
                        <react_anchor_link_smooth_scroll_1.default href={"#" + (targetId || (elem && elem.id))}>Scroll</react_anchor_link_smooth_scroll_1.default>
                    </span>
                </div>
            </center>);
    };
    return PleaseScrollDown;
}(React.Component));
exports.default = PleaseScrollDown;
