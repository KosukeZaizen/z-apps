import React from 'react';
import runningNinja from './img/ninja_hashiru.png';
import furuie from './img/background/furuie5.jpg';
import { Obj } from './class/obj';


export default class Page2 extends React.Component {

    constructor(props) {
        super(props);

        this.consts = {
            timeStep: 100,

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

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();
        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        this.UL = parseInt(pageSize.pageHeight, 10) / 90;

        this.ninja = {
            speedX: 0,
            speedY: 0,
            posX: this.UL * 145,
            posY: this.UL * 74,
        }

        this.state = {
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight,
                ...this.consts.backgroundSetting,
            },
            objsPos: {
                ninjaX: this.ninja.posX,
                ninjaY: this.ninja.posY,
            }
        };
    }


    //---------------↓　resize　↓---------------
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
    //---------------↑　resize　↑---------------



    onLoadPage() {
        //タイムステップ毎に処理を呼び出す
        setInterval(() => {
            //タイムステップごとの計算

            //ページサイズ取得（ウィンドウサイズが変更された時のため）
            let pageSize = this.getWindowSize();

            //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
            this.UL = parseInt(pageSize.pageHeight, 10) / 90;






            this.ninja = {
                speedX: 0,
                speedY: 0,
                posX: this.UL * 145,
                posY: this.UL * 74,
            }

            //物体の位置などを更新し、再描画
            this.setState({
                pageStyle: {
                    width: pageSize.pageWidth,
                    height: pageSize.pageHeight,
                    ...this.consts.backgroundSetting,
                },
                objsPos: {
                    ninjaX: this.ninja.posX,
                    ninjaY: this.ninja.posY,
                }
            });
        }, this.consts.timeStep);
    }

    render() {
        return (
            <div
                id="page2"
                style={this.state.pageStyle}
                onLoad={() => { this.onLoadPage() }}
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