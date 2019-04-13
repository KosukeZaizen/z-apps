import React from 'react';
import { connect } from 'react-redux';


class ColorPalette extends React.Component {

    constructor(props) {
        super(props);

        this.const = {
        }

        this.state = {
            hue: 300,
            saturation: 90,
            lightness: 50,
        };

        this.hueError = "";
        this.onChangeHue = this.onChangeHue.bind(this);
        this.onClickTable = this.onClickTable.bind(this);
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


    render() {
        //現在stateに設定されている色を文字列で取得
        let currentColor = changeHslToColorCode(
            this.state.hue, this.state.saturation, this.state.lightness
        );

        let styleTitle = {
            maxWidth: 600,
            margin: 20,
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
            height: 60,
            zIndex: 150,
            position: "absolute",
            top: 0,
        }
        let styleSlTable = {
            maxWidth: 300,
            height: 280,
            width: "100%",
            tableLayout: "fixed",
        };

        return (
            <center id="color-palette">

                <h1 style={styleTitle}>Color Code Getter</h1>
                <div style={styleContents}>
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
                                    <label style={{ margin: 4, }}>{changeHslToColorCode(
                                        this.state.hue, this.state.saturation, this.state.lightness
                                    )}</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br /><br />
                    <label>Click your favorite color!</label><br />
                    <div style={{ position: "relative", }}>
                        {/* 色相グラデーションバー */}
                        <table style={styleHueTable}>
                            <tbody>
                                <tr>
                                    {getHueBar()}
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
function getHueBar() {
    let tdList = [];
    for (let hue = 0; hue <= 360; hue++) {
        tdList.push(getColoredTdFromHsl(hue, 90, 60, hue));
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

export default connect()(ColorPalette);