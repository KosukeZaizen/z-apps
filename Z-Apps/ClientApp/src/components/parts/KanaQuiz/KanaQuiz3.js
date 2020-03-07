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
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
var IncorrectTable = /** @class */ (function (_super) {
    __extends(IncorrectTable, _super);
    function IncorrectTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IncorrectTable.prototype.render = function () {
        var _this = this;
        var top = "Characters you should remember:";
        var trList = [];
        for (var key in this.props.incorrectList) {
            trList.push(<tr key={key}><td>{this.props.incorrectList[key]}</td><td>　:　</td><td>{key}</td></tr>);
        }
        return (<reactstrap_1.Card body inverse color="primary">
                <reactstrap_1.CardHeader tag="h3">{top}</reactstrap_1.CardHeader>
                <reactstrap_1.CardBody>
                    <table>
                        <tbody>
                            {trList}
                        </tbody>
                    </table>
                    <br />
                    <reactstrap_1.Button onClick={function () { _this.props.changePage(1); }} type="button">Retry</reactstrap_1.Button>
                </reactstrap_1.CardBody>
            </reactstrap_1.Card>);
    };
    return IncorrectTable;
}(React.Component));
var RelatedArticles = /** @class */ (function (_super) {
    __extends(RelatedArticles, _super);
    function RelatedArticles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelatedArticles.prototype.render = function () {
        var linkList = [];
        for (var key in this.props.objLinks) {
            linkList.push(<div key={key}>
                    <span className="font-large">
                        &nbsp; &nbsp;
                    <u>
                            <a href={this.props.objLinks[key]} target="_blank" rel="noopener noreferrer">
                                {key} &gt;&gt;
                            </a>
                        </u>
                    </span>
                    <br />
                </div>);
        }
        return (<div className="related-articles">
                <b><span className="font-large">Related articles:</span></b><br />
                <br />
                {linkList}
            </div>);
    };
    return RelatedArticles;
}(React.Component));
var Quiz3 = /** @class */ (function (_super) {
    __extends(Quiz3, _super);
    function Quiz3(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        return _this;
    }
    Quiz3.prototype.render = function () {
        var _this = this;
        return (<div id="disp3">
                <h1>
                    Your score is:<br />
                    {this.props.score}
                    /
                    {this.props.maxChar}</h1>
                <br />
                {Object.keys(this.props.incorrectList).length > 0 &&
            <IncorrectTable incorrectList={this.props.incorrectList} changePage={function (i) { _this.props.changePage(i); }}/>}
                <br />
                <react_router_dom_1.Link to={"/" + this.props.consts.OTHER_KANA_TYPE.toLowerCase() + "-quiz"}>
                    <button className={this.consts.BUTTON_SUCCESS}>
                        {this.props.consts.OTHER_KANA_TYPE} Quiz!
                    </button>
                </react_router_dom_1.Link>
                <br />
                <react_router_dom_1.Link to={"/romaji-converter"}>
                    <button className={this.consts.BUTTON_DANGER}>
                        Romaji Converter
                    </button>
                </react_router_dom_1.Link>
                <br />
                <RelatedArticles objLinks={this.props.consts.OBJ_LINKS}/>
            </div>);
    };
    return Quiz3;
}(React.Component));
exports.Quiz3 = Quiz3;
exports.default = Quiz3;
