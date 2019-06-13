import React from 'react';

import { NinjaChar } from './objs/ninja/ninja';//忍者オブジェクト（主人公）
import { Obj } from './objs/obj';//オブジェクト描画
import { setLang } from './Messages';//メッセージ
import { TIME_STEP } from './Consts'//定数
import { messages } from './Messages';//メッセージ

import * as GameCore from './GameCore';//ゲームのコア関数
import * as CommonFnc from './CommonFnc'//共通関数

//各ステージ情報
import { Stage1 } from './stages/Stage1';
import { Stage2 } from './stages/Stage2';
import { Stage3 } from './stages/Stage3';

//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';

//【Unit Length】このゲームの単位長さ
let UL;

export default class Page2 extends React.Component {

    constructor(props) {
        super(props);

        //(PC) or (スマホ/タブレット) 判定
        this.terminalPC = GameCore.checkTerminalPC();

        //GameCoreからimportした関数の設定
        this.getWindowSize = GameCore.getWindowSize;
        this.setKeyboardEvent = GameCore.setKeyboardEvent;
        this.onClickButton = GameCore.onClickButton.bind(this);
        this.onMouseUp = GameCore.onMouseUp.bind(this);

        //引数で受け取った関数と言語設定を、各import元ファイルから使えるように設定
        CommonFnc.setChangeStage(props.changeStage);
        setLang(props.language);

        //前のステージ（ステージ変更判定に利用）
        this.prevStage = 0;

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();

        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        UL = parseInt(pageSize.pageHeight, 10) / 90;

        //呼び出し元から受け取った忍者の初期値を設定
        this.ninja = this.props.ninja;

        //既読の巻物(ステージ遷移の度にリセット)
        this.readElementScroll = this.props.readElementScroll;

        //忍者オブジェクトに、ゲーム情報への参照を持たせる
        //（各関数からゲーム情報を参照・更新できるようにするため）
        this.ninja.game = this;

        //背景の初期設定
        this.backgroundSetting = GameCore.getBgImg(Stage1.bgImg);


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
                    if (this.ninja.readScroll.indexOf(messages.FIRE_SCROLL_TITLE) >= 0) {
                        //火遁の書を既に読んでいる場合

                        //ファイヤーボール生成
                        this.objs["fireBall" + this.ninja.fireBallCount] =
                            StageParts.getFireBall(12, this.ninja.posX, this.ninja.posY, this.ninja.boolLeft, this.ninja.fireBallCount);

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
                    <RenderScreenBottom
                        onClickButton={GameCore.onClickButton.bind(this)}
                        onMouseUp={GameCore.onMouseUp.bind(this)}
                        terminalPC={this.terminalPC}
                    />
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

function RenderScreenBottom(props) {
    //画面下部のボタンなどの表示の出し分け

    if (props.terminalPC) {
        //PCの場合、キーボード操作を促すメッセージ表示
        let styleDivPcMessage = {
            position: "absolute",
            top: 75 * UL,
            width: 160 * UL,
            height: 15 * UL,
            zIndex: "99999999",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        let styleTextPcMessage = {
            fontSize: "xx-large",
            color: "white",
        };
        return (
            <div style={styleDivPcMessage}>
                <span style={styleTextPcMessage}>
                    {messages.PC_KEYBOARD}
                </span>
            </div>
        );
    } else {
        //スマホ・タブレットの場合、画面下部にボタンを表示
        return (
            <RenderButtons
                onClickButton={props.onClickButton}
                onMouseUp={props.onMouseUp}
            />
        );
    }
}

function RenderButtons(props) {

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

    return (
        <table id="controller" style={controllerStyle}>
            <tbody>
                <tr>
                    <td align="right">
                        <button
                            style={sideButtonStyle}
                            className={"btn btn-info btn-lg btn-block"}
                            onMouseDown={() => { props.onClickButton("left") }}
                            onTouchStart={() => { props.onClickButton("left") }}
                            onMouseUp={() => { props.onMouseUp("left") }}
                            onMouseOut={() => { props.onMouseUp("left") }}
                            onTouchEnd={() => { props.onMouseUp("left") }}
                        >
                            {"＜"}
                        </button>
                    </td>
                    <td align="center">
                        <button
                            style={jumpButtonStyle}
                            className={"btn btn-info btn-lg btn-block"}
                            onMouseDown={() => { props.onClickButton("jump") }}
                            onTouchStart={() => { props.onClickButton("jump") }}
                            onMouseUp={() => { props.onMouseUp("jump") }}
                            onMouseOut={() => { props.onMouseUp("jump") }}
                            onTouchEnd={() => { props.onMouseUp("jump") }}
                        >
                            {"↑　jump　↑"}
                        </button>
                    </td>
                    <td align="left">
                        <button
                            style={sideButtonStyle}
                            className={"btn btn-info btn-lg btn-block"}
                            onMouseDown={() => { props.onClickButton("right") }}
                            onTouchStart={() => { props.onClickButton("right") }}
                            onMouseUp={() => { props.onMouseUp("right") }}
                            onMouseOut={() => { props.onMouseUp("right") }}
                            onTouchEnd={() => { props.onMouseUp("right") }}
                        >
                            {"＞"}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export { Page2 };