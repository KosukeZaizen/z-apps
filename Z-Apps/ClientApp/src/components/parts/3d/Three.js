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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_three_fiber_1 = require("react-three-fiber");
function Box(props) {
    // This reference will give us direct access to the mesh
    var mesh = react_1.useRef();
    // Set up state for the hovered and active state
    var _a = react_1.useState(false), hovered = _a[0], setHover = _a[1];
    var _b = react_1.useState(false), active = _b[0], setActive = _b[1];
    // Rotate mesh every frame, this is outside of React without overhead
    react_three_fiber_1.useFrame(function () { return (mesh.current.rotation.x = mesh.current.rotation.y += 0.01); });
    return (react_1.default.createElement("mesh", __assign({}, props, { ref: mesh, scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1], onClick: function (e) { return setActive(!active); }, onPointerOver: function (e) { return setHover(true); }, onPointerOut: function (e) { return setHover(false); } }),
        react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [1, 1, 1] }),
        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: hovered ? 'hotpink' : 'orange' })));
}
var Three = /** @class */ (function (_super) {
    __extends(Three, _super);
    function Three(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        setInterval(function () {
            _this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);
        return _this;
    }
    Three.prototype.render = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        return (react_1.default.createElement("div", { style: {
                width: width,
                height: height,
                backgroundColor: "black",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
            } },
            react_1.default.createElement(react_three_fiber_1.Canvas, null,
                react_1.default.createElement("ambientLight", null),
                react_1.default.createElement("pointLight", { position: [10, 10, 10] }),
                react_1.default.createElement(Box, { position: [-0.5, 0.5, 0] }),
                react_1.default.createElement(Box, { position: [0.5, 0.5, 0] }),
                react_1.default.createElement(Box, { position: [-0.5, -0.5, 0] }),
                react_1.default.createElement(Box, { position: [0.5, -0.5, 0] }))));
    };
    return Three;
}(react_1.default.Component));
exports.default = Three;
