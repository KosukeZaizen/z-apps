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
var React = __importStar(require("react"));
require("../css/Terms.css");
var _404_png_1 = __importDefault(require("../img/404.png"));
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var functions_1 = require("./common/functions");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var NotFound = function (props) {
    var params = functions_1.getParams();
    return (<div>
            <Helmet_1.default title="404" noindex={true}/>
            <center>
                <h1>Page not found!</h1>
                <hr />
                <img src={_404_png_1.default} width="50%" alt="404 error"/>
                <h2>No match for <code>{params && params.p}</code></h2>
                <p>Please check if the url is correct!</p>
                <react_router_dom_1.Link to="/">
                    <reactstrap_1.Button color="primary" style={{ width: "50%" }}><b>Home</b></reactstrap_1.Button>
                </react_router_dom_1.Link>
            </center>
        </div>);
};
exports.default = NotFound;
