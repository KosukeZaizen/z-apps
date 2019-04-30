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
//木箱
import imgBox1 from './objs/box.jpg';
//レンガ
import imgBlock1 from './objs/block.jpg';



//FireBall（右向き）
import imgFireBallR from './objs/fireBallR.png';


//背景画像//---------------------------

//stage1
import stage1 from './img/background/castle1.jpg';
//stage2
import stage2 from './img/background/whiteWall.jpg';
//stage3
import stage3 from './img/background/whiteWall2.jpg';
//stage4
import stage4 from './img/background/whiteWall3.jpg';
//stage5
import stage5 from './img/background/waterCastle.jpg';
//stage6
import stage6 from './img/background/inWater1.jpg';
//stage7
import stage7 from './img/background/inWater2.jpg';
//stage8
import stage8 from './img/background/inWater3.jpg';






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
                    "Don't touch the enemies! Good luck!",

                //水辺でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "Go under the water!",
                POCHI_SCROLL2_MESSAGE:
                    "The best way to steal into the castle is going under the water!\n" +
                    "In the water, you can swim by pushing [jump] button many times!\n" +
                    "Don't touch the enemies! Good luck!",

                //火遁の巻物
                FIRE_SCROLL_TITLE: "火遁",
                FIRE_SCROLL_MESSAGE:
                    "This is the scroll to learn 'Fire Ball'.\n" +
                    "Push [<] button and [>] button at the same time.\n" +
                    "You can defeat the enemies, using Fire Ball.",

                //階段のシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "Hello!",
                SHINO_SCROLL_MESSAGE:
                    "Now, you can use Fire Ball.\n" +
                    "When you find a wooden box, you should use fire.\n" +
                    "It will burn the box, and you can see the inside.",

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
                            boolLeft: this.ninja.boolLeft,
                            eachTime: eachTimeFireBall,
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
            this.ninja.speedY += this.ninja.inWater ? 1.1 : 2.1;

            //落下速度限界
            if (this.ninja.inWater) {
                //水中
                if (this.ninja.speedY > 2) {
                    this.ninja.speedY = 2;
                }
            } else {
                //陸上
                if (this.ninja.speedY > 9) {
                    this.ninja.speedY = 9;
                }
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
                    left: this.ninja.boolLeft,
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

            //水中判定を一旦falseとする（水中の場合は、各ステージにて代入）
            this.ninja.inWater = false;


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
                // ステージ2 (ファイヤーボールの書)
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
                    shino: {
                        size: 10,
                        posX: 30,
                        posY: 55,
                        zIndex: 17,
                        img: imgShino,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL_TITLE,
                    },
                    shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL_TITLE,
                        message: this.consts.SHINO_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgShino,
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
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
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
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
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
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    box1: {
                        size: 20,
                        posX: 105,
                        posY: 55,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
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
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 4,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage3;
            } else if (this.props.stage === 4) {

                // ------------------------------------------------------------
                // ステージ4 (岩に隠れた忍者たち)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    rock1Pic: {
                        size: 40,
                        posX: 60,
                        posY: 50,
                        zIndex: 30,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 40,
                        posX: 60,
                        posY: 53,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },

                    rock2Pic: {
                        size: 20,
                        posX: 120,
                        posY: 60,
                        zIndex: 30,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 20,
                        posX: 120,
                        posY: 63,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },

                    riverPic: {
                        size: 50,
                        posX: 80,
                        posY: 69,
                        divType: "water",
                        zIndex: 29,
                        onTouch: onTouchNothing,
                    },

                    enemy1: {
                        size: 13,
                        posX: 74,
                        xMax: 74,
                        posY: 60,
                        speedX: 1,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    enemy2: {
                        size: 13,
                        posX: 74,
                        xMax: 74,
                        posY: 60,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    enemy3: {
                        size: 13,
                        posX: 74,
                        xMax: 74,
                        posY: 60,
                        speedX: 2.5,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    enemy4: {
                        size: 13,
                        posX: 74,
                        xMax: 74,
                        posY: 60,
                        speedX: 4,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    enemy5: {
                        size: 13,
                        posX: 74,
                        xMax: 74,
                        posY: 60,
                        speedX: 4.5,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchOutsideEnemy1,
                        next: 2,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 3,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },

                    floor1: {
                        size: 200,
                        posX: -120,
                        posY: 79,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor2: {
                        size: 200,
                        posX: -120,
                        posY: 77,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor3: {
                        size: 200,
                        posX: -120,
                        posY: 76,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor4: {
                        size: 200,
                        posX: -120,
                        posY: 75,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor1r: {
                        size: 200,
                        posX: 130,
                        posY: 79,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor2r: {
                        size: 200,
                        posX: 130,
                        posY: 77,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor3r: {
                        size: 200,
                        posX: 130,
                        posY: 76,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    floor4r: {
                        size: 200,
                        posX: 130,
                        posY: 75,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage4;
            } else if (this.props.stage === 5) {

                // ------------------------------------------------------------
                // ステージ5 (水辺の城)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    rock1Pic: {
                        size: 100,
                        posX: 86,
                        posY: 67,
                        zIndex: 26,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 100,
                        posX: 95,
                        posY: 71,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    rock2Pic: {
                        size: 100,
                        posX: 66,
                        posY: 67,
                        zIndex: 26,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 100,
                        posX: 70,
                        posY: 71,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },

                    pochi: {
                        size: 10,
                        posX: 87,
                        posY: 57,
                        zIndex: 20,
                        img: imgPochi,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL2_TITLE,
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
                        title: this.consts.POCHI_SCROLL2_TITLE,
                        message: this.consts.POCHI_SCROLL2_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgPochi,
                    },
                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 73,
                        divType: "water",
                        zIndex: 30,
                        onTouch: onTouchNothing,
                    },

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 4,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 10,
                        nextY: 0,
                        nextLeft: false,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage5;
            } else if (this.props.stage === 6) {

                this.ninja.inWater = true;


                // ------------------------------------------------------------
                // ステージ6 (水路１)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    //レンガのブロック
                    ...getBlocks(10, [
                        [6, 5], [7, 5],
                        [6, 6], [7, 6],
                        [6, 7], [7, 7]
                    ], onTouchBlock, imgBlock1, 23, false),

                    //木のブロック
                    ...getBlocks(10, [
                        [6, 3], [7, 3],
                        [6, 4], [7, 4],
                    ], onTouchBlock, imgBox1, 24, true),



                    rock1Pic: {
                        size: 100,
                        posX: 76,
                        posY: -82,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock2Pic: {
                        size: 100,
                        posX: 36,
                        posY: -82,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 100,
                        posX: 40,
                        posY: -90,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },

                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: -20,
                        divType: "water",
                        zIndex: 24,
                        onTouch: onTouchNothing,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 7,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 100,
                        nextY: 63,
                        nextLeft: false,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage6;
            } else if (this.props.stage === 7) {

                this.ninja.inWater = true;

                // ------------------------------------------------------------
                // ステージ7 (水路2)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: -20,
                        divType: "water",
                        zIndex: 24,
                        onTouch: onTouchNothing,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 8,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -100,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchGateTop2,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage7;
            } else if (this.props.stage === 8) {

                this.ninja.inWater = true;

                // ------------------------------------------------------------
                // ステージ8 (水路3)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: -20,
                        divType: "water",
                        zIndex: 24,
                        onTouch: onTouchNothing,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -100,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchGateTop2,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 7,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage8;
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

//ブロック生成関数
function getBlocks(size, arrPos, onTouch, imgBlock, zIndex, boolWooden) {

    let objResult = {};

    if (boolWooden) {
        for (let index in arrPos) {
            objResult["objWoodenBlock" + index] = {
                size: size + 2,
                posX: arrPos[index][0] * size,
                posY: arrPos[index][1] * size,
                zIndex: zIndex,
                img: imgBlock,
                onTouch: onTouch,
                enemy: true,
                eachTime: eachTimeEnemy,
                life: 1,
            };
        }
    } else {
        for (let index in arrPos) {
            objResult["objBlock" + index] = {
                size: size + 2,
                posX: arrPos[index][0] * size,
                posY: arrPos[index][1] * size,
                zIndex: zIndex,
                img: imgBlock,
                onTouch: onTouch,
            };
        }
    }

    return objResult;
}

//------------------------------------------------------------
//
//　　　　　オブジェクトタッチ時の関数
//
//------------------------------------------------------------

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
function onTouchNothing() {}

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
// 別ステージへのゲートのタッチ関数（汎用化したもの）
//=======================================
function onTouchStageChangeCommon(ninja, from) {

    ninja.posX = this.nextX;
    ninja.posY = this.nextY;
    ninja.boolLeft = this.nextLeft;

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




//------------------------------------------------------------
//
//　　　　　タイムステップごとの関数
//
//------------------------------------------------------------

//=======================================
// 通常敵キャラ　タイムステップ毎
//=======================================
function eachTimeEnemy(ninja, key) {
    if (this && this.enemy) {

        //敵の行動可能域計算
        if (this.xMax && this.posX > this.xMax) {
            //x最大値を超えている場合
            this.posX = this.xMax;
            return;
        } else if (this.xMin && this.posX < this.xMin) {
            //x最小値を超えている場合
            this.posX = this.xMax;
            return;
        }
        if (this.yMax && this.posY > this.yMax) {
            //y最大値を超えている場合
            this.posY = this.yMax;
            return;
        } else if (this.yMin && this.posY < this.yMin) {
            //y最小値を超えている場合
            this.posY = this.yMax;
            return;
        }

        //X軸について、忍者を追いかける
        if (this.speedX !== 0) {
            if (ninja.posX >= this.posX + this.size - (ninja.size / 2)) {
                this.posX += this.speedX;
                this.boolLeft = false;
            } else if (ninja.posX + (ninja.size / 2) <= this.posX) {
                this.posX += this.speedX * (-1);
                this.boolLeft = true;
            } else {
                this.posX += ninja.posX < this.posX ? -1 : 0
                this.posX += ninja.posX > this.posX ? 1 : 0
            }
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