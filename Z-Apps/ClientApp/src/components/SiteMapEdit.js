"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Helmet_1 = __importDefault(require("./parts/Helmet"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const commonFnc = __importStar(require("./common/functions"));
class SiteMapEdit extends React.Component {
    constructor(props) {
        super(props);
        this.loadSitemap = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `api/SiteMapEdit/GetSiteMap`;
                const response = yield fetch(url);
                const sitemap = yield response.json();
                this.setState({ sitemap: sitemap });
            }
            catch (e) {
                //window.location.href = `/not-found?p=${window.location.pathname}`;
                return;
            }
        });
        this.handleChangeSitemap = (event, i, item) => {
            const s = this.state.sitemap.concat();
            s[i][item] = event.target.value.split(" ").join("");
            this.setState({ sitemap: s });
        };
        this.addLine = (i) => {
            const s = this.state.sitemap.concat();
            s.splice(i + 1, 0, { loc: "", lastmod: "" });
            this.setState({ sitemap: s });
        };
        this.removeLine = (i) => {
            const s = this.state.sitemap.filter((l, m) => m != i);
            this.setState({ sitemap: s });
        };
        this.register = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (window.confirm('Are you sure that you want to register?')) {
                    const { sitemap, token } = this.state;
                    const result = yield commonFnc.sendPost({ sitemap, token }, "api/SiteMapEdit/RegisterSiteMap");
                    if (result) {
                        alert("Success to save!");
                    }
                    else {
                        alert("Failed to save...");
                    }
                }
            }
            catch (ex) {
                console.log(ex);
                alert("Error!");
                alert("Error!");
            }
        });
        this.changeToken = (event) => {
            const token = event.target.value;
            this.setState({ token: token });
            localStorage.setItem("folktales-register-token", JSON.stringify({ token }));
        };
        this.checkInput = (s) => {
            try {
                if (s.loc.indexOf("https://z-apps.lingual-ninja.com") < 0)
                    return "The URL is strange.";
                if (s.lastmod.length != 25)
                    return "Length of lastmod need to be 25.";
                const dateAndTime = s.lastmod.split("T");
                if (dateAndTime.length != 2)
                    return "lastmod needs T";
                const date = dateAndTime[0];
                const time = dateAndTime[1];
                if (date.length != 10)
                    return "The length of the date part needs to be 10.";
                const arrDate = date.split("-");
                if (!(Number(arrDate[0]) >= 2019 && Number(arrDate[0]) < 2030))
                    return "Year is strange.";
                if (!(Number(arrDate[1]) >= 1 && Number(arrDate[1]) <= 12))
                    return "Month is strange.";
                if (!(Number(arrDate[2]) >= 1 && Number(arrDate[2]) <= 31))
                    return "Date is strange.";
                const arrTime = time.split("+");
                if (arrTime[1] != "09:00")
                    return "lastmod needs +09:00";
                const arrTime2 = arrTime[0].split(":");
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
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = JSON.parse(saveData);
        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        this.state = {
            sitemap: [],
            token: token,
        };
        this.screenHeight = window.innerHeight;
        this.loadSitemap();
    }
    render() {
        const { sitemap } = this.state;
        const resultOfCheck = sitemap.filter(s => this.checkInput(s) != "").length === 0;
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: "Edit Sitemap", noindex: true }),
            React.createElement("div", { style: { width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: -1 } }),
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
                    React.createElement("div", { style: { textAlign: "left" } }, sitemap && sitemap.map((s, i) => React.createElement(SitemapInfo, { s: s, i: i, key: i, handleChangeSitemap: this.handleChangeSitemap, addLine: this.addLine, removeLine: this.removeLine, checkInput: this.checkInput })))
                    :
                        React.createElement("div", { className: "center" },
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
    }
}
exports.default = SiteMapEdit;
;
class SitemapInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { s, i, handleChangeSitemap, addLine, removeLine, checkInput } = this.props;
        return (React.createElement("span", null,
            React.createElement("span", { style: { color: "red" } }, checkInput(s)),
            React.createElement("table", { style: { width: "100%" } },
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "loc:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.loc, onChange: (e) => handleChangeSitemap(e, i, "loc"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))),
                    React.createElement("tr", { style: { backgroundColor: "black", color: "#757575" } },
                        React.createElement("td", { style: { width: "20px" } },
                            React.createElement("b", null, "lastmod:\u3000")),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", value: s.lastmod, onChange: (e) => handleChangeSitemap(e, i, "lastmod"), style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" } }))))),
            React.createElement("button", { style: { marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => addLine(i) },
                React.createElement("b", null, "Add Line")),
            React.createElement("div", { style: { textAlign: "right", float: "right" } },
                React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }, className: "btn btn-dark btn-xs", onClick: () => removeLine(i) },
                    React.createElement("b", null, "Remove Line"))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("hr", null)));
    }
}
;
