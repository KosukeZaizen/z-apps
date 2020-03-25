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
const React = __importStar(require("react"));
const react_anchor_link_smooth_scroll_1 = __importDefault(require("react-anchor-link-smooth-scroll"));
require("./PleaseScrollDown.css");
class PleaseScrollDown extends React.Component {
    constructor(props) {
        super(props);
        this.judge = () => {
            const { screenHeight, criteriaRef } = this.props;
            const elem = criteriaRef && criteriaRef.current;
            if (!elem)
                return;
            const height = screenHeight || window.innerHeight;
            const offsetY = elem.getBoundingClientRect().top;
            const t_position = offsetY - height;
            if (t_position >= 0) {
                // 上側の時
                this.setState({
                    pleaseScrollDown: true,
                });
            }
            else {
                // 下側の時
                this.setState({
                    pleaseScrollDown: false,
                });
            }
        };
        this.state = {
            pleaseScrollDown: false,
        };
        window.addEventListener('scroll', this.judge);
    }
    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.judge();
            }, i * 1000);
        }
    }
    componentDidUpdate(preciousProps) {
        if (preciousProps.criteriaRef.current !== this.props.criteriaRef.current) {
            this.judge();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.judge);
    }
    render() {
        const { pleaseScrollDown } = this.state;
        const { screenWidth, criteriaRef, targetId } = this.props;
        const elem = criteriaRef && criteriaRef.current;
        const width = screenWidth || window.innerWidth;
        if (!elem)
            return null;
        return (React.createElement("div", { className: "center" },
            React.createElement("div", { style: {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: pleaseScrollDown ? 999999990 : 0,
                    width: `${width}px`,
                    height: "70px",
                    opacity: pleaseScrollDown ? 1.0 : 0,
                    transition: "all 2s ease",
                    fontSize: "x-large",
                    backgroundColor: "#EEEEEE",
                    borderRadius: "30px 30px 0px 0px",
                } },
                React.createElement("span", { id: "pleaseScroll" },
                    React.createElement("span", null),
                    React.createElement(react_anchor_link_smooth_scroll_1.default, { href: `#${targetId || (elem && elem.id)}` }, "Scroll")))));
    }
}
exports.default = PleaseScrollDown;
