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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Helmet_1 = __importDefault(require("../Helmet"));
var Boxes1 = /** @class */ (function (_super) {
    __extends(Boxes1, _super);
    function Boxes1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        _this.timerId = setInterval(function () {
            _this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);
        return _this;
    }
    Boxes1.prototype.componentWillUnmount = function () {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    };
    Boxes1.prototype.render = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        var _b = this.props, title = _b.title, desc = _b.desc;
        return (react_1.default.createElement("div", { style: {
                width: width,
                height: height,
                backgroundColor: "black",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -100,
            } },
            react_1.default.createElement(Helmet_1.default, { title: title, desc: desc }),
            this.props.children));
    };
    return Boxes1;
}(react_1.default.Component));
exports.default = Boxes1;
