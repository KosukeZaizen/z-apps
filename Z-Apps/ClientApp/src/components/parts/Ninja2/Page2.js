import React from 'react';
import { NinjaChar } from './objs/ninja/ninja';
import { Obj } from './objs/obj';


//オブジェクト素材画像----------------

//岩
import imgRock from './objs/rock.png';
//岩（上下反転）
import imgRockR from './objs/rockRiverse.png';
//看板
import imgKanban1 from './objs/kanban1.png';
//看板の矢印
import imgArrow1 from './objs/arrow1.png';
//ポチ
import imgPochi from './objs/pochi.png';
//閉じている巻物
import imgScroll from './objs/scrollObj.png';
//開いている巻物
import imgScrollOpen from './objs/scrollOpen.png';
//シノ（先輩くのいち）
import imgShino from './objs/shino.png';

//屋敷（屋根）
import imgHouse1 from './objs/house.png';
//悪忍者
import imgBadNinja from './objs/ninja_bad.png';
//鷲
import imgWashi from './objs/washi.png';



//FireBall（右向き）
import imgFireBallR from './objs/fireBallR.png';


//背景画像//---------------------------

//stage1
import stage1 from './img/background/castle1.jpg';
//stage2
import stage2 from './img/background/whiteWall.jpg';
//stage3
import stage3 from './img/background/whiteWall2.jpg';



export default class Page2 extends React.Component {

    constructor(props) {
        super(props);

        //前のステージ（ステージ変更判定に利用）
        this.prevStage = 0;

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();

        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        this.UL = parseInt(pageSize.pageHeight, 10) / 90;

        //前のステージから受け取った忍者の初期値を設定
        this.ninja = this.props.ninja;

        this.readElementScroll = this.props.readElementScroll;

        this.ninja.game = this;


        //画面外を黒くする要素
        this.objOutOfScreen = {
            outOfScreenLeft: {
                size: 300,
                posX: -300,
                posY: -200,
                onTouch: onTouchNothing,
                divType: "outOfScreen",
            },
            outOfScreenRight: {
                size: 300,
                posX: 160,
                posY: -200,
                onTouch: onTouchNothing,
                divType: "outOfScreen",
            },
            outOfScreenTop: {
                size: 260,
                posX: -50,
                posY: -260,
                onTouch: onTouchNothing,
                divType: "outOfScreen",
            },
            outOfScreenBottom: {
                size: 260,
                posX: -50,
                posY: 90,
                onTouch: onTouchNothing,
                divType: "outOfScreen",
            },
        };

        //全ステージ共通の壁（render内で設定）
        this.objWalls = {
            leftWall: {
                size: 300,
                posX: -310,
                posY: -200,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
            rightWall: {
                size: 300,
                posX: 170,
                posY: -200,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
        };

        //床（必要な場合、render内で設定）
        this.objFloor = {
            floor1: {
                size: 200,
                posX: -20,
                posY: 79,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
            floor2: {
                size: 200,
                posX: -20,
                posY: 77,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
            floor3: {
                size: 200,
                posX: -20,
                posY: 76,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
            floor4: {
                size: 200,
                posX: -20,
                posY: 75,
                zIndex: 30,
                onTouch: onTouchBlock,
            },
        };

        //背景の初期設定
        this.backgroundSetting = {
            /* 背景画像 */
            backgroundImage: `url(${stage1})`,

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
        // 定数設定
        // ------------------------------------------------------------
        if (this.props.language === "Japanese") {
            this.consts = {
                timeStep: 100,

                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",

                FIRE_SCROLL_TITLE: "火遁",


            };

        } else {
            this.consts = {
                timeStep: 100,

                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",


                //屋根の上でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "Steal into the enemy's castle!",
                POCHI_SCROLL_MESSAGE:
                    "Can you see the enemy's castle!?\n" +
                    "Your mission is to steal into the castle, and steal the secret scroll!\n" +
                    "Don't be caught by enemies! Good luck!",

                FIRE_SCROLL_TITLE: "火遁",
                FIRE_SCROLL_MESSAGE:
                    "This is the scroll to learn 'Fire Ball'.\n" +
                    "Push [<] button and [>] button at the same time.\n" +
                    "You can defeat the enemies, using Fire Ball.",
            };
        }

        // ------------------------------------------------------------
        // ステート初期設定
        // ------------------------------------------------------------
        this.state = {
            screenStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight - 15 * this.UL,
                ...this.backgroundSetting,
            },
            ninjaStat: {
                left: true,
                ninjaX: this.ninja.posX * this.UL,
                ninjaY: this.ninja.posY * this.UL,
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

            //忍者の画像の向き
            let boolLeft = this.state.ninjaStat.left;

            //ボタン押下判定
            if (this.lButton === false && this.rButton === false) {
                this.ninja.speedX = 0;
            } else {
                if (this.lButton === true && this.rButton === true) {

                    //右と左同時押しでファイヤーボール
                    if (this.ninja.readScroll.indexOf(this.ninja.game.consts.FIRE_SCROLL_TITLE) >= 0) {
                        //火遁の書を既に読んでいる場合

                        this.objs["fireBall" + this.ninja.fireBallCount] = {
                            size: 12,
                            posX: this.ninja.posX,
                            posY: this.ninja.posY,
                            zIndex: 999 - this.ninja.fireBallCount,
                            img: imgFireBallR,
                            onTouch: onTouchNothing,
                            fireBall: true,
                            boolLeft: boolLeft,
                            eachTime: eachTimeFireBall,
                        }
                        this.ninja.fireBallCount++;
                    }
                } else {
                    if (this.lButton === true) {
                        this.ninja.speedX = -6;
                        boolLeft = true;//画像左向き
                    } else if (this.rButton === true) {
                        this.ninja.speedX = 6;
                        boolLeft = false;//画像右向き
                    }
                }
            }

            if (this.jButton === true) {
                if (this.ninja.speedY === 0) {
                    //通常ジャンプ
                    this.ninja.speedY = -11;
                }
                /*
                if (this.ninja.readScroll.indexOf(this.ninja.game.consts.AIR_SCROLL_TITLE) > 0) {
                    //風の書を読んでいる
                    if (this.ninja.posY > 15) {
                        //2段ジャンプ実行限界高度に達していない
                        this.ninja.speedY = -11;
                    }
                }*/
                this.jButton = false;
            }

            //重力加速度
            this.ninja.speedY += 2.1;

            //落下速度限界
            if (this.ninja.speedY > 9) {
                this.ninja.speedY = 9;
            }

            //位置計算
            this.ninja.posX += this.ninja.speedX;
            this.ninja.posY += this.ninja.speedY;


            //オブジェクトとの接触判定

            //忍者の上下左右の端の位置
            let ninjaLeft = this.ninja.posX;
            let ninjaRight = ninjaLeft + this.ninja.size;
            let ninjaTop = this.ninja.posY;
            let ninjaFoot = ninjaTop + this.ninja.size;

            for (let key in this.objs) {

                //途中でステージ遷移したら、関数を中止するためのフラグ
                let stageChangedFlag = "";

                //オブジェクトの上下左右の端の位置
                let objLeft = this.objs[key].posX;
                let objRight = objLeft + this.objs[key].size;
                let objTop = this.objs[key].posY;
                let objFoot = objTop + this.objs[key].size;

                //忍者が上から
                if (checkRelativityLeftAndTop(ninjaTop, objTop, objLeft, objRight, ninjaFoot, ninjaLeft, ninjaRight, this.ninja.size) === true) {
                    stageChangedFlag = this.objs[key].onTouch(this.ninja, "upper");
                }
                //忍者が右から
                if (checkRelativityRightAndFoot(objRight, ninjaRight, objTop, objFoot, ninjaLeft, ninjaTop, ninjaFoot, this.ninja.size) === true) {
                    stageChangedFlag = this.objs[key].onTouch(this.ninja, "right");
                }
                //忍者が下から
                if (checkRelativityRightAndFoot(objFoot, ninjaFoot, objLeft, objRight, ninjaTop, ninjaLeft, ninjaRight, this.ninja.size) === true) {
                    stageChangedFlag = this.objs[key].onTouch(this.ninja, "lower");
                }
                //忍者が左から
                if (checkRelativityLeftAndTop(ninjaLeft, objLeft, objTop, objFoot, ninjaRight, ninjaTop, ninjaFoot, this.ninja.size) === true) {
                    stageChangedFlag = this.objs[key].onTouch(this.ninja, "left");
                }

                //ステージ遷移をしていたら、関数中止
                if (stageChangedFlag && stageChangedFlag === "changed") { return; }

                //各タイムステップごとの処理を持っていれば、実行する
                if (this.objs[key].eachTime) {
                    this.objs[key].eachTime(this.ninja, key);
                }
            }
            /* ↑　物体速度・位置計算　↑ */


            //ページサイズ取得（ウィンドウサイズが変更された時のため）
            let pageSize = this.getWindowSize();

            //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
            this.UL = pageSize.pageHeight / 90;

            //物体の位置などを更新し、再描画
            this.setState({
                screenStyle: {
                    width: pageSize.pageWidth,
                    height: pageSize.pageHeight - 15 * this.UL,
                    ...this.backgroundSetting,
                },
                ninjaStat: {
                    left: boolLeft,
                    ninjaX: this.ninja.posX * this.UL,
                    ninjaY: this.ninja.posY * this.UL,
                }
            });
        }, this.consts.timeStep);
    }


    //---------------↓　resize　↓---------------
    getWindowSize() {
        let pageWidth, pageHeight;
        let screenWidth = parseInt(window.innerWidth, 10);
        let screenHeight = parseInt(window.innerHeight, 10);

        if (screenWidth > screenHeight) {
            //横長
            pageHeight = screenHeight;
            pageWidth = pageHeight * 16 / 9;

            if (pageWidth > screenWidth) {
                //横がはみ出たら(正方形に近い画面)
                pageWidth = screenWidth;
                pageHeight = pageWidth * 9 / 16;

                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    top: (screenHeight - pageHeight) / 2,
                }
            } else {
                this.pageStyle = {
                };
            }
        } else {
            //縦長
            pageHeight = screenWidth * 9 / 10;
            pageWidth = pageHeight * 16 / 9;

            if (pageWidth > screenHeight * 9 / 10) {
                //横がはみ出そうだったら(正方形に近い画面)
                pageWidth = screenHeight * 9 / 10;
                pageHeight = pageWidth * 9 / 16;

                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: (screenWidth + pageHeight) / 2,
                    top: screenHeight / 20,
                }
            } else {
                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: screenWidth * 95 / 100,
                    top: (screenHeight - pageWidth) / 2,
                }
            }
        }

        return { pageWidth: pageWidth, pageHeight: pageHeight };
    }
    //---------------↑　resize　↑---------------


    setKeyboardEvent(objGame) {
        // ------------------------------------------------------------
        // キーボードを押したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeydown = function (e) {
            if (!e) e = window.event; // レガシー

            // ------------------------------------------------------------
            // 入力情報を取得
            // ------------------------------------------------------------
            // キーコード
            let keyCode = e.keyCode;
            let keyType;
            if (keyCode === 37) {
                keyType = "left";
            } else if (keyCode === 39) {
                keyType = "right";
            } else if (keyCode === 38) {
                keyType = "jump";
            } else if (keyCode === 32) {
                keyType = "jump";
            }
            objGame.onClickButton(keyType);
        };

        // ------------------------------------------------------------
        // キーボードを離したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeyup = function (e) {
            if (!e) e = window.event; // レガシー

            // キーコード
            let keyCode = e.keyCode;
            let keyType;
            if (keyCode === 37) {
                keyType = "left";
            } else if (keyCode === 39) {
                keyType = "right";
            } else if (keyCode === 38) {
                keyType = "jump";
            } else if (keyCode === 32) {
                keyType = "jump";
            }
            objGame.onMouseUp(keyType);
        };
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
            zIndex: "99999999",
            backgroundColor: "black",
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

        if (this.prevStage !== this.props.stage) {
            //ステージ変更時のみ1回実行

            //忍者のFireBallCountを0に戻す
            this.ninja.fireBallCount = 0;

            if (this.props.stage === 1) {

                // ------------------------------------------------------------
                // ステージ1 (出発地点　屋根の上)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,


                    house1Pic: {
                        size: 60,
                        posX: 120,
                        posY: 55,
                        zIndex: 35,
                        img: imgHouse1,
                        onTouch: onTouchNothing,
                    },
                    house1Actual: {
                        size: 60,
                        posX: 120,
                        posY: 67,
                        onTouch: onTouchTree,
                    },

                    house2Pic: {
                        size: 60,
                        posX: 90,
                        posY: 55,
                        zIndex: 34,
                        img: imgHouse1,
                        onTouch: onTouchNothing,
                    },
                    houseActual: {
                        size: 60,
                        posX: 97,
                        posY: 67,
                        onTouch: onTouchTree,
                    },

                    pochi: {
                        size: 10,
                        posX: 115,
                        posY: 53,
                        zIndex: 20,
                        img: imgPochi,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL_TITLE,
                    },
                    pochiScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.POCHI_SCROLL_TITLE,
                        message: this.consts.POCHI_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgPochi,
                    },

                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateTop1,
                        changeStage: this.props.changeStage,
                    },

                }
                //ステージの背景画像を設定
                this.bgImg = stage1;
            } else if (this.props.stage === 2) {

                // ------------------------------------------------------------
                // ステージ2 (城周辺の白い壁)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    fireBallDummy: {
                        //FireBallの画像初期表示速度向上のためのダミー
                        size: 13,
                        posX: -100,
                        posY: 60,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 20,
                        img: imgFireBallR,
                        onTouch: onTouchNothing,
                    },
                    scrollFireBallIcon: {
                        size: 10,
                        posX: 105,
                        posY: 46,
                        boolLeft: true,
                        zIndex: 22,
                        img: imgScroll,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.FIRE_SCROLL_TITLE,
                    },
                    fireBallScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.FIRE_SCROLL_TITLE,
                        message: this.consts.FIRE_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    rock1Pic: {
                        size: 40,
                        posX: 90,
                        posY: 50,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 40,
                        posX: 90,
                        posY: 53,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    enemy1: {
                        size: 13,
                        posX: 40,
                        posY: 60,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 20,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 1,
                        changeStage: this.props.changeStage,
                        jumpHeight: 28,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -100,
                        zIndex: 30,
                        next: 1,
                        onTouch: onTouchGateTop2,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 3,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage2;
            } else if (this.props.stage === 3) {

                // ------------------------------------------------------------
                // ステージ3 (鷲と白壁)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    washi1: {
                        size: 13,
                        posX: 0,
                        posY: 0,
                        speedX: 3,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchOutsideEnemy1,
                        next: 1,
                        changeStage: this.props.changeStage,
                        jumpHeight: 28,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    washi2: {
                        size: 13,
                        posX: -40,
                        posY: -60,
                        speedX: 3,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchOutsideEnemy1,
                        next: 1,
                        changeStage: this.props.changeStage,
                        jumpHeight: 28,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    washi3: {
                        size: 13,
                        posX: 0,
                        posY: -100,
                        speedX: 3,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchOutsideEnemy1,
                        next: 1,
                        changeStage: this.props.changeStage,
                        jumpHeight: 28,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -100,
                        zIndex: 30,
                        next: 1,
                        onTouch: onTouchGateTop2,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage3;
            }

            this.prevStage = this.props.stage;
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
                        width={this.ninja.size * this.UL}
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

function RenderObjs(props) {
    let objList = [];
    for (let key in props.game.objs) {
        objList.push(
            <Obj
                key={key}
                obj={props.game.objs[key]}
                UL={props.game.UL}
                game={props.game}
            />
        );
    }
    return <span>{objList}</span>;
}

function checkRelativityRightAndFoot(objRight, ninjaRight, objTop, objFoot, ninjaLeft, ninjaTop, ninjaFoot, ninjaSize) {
    //コメントは忍者が右から来た想定
    if (objRight > ninjaLeft) {
        //忍者が右から
        if (objRight < ninjaRight) {
            //忍者の右端がオブジェクトの右端を左向きに超えてはいない
            if (objTop < ninjaFoot - ninjaSize * 7 / 12) {
                //オブジェクトの上をまたいでいない
                if (objFoot > ninjaTop + ninjaSize * 7 / 12) {
                    //オブジェクトの下をくぐっていない
                    return true;
                }
            }
        }
    }
    return false;
}
function checkRelativityLeftAndTop(ninjaLeft, objLeft, objTop, objFoot, ninjaRight, ninjaTop, ninjaFoot, ninjaSize) {
    //コメントは忍者が左から来た想定
    if (objLeft < ninjaRight) {
        //忍者が左から
        if (objLeft > ninjaLeft) {
            //忍者の左端がオブジェクトの左端を右向きに超えてはいない
            if (objTop < ninjaFoot - ninjaSize * 7 / 12) {
                //オブジェクトの上をまたいでいない
                if (objFoot > ninjaTop + ninjaSize * 7 / 12) {
                    //オブジェクトの下をくぐっていない
                    return true;
                }
            }
        }
    }
    return false;
}

//当たり判定
function checkTouch(obj1, obj2) {

    if (obj1 && obj2) {
        //オブジェクトが存在する場合

        //かすっていたらtrue
        if (obj1.posX + obj1.size > obj2.posX) {
            if (obj1.posX < obj2.posX + obj2.size) {
                if (obj1.posY + obj1.size > obj2.posY) {
                    if (obj1.posY < obj2.posY + obj2.size) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}


//=======================================
// 巻物を開くためのトリガーに触った際のタッチ関数
//=======================================
function onTouchScrollOpener(ninja) {
    if (ninja.game.props.readElementScroll.indexOf(this.openTargetTitle) < 0) {
        //まだターゲットの巻物が読まれていない（ステージ遷移の度にリセット）

        let objs = ninja.game.objs;
        for (let key in objs) {
            if (objs[key].title !== this.openTargetTitle && objs[key].scroll) {
                //表示が被らないように、他の巻物を消す
                objs[key].visible = false;
            } else if (objs[key].title === this.openTargetTitle) {
                //該当の巻物を表示する
                objs[key].visible = true;
            }
        }
    }
    //読み終えたリストの中に該当の巻物を追加
    ninja.readScroll.push(this.openTargetTitle);
    ninja.game.props.readElementScroll.push(this.openTargetTitle);
}

//=======================================
// 貫通不可能ブロック用のタッチ関数
//=======================================
function onTouchBlock(ninja, from) {
    if (from === "upper") {
        //上から
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;

    } else if (from === "right") {
        //右から
        ninja.posX = this.posX + this.size;
        ninja.speedX = 0;

    } else if (from === "lower") {
        //下から
        ninja.posY = this.posY + this.size;
        ninja.speedY = 0;

    } else if (from === "left") {
        //左から
        ninja.posX = this.posX - ninja.size;
        ninja.speedX = 0;
    }
}

//=======================================
// 上から乗れる木などのタッチ関数
//=======================================
function onTouchTree(ninja, from) {
    if (from === "upper") {
        //上から
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;

    }
}

//=======================================
// 何も起こらないタッチ関数
//=======================================
function onTouchNothing() {
}

//=======================================
// 別ステージへのゲートのタッチ関数（左右）
//=======================================
function onTouchGateWall(ninja, from) {
    if (from === "right") {
        //右から
        ninja.posX += 160 - ninja.size;
        ninja.speedX = 0;
        ninja.speedY = 0;

    } else {
        //左から
        ninja.posX = 0;
        ninja.speedX = 0;
        ninja.speedY = 0;
    }
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（上下）
//=======================================
function onTouchGateTopOrBottom(ninja, from) {

    if (from === "upper") {
        //上から
        ninja.posY = 0;
        ninja.speedX = 0;
        ninja.speedY = 0;

    } else if (from === "lower") {
        //下から
        ninja.posY += 70 - ninja.size;
        ninja.speedX = 0;
        ninja.speedY = -15;
    }
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（stage1から下へ落ちる）
//=======================================
function onTouchGateTop1(ninja, from) {

    if (from === "upper") {
        //上から
        ninja.posX = 145;
        ninja.posY = 0;
        ninja.speedY = 0;
        ninja.speedX = 0;
    }
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（stage2等から上へ飛ばされる）
//=======================================
function onTouchGateTop2(ninja, from) {

    //下から
    ninja.posX = 145;
    ninja.posY = -100;
    ninja.speedX = 0;
    ninja.speedY = 0;

    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（stage1から下へ落ちる）
//=======================================
function onTouchOutsideEnemy1(ninja, from) {

    ninja.posX = 145;
    ninja.posY = 0;
    ninja.speedY = 0;
    ninja.speedX = 0;
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 炎にタッチ
//=======================================
function onTouchFire(ninja) {
    //ジャンプする
    ninja.speedY = this.jumpHeight * (-1);
}


//=======================================
// 通常敵キャラ　タイムステップ毎
//=======================================
function eachTimeEnemy(ninja, key) {
    if (this && this.enemy) {

        //敵の行動可能域計算
        if (this.xMax && this.posX > this.xMax) {
            //x最大値を超えている場合
            this.posX = this.xMax;
        } else if (this.xMin && this.posX < this.xMin) {
            //x最小値を超えている場合
            this.posX = this.xMax;
        }
        if (this.yMax && this.posY > this.yMax) {
            //y最大値を超えている場合
            this.posY = this.yMax;
        } else if (this.yMin && this.posY < this.yMin) {
            //y最小値を超えている場合
            this.posY = this.yMax;
        }

        //X軸について、忍者を追いかける
        if (ninja.posX >= this.posX + this.size - (ninja.size / 2)) {
            this.posX += this.speedX;
            this.boolLeft = false;
        } else if (ninja.posX + (ninja.size / 2) <= this.posX) {
            this.posX += this.speedX * (-1);
            this.boolLeft = true;
        }
        //Y軸について、忍者を追いかける
        if (ninja.posY >= this.posY + this.size - (ninja.size / 2)) {
            this.posY += this.speedY;
        } else if (ninja.posY + (ninja.size / 2) <= this.posY) {
            this.posY += this.speedY * (-1);
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                if (checkTouch(this, ninja.game.objs["fireBall" + i])) {
                    //敵がFireBallに触れた場合
                    delete ninja.game.objs[key];
                }
            }
        }
    }
}


//=======================================
// ファイヤーボール　タイムステップ毎
//=======================================
function eachTimeFireBall(ninja, key) {
    //fireBall
    if (this && this.fireBall) {
        if (this.posX + this.size < 0 || this.posX > 160) {
            //fireBallが画面からはみ出した場合、消す
            delete ninja.game.objs[key];
        } else {
            //fireBallが画面内にある場合
            if (this.boolLeft) {
                //左向き
                this.posX -= 10;
            } else {
                //右向き
                this.posX += 10;
            }
        }
    }
}

export { Page2 };