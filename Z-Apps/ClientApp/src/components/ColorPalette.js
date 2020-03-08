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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var FaceBook_1 = __importDefault(require("./parts/FaceBook"));
var Helmet_1 = __importDefault(require("./parts/Helmet"));
var ColorPalette = /** @class */ (function (_super) {
    __extends(ColorPalette, _super);
    function ColorPalette(props) {
        var _this = _super.call(this, props) || this;
        _this.consts = {
            COPY_BUTTON_PRIMARY: "btn btn-primary btn-sm",
            MSG_COPY_DONE: "Copy completed!\r\nYou can paste the Color Code anywhere!",
            MSG_COPY_ERR: "Sorry!\r\nYou can not use the copy function with this web browser.\r\nPlease copy it manually.",
        };
        _this.state = {
            hue: 300,
            saturation: 90,
            lightness: 50,
        };
        _this.onChangeHue = _this.onChangeHue.bind(_this);
        _this.onClickHueBar = _this.onClickHueBar.bind(_this);
        _this.onClickTable = _this.onClickTable.bind(_this);
        _this.onClickCopy = _this.onClickCopy.bind(_this);
        return _this;
    }
    ColorPalette.prototype.onChangeHue = function (e) {
        this.setState({
            hue: parseInt(e.target.value, 10),
        });
    };
    ColorPalette.prototype.onClickTable = function (h, s, l) {
        this.setState({
            hue: h,
            saturation: s,
            lightness: l,
        });
    };
    ColorPalette.prototype.onClickHueBar = function (h) {
        this.setState({
            hue: h,
        });
    };
    ColorPalette.prototype.onChangeHueText = function (e) {
        var hue = e.target.value;
        //空文字列を0に変換
        hue = hue === "" ? "0" : hue;
        //半角に変換
        hue = hue.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
        //数字以外除去
        hue = (hue).replace(/[^0-9]/g, '');
        //数値型に変換
        hue = parseInt(hue, 10);
        this.setState({
            hue: hue,
        });
    };
    ColorPalette.prototype.onClickCopy = function () {
        var strTarget = document.getElementById("color-code-to-copy").innerHTML;
        if (execCopy(strTarget)) {
            alert(this.consts.MSG_COPY_DONE);
        }
        else {
            alert(this.consts.MSG_COPY_ERR);
        }
    };
    ColorPalette.prototype.render = function () {
        var _this = this;
        //現在stateに設定されている色を文字列で取得
        var currentColor = changeHslToColorCode(this.state.hue, this.state.saturation, this.state.lightness);
        var styleTitle = {
            maxWidth: 600,
            marginTop: 20,
            marginBottom: 30,
            color: currentColor,
        };
        var styleResultDisplay = {
            width: 30,
            height: 30,
            background: currentColor,
        };
        var styleContents = {
            maxWidth: 400,
            marginTop: 10,
            marginBottom: 10,
        };
        return (React.createElement("div", { className: "center", id: "color-palette" },
            React.createElement(Helmet_1.default, { title: "Color Code Getter", desc: "Get your favorite Color Code automatically!" }),
            React.createElement("h1", { style: styleTitle }, "Color Code Getter"),
            React.createElement("div", { style: styleContents },
                React.createElement("div", { style: { padding: 10, marginBottom: 10, border: "5px double #333333", } },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { style: { margin: 4, } }, "Current color: ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: styleResultDisplay }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { style: { margin: 4, } }, "Color code: ")),
                                React.createElement("td", null,
                                    React.createElement("label", { style: { margin: 4, } },
                                        React.createElement("span", { id: "color-code-to-copy" }, changeHslToColorCode(this.state.hue, this.state.saturation, this.state.lightness))))))),
                    React.createElement("button", { onClick: this.onClickCopy, className: this.consts.COPY_BUTTON_PRIMARY, style: { margin: 5 } }, "Click here to copy the Color Code!")),
                React.createElement("br", null),
                React.createElement("label", null, "Click your favorite color!"),
                React.createElement("br", null),
                React.createElement("div", { style: { position: "relative", } },
                    React.createElement("table", { style: {
                            maxWidth: 400,
                            height: 30,
                            width: "100%",
                            tableLayout: "fixed",
                            zIndex: 100,
                            marginBottom: 30,
                        } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null, getHueBar(this.onClickHueBar)))),
                    React.createElement("input", { type: "range", min: "0", max: "360", step: "1", value: this.state.hue, onChange: function (e) { _this.onChangeHue(e); }, style: {
                            maxWidth: 400,
                            marginTop: 29,
                            height: 2,
                            zIndex: 150,
                            position: "absolute",
                            top: 0,
                        } })),
                React.createElement("div", { id: "wrapper" },
                    React.createElement("table", { style: {
                            maxWidth: 300,
                            height: 280,
                            width: "100%",
                            tableLayout: "fixed",
                        }, className: "content" },
                        React.createElement("tbody", null, getSlTable(this.state.hue, this.onClickTable, this.state))))),
            React.createElement("br", null),
            React.createElement(FaceBook_1.default, null)));
    };
    return ColorPalette;
}(React.Component));
;
//--------------------------------------------------
// HSLからCSS用の色指定を返す
//--------------------------------------------------
function changeHslToStyle(hue, saturation, lightness) {
    return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
}
//--------------------------------------------------
// HSLから背景色付きのtdを返す
//--------------------------------------------------
function getColoredTdFromHsl(hue, saturation, lightness, key, onClickTable, state) {
    var booLightness = false;
    var booSaturation = false;
    if (state) {
        booLightness = (lightness === state.lightness);
        booSaturation = (saturation === state.saturation);
    }
    if (booLightness || booSaturation) {
        if (booLightness && booSaturation) {
            //選択されたセルは反転した色にする
            return (React.createElement("td", { key: key, onClick: function () { return onClickTable(hue, saturation, lightness); }, style: { background: changeHslToStyle(hue + 180, 100, 60) } }));
        }
        else {
            //選択された位置から十字に色付けする
            return (React.createElement("td", { key: key, onClick: function () { return onClickTable(hue, saturation, lightness); }, style: { background: changeHslToStyle(hue + 180, 30, 30) } }));
        }
    }
    else {
        //選択されていない通常セル
        return (React.createElement("td", { key: key, onClick: function () { return onClickTable(hue, saturation, lightness); }, style: { background: changeHslToStyle(hue, saturation, lightness) } }));
    }
}
//--------------------------------------------------
// 色相のグラデーションバーを作成
//--------------------------------------------------
function getHueBar(onClickTable) {
    var tdList = [];
    for (var hue = 0; hue <= 360; hue++) {
        tdList.push(getColoredTdFromHsl(hue, 90, 60, hue, onClickTable));
    }
    return tdList;
}
//--------------------------------------------------
// 彩度・明度によるテーブルの1行を作成
//--------------------------------------------------
function getSlRow(hue, saturation, key, onClickTable, state) {
    var tdList = [];
    for (var lightness = 100; lightness >= 0; lightness--) {
        tdList.push(getColoredTdFromHsl(hue, saturation, lightness, lightness, onClickTable, state));
    }
    return React.createElement("tr", { key: key }, tdList);
}
//--------------------------------------------------
// 彩度・明度によるテーブルを作成
//--------------------------------------------------
function getSlTable(hue, onClickTable, state) {
    var trList = [];
    for (var saturation = 100; saturation >= 0; saturation--) {
        trList.push(getSlRow(hue, saturation, saturation, onClickTable, state));
    }
    return trList;
}
//--------------------------------------------------
// HSL配列を受け取り、カラーコードを返す
//--------------------------------------------------
function changeHslToColorCode(h, s, l) {
    var arrRGB = changeHslToRgb(h, s, l);
    return "#" + arrRGB.map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
    }).join("");
}
//--------------------------------------------------
// HSL配列をRGB配列に変換
//--------------------------------------------------
function changeHslToRgb(hue, saturation, lightness) {
    var result = null;
    if (((hue || hue === 0) && hue <= 360) && ((saturation || saturation === 0) && saturation <= 100) && ((lightness || lightness === 0) && lightness <= 100)) {
        var red = 0, green = 0, blue = 0, q = 0, p = 0, hueToRgb;
        hue = Number(hue) / 360;
        saturation = Number(saturation) / 100;
        lightness = Number(lightness) / 100;
        if (saturation === 0) {
            red = lightness;
            green = lightness;
            blue = lightness;
        }
        else {
            hueToRgb = function (p, q, t) {
                if (t < 0) {
                    t += 1;
                }
                if (t > 1) {
                    t -= 1;
                }
                if (t < 1 / 6) {
                    p += (q - p) * 6 * t;
                }
                else if (t < 1 / 2) {
                    p = q;
                }
                else if (t < 2 / 3) {
                    p += (q - p) * (2 / 3 - t) * 6;
                }
                return p;
            };
            if (lightness < 0.5) {
                q = lightness * (1 + saturation);
            }
            else {
                q = lightness + saturation - lightness * saturation;
            }
            p = 2 * lightness - q;
            red = hueToRgb(p, q, hue + 1 / 3);
            green = hueToRgb(p, q, hue);
            blue = hueToRgb(p, q, hue - 1 / 3);
        }
        result = [
            Math.round(red * 255).toString(16),
            Math.round(green * 255).toString(16),
            Math.round(blue * 255).toString(16)
        ];
    }
    return result;
}
//--------------------------------------------------
// カラーコードのコピー実行
//--------------------------------------------------
function execCopy(string) {
    var tmp = document.createElement("div");
    var pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    var s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    var result = document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
}
exports.default = ColorPalette;
