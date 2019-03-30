import React from 'react';
import { NinjaChar } from './objs/ninja/ninja';
import { Obj } from './objs/obj';


//オブジェクト素材画像----------------

//岩
import imgRock from './objs/rock.png';
//木
import imgTree1 from './objs/tree1.png';
//看板
import imgKanban1 from './objs/kanban1.png';
//看板の矢印
import imgArrow1 from './objs/arrow1.png';
//鳥居
import imgTorii from './objs/torii.png';
//Welcomeのフレーム
import imgFrame from './objs/frame.jpg';
//火
import imgfire1 from './objs/fire1.png';
//シバ
import imgShiba from './objs/shiba.png';
//閉じている巻物
import imgScroll from './objs/scrollObj.png';
//開いている巻物
import imgScrollOpen from './objs/scrollOpen.png';
//仏壇
import imgButsudan from './objs/butsudan.png';


//背景画像//---------------------------

//stage1
import furuie from './img/background/furuie5.jpg';
//stage2
import town1 from './img/background/town1.jpg';
//stage3
import ryokan1 from './img/background/ryokan1.jpg';


export default class Page2 extends React.Component {

    constructor(props) {
        super(props);

        //初期描画の時のみtrueとする（2回目以降はfalse）
        //タイムステップごとの処理の登録を1回のみ行うために用いる
        this.initFlag = true;

        //前のステージ（ステージ変更判定に利用）
        this.prevStage = 0;

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();

        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        this.UL = parseInt(pageSize.pageHeight, 10) / 90;

        //前のステージから受け取った忍者の初期値を設定
        this.ninja = this.props.ninja;


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
        //        this.bgImg = furuie;
        this.backgroundSetting = {
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
        };

        // ------------------------------------------------------------
        // 定数設定
        // ------------------------------------------------------------
        this.consts = {
            timeStep: 100,

            //操作ボタン
            BUTTON: "btn btn-info btn-lg btn-block",

            //最初の巻物のタイトル
            FIRST_SCROLL_TITLE: "Come to my house!",

            //最初の巻物のメッセージ
            FIRST_SCROLL_MESSAGE:
                "Hello, newbie! My name is Pochi. I am a Ninja Master!\n" +
                "I heared you came to Japan to learn Ninja Skills!\n" +
                "If you want to learn, please come to my house.",

            SHIBA_SCROLL_TITLE:
                "Nice to meet you!",

            SHIBA_SCROLL_MESSAGE:
                "I'm Pochi!\n" +
                "To become a Ninja Master, you should collect scrolls of the four elements!\n" +
                "I have one of them. Please read the scroll at the stand!",

            BUTSUDAN_SCROLL_TITLE:
                "火の書",

            BUTSUDAN_SCROLL_MESSAGE:
                "This is the scroll of the fire element.\n" +
                "You can learn 'Fire Jump' from this scroll.\n" +
                "You can fly using updraft from fire.",
        };

        // ------------------------------------------------------------
        // ステート設定
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

        //←ボタン押下判定
        this.lButton = false;
        //→ボタン押下判定
        this.rButton = false;
        //jumpボタン押下判定
        this.jButton = false;

        //キーボード押下時イベントセット
        this.setKeyboardEvent(this);
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


    onLoadPage() {
        //初回描画時のみ処理の登録を行う
        if (this.initFlag) {
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
                        this.ninja.speedX = -6;
                        boolLeft = true;//画像左向き
                    }
                    if (this.rButton === true) {
                        this.ninja.speedX = 6;
                        boolLeft = false;//画像右向き
                    }
                }

                if (this.jButton === true) {
                    if (this.ninja.speedY === 0) {
                        //ジャンプの初速は重力加速度の整数倍にならないようにする
                        //2段ジャンプ対策
                        this.ninja.speedY = -11;
                    }
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

            //2回目以降の描画時はタイムステップごとの処理を重複して登録しないようにする
            this.initFlag = false;
        }
    }

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
            this.rButton = false;
        } else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = true;
            this.lButton = false;
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

            if (this.props.stage === 1) {

                // ------------------------------------------------------------
                // ステージ1
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objWalls,
                    ...this.objFloor,

                    openFirstScroll: {
                        size: 10,
                        posX: 145,
                        posY: 5,
                        zIndex: 20,
                        onTouch: onTouchFirstScrollOpener,
                        game: this,
                    },
                    firstScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.FIRST_SCROLL_TITLE,
                        message: this.consts.FIRST_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    rock1: {
                        size: 10,
                        posX: 100,
                        posY: 70,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    rock2: {
                        size: 17,
                        posX: 90,
                        posY: 65,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    kanban1Pic: {
                        size: 20,
                        posX: 7,
                        posY: 60,
                        zIndex: 10,
                        img: imgKanban1,
                        onTouch: onTouchNothing,
                    },
                    kanban1ArrowPic: {
                        size: 10,
                        posX: 11,
                        posY: 63,
                        boolLeft: true,
                        zIndex: 11,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    },
                    scrollRoof: {
                        size: 10,
                        posX: 11,
                        posY: 13,
                        boolLeft: true,
                        zIndex: 11,
                        img: imgScroll,
                        onTouch: onTouchNothing,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onToughGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = furuie;

            } else if (this.props.stage === 2) {

                // ------------------------------------------------------------
                // ステージ2
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objWalls,
                    ...this.objFloor,

                    rock1: {
                        size: 17,
                        posX: 50,
                        posY: 63,
                        zIndex: 30,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    tree1Pic: {
                        size: 60,
                        posX: 120,
                        posY: 20,
                        zIndex: 15,
                        img: imgTree1,
                        onTouch: onTouchNothing,
                    },
                    tree1Actual: {
                        size: 60,
                        posX: 120,
                        posY: 30,
                        onTouch: onTouchTree,
                    },
                    toriiPic: {
                        size: 120,
                        posX: 35,
                        posY: 3,
                        zIndex: 10,
                        img: imgTorii,
                        onTouch: onTouchNothing,
                    },
                    toriiActual: {
                        size: 120,
                        posX: 35,
                        posY: 9,
                        zIndex: 10,
                        onTouch: onTouchTree,
                    },
                    toriiFramePic: {
                        size: 40,
                        posX: 75,
                        posY: 5,
                        zIndex: 30,
                        img: imgFrame,
                        onTouch: onTouchNothing,
                    },
                    toriiMessage1: {
                        size: 30,
                        posX: 87,
                        posY: 10,
                        zIndex: 30,
                        message: "Welcome",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    },
                    toriiMessage2: {
                        size: 30,
                        posX: 93,
                        posY: 15,
                        zIndex: 30,
                        message: "to",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    },
                    toriiMessage3: {
                        size: 30,
                        posX: 89,
                        posY: 20,
                        zIndex: 30,
                        message: "Japan!",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 1,
                        onTouch: onToughGateWall,
                        changeStage: this.props.changeStage,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 3,
                        onTouch: onToughGateWall,
                        changeStage: this.props.changeStage,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = town1;

            } else if (this.props.stage === 3) {

                // ------------------------------------------------------------
                // ステージ3
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objWalls,
                    ...this.objFloor,

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onToughGateWall,
                        changeStage: this.props.changeStage,
                    },
                    fire1: {
                        size: 13,
                        posX: 74,
                        posY: 62,
                        zIndex: 20,
                        img: imgfire1,
                        onTouch: onToughFire,
                        jumpHeight: 25,
                    },
                    shiba: {
                        size: 10,
                        posX: 50,
                        posY: 62,
                        zIndex: 20,
                        img: imgShiba,
                        onTouch: onTouchShiba1,
                        game: this,
                    },
                    butsudan: {
                        size: 40,
                        posX: 5,
                        posY: 32,
                        zIndex: 20,
                        img: imgButsudan,
                        onTouch: onTouchTree,
                    },
                    scrollButsudanIcon: {
                        size: 10,
                        posX: 19,
                        posY: 42,
                        boolLeft: true,
                        zIndex: 22,
                        img: imgScroll,
                        onTouch: onTouchScrollButsudan,
                        game: this,
                    },
                    shibaScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHIBA_SCROLL_TITLE,
                        message: this.consts.SHIBA_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    butsudanScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.BUTSUDAN_SCROLL_TITLE,
                        message: this.consts.BUTSUDAN_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                }
                //ステージの背景画像を設定
                this.bgImg = ryokan1;
            }
            this.prevStage = this.props.stage;
        }

        this.backgroundSetting.backgroundImage = `url(${this.bgImg})`;

        return (
            <div id="Page2" style={this.pageStyle}>
                <div
                    id="gameScreen"
                    style={this.state.screenStyle}
                    onLoad={() => { this.onLoadPage() }}
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

//=======================================
// ステージ1の最初の説明を開く
//=======================================
function onTouchFirstScrollOpener(ninja) {
    if (!ninja.firstScroll) {
        this.game.objs.firstScroll.visible = true;
    }
    ninja.firstScroll = true;
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
// 別ステージへのゲートのタッチ関数
//=======================================
function onToughGateWall(ninja, from) {
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
// ステージ3のシバにタッチ
//=======================================
function onTouchShiba1(ninja) {
    if (!ninja.shibaTalked) {
        this.game.objs.shibaScroll.visible = true;
        ninja.shibaTalked = true;
    }
}

//=======================================
// ステージ3の仏壇の巻物にタッチ
//=======================================
function onTouchScrollButsudan(ninja) {
    if (!ninja.fireJump) {
        this.game.objs.butsudanScrollOpened.visible = true;
        ninja.fireJump = true;
    }
}

//=======================================
// 炎にタッチ
//=======================================
function onToughFire(ninja) {
    if (ninja.fireJump) {
        ninja.speedY = this.jumpHeight * (-1);
    }
}

export { Page2 };