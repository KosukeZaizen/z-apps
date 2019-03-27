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
            },

            //操作ボタン
            BUTTON: "btn btn-info btn-lg btn-block",

        };

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();
        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        this.UL = parseInt(pageSize.pageHeight, 10) / 90;

        this.ninja = {
            speedX: 0,
            speedY: 0,
            posX: 145,
            posY: 59,
        }

        this.state = {
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight - 15 * this.UL,
                ...this.consts.backgroundSetting,
            },
            ninjaStat: {
                left: true,
                ninjaX: this.ninja.posX * this.UL,
                ninjaY: this.ninja.posY * this.UL,
            }
        };

        //←ボタン押下判定
        this.lButton = false;
        //→ボタン押下判定
        this.rButton = false;
        //jumpボタン押下判定
        this.jButton = false;
    }


    //---------------↓　resize　↓---------------
    getWindowSize() {
        let pageWidth, pageHeight;
        let screenWidth = parseInt(window.innerWidth, 10);
        let screenHeight = parseInt(window.innerHeight, 10);

        if (screenWidth > screenHeight * 16 / 9) {
            //横長
            pageHeight = screenHeight;
            pageWidth = pageHeight * 16 / 9;
        } else {
            //縦長
            pageWidth = screenWidth;
            pageHeight = pageWidth * 9 / 16;
        }

        return { pageWidth: pageWidth, pageHeight: pageHeight };
    }
    //---------------↑　resize　↑---------------



    onLoadPage() {
        //タイムステップ毎に処理を呼び出す
        setInterval(() => {
            //タイムステップごとの計算



            /* ↓　物体速度・位置計算　↓ */

            //忍者の画像の向き
            let boolLeft = this.state.ninjaStat.left;

            //ボタン押下判定
            if (this.lButton === false && this.rButton === false) {
                this.ninja.speedX = 0;
            } else {
                if (this.lButton === true) {
                    this.ninja.speedX -= 1;
                    boolLeft = true;//画像左向き
                }
                if (this.rButton === true) {
                    this.ninja.speedX += 1;
                    boolLeft = false;//画像右向き
                }
            }

            if (this.jButton === true) {
                if (this.ninja.speedY === 0) {
                    this.ninja.speedY = -15;
                }
                this.jButton = false;
            }

            //重力加速度
            this.ninja.speedY += 2;

            //最大速度補正
            if (this.ninja.speedX > 2) {
                this.ninja.speed = 2;
            } else if (this.ninja.speedX < -2) {
                this.ninja.speed = -2;
            }

            //位置計算
            this.ninja.posX += this.ninja.speedX;
            this.ninja.posY += this.ninja.speedY;

            //床補正
            if (this.ninja.posY > 59) {
                this.ninja.posY = 59;
                this.ninja.speedY = 0;
            }


            /* ↑　物体速度・位置計算　↑ */


            //ページサイズ取得（ウィンドウサイズが変更された時のため）
            let pageSize = this.getWindowSize();

            //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
            this.UL = pageSize.pageHeight / 90;

            //物体の位置などを更新し、再描画
            this.setState({
                pageStyle: {
                    width: pageSize.pageWidth,
                    height: pageSize.pageHeight - 15 * this.UL,
                    ...this.consts.backgroundSetting,
                },
                ninjaStat: {
                    left: boolLeft,
                    ninjaX: this.ninja.posX * this.UL,
                    ninjaY: this.ninja.posY * this.UL,
                }
            });
        }, this.consts.timeStep);
    }


    //ボタン押下時処理
    onClickButton(btnType) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = true;
        } else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = true;
        } else if (btnType === "jump") {
            //jumpボタン押下判定
            this.jButton = true;
        }
    }
    //ボタン押下終了時処理
    onMouseUp(btnType) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = false;
        } else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = false;
        }
    }



    render() {
        //ボタンがあるテーブルのスタイル
        let controllerStyle = {
            position: "absolute",
            top: 75 * this.UL,
            width: "100%",
        };
        //左右のボタンのスタイル
        let sideButtonStyle = {
            width: 30 * this.UL,
            height: 15 * this.UL,
            fontSize: 4 * this.UL + "px",
            margin: "1px",
        };
        //ジャンプボタンのスタイル
        let jumpButtonStyle = {
            width: 100 * this.UL,
            height: 15 * this.UL,
            fontSize: 4 * this.UL,
            margin: "1px",
        };

        return (
            <div>
                <div
                    id="gameScreen"
                    style={this.state.pageStyle}
                    onLoad={() => { this.onLoadPage() }}
                >
                    <Obj
                        imgSrc={runningNinja}
                        imgAlt="Running Ninja"
                        width="10%"
                        x={this.state.ninjaStat.ninjaX}
                        y={this.state.ninjaStat.ninjaY}
                        boolLeft={this.state.ninjaStat.left}
                    />
                </div>
                <b>
                    <table id="controller" style={controllerStyle}>
                        <tbody>
                            <tr>
                                <td align="right">
                                    <button
                                        style={sideButtonStyle}
                                        className={this.consts.BUTTON}
                                        onMouseDown={() => { this.onClickButton("left") }}
                                        onTouchStart={() => { this.onClickButton("left") }}
                                        onMouseUp={() => { this.onMouseUp("left") }}
                                        onMouseOut={() => { this.onMouseUp("left") }}
                                        onTouchEnd={() => { this.onMouseUp("left") }}
                                    >
                                        {"＜"}
                                    </button>
                                </td>
                                <td align="center">
                                    <button
                                        style={jumpButtonStyle}
                                        className={this.consts.BUTTON}
                                        onMouseDown={() => { this.onClickButton("jump") }}
                                        onTouchStart={() => { this.onClickButton("jump") }}
                                        onMouseUp={() => { this.onMouseUp("jump") }}
                                        onMouseOut={() => { this.onMouseUp("jump") }}
                                        onTouchEnd={() => { this.onMouseUp("jump") }}
                                    >
                                        {"↑　jump　↑"}
                                    </button>
                                </td>
                                <td align="left">
                                    <button
                                        style={sideButtonStyle}
                                        className={this.consts.BUTTON}
                                        onMouseDown={() => { this.onClickButton("right") }}
                                        onTouchStart={() => { this.onClickButton("right") }}
                                        onMouseUp={() => { this.onMouseUp("right") }}
                                        onMouseOut={() => { this.onMouseUp("right") }}
                                        onTouchEnd={() => { this.onMouseUp("right") }}
                                    >
                                        {"＞"}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b>
            </div>
        );
    }
}

export { Page2 };