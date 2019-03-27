import React from 'react';
import runningNinja from './img/ninja_hashiru.png';
import furuie from './img/background/furuie5.jpg';
import { Obj } from './class/obj';


export default class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
            backgroundSetting: {
                /* 背景画像 */
                backgroundImage: `url(${furuie})`,

                /* 画像を常に天地左右の中央に配置 */
                backgroundPosition: "center center",

                /* 画像をタイル状に繰り返し表示しない */
                backgroundRepeat: "no-repeat",

                /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
                backgroundSize: "cover",

                /* 背景画像が読み込まれる前に表示される背景のカラー */
                backgroundColor: "black",
            }
        };

        let pageSize = this.getWindowSize();
        this.state = {
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight,
                ...this.consts.backgroundSetting,
            },
            objsPos: {
                ninjaX: 10,
                ninjaY: 10,
            }
        };

        // when screen size is changed
        this.setOnResizeWindow();
    }

    // when screen size is changed
    setOnResizeWindow() {
        let onResizeWindow = () => { this.onResizeWindow(this) };

        let timer = 0;
        window.onresize = function () {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () {
                onResizeWindow();
            }, 200);
        };
    }

    onResizeWindow() {
        let pageSize = this.getWindowSize();

        this.setState({
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight,
                ...this.consts.backgroundSetting,
            }
        });
    }

    getWindowSize() {
        let pageWidth, pageHeight;
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;

        if (this.screenWidth > this.screenHeight * 16 / 9) {
            //横長
            pageHeight = this.screenHeight;
            pageWidth = parseInt(pageHeight, 10) * 16 / 9 + "px";
        } else {
            //縦長
            pageWidth = this.screenWidth;
            pageHeight = parseInt(pageWidth, 10) * 9 / 16 + "px";
        }

        return { pageWidth: pageWidth, pageHeight: pageHeight };
    }

    onLoadPage(obj) {
        //1000ミリ秒（1秒）毎に処理を呼び出す
        setInterval(() => {
            this.setState(
                {
                    objsPos: {
                        ninjaX: this.state.objsPos.ninjaX + 10,
                        ninjaY: this.state.objsPos.ninjaY + 5,
                    },
                }
            );
        }, 1000);
    }



    render() {
        return (
            <div
                id="page2"
                style={this.state.pageStyle}
                onLoad={() => { this.onLoadPage(this) }}
            >
                <Obj
                    imgSrc={runningNinja}
                    imgAlt="Running Ninja"
                    width="10%"
                    x={this.state.objsPos.ninjaX}
                    y={this.state.objsPos.ninjaY}
                />
            </div>
        );
    }
}

export { Page2 };