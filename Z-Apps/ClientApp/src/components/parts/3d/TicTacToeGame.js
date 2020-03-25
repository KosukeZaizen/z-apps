"use strict";
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
const react_1 = __importStar(require("react"));
const react_three_fiber_1 = require("react-three-fiber");
const Frame_1 = __importDefault(require("./Frame"));
function Box(props) {
    const { x, y, setChar, char } = props;
    const [rotationX, setRotationX] = react_1.useState(0);
    const [rotationY, setRotationY] = react_1.useState(0);
    // This reference will give us direct access to the mesh
    const mesh = react_1.useRef();
    const mesh2 = react_1.useRef();
    const mesh3 = react_1.useRef();
    // Rotate mesh every frame, this is outside of React without overhead
    react_three_fiber_1.useFrame(() => {
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
    const color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";
    return (char === "" ?
        react_1.default.createElement("mesh", { position: [x - 1, y - 1, 0], ref: mesh, scale: [0.6, 0.6, 0.6], onClick: e => setChar(x, y) },
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
class Boxes1 extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.getInitialChars = () => [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.calculateWinner = (s) => {
            const squares = s.flat();
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        };
        this.setChar = (x, y) => {
            const newChars = this.state.chars;
            newChars[x][y] = this.state.turn ? "〇" : "×";
            this.setState({ chars: newChars, turn: !this.state.turn });
            const winner = this.calculateWinner(newChars);
            if (winner) {
                setTimeout(() => {
                    alert(winner + " win!");
                    this.setState({ chars: this.getInitialChars(), turn: true });
                }, 100);
                return;
            }
            const isDraw = newChars.flat().every(v => v !== "");
            if (isDraw) {
                setTimeout(() => {
                    alert("Draw game!");
                    this.setState({ chars: this.getInitialChars(), turn: true });
                }, 100);
            }
        };
        this.state = {
            chars: this.getInitialChars(),
            turn: true
        };
    }
    render() {
        const { chars, turn } = this.state;
        const boxes = [];
        for (let x = 0; x <= 2; x = (x + 1) | 0) {
            for (let y = 0; y <= 2; y = (y + 1) | 0) {
                boxes.push(react_1.default.createElement(Box, { x: x, y: y, position: [x - 1, y - 1, 0], char: chars[x][y], setChar: this.setChar, turn: turn }));
            }
        }
        return (react_1.default.createElement(Frame_1.default, { title: "tic-tac-toe game", desc: "Enjoy 3D tic-tac-toe game!" },
            react_1.default.createElement(react_three_fiber_1.Canvas, null,
                react_1.default.createElement("ambientLight", null),
                react_1.default.createElement("pointLight", { position: [10, 10, 10] }),
                boxes)));
    }
}
exports.default = Boxes1;
