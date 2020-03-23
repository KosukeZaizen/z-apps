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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_three_fiber_1 = require("react-three-fiber");
var Frame_1 = __importDefault(require("./Frame"));
function Box(props) {
    // This reference will give us direct access to the mesh
    var mesh = react_1.useRef();
    var mesh2 = react_1.useRef();
    // Set up state for the hovered and active state
    var _a = react_1.useState(""), char = _a[0], setChar = _a[1];
    // Rotate mesh every frame, this is outside of React without overhead
    react_three_fiber_1.useFrame(function () {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
        if (!mesh2.current)
            return;
        mesh2.current.rotation.y = mesh2.current.rotation.z += 0.01;
    });
    var color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";
    return (char === "" ?
        react_1.default.createElement("mesh", __assign({}, props, { ref: mesh, scale: [0.8, 0.8, 0.8], onClick: function (e) { return setChar("×"); } }),
            react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [1, 1, 1] }),
            react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color }))
        :
            char === "×" ?
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("mesh", __assign({}, props, { ref: mesh, scale: [0.8, 0.8, 0.8] }),
                        react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [0.2, 0.2, 1] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })),
                    react_1.default.createElement("mesh", __assign({}, props, { ref: mesh2, scale: [0.8, 0.8, 0.8] }),
                        react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [0.2, 1, 0.2] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })))
                :
                    react_1.default.createElement("mesh", __assign({}, props, { ref: mesh, scale: [0.8, 0.8, 0.8] }),
                        react_1.default.createElement("torusGeometry", { attach: "geometry", args: [0.5, 0.15, 64, 100] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })));
}
var Boxes1 = /** @class */ (function (_super) {
    __extends(Boxes1, _super);
    function Boxes1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            chars: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            turn: true
        };
        return _this;
    }
    Boxes1.prototype.render = function () {
        var boxes = [];
        for (var x = -1; x <= 1; x = (x + 1) | 0) {
            for (var y = -1; y <= 1; y = (y + 1) | 0) {
                boxes.push(react_1.default.createElement(Box, { position: [x, y, 0] }));
            }
        }
        return (react_1.default.createElement(Frame_1.default, null,
            react_1.default.createElement(react_three_fiber_1.Canvas, null,
                react_1.default.createElement("ambientLight", null),
                react_1.default.createElement("pointLight", { position: [10, 10, 10] }),
                boxes)));
    };
    return Boxes1;
}(react_1.default.Component));
exports.default = Boxes1;
