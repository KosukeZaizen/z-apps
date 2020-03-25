"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Helmet_1 = __importDefault(require("../Helmet"));
class Boxes1 extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.timerId = setInterval(() => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);
    }
    componentWillUnmount() {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    }
    render() {
        const { width, height } = this.state;
        const { title, desc } = this.props;
        return (react_1.default.createElement("div", { style: {
                width,
                height,
                backgroundColor: "black",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -100,
            } },
            react_1.default.createElement(Helmet_1.default, { title: title, desc: desc }),
            this.props.children));
    }
}
exports.default = Boxes1;
