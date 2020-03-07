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
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var Boscobel = /** @class */ (function (_super) {
    __extends(Boscobel, _super);
    function Boscobel(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeFile = function (e, imageType) {
            var target = e.target;
            var file = target.files.item(0);
            if (imageType === _this.consts.background) {
                _this.setState({ background: file });
            }
            else if (imageType === _this.consts.top) {
                _this.setState({ top: file });
            }
        };
        _this.handleChangePW = function (e) {
            _this.setState({ pw: e.target.value });
            localStorage.setItem("boscobel-token", JSON.stringify({ token: e.target.value }));
        };
        _this.uploadFile = function (imageType) {
            var file = null;
            if (imageType === _this.consts.background) {
                file = _this.state.background;
            }
            else if (imageType === _this.consts.top) {
                file = _this.state.top;
            }
            if (!file || file.name.split(".").pop().toLowerCase() !== "png") {
                alert("Error! Please select a png file.");
                return;
            }
            var formData = new FormData();
            formData.append("file", file);
            formData.append("shop", "boscobel");
            formData.append("fileName", imageType);
            formData.append("pw", _this.state.pw);
            fetch('/api/ShopImg/Upload', { method: 'POST', body: formData })
                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, response.json()];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                if (result.errMessage) {
                                    alert(result.errMessage);
                                }
                                else {
                                    alert("Success to upload!");
                                    window.open('https://www.cafe-boscobel.com/');
                                    window.location.reload();
                                }
                            }
                            else {
                                alert("Failed to upload... Status:" + response.status);
                            }
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function () {
                alert("Failed to upload...");
            });
        };
        //セーブデータがあればそれを設定
        var saveData = localStorage.getItem("boscobel-token");
        var objSaveData = JSON.parse(saveData);
        var token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        _this.state = {
            background: null,
            top: null,
            pw: token,
        };
        _this.consts = {
            background: "background",
            top: "top",
        };
        return _this;
    }
    Boscobel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "center" },
            React.createElement(Helmet_1.default, { title: "Boscobel - Upload Image", noindex: true }),
            React.createElement("div", { style: { width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: -1 } }),
            React.createElement("div", { style: { maxWidth: 1000, color: "white" } },
                React.createElement("h1", { style: {
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    } },
                    React.createElement("b", null, "Boscobel - Upload Image")),
                React.createElement("br", null),
                "\u30D1\u30B9\u30EF\u30FC\u30C9\uFF0830cm\u3092\u8D85\u3048\u308B\u91D1\u9B5A\u306E\u540D\u524D\u306F\uFF1F\uFF09",
                React.createElement("input", { type: "text", onChange: this.handleChangePW, value: this.state.pw, style: { color: "black" } }),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" } },
                    React.createElement("h2", null, "Background Image"),
                    React.createElement("br", null),
                    "Current image:",
                    React.createElement("br", null),
                    React.createElement("img", { src: "https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/background.png", style: { width: "100%" } }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Select a png file from your computer! (Only png is valid!)",
                    React.createElement("input", { type: "file", name: "background", onChange: function (e) { return _this.handleChangeFile(e, _this.consts.background); } }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }, className: "btn btn-primary btn-xs", onClick: function () { return _this.uploadFile(_this.consts.background); } },
                        React.createElement("b", null, "Upload"))),
                React.createElement("br", null),
                React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" } },
                    React.createElement("h2", null, "Top Image"),
                    React.createElement("br", null),
                    "Current image:",
                    React.createElement("br", null),
                    React.createElement("img", { src: "https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/top.png", style: { width: "100%" } }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Select a png file from your computer! (Only png is valid!)",
                    React.createElement("input", { type: "file", name: "top", onChange: function (e) { return _this.handleChangeFile(e, _this.consts.top); } }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }, className: "btn btn-primary btn-xs", onClick: function () { return _this.uploadFile(_this.consts.top); } },
                        React.createElement("b", null, "Upload"))))));
    };
    return Boscobel;
}(React.Component));
exports.default = Boscobel;
;
var Description = /** @class */ (function (_super) {
    __extends(Description, _super);
    function Description(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Description.prototype.render = function () {
        return (React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" } },
            React.createElement("textarea", { rows: 10, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }, value: this.props.desc, onChange: this.props.handleChangeDesc })));
    };
    return Description;
}(React.Component));
