"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
require("./Footer.css");
const react_router_dom_1 = require("react-router-dom");
class Footer extends React.Component {
    render() {
        return (React.createElement("footer", { className: "footer" },
            React.createElement("div", { className: "center" },
                React.createElement("div", { className: "container text-muted" },
                    React.createElement("span", { className: "text-muted" },
                        "Copyright ",
                        React.createElement(react_router_dom_1.Link, { to: "/developer" }, "Kosuke Zaizen"),
                        ". All rights reserved.",
                        React.createElement("span", { className: 'hidden-xs' }, "\u3000\u3000"),
                        React.createElement("span", { className: 'visible-xs' },
                            React.createElement("br", null))),
                    React.createElement(react_router_dom_1.Link, { to: "/terms" }, "Terms of Use")))));
    }
}
exports.default = Footer;
