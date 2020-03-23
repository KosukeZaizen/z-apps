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
var react_1 = __importStar(require("react"));
var react_three_fiber_1 = require("react-three-fiber");
var Frame_1 = __importDefault(require("./Frame"));
function Box(props) {
    var x = props.x, y = props.y, setChar = props.setChar, char = props.char;
    var _a = react_1.useState(0), rotationX = _a[0], setRotationX = _a[1];
    var _b = react_1.useState(0), rotationY = _b[0], setRotationY = _b[1];
    // This reference will give us direct access to the mesh
    var mesh = react_1.useRef();
    var mesh2 = react_1.useRef();
    var mesh3 = react_1.useRef();
    // Rotate mesh every frame, this is outside of React without overhead
    react_three_fiber_1.useFrame(function () {
        if (mesh.current) {
            mesh.current.rotation.x = rotationX;
            mesh.current.rotation.y = rotationY;
        }
        if (mesh2.current) {
            mesh2.current.rotation.x = rotationX;
            mesh2.current.rotation.y = rotationY;
            mesh2.current.rotation.z = 0.4;
        }
        if (mesh3.current) {
            mesh3.current.rotation.x = rotationX;
            mesh3.current.rotation.y = rotationY;
            mesh3.current.rotation.z = 0.4;
        }
        setRotationX(rotationX + 0.01);
        setRotationY(rotationY + 0.01);
    });
    var color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";
    return (char === "" ?
        react_1.default.createElement("mesh", { position: [x - 1, y - 1, 0], ref: mesh, scale: [0.6, 0.6, 0.6], onClick: function (e) { return setChar(x, y); } },
            react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [1, 1, 1] }),
            react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color }))
        :
            char === "×" ?
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("mesh", { position: [x - 1, y - 1, 0], ref: mesh2, scale: [0.8, 0.8, 0.8] },
                        react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [1.1, 0.2, 0.2] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })),
                    react_1.default.createElement("mesh", { position: [x - 1, y - 1, 0], ref: mesh3, scale: [0.8, 0.8, 0.8] },
                        react_1.default.createElement("boxBufferGeometry", { attach: "geometry", args: [0.2, 1.1, 0.2] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })))
                :
                    react_1.default.createElement("mesh", { position: [x - 1, y - 1, 0], ref: mesh, scale: [0.8, 0.8, 0.8] },
                        react_1.default.createElement("torusGeometry", { attach: "geometry", args: [0.4, 0.15, 64, 100] }),
                        react_1.default.createElement("meshStandardMaterial", { attach: "material", color: color })));
}
var Boxes1 = /** @class */ (function (_super) {
    __extends(Boxes1, _super);
    function Boxes1(props) {
        var _this = _super.call(this, props) || this;
        _this.getInitialChars = function () { return [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]; };
        _this.calculateWinner = function (s) {
            var squares = s.flat();
            var lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (var i = 0; i < lines.length; i++) {
                var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        };
        _this.setChar = function (x, y) {
            var newChars = _this.state.chars;
            newChars[x][y] = _this.state.turn ? "〇" : "×";
            _this.setState({ chars: newChars, turn: !_this.state.turn });
            var winner = _this.calculateWinner(newChars);
            if (winner) {
                setTimeout(function () {
                    alert(winner + " win!");
                    _this.setState({ chars: _this.getInitialChars(), turn: true });
                }, 100);
                return;
            }
            var isDraw = newChars.flat().every(function (v) { return v !== ""; });
            if (isDraw) {
                setTimeout(function () {
                    alert("Draw game!");
                    _this.setState({ chars: _this.getInitialChars(), turn: true });
                }, 100);
            }
        };
        _this.state = {
            chars: _this.getInitialChars(),
            turn: true
        };
        return _this;
    }
    Boxes1.prototype.render = function () {
        var _a = this.state, chars = _a.chars, turn = _a.turn;
        var boxes = [];
        for (var x = 0; x <= 2; x = (x + 1) | 0) {
            for (var y = 0; y <= 2; y = (y + 1) | 0) {
                boxes.push(react_1.default.createElement(Box, { x: x, y: y, position: [x - 1, y - 1, 0], char: chars[x][y], setChar: this.setChar, turn: turn }));
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
