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
const Helmet_1 = __importDefault(require("./parts/Helmet"));
class Boscobel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeFile = (e, imageType) => {
            const target = e.target;
            const file = target.files.item(0);
            if (imageType === this.consts.background) {
                this.setState({ background: file });
            }
            else if (imageType === this.consts.top) {
                this.setState({ top: file });
            }
        };
        this.handleChangePW = (e) => {
            this.setState({ pw: e.target.value });
            localStorage.setItem("boscobel-token", JSON.stringify({ token: e.target.value }));
        };
        this.uploadFile = (imageType) => {
            let file = null;
            if (imageType === this.consts.background) {
                file = this.state.background;
            }
            else if (imageType === this.consts.top) {
                file = this.state.top;
            }
            if (!file || file.name.split(".").pop().toLowerCase() !== "png") {
                alert("Error! Please select a png file.");
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("shop", "boscobel");
            formData.append("fileName", imageType);
            formData.append("pw", this.state.pw);
            fetch('/api/ShopImg/Upload', { method: 'POST', body: formData })
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                const result = yield response.json();
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
            }))
                .catch(() => {
                alert("Failed to upload...");
            });
        };
        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("boscobel-token");
        const objSaveData = JSON.parse(saveData);
        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        this.state = {
            background: null,
            top: null,
            pw: token,
        };
        this.consts = {
            background: "background",
            top: "top",
        };
    }
    render() {
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
                    React.createElement("input", { type: "file", name: "background", onChange: (e) => this.handleChangeFile(e, this.consts.background) }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }, className: "btn btn-primary btn-xs", onClick: () => this.uploadFile(this.consts.background) },
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
                    React.createElement("input", { type: "file", name: "top", onChange: (e) => this.handleChangeFile(e, this.consts.top) }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("button", { style: { marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }, className: "btn btn-primary btn-xs", onClick: () => this.uploadFile(this.consts.top) },
                        React.createElement("b", null, "Upload"))))));
    }
}
exports.default = Boscobel;
;
class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { style: { padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" } },
            React.createElement("textarea", { rows: 10, style: { width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }, value: this.props.desc, onChange: this.props.handleChangeDesc })));
    }
}
