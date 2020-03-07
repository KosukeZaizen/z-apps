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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
require("./Footer.css");
var react_router_dom_1 = require("react-router-dom");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (<footer className="footer">
                <center>
                    <div className="container text-muted">
                        <span className="text-muted">Copyright <react_router_dom_1.Link to="/developer">Kosuke Zaizen</react_router_dom_1.Link>. All rights reserved.
                            <span className='hidden-xs'>　　</span>
                            <span className='visible-xs'><br /></span>
                        </span>
                        <react_router_dom_1.Link to="/terms">Terms of Use</react_router_dom_1.Link>
                    </div>
                </center>
            </footer>);
    };
    return Footer;
}(React.Component));
exports.default = Footer;
