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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var commonFnc = __importStar(require("./common/functions"));
var SiteMapEdit = /** @class */ (function (_super) {
    __extends(SiteMapEdit, _super);
    function SiteMapEdit(props) {
        var _this = _super.call(this, props) || this;
        _this.loadSitemap = function () { return __awaiter(_this, void 0, void 0, function () {
            var url, response, sitemap, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = "api/SiteMapEdit/GetSiteMap";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        sitemap = _a.sent();
                        this.setState({ sitemap: sitemap });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        //window.location.href = `/not-found?p=${window.location.pathname}`;
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.handleChangeSitemap = function (event, i, item) {
            var s = _this.state.sitemap.concat();
            s[i][item] = event.target.value.split(" ").join("");
            _this.setState({ sitemap: s });
        };
        _this.addLine = function (i) {
            var s = _this.state.sitemap.concat();
            s.splice(i + 1, 0, { loc: "", lastmod: "" });
            _this.setState({ sitemap: s });
        };
        _this.removeLine = function (i) {
            var s = _this.state.sitemap.filter(function (l, m) { return m != i; });
            _this.setState({ sitemap: s });
        };
        _this.register = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, sitemap, token, result, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!window.confirm('Are you sure that you want to register?')) return [3 /*break*/, 2];
                        _a = this.state, sitemap = _a.sitemap, token = _a.token;
                        return [4 /*yield*/, commonFnc.sendPost({ sitemap: sitemap, token: token }, "api/SiteMapEdit/RegisterSiteMap")];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            alert("Success to save!");
                        }
                        else {
                            alert("Failed to save...");
                        }
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _b.sent();
                        console.log(ex_1);
                        alert("Error!");
                        alert("Error!");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.changeToken = function (event) {
            var token = event.target.value;
            _this.setState({ token: token });
            localStorage.setItem("folktales-register-token", JSON.stringify({ token: token }));
        };
        _this.checkInput = function (s) {
            try {
                if (s.loc.indexOf("https://z-apps.lingual-ninja.com") < 0)
                    return "The URL is strange.";
                if (s.lastmod.length != 25)
                    return "Length of lastmod need to be 25.";
                var dateAndTime = s.lastmod.split("T");
                if (dateAndTime.length != 2)
                    return "lastmod needs T";
                var date = dateAndTime[0];
                var time = dateAndTime[1];
                if (date.length != 10)
                    return "The length of the date part needs to be 10.";
                var arrDate = date.split("-");
                if (!(Number(arrDate[0]) >= 2019 && Number(arrDate[0]) < 2030))
                    return "Year is strange.";
                if (!(Number(arrDate[1]) >= 1 && Number(arrDate[1]) <= 12))
                    return "Month is strange.";
                if (!(Number(arrDate[2]) >= 1 && Number(arrDate[2]) <= 31))
                    return "Date is strange.";
                var arrTime = time.split("+");
                if (arrTime[1] != "09:00")
                    return "lastmod needs +09:00";
                var arrTime2 = arrTime[0].split(":");
                if (!(Number(arrTime2[0]) >= 0 && Number(arrTime2[0]) <= 24))
                    return "Hour needs to be 0 to 24.";
                if (!(Number(arrTime2[1]) >= 0 && Number(arrTime2[1]) <= 59))
                    return "Minute needs to be 0 to 59.";
                if (!(Number(arrTime2[2]) >= 0 && Number(arrTime2[2]) <= 99))
                    return "Second needs to be 0 to 99.";
            }
            catch (ex) {
                return ex.message;
            }
            return "";
        };
        //セーブデータがあればそれを設定
        var saveData = localStorage.getItem("folktales-register-token");
        var objSaveData = JSON.parse(saveData);
        var token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        _this.state = {
            sitemap: [],
            token: token,
        };
        _this.screenHeight = parseInt(window.innerHeight, 10);
        _this.loadSitemap();
        return _this;
    }
    SiteMapEdit.prototype.render = function () {
        var _this = this;
        var sitemap = this.state.sitemap;
        var resultOfCheck = sitemap.filter(function (s) { return _this.checkInput(s) != ""; }).length === 0;
        return (React.createElement("center", null,
            React.createElement(Helmet_1.default, { title: "Edit Sitemap", noindex: true }),
            React.createElement("div", { style: { width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: "-1" } }),
            React.createElement("div", { style: { maxWidth: 1000 } },
                React.createElement("div", { className: "breadcrumbs", style: { textAlign: "left", color: "white" } },
                    React.createElement(react_router_dom_1.Link, { to: "/", style: { marginRight: "5px", marginLeft: "5px" } },
                        React.createElement("span", null, "Home")),
                    "\uFF1E",
                    React.createElement(react_router_dom_1.Link, { to: "/folktalesEdit", style: { marginRight: "5px", marginLeft: "5px" } },
                        React.createElement("span", null, "Japanese Folktales")),
                    "\uFF1E",
                    React.createElement("span", { style: { marginRight: "5px", marginLeft: "5px" } }, "edit sitemap")),
                React.createElement("h1", { style: {
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    } },
                    React.createElement("b", null, "Edit Sitemap")),
                React.createElement("br", null),
                this.state.sitemap.length > 0 ?
                    React.createElement("div", { style: { textAlign: "left" } }, sitemap && sitemap.map(function (s, i) {
                        return React.createElement(SitemapInfo, { s: s, i: i, key: i, handleChangeSitemap: _this.handleChangeSitemap, addLine: _this.addLine, removeLine: _this.removeLine, checkInput: _this.checkInput });
                    }))
                    :
                        React.createElement("center", null,
                            React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" })),
                React.createElement("input", { type: "text", value: this.state.token, onChange: this.changeToken }),
                React.createElement("br", null),
                React.createElement("div", { style: {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99999999,
                        backgroundColor: "black",
                        width: "100%",
                    } },
                    React.createElement("span", { style: { color: "white" } },
                        "Count: ",
                        sitemap.length),
                    "\"\u3000\"",
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: resultOfCheck ? "black" : "red" }, className: "btn btn-dark btn-xs", disabled: !resultOfCheck, onClick: this.register },
                        React.createElement("b", null, "Register")),
                    React.createElement("span", { style: { color: "red" } }, resultOfCheck || "　error is occuring")))));
    };
    return SiteMapEdit;
}(React.Component));
exports.default = SiteMapEdit;
;
var SitemapInfo = /** @class */ (function (_super) {
    __extends(SitemapInfo, _super);
    function SitemapInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    SitemapInfo.prototype.render = function () {
        var _a = this.props, s = _a.s, i = _a.i, handleChangeSitemap = _a.handleChangeSitemap, addLine = _a.addLine, removeLine = _a.removeLine, checkInput = _a.checkInput;
        return (React.createElement("span", null,
            React.createElement("span", { style: { color: "red" } }, checkInput(s)),
            React.createElement("table", { style: { width: "100%" } },
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { width: "20px" },
                            React.createElement("b", null, "loc:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.loc, onChange: function (e) { return handleChangeSitemap(e, i, "loc"); }, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))),
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { width: "20px" },
                            React.createElement("b", null, "lastmod:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.lastmod, onChange: function (e) { return handleChangeSitemap(e, i, "lastmod"); }, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))))),
            React.createElement("button", { style: { marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: function () { return addLine(i); } },
                React.createElement("b", null, "Add Line")),
            React.createElement("div", { style: { textAligh: "right", float: "right" } },
                React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: function () { return removeLine(i); } },
                    React.createElement("b", null, "Remove Line"))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("hr", null)));
    };
    return SitemapInfo;
}(React.Component));
;
