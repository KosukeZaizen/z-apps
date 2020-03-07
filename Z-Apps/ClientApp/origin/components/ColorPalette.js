import * as React from 'react';
import FB from './parts/FaceBook';
import Head from './parts/Helmet';

class ColorPalette extends React.Component {

    constructor(props) {
        super(props);

        this.consts = {
            COPY_BUTTON_PRIMARY: "btn btn-primary btn-sm",
            MSG_COPY_DONE: "Copy completed!\r\nYou can paste the Color Code anywhere!",
            MSG_COPY_ERR: "Sorry!\r\nYou can not use the copy function with this web browser.\r\nPlease copy it manually.",
        }

        this.state = {
            hue: 300,
            saturation: 90,
            lightness: 50,
        };

        this.hueError = "";
        this.onChangeHue = this.onChangeHue.bind(this);
        this.onClickHueBar = this.onClickHueBar.bind(this);
        this.onClickTable = this.onClickTable.bind(this);
        this.onClickCopy = this.onClickCopy.bind(this);
    }

    onChangeHue(e) {
        this.setState({
            hue: parseInt(e.target.value, 10),
        });
    }

    onClickTable(h, s, l) {
        this.setState({
            hue: h,
            saturation: s,
            lightness: l,
        });
    }

    onClickHueBar(h) {
        this.setState({
            hue: h,
        });
    }

    onChangeHueText(e) {
        let hue = e.target.value;

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

        this.hueError = hue > 360 ? this.const.MSG_HUE_RANGE_ERROR : "";

        this.setState({
            hue: hue,
        });
    }

    onClickCopy() {
        let strTarget = document.getElementById("color-code-to-copy").innerHTML;

        if (execCopy(strTarget)) {
            alert(this.consts.MSG_COPY_DONE);
        }
        else {
            alert(this.consts.MSG_COPY_ERR);
        }
    }

    render() {
        //現在stateに設定されている色を文字列で取得
        let currentColor = changeHslToColorCode(
            this.state.hue, this.state.saturation, this.state.lightness
        );

        let styleTitle = {
            maxWidth: 600,
            margin: 20,
            marginBottom: 30,
            color: currentColor,
        };
        let styleResultDisplay = {
            width: 30,
            height: 30,
            background: currentColor,
        };
        let styleContents = {
            maxWidth: 400,
            margin: 10,
        };
        let styleHueTable = {
            maxWidth: 400,
            height: 30,
            width: "100%",
            tableLayout: "fixed",
            zIndex: 100,
            marginBottom: 30,
        };
        let styleHuePicker = {
            maxWidth: 400,
            marginTop: 29,
            height: 2,
            zIndex: 150,
            position: "absolute",
            top: 0,
        };
        let styleSlTable = {
            maxWidth: 300,
            height: 280,
            width: "100%",
            tableLayout: "fixed",
        };

        return (
            <center id="color-palette">
                <Head
                    title="Color Code Getter"
                    desc="Get your favorite Color Code automatically!"
                />
                <h1 style={styleTitle}>Color Code Getter</h1>
                <div style={styleContents}>
                    <div style={{ padding: 10, marginBottom: 10, border: "5px double #333333", }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ margin: 4, }}>Current color: </label>
                                    </td>
                                    <td>
                                        <div style={styleResultDisplay}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{ margin: 4, }}>Color code: </label>
                                    </td>
                                    <td>
                                        <label style={{ margin: 4, }}>
                                            <span id="color-code-to-copy">
                                                {changeHslToColorCode(this.state.hue, this.state.saturation, this.state.lightness)}
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={this.onClickCopy}
                            className={this.consts.COPY_BUTTON_PRIMARY}
                            style={{ margin: 5 }}
                        >
                            Click here to copy the Color Code!
                </button>
                    </div>
                    <br />
                    <label>Click your favorite color!</label><br />
                    <div style={{ position: "relative", }}>
                        {/* 色相グラデーションバー */}
                        <table style={styleHueTable}>
                            <tbody>
                                <tr>
                                    {getHueBar(this.onClickHueBar)}
                                </tr>
                            </tbody>
                        </table>
                        {/* 色相調節レバー */}
                        <input
                            type="range"
                            min="0"
                            max="360"
                            step="1"
                            value={this.state.hue}
                            onChange={(e) => { this.onChangeHue(e) }}
                            style={styleHuePicker}
                        />
                    </div>
                    {/* 2次元テーブル */}
                    <div id="wrapper">
                        <table style={styleSlTable} className="content">
                            <tbody>
                                {getSlTable(this.state.hue, this.onClickTable, this.state)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <FB />
            </center >
        )
    }
};

//--------------------------------------------------
// HSLからCSS用の色指定を返す
//--------------------------------------------------
function changeHslToStyle(hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

//--------------------------------------------------
// HSLから背景色付きのtdを返す
//--------------------------------------------------
function getColoredTdFromHsl(hue, saturation, lightness, key, onClickTable, state) {

    let booLightness = false;
    let booSaturation = false;

    if (state) {
        booLightness = (lightness === state.lightness);
        booSaturation = (saturation === state.saturation);
    }

    if (booLightness || booSaturation) {
        if (booLightness && booSaturation) {
            //選択されたセルは反転した色にする
            return (
                <td
                    key={key}
                    onClick={() => onClickTable(hue, saturation, lightness)}
                    style={{ background: changeHslToStyle(hue + 180, 100, 60) }}
                >
                </td>
            )

        } else {
            //選択された位置から十字に色付けする
            return (
                <td
                    key={key}
                    onClick={() => onClickTable(hue, saturation, lightness)}
                    style={{ background: changeHslToStyle(hue + 180, 30, 30) }}
                >
                </td>
            )
        }
    } else {
        //選択されていない通常セル
        return (
            <td
                key={key}
                onClick={() => onClickTable(hue, saturation, lightness)}
                style={{ background: changeHslToStyle(hue, saturation, lightness) }}
            >
            </td>
        );
    }
}

//--------------------------------------------------
// 色相のグラデーションバーを作成
//--------------------------------------------------
function getHueBar(onClickTable) {
    let tdList = [];
    for (let hue = 0; hue <= 360; hue++) {
        tdList.push(getColoredTdFromHsl(hue, 90, 60, hue, onClickTable));
    }
    return tdList;
}

//--------------------------------------------------
// 彩度・明度によるテーブルの1行を作成
//--------------------------------------------------
function getSlRow(hue, saturation, key, onClickTable, state) {
    let tdList = [];

    for (let lightness = 100; lightness >= 0; lightness--) {
        tdList.push(getColoredTdFromHsl(hue, saturation, lightness, lightness, onClickTable, state));
    }
    return <tr key={key}>{tdList}</tr>;
}

//--------------------------------------------------
// 彩度・明度によるテーブルを作成
//--------------------------------------------------
function getSlTable(hue, onClickTable, state) {
    let trList = [];
    for (let saturation = 100; saturation >= 0; saturation--) {
        trList.push(getSlRow(hue, saturation, saturation, onClickTable, state));
    }
    return trList;
}

//--------------------------------------------------
// HSL配列を受け取り、カラーコードを返す
//--------------------------------------------------
function changeHslToColorCode(h, s, l) {
    let arrRGB = changeHslToRgb(h, s, l);

    return "#" + arrRGB.map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
    }).join("");
}

//--------------------------------------------------
// HSL配列をRGB配列に変換
//--------------------------------------------------
function changeHslToRgb(hue, saturation, lightness) {
    var result = false;

    if (((hue || hue === 0) && hue <= 360) && ((saturation || saturation === 0) && saturation <= 100) && ((lightness || lightness === 0) && lightness <= 100)) {
        var red = 0,
            green = 0,
            blue = 0,
            q = 0,
            p = 0,
            hueToRgb;

        hue = Number(hue) / 360;
        saturation = Number(saturation) / 100;
        lightness = Number(lightness) / 100;

        if (saturation === 0) {
            red = lightness;
            green = lightness;
            blue = lightness;
        } else {
            hueToRgb = function (p, q, t) {
                if (t < 0) {
                    t += 1;
                }

                if (t > 1) {
                    t -= 1;
                }

                if (t < 1 / 6) {
                    p += (q - p) * 6 * t;
                } else if (t < 1 / 2) {
                    p = q;
                } else if (t < 2 / 3) {
                    p += (q - p) * (2 / 3 - t) * 6;
                }

                return p;
            };

            if (lightness < 0.5) {
                q = lightness * (1 + saturation);
            } else {
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

    let tmp = document.createElement("div");
    let pre = document.createElement('pre');

    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';

    tmp.appendChild(pre).textContent = string;

    let s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';

    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);

    let result = document.execCommand("copy");

    document.body.removeChild(tmp);

    return result;
}

export default ColorPalette;