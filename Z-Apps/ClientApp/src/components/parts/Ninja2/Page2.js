import React from 'react';
import { NinjaChar } from './objs/ninja/ninja';
import { Obj } from './objs/obj';


//オブジェクト素材画像----------------

//岩
import imgRock from './objs/rock.png';
//岩（上下反転）
import imgRockR from './objs/rockRiverse.png';
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
//カニ
import imgKani from './objs/kani.png';
//フグ
import imgFugu from './objs/fugu.png';
//海藻
import imgKaisou from './objs/kaisou.png';
//デカい魚
import imgKimme from './objs/onikinme.png';
//FireBall
import imgFireBallR from './objs/fireBallR.png';
//扉
import imgDoor from './objs/tobira.jpg';
//木のブロック
import imgWoodenBlock from './objs/woodenBox.jpg';
//鍵
import imgKey from './objs/kagi.png';
//はしご
import imgHashigo from './objs/hashigo_wood.png';
//化け猫
import imgCat from './objs/cat.png';
//一つ目
import imgOneEye from './objs/hitotsume.png';
//青い火の玉
import imgBlueFire from './objs/hinotama.png';
//鬼
import imgOni from './objs/oni.png';
//仮面
import imgMask from './objs/kamen.png';
//ケルベロス
import imgKerberos from './objs/kerberos.png';
//ボス
import imgBoss from './objs/badDog.png';
//コウモリ
import imgBat from './objs/bat.png';


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
//stage6～8
import inWater from './img/background/rockWall.jpg';
//stage9
import stage9 from './img/background/furo.jpg';
//stage10
import stage10 from './img/background/datsuiJo.jpg';
//stage11～13
import twoLayer from './img/background/washitsu.jpg';
//stage14
import stage14 from './img/background/wa1.jpg';
//stage15
import stage15 from './img/background/soto.jpg';
//stage16
import stage16 from './img/background/wa2.jpg';
//stage17
import stage17 from './img/background/wa3.jpg';
//stage18
import stage18 from './img/background/wa4.jpg';
//stage19
import stage19 from './img/background/boss.jpg';
//stage20
import stage20 from './img/background/wa5.jpg';


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

                //風呂場でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "Do you have the key?",
                SHINO_SCROLL2_MESSAGE:
                    "The door is locked!\n" +
                    "I think I saw the key in the water.\n" +
                    "Did you get the key in the water?",

                //扉の部屋でシノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "Doors are locked...",
                SHINO_SCROLL3_MESSAGE:
                    "Keys for these two doors must be in this castle!\n" +
                    "The boss's room is just there.\n" +
                    "We need two keys!",

                //水中のカギに触った時のメッセージ
                KEY_SCROLL_TITLE: "Key of the bath room",
                KEY_SCROLL_MESSAGE:
                    "You got the key of the bath room!\n" +
                    "You will use this to enter the castle.\n" +
                    "Don't lose it!",

                //鬼が守るカギに触った時のメッセージ
                KEY2_SCROLL_TITLE: "Key of the boss's room",
                KEY2_SCROLL_MESSAGE:
                    "This is the key of the boss's room.\n" +
                    "To enter the boss's room, you need to collect two keys!",

                //屋根裏のカギに触った時のメッセージ
                KEY3_SCROLL_TITLE: "Key to enter the boss's room!",
                KEY3_SCROLL_MESSAGE:
                    "This is the key of the boss's room.\n" +
                    "To enter the boss's room, you need to collect two keys!",

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

                //ステージ遷移をしていたら、関数中止
                if (stageChangedFlag && stageChangedFlag === "changed") { return; }
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
                        posY: 61,
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
                    ...getHoleFloor(80,130),

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
                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 100,
                        zIndex: 30,
                        next: 7,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 100,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
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

                    key: {
                        size: 10,
                        posX: 120,
                        posY: 20,
                        zIndex: 20,
                        img: imgKey,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KEY_SCROLL_TITLE,
                        boolLeft: true,
                    },
                    keyScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KEY_SCROLL_TITLE,
                        message: this.consts.KEY_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgKey,
                    },

                    //レンガのブロック
                    ...getBlocks(10, [
                        [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
                        [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
                        [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
                        [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],
                        [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4],
                        [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5],
                        [2, 6], [3, 6],[4, 6], [5, 6],[6, 6], [7, 6],
                        [1, 7], [0, 7], [2, 7], [3, 7],[4, 7], [5, 7],[6, 7], [7, 7],
                    ], onTouchBlock, imgBlock1, 23),

                    box1: {
                        size: 17,
                        posX: 63,
                        posY: 33,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box2: {
                        size: 17,
                        posX: 83,
                        posY: 58,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

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
                this.bgImg = inWater;
            } else if (this.props.stage === 7) {

                this.ninja.inWater = true;

                // ------------------------------------------------------------
                // ステージ7 (水路2)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    //レンガのブロック
                    ...getBlocks(10, [
                        [15, -1], [16, -1],
                        [15, 0], [16, 0],
                        [14, 1], [15, 1], [16, 1],
                        [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
                        [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],
                        [-1, 4], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [15, 4], [16, 4],
                        [-1, 5],[0, 5],[1, 5]
                    ], onTouchBlock, imgBlock1, 23),

                    kani1: {
                        size: 13,
                        posX: 80,
                        posY: 65,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 19,
                        img: imgKani,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 100,
                        nextY: 63,
                        nextLeft: false,
                        next: 5,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    fugu1: {
                        size: 13,
                        posX: 160,
                        posY: 0,
                        speedX: 0.5,
                        speedY: 1,
                        zIndex: 19,
                        img: imgFugu,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 120,
                        nextY: 53,
                        nextLeft: true,
                        next: 4,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    fugu2: {
                        size: 13,
                        posX: 70,
                        posY: 50,
                        speedX: 0.5,
                        speedY: 1,
                        zIndex: 19,
                        img: imgFugu,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 120,
                        nextY: 53,
                        nextLeft: true,
                        next: 4,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    kaisou1: {
                        size: 12,
                        posX: 90,
                        posY: 61,
                        zIndex: 19,
                        img: imgKaisou,
                        onTouch: onTouchNothing,
                    },
                    kaisou2: {
                        size: 12,
                        posX: 112,
                        posY: 61,
                        zIndex: 19,
                        img: imgKaisou,
                        onTouch: onTouchNothing,
                    },
                    kaisou3: {
                        size: 12,
                        posX: 22,
                        posY: 16,
                        zIndex: 19,
                        img: imgKaisou,
                        onTouch: onTouchNothing,
                    },

                    rock1Pic: {
                        size: 100,
                        posX: -20,
                        posY: -82,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 100,
                        posX: -20,
                        posY: -90,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    rock2Pic: {
                        size: 100,
                        posX: 140,
                        posY: -82,
                        zIndex: 26,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 100,
                        posX: 140,
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
                        next: 8,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 120,
                        nextY: 53,
                        nextLeft: true,
                        next: 4,
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
                this.bgImg = inWater;
            } else if (this.props.stage === 8) {

                this.ninja.inWater = true;

                // ------------------------------------------------------------
                // ステージ8 (水路3)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    //レンガのブロック
                    ...getBlocks(10, [
                        [-1, -2], [0, -2], [3, -2], [4, -2], [5, -2], [6, -2], [7, -2], [8, -2], [9, -2], [10, -2], [11, -2], [12, -2], [13, -2], [14, -2], [15, -2], [16, -2],
                        [-1, -1], [0, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1], [8, -1], [9, -1], [10, -1], [11, -1], [12, -1], [13, -1], [14, -1], [15, -1], [16, -1],
                        [-1, 0], [0, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0],
                        [-1, 1], [0, 1],
                        [-1, 2], [0, 2],
                        [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [11.5, 3.5],
                        [-1, 4], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
                    ], onTouchBlock, imgBlock1, 23),

                    kimme1: {
                        size: 130,
                        posX: 160,
                        xMin: 30,
                        posY: -10,
                        speedX: 1,
                        speedY: 0,
                        zIndex: 30,
                        img: imgKimme,
                        onTouch: onTouchBlock,
                        nextX: 100,
                        nextY: 63,
                        nextLeft: false,
                        next: 5,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeKimme,
                    },
                    kani1: {
                        size: 13,
                        posX: 80,
                        xMin: 10,
                        xMax: 95,
                        posY: 20,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 19,
                        img: imgKani,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 100,
                        nextY: 63,
                        nextLeft: false,
                        next: 5,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

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
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 60,
                        nextY: 62,
                        nextLeft: false,
                        next: 9,
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
                this.bgImg = inWater;
            } else if (this.props.stage === 9) {

                // ------------------------------------------------------------
                // ステージ9 (風呂場)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...getHoleFloor(0, 55),

                    shino: {
                        size: 10,
                        posX: 80,
                        posY: 60,
                        zIndex: 17,
                        img: imgShino,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL2_TITLE,
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
                        title: this.consts.SHINO_SCROLL2_TITLE,
                        message: this.consts.SHINO_SCROLL2_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgShino,
                    },

                    door1: {
                        size: 30,
                        posX: 145,
                        posY: 43,
                        zIndex: 23,
                        img: imgDoor,
                        onTouch: onTouchLockedDoor,
                        nextX: 60,
                        nextY: 62,
                        nextLeft: false,
                        next: 1,
                        changeStage: this.props.changeStage,
                        keyName: this.consts.KEY_SCROLL_TITLE,
                    },

                    block1: {
                        size: 33,
                        posX: 145,
                        posY: 13,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },
                    block2: {
                        size: 33,
                        posX: 145,
                        posY: -17,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },
                    block3: {
                        size: 33,
                        posX: 145,
                        posY: 73,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },
                    block4: {
                        size: 33,
                        posX: 115,
                        posY: 73,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },
                    block5: {
                        size: 33,
                        posX: 85,
                        posY: 73,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },
                    block6: {
                        size: 33,
                        posX: 55,
                        posY: 73,
                        zIndex: 22,
                        img: imgWoodenBlock,
                        onTouch: onTouchBlock,
                    },

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 10,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 8,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 10,
                        nextY: 0,
                        nextLeft: false,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage9;
            } else if (this.props.stage === 10) {

                // ------------------------------------------------------------
                // ステージ10 (脱衣所)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,
                    //ブロック
                    ...getBlocks(10, [
                          [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
                    ], onTouchBlock, imgWoodenBlock, 23),

                    enemy1: {
                        size: 13,
                        posX: 104,
                        xMax: 104,
                        posY: 60,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    box1: {
                        size: 11,
                        posX: 85,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box2: {
                        size: 11,
                        posX: 95,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box3: {
                        size: 11,
                        posX: 95,
                        posY: 54,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box4: {
                        size: 11,
                        posX: 105,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box5: {
                        size: 11,
                        posX: 105,
                        posY: 54,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box6: {
                        size: 11,
                        posX: 105,
                        posY: 44,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box7: {
                        size: 11,
                        posX: 115,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box8: {
                        size: 11,
                        posX: 115,
                        posY: 54,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box9: {
                        size: 11,
                        posX: 125,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box10: {
                        size: 31,
                        posX: 95,
                        posY: 54,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 21,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box11: {
                        size: 51,
                        posX: 85,
                        posY: 64,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 21,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 11,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage10;
            } else if (this.props.stage === 11) {

                // ------------------------------------------------------------
                // ステージ11 (2層　１)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,
                    //ブロック
                    ...getBlocks(10, [
                        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1], [8, -1], [9, -1], [10, -1], [11, -1], [12, -1], [13, -1], [14, -1], [15, -1], [16, -1],
                        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
                    ], onTouchBlock, imgWoodenBlock, 23),

                    enemy1: {
                        size: 13,
                        posX: 75,
                        posY: 60,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    cat1: {
                        size: 13,
                        posX: 75,
                        posY: 0,
                        speedX: 1,
                        speedY: 1.5,
                        zIndex: 19,
                        img: imgCat,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
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
                        next: 12,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 10,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },

                }
                //ステージの背景画像を設定
                this.bgImg = twoLayer;
            } else if (this.props.stage === 12) {

                // ------------------------------------------------------------
                // ステージ12 (2層　２)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,
                    //ブロック
                    ...getBlocks(10, [
                        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1], [8, -1], [9, -1], [10, -1], [11, -1], [14, -1], [15, -1], [16, -1],
                        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
                    ], onTouchBlock, imgWoodenBlock, 23),

                    oni1: {
                        size: 19,
                        posX: 75,
                        posY: 57,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOni,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
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
                        next: 13,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 11,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 50,
                        nextY: 62,
                        nextLeft: false,
                        next: 14,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = twoLayer;
            } else if (this.props.stage === 13) {

                // ------------------------------------------------------------
                // ステージ13 (2層　３)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,
                    //ブロック
                    ...getBlocks(10, [
                        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [9, -1], [10, -1], [11, -1], [12, -1], [13, -1], [14, -1], [15, -1], [16, -1],
                        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2],
                        [13, 7], [14, 7], [15, 7], [16, 7], [17, 7]
                    ], onTouchBlock, imgWoodenBlock, 23),

                    hitotsume1: {
                        size: 12,
                        posX: 110,
                        posY: 7,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOneEye,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeOneEye,
                        life: 1,
                    },


                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 16,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 12,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 30,
                        nextY: 62,
                        nextLeft: false,
                        next: 17,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = twoLayer;
            } else if (this.props.stage === 14) {

                // ------------------------------------------------------------
                // ステージ14
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    //ブロック
                    ...getBlocks(10, [
                        [1, -0.5], [2, -0.5], [3, -0.5], [4, -0.5], [5, -0.5], [6, -0.5], [7, -0.5], [8, -0.5], [9, -0.5], [10, -0.5], [13, -0.5], [14, -0.5],
                        [-2, 0], [-1, 0], [0, 0],  [15, 0], [16, 0],
                        [-2, 0], [-1, 0], [0, 0], [15, 0], [16, 0],
                        [-2, 1], [-1, 1], [0, 1], [15, 1], [16, 1],
                        [-2, 2], [-1, 2], [0, 2], [15, 2], [16, 2],
                        [-2, 3], [-1, 3], [0, 3], [15, 3], [16, 3],
                        [-2, 4], [-1, 4], [0, 4], [15, 4], [16, 4],
                        [-2, 5], [-1, 5], [0, 5], [15, 5], [16, 5],
                        [-2, 6], [-1, 6], [0, 6], [15, 6], [16, 6],
                        [-2, 7], [-1, 7], [0, 7], [1, 7], [2, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7],

                        [11.5, 2],
                        [6, 3], [9, 3],
                        [3, 5],
                    ], onTouchBlock, imgWoodenBlock, 23),

                    hitotsume1: {
                        size: 12,
                        posX: 116,
                        posY: 8,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOneEye,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeOneEye,
                        life: 1,
                    },

                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 140,
                        nextY: 62,
                        nextLeft: true,
                        next: 15,
                        changeStage: this.props.changeStage,
                    },
                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 12,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage14;
            } else if (this.props.stage === 15) {

                // ------------------------------------------------------------
                // ステージ15
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    box1: {
                        size: 17,
                        posX: 106,
                        posY: 50,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    key: {
                        size: 10,
                        posX: 107,
                        posY: 57,
                        zIndex: 20,
                        img: imgKey,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KEY3_SCROLL_TITLE,
                        boolLeft: true,
                    },
                    keyScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KEY3_SCROLL_TITLE,
                        message: this.consts.KEY3_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgKey,
                    },

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

                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage15;
            } else if (this.props.stage === 16) {

                // ------------------------------------------------------------
                // ステージ16
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,
                    //ブロック
                    ...getBlocks(10, [
                        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], 
                        [2, 0], 
                        [2, 1], 
                        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], 

                        [14, 2], [15, 2], [16, 2], [17, 2], 
                        [13, 3], [14, 3], [15, 3], [16, 3], [17, 3], 
                        [12, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4],  
                        [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], 
                        [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6], [17, 6], 
                        [-2, 7],[-1, 7],[0, 7],[1, 7],[2, 7],[3, 7],[4, 7],[5, 7],[6, 7],[7, 7],[8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], 
                    ], onTouchBlock, imgWoodenBlock, 23),

                    oni1: {
                        size: 58,
                        posX: 180,
                        posY: 20,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 30,
                        img: imgOni,
                        onTouch: onTouchBlock,
                        nextX: 100,
                        nextY: 63,
                        nextLeft: false,
                        next: 5,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeKimme,
                    },

                    key: {
                        size: 10,
                        posX: 147,
                        posY: 10,
                        zIndex: 20,
                        img: imgKey,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KEY2_SCROLL_TITLE,
                        boolLeft: true,
                    },
                    keyScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KEY2_SCROLL_TITLE,
                        message: this.consts.KEY2_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgKey,
                    },

                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 13,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },

                }
                //ステージの背景画像を設定
                this.bgImg = stage16;
            } else if (this.props.stage === 17) {

                // ------------------------------------------------------------
                // ステージ17
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    //ブロック
                    ...getBlocks(10, [
                        [1, -0.5], [2, -0.5], [3, -0.5], [4, -0.5], [5, -0.5], [6, -0.5], [7, -0.5], [8, -0.5], [9, -0.5], [10, -0.5],
                        [1, 0.4], [2, 0.4], [3, 0.4], [4, 0.4], [5, 0.4], [6, 0.4], [7, 0.4],
                        [-2, 0], [-1, 0], [0, 0], [15, 0], [16, 0], [10, 0],
                        [-2, 1], [-1, 1], [0, 1], [15, 1], [16, 1], [10, 1],
                        [-2, 2], [-1, 2], [0, 2], [15, 2], [16, 2], [10, 2],
                        [-2, 3], [-1, 3], [0, 3], [15, 3], [16, 3], [10, 3],
                        [-2, 4], [-1, 4], [0, 4], [15, 4], [16, 4],
                        [-2, 5], [-1, 5], [0, 5], [15, 5], [16, 5],
                        [-2, 6], [-1, 6], [0, 6], [15, 6], [16, 6],
                        [-2, 7], [-1, 7], [0, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7],

                        [-2, 3.7], [-1, 3.7], [0, 3.7], [1, 3.7], [2, 3.7], [5, 3.7], [6, 3.7], [7, 3.7], [8, 3.7], [9, 3.7], [10, 3.7],

                        [4, 6], 

                    ], onTouchBlock, imgWoodenBlock, 23),

                    shino: {
                        size: 10,
                        posX: 15,
                        posY: 24,
                        zIndex: 17,
                        img: imgShino,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL3_TITLE,
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
                        title: this.consts.SHINO_SCROLL3_TITLE,
                        message: this.consts.SHINO_SCROLL3_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgShino,
                    },

                    //はしご
                    hashigoPic: {
                        size: 20,
                        posX: 122,
                        posY: 4,
                        zIndex: 20,
                        img: imgHashigo,
                        onTouch: onTouchNothing,
                    },
                    hashigo0: {
                        size: 10,
                        posX: 126,
                        posY: 9,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        onTouch: onTouchTree,
                    },
                    hashigo1: {
                        size: 10,
                        posX: 126,
                        posY: 27,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        onTouch: onTouchTree,
                    },
                    hashigo2: {
                        size: 10,
                        posX: 126,
                        posY: 45,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        onTouch: onTouchTree,
                    },

                    box1: {
                        size: 37,
                        posX: 113,
                        posY: -22,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },
                    box2: {
                        size: 37,
                        posX: 113,
                        posY: -4,
                        speedX: 0,
                        speedY: 0,
                        zIndex: 22,
                        img: imgBox1,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                        life: 1,
                    },

                    door1: {
                        size: 22,
                        posX: 80,
                        posY: 49,
                        zIndex: 22,
                        img: imgDoor,
                        onTouch: onTouchLockedDoor,
                        nextX: 60,
                        nextY: 62,
                        nextLeft: false,
                        next: 1,
                        changeStage: this.props.changeStage,
                        keyName: this.consts.KEY2_SCROLL_TITLE,
                    },
                    door2: {
                        size: 22,
                        posX: 60,
                        posY: 16,
                        zIndex: 22,
                        img: imgDoor,
                        onTouch: onTouchLockedDoor,
                        nextX: 60,
                        nextY: 62,
                        nextLeft: false,
                        next: 1,
                        changeStage: this.props.changeStage,
                        keyName: this.consts.KEY3_SCROLL_TITLE,
                    },

                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 13,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 73,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: -70,
                        posY: -310,
                        zIndex: 30,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 20,
                        nextY: 62,
                        nextLeft: false,
                        next: 18,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = stage17;
            } else if (this.props.stage === 18) {

                // ------------------------------------------------------------
                // ステージ18
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                }
                //ステージの背景画像を設定
                this.bgImg = stage18;
            } else if (this.props.stage === 19) {

                // ------------------------------------------------------------
                // ステージ19
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                }
                //ステージの背景画像を設定
                this.bgImg = stage19;
            } else if (this.props.stage === 20) {

                // ------------------------------------------------------------
                // ステージ20
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                }
                //ステージの背景画像を設定
                this.bgImg = stage20;
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
function getBlocks(size, arrPos, onTouch, imgBlock, zIndex) {

    let objResult = {};

    for (let index in arrPos) {
        objResult["objBlock" + index] = {
            size: size + 3,
            posX: arrPos[index][0] * size,
            posY: arrPos[index][1] * size,
            zIndex: zIndex,
            img: imgBlock,
            onTouch: onTouch,
        };
    }
    return objResult;
}

//ブロック生成関数（画像なし）
function getBlocksNoPic(size, arrPos, onTouch, imgBlock, zIndex) {

    let objResult = {};

    for (let index in arrPos) {
        objResult["objBlockNoPic" + index] = {
            size: size,
            posX: arrPos[index][0] * size,
            posY: arrPos[index][1] * size,
            zIndex: zIndex,
            onTouch: onTouch,
        };
    }
    return objResult;
}

//穴が開いた床　生成関数
function getHoleFloor(holeStart, holeEnd) {

    let objResult = {};

    for (let i = 0; i < 5; i++) {
        objResult["floorL" + i] = {
            size: 200,
            posX: holeStart - 200,
            posY: 79 - i,
            zIndex: 30,
            onTouch: onTouchBlock,
        };

        objResult["floorR" + i] = {
            size: 200,
            posX: holeEnd,
            posY: 79 - i,
            zIndex: 30,
            onTouch: onTouchBlock,
        };
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
// 風呂場の鍵がかかったドアのタッチ関数
//=======================================
function onTouchLockedDoor(ninja, from) {
    if (ninja.readScroll.indexOf(this.keyName) < 0) {
        //鍵を持っていなければブロック
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
    } else {
        //鍵を持っていれば何もしない
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
            this.posX = this.xMin;
            return;
        }
        if (this.yMax && this.posY > this.yMax) {
            //y最大値を超えている場合
            this.posY = this.yMax;
            return;
        } else if (this.yMin && this.posY < this.yMin) {
            //y最小値を超えている場合
            this.posY = this.yMin;
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
// 一つ目小僧　タイムステップ毎
//=======================================
function eachTimeOneEye(ninja, key) {
    if (this && this.enemy) {

        //重複を防ぐために現在時刻をプロパティ名に
        let day = new Date().getTime();

        //5回に1回火の玉生成
        var random1 = Math.floor(Math.random() * 6);
        var random2 = Math.floor(Math.random() * 6);
        var random3 = Math.floor(Math.random() * 6);
        if (random1 === 0) {
            ninja.game.objs["oneEye" + day] = {
                size: 13,
                posX: this.posX,
                posY: this.posY,
                speedX: random2/3,
                speedY: random3/ 3,
                zIndex: 5,
                img: imgBlueFire,
                next: 9,
                onTouch: onTouchStageChangeCommon,
                nextX: 125,
                nextY: 0,
                nextLeft: true,
                changeStage: this.changeStage,
                enemy: true,
                eachTime: eachTimeEnemy,
                life: 1,
            };
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

//=======================================
// デカい魚　タイムステップ毎
//=======================================
function eachTimeKimme(ninja, key) {
    if (this && this.enemy) {

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

        //敵の行動可能域計算
        if (this.xMax && this.posX > this.xMax) {
            //x最大値を超えている場合
            this.posX = this.xMax;
        } else if (this.xMin && this.posX < this.xMin) {
            //x最小値を超えている場合
            this.posX = this.xMin;
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                if (checkTouch(this, ninja.game.objs["fireBall" + i])) {
                    //敵がFireBallに触れた場合
                    this.posX += 0.5;
                }
            }
        }
    }
}

export { Page2 };