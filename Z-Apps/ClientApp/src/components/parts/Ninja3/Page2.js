import React from 'react';

import { NinjaChar } from './objs/ninja/ninja';//忍者オブジェクト（主人公）
import { Obj } from './objs/obj';//オブジェクト描画
import { setLang } from './Messages';//メッセージ
import { TIME_STEP } from './Consts'//定数
import { getMessage } from './Messages';//メッセージ

import Imgs from './ImportImgs';//各オブジェクトの画像

import * as GameCore from './GameCore';//ゲームのコア関数
import * as OnTouch from './OnTouch';//タッチ関数
import * as EachTime from './EachTime';//タイムステップごとの処理
import * as CommonFnc from './CommonFnc'//共通関数

//各ステージ情報
import { Stage1 } from './stages/Stage1';
import { Stage2 } from './stages/Stage2';
import { Stage3 } from './stages/Stage3';


//【Unit Length】このゲームの単位長さ
let UL;

export default class Page2 extends React.Component {

    constructor(props) {
        super(props);

        //GameCoreからimportした関数の設定
        this.getWindowSize = GameCore.getWindowSize;
        this.setKeyboardEvent = GameCore.setKeyboardEvent;
        this.onClickButton = GameCore.onClickButton;
        this.onMouseUp = GameCore.onMouseUp;

        //引数で受け取った関数と言語設定を、各import元ファイルから使えるように設定
        CommonFnc.setChangeStage(props.changeStage);
        setLang(props.language);

        //前のステージ（ステージ変更判定に利用）
        this.prevStage = 0;

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();

        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        UL = parseInt(pageSize.pageHeight, 10) / 90;

        //前のステージから受け取った忍者の初期値を設定
        this.ninja = this.props.ninja;

        //既読の巻物
        this.readElementScroll = this.props.readElementScroll;

        //忍者オブジェクトに、ゲーム情報への参照を持たせる
        //（各関数からゲーム情報を参照・更新できるようにするため）
        this.ninja.game = this;


        //背景の初期設定
        this.backgroundSetting = {
            /* 背景画像 */
            backgroundImage: `url(${Stage1.bgImg})`,

            /* 画像を常に天地左右の中央に配置 */
            backgroundPosition: "center center",

            /* 画像をタイル状に繰り返し表示しない */
            backgroundRepeat: "no-repeat",

            /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
            backgroundSize: "cover",

            /* 背景画像が読み込まれる前に表示される背景のカラー */
            backgroundColor: "black",
        };

        // ------------------------------------------------------------
        // ステート初期設定
        // ------------------------------------------------------------
        this.state = {
            screenStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight - 15 * UL,
                ...this.backgroundSetting,
            },
            ninjaStat: {
                left: true,
                ninjaX: this.ninja.posX * UL,
                ninjaY: this.ninja.posY * UL,
            }
        };

        //←ボタン押下判定　初期値
        this.lButton = false;
        //→ボタン押下判定　初期値
        this.rButton = false;
        //jumpボタン押下判定　初期値
        this.jButton = false;

        //キーボード押下時イベントセット
        this.setKeyboardEvent(this);

        //タイムステップ毎に処理を呼び出す
        setInterval(() => {
            //タイムステップごとの計算


            /* ↓　物体速度・位置計算　↓ */

            //ボタン押下判定
            if (this.lButton === false && this.rButton === false) {
                this.ninja.speedX = 0;
            } else {
                if (this.lButton === true && this.rButton === true) {

                    //右と左同時押しでファイヤーボール
                    if (this.ninja.readScroll.indexOf(getMessage("FIRE_SCROLL_TITLE")) >= 0) {
                        //火遁の書を既に読んでいる場合

                        this.objs["fireBall" + this.ninja.fireBallCount] = {
                            size: 12,
                            posX: this.ninja.posX,
                            posY: this.ninja.posY,
                            zIndex: 999 - this.ninja.fireBallCount,
                            img: Imgs.FireBallR,
                            onTouch: OnTouch.toNothing,
                            fireBall: true,
                            boolLeft: this.ninja.boolLeft,
                            eachTime: EachTime.FireBall,
                        }
                        this.ninja.fireBallCount++;
                    }
                } else {
                    if (this.lButton === true) {
                        this.ninja.speedX = this.ninja.inWater ? -3 : -6;
                        this.ninja.boolLeft = true;//画像左向き
                    } else if (this.rButton === true) {
                        this.ninja.speedX = this.ninja.inWater ? 3 : 6;
                        this.ninja.boolLeft = false;//画像右向き
                    }
                }
            }

            if (this.jButton === true) {
                if (this.ninja.speedY === 0) {
                    //通常ジャンプ
                    this.ninja.speedY = -11;
                }
                if (this.ninja.inWater) {
                    //水中
                    if (this.ninja.posY > -10) {
                        //2段ジャンプ実行限界高度に達していない
                        this.ninja.speedY = -7;
                    }
                }
                this.jButton = false;
            }

            //重力加速度
            this.ninja.speedY += this.ninja.inWater ? 1.1 * TIME_STEP : 2.1 * TIME_STEP;

            //落下速度限界
            if (this.ninja.inWater) {
                //水中
                if (this.ninja.speedY > 2) {
                    this.ninja.speedY = 2;
                }
            } else {
                //陸上
                if (this.ninja.speedY > 10.5) {
                    this.ninja.speedY = 10.5;
                }
            }

            //位置計算
            this.ninja.posX += this.ninja.speedX * TIME_STEP;
            this.ninja.posY += this.ninja.speedY * TIME_STEP;


            //オブジェクトとの接触判定
            for (let key in this.objs) {

                //途中でステージ遷移したら、関数を中止するためのフラグ
                let stageChangedFlag = "";

                //当たり判定と、相対位置の取得
                let relativePos = CommonFnc.checkRelativity(this.ninja, this.objs[key]);

                //当たり判定結果確認
                if (relativePos) {
                    //当たり時の処理を実行
                    stageChangedFlag = this.objs[key].onTouch(this.ninja, relativePos);
                }

                //ステージ遷移をしていたら、関数中止
                if (stageChangedFlag && stageChangedFlag === "changed") return;

                //敵などが各タイムステップごとの処理を持っていれば、実行する
                //（ステージ遷移はしない）
                if (this.objs[key].eachTime) {
                    this.objs[key].eachTime(this.ninja, key);
                }
            }
            /* ↑　物体速度・位置計算　↑ */


            //ページサイズ取得（ウィンドウサイズが変更された時のため）
            let pageSize = this.getWindowSize();

            //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
            UL = pageSize.pageHeight / 90;

            //物体の位置などを更新し、再描画
            this.setState({
                screenStyle: {
                    width: pageSize.pageWidth,
                    height: pageSize.pageHeight - 15 * UL,
                    ...this.backgroundSetting,
                },
                ninjaStat: {
                    left: this.ninja.boolLeft,
                    ninjaX: this.ninja.posX * UL,
                    ninjaY: this.ninja.posY * UL,
                }
            });
        }, TIME_STEP*100);
    }


    render() {
        //ボタンがあるテーブルのスタイル
        let controllerStyle = {
            position: "absolute",
            top: 75 * UL,
            width: "100%",
            zIndex: "99999999",
            backgroundColor: "black",
        };
        //左右のボタンのスタイル
        let sideButtonStyle = {
            width: 30 * UL,
            height: 15 * UL,
            fontSize: 4 * UL + "px",
            margin: "1px",
        };
        //ジャンプボタンのスタイル
        let jumpButtonStyle = {
            width: 100 * UL,
            height: 15 * UL,
            fontSize: 4 * UL,
            margin: "1px",
        };

        if (this.prevStage !== this.props.stage) {
            //ステージ変更時のみ1回実行

            //忍者のFireBallCountを0に戻す
            this.ninja.fireBallCount = 0;

            //水中判定を一旦falseとする（水中の場合は、各ステージにてtrueを代入）
            this.ninja.inWater = false;


            if (this.props.stage === 1) {

                //ステージのオブジェクトを設定
                this.objs = Stage1.getObjs();
                //ステージの背景画像を設定
                this.bgImg = Stage1.bgImg;

            } else if (this.props.stage === 2) {

                //ステージのオブジェクトを設定
                this.objs = Stage2.getObjs();
                //ステージの背景画像を設定
                this.bgImg = Stage2.bgImg;

            } else if (this.props.stage === 3) {

                //ステージのオブジェクトを設定
                this.objs = Stage3.getObjs();
                //ステージの背景画像を設定
                this.bgImg = Stage3.bgImg;
            }

            this.prevStage = this.props.stage;  

            //localStorageに自動セーブ
            const { game, ...rest } = this.ninja;
            const saveData = {ninja: rest, stage: this.props.stage}
            localStorage.setItem('saveData3', JSON.stringify(saveData));
        }

        this.backgroundSetting.backgroundImage = `url(${this.bgImg})`;

        return (
            <div id="Page2" style={this.pageStyle}>
                <div
                    id="gameScreen"
                    style={this.state.screenStyle}
                >
                    <NinjaChar
                        imgAlt="Running Ninja"
                        width={this.ninja.size * UL}
                        x={this.state.ninjaStat.ninjaX}
                        y={this.state.ninjaStat.ninjaY}
                        boolLeft={this.state.ninjaStat.left}
                    />
                    <RenderObjs game={this} />
                </div>
                <b>
                    <table id="controller" style={controllerStyle}>
                        <tbody>
                            <tr>
                                <td align="right">
                                    <button
                                        style={sideButtonStyle}
                                        className={"btn btn-info btn-lg btn-block"}
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
                                        className={"btn btn-info btn-lg btn-block"}
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
                                        className={"btn btn-info btn-lg btn-block"}
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

function RenderObjs(props) {
    let objList = [];
    for (let key in props.game.objs) {
        objList.push(
            <Obj
                key={key}
                obj={props.game.objs[key]}
                UL={UL}
                game={props.game}
            />
        );
    }
    return <span>{objList}</span>;
}

export { Page2 };