import * as React from "react";
import { gameStorage } from "../../../common/consts";
import { Ninja } from "../../Games/NinjaGame";
import { NinjaChar } from "./objs/ninja/ninja";
import { Obj } from "./objs/obj";

//オブジェクト素材画像----------------

//岩
const imgRock = `${gameStorage}ninja1/objs/rock.png`;
//岩（上下反転）
const imgRockR = `${gameStorage}ninja1/objs/rockRiverse.png`;
//木
const imgTree1 = `${gameStorage}ninja1/objs/tree1.png`;
//看板
const imgKanban1 = `${gameStorage}ninja1/objs/kanban1.png`;
//看板の矢印
const imgArrow1 = `${gameStorage}ninja1/objs/arrow1.png`;
//鳥居
const imgTorii = `${gameStorage}ninja1/objs/torii.png`;
//Welcomeのフレーム
const imgFrame = `${gameStorage}ninja1/objs/frame.jpg`;
//火
const imgfire1 = `${gameStorage}ninja1/objs/fire1.png`;
//火（上下反転）
const imgfireR = `${gameStorage}ninja1/objs/fireReverse.png`;
//ポチ
const imgPochi = `${gameStorage}ninja1/objs/pochi.png`;
//閉じている巻物
const imgScroll = `${gameStorage}ninja1/objs/scrollObj.png`;
//開いている巻物
const imgScrollOpen = `${gameStorage}ninja1/objs/scrollOpen.png`;
//仏壇
const imgButsudan = `${gameStorage}ninja1/objs/butsudan.png`;
//シノ（先輩くのいち）
const imgShino = `${gameStorage}ninja1/objs/shino.png`;
//地蔵
const imgJizo = `${gameStorage}ninja1/objs/jizo.png`;
//ハニワ
const imgHaniwa = `${gameStorage}ninja1/objs/haniwa.png`;
//コウスケ
const imgKosuke = `${gameStorage}ninja1/objs/kosuke.png`;

//背景画像//---------------------------

//stage1
const furuie = `${gameStorage}ninja1/background/furuie5.jpg`;
//stage2
const town1 = `${gameStorage}ninja1/background/town1.jpg`;
//stage3
const ryokan1 = `${gameStorage}ninja1/background/ryokan1.jpg`;
//stage4
const riverside1 = `${gameStorage}ninja1/background/riverside.jpg`;
//stage5
const river1 = `${gameStorage}ninja1/background/river.jpg`;
//stage6
const river2 = `${gameStorage}ninja1/background/river2.jpg`;
//stage7
const jizos = `${gameStorage}ninja1/background/jizos.jpg`;
//stage8
const gardianDog = `${gameStorage}ninja1/background/gardianDog.jpg`;
//stage9
const shrine = `${gameStorage}ninja1/background/shrine.jpg`;
//stage10
const skyStone = `${gameStorage}ninja1/background/sky1.jpg`;
//stage11
const castleRiver = `${gameStorage}ninja1/background/castleRiver.jpg`;
//stage12
const castleWall = `${gameStorage}ninja1/background/castleWall.jpg`;
//stage13
const castle = `${gameStorage}ninja1/background/castle.jpg`;
//stage14
const heaven = `${gameStorage}ninja1/background/heaven.png`;

export type EventFunc = (keyType: string | undefined) => void;
export interface Game extends Page2 {
    onClickButton: EventFunc;
    onMouseUp: EventFunc;
    UL: number;
    objs: any;
}

export default class Page2 extends React.Component {
    props: any;
    state: any;

    terminalPC?: boolean;
    initFlag?: boolean;
    prevStage?: number;
    UL?: number;
    ninja?: any;
    objWalls?: {
        leftWall: {
            size: number;
            posX: number;
            posY: number;
            zIndex: number;
            onTouch: (ninja: any, from: any) => void;
        };
        rightWall: {
            size: number;
            posX: number;
            posY: number;
            zIndex: number;
            onTouch: (ninja: any, from: any) => void;
        };
    };
    readElementScroll?: string[];
    objOutOfScreen?: {
        outOfScreenLeft: {
            size: number;
            posX: number;
            posY: number;
            onTouch: () => void;
            divType: string;
        };
        outOfScreenRight: {
            size: number;
            posX: number;
            posY: number;
            onTouch: () => void;
            divType: string;
        };
        outOfScreenTop: any;
        outOfScreenBottom: any;
    };
    objFloor?: {
        floor1: {
            size: number;
            posX: number;
            posY: number;
            zIndex: number;
            onTouch: (ninja: any, from: any) => void;
        };
        floor2: {
            size: number;
            posX: number;
            posY: number;
            zIndex: number;
            onTouch: (ninja: any, from: any) => void;
        };
        floor3: any;
        floor4: any;
    };
    backgroundSetting?: {
        /* 背景画像 */
        backgroundImage: string;
        /* 画像を常に天地左右の中央に配置 */
        backgroundPosition: string;
        /* 画像をタイル状に繰り返し表示しない */
        backgroundRepeat: string;
        /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
        backgroundSize: string;
        /* 背景画像が読み込まれる前に表示される背景のカラー */
        backgroundColor: string;
    };
    consts: any;
    lButton?: boolean;
    rButton?: boolean;
    jButton?: boolean;
    pageStyle: any;
    timerId?: number;
    objs?: any;
    closeScroll?: boolean;
    closeButton?: boolean;
    bgImg: any;

    UNSAFE_componentWillMount() {
        //(PC) or (スマホ/タブレット) 判定
        this.terminalPC = this.checkTerminalPC();

        //初期描画の時のみtrueとする（2回目以降はfalse）
        //タイムステップごとの処理の登録を1回のみ行うために用いる
        this.initFlag = true;

        //前のステージ（ステージ変更判定に利用）
        this.prevStage = 0;

        //画面の高さと幅を取得
        let pageSize = this.getWindowSize();

        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        this.UL = pageSize.pageHeight / 90;

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
        if (this.props.language === "Japanese") {
            this.consts = {
                timeStep: 100,

                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",

                //スタートと同時に表示される巻物
                FIRST_SCROLL_TITLE: "拙者の屋敷に参るがよい",
                FIRST_SCROLL_MESSAGE:
                    "よく来たな、異国の者よ。我が名はポチ。忍者マスターである。\n" +
                    "おぬしは忍術を学ぶため、はるばるこの地へ来たと聞いている。\n" +
                    "画面下の [＜] ボタンを押し、拙者の家まで来るがよい。",

                //ジャンプの説明
                JUMP_INSTRUCTION_TITLE: "ジャンプの方法",
                JUMP_INSTRUCTION_MESSAGE:
                    "画面下の [＜] ボタンを押しながら、\n" +
                    "[ ↑jump↑ ] ボタンを押してください。\n",

                //ポチの家でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "異国の地より、よく参った！",
                POCHI_SCROLL_MESSAGE:
                    "我が名はポチ！\n" +
                    "忍者マスターになるには [火] [風] [水] [地] の4つの巻物を集めねばならぬ。\n" +
                    "火の書は既に拙者が持っている。そこの仏壇にある巻物に触れてみるがよい。",

                //城でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "よくぞここまで成長した！",
                POCHI_SCROLL2_MESSAGE:
                    "これがおぬしの最後の巻物、\n" +
                    "「地の書」である！\n" +
                    "手にするがよい！",

                //火の書（ポチの家の仏壇）
                FIRE_SCROLL_TITLE: "火の書",
                FIRE_SCROLL_MESSAGE:
                    "火の力が宿った巻物。\n" +
                    "炎の上昇気流を利用して、飛び上がることができる。\n" +
                    "炎に触れてみるがよい。",

                //風の書（宿の屋根の上）
                AIR_SCROLL_TITLE: "風の書",
                AIR_SCROLL_MESSAGE:
                    "風の力が宿った巻物\n" +
                    "空中を自由に跳びまわることができる。\n" +
                    "空中でもう一度ジャンプボタンを押してみるがよい。",

                //水の書（宇宙の岩の上）
                WATER_SCROLL_TITLE: "水の書",
                WATER_SCROLL_MESSAGE:
                    "水の力が宿った巻物。\n" +
                    "水の流れの影響を受けず、水中を自由に歩き回ることができる。\n" +
                    "水に潜ってみるがよい。",

                //地の書（城の岩の上）
                EARTH_SCROLL_TITLE: "地の書",
                EARTH_SCROLL_MESSAGE:
                    "大地の力が宿った巻物。\n" +
                    "泥のハニワを作ることができる。\n" +
                    "[＜] ボタンと [＞] ボタンを同時に押してみるがよい。",

                //河原の看板
                KAWARA_SCROLL_TITLE: "急流注意！",
                KAWARA_SCROLL_MESSAGE:
                    "川の流れが激しいため、普通の者は進むべからず。\n" +
                    "水の力を修めし忍者のみ、進むべし。",

                //川でシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "こんにちは",
                SHINO_SCROLL_MESSAGE:
                    "あたいはシノ。あんたの先輩だよ。\n" +
                    "この先に進むと城がある。でも、たどり着くのは難しいよ。\n" +
                    "ポチ師匠の家から、右に飛んでみた？",

                //鳥居の上でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "調子はどうだい？",
                SHINO_SCROLL2_MESSAGE:
                    "もう少し右に行くと、風の書が手に入るよ。\n" +
                    "風の書を読んだら、 [↑jump↑] ボタンを空中で押してごらん。\n" +
                    "空中を自由に進めるよ！",

                //水路の岩肌のイクノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "川の流れが強いね",
                SHINO_SCROLL3_MESSAGE:
                    "空中を歩けるようになったら、「狛犬神社」に行ってみると良いよ。\n" +
                    "そこで「水の書」が手に入ると言われている。\n" +
                    "ポチ師匠の家から、ひたすら右に進んでごらん。",

                //城でシノに触った時のメッセージ
                SHINO_SCROLL4_TITLE: "遂にやったわね！",
                SHINO_SCROLL4_MESSAGE:
                    "全ての忍術をマスターしたね！\n" +
                    "これであなたも忍者マスターよ。\n" +
                    "忍者マスターになったら、狛犬神社の巨大な狛犬に会いに行ってごらん…",

                //大きな狛犬の前でシノに触った時のメッセージ
                SHINO_SCROLL5_TITLE: "こんな噂を聞いたことがある…",
                SHINO_SCROLL5_MESSAGE:
                    "忍者マスターになったら、\n" +
                    "この巨大な狛犬が、別の世界に連れて行ってくれるとか…",

                //神社入り口のメッセージ
                SHRINE_ENTRANCE_TITLE: "この先、「狛犬神社」",
                SHRINE_ENTRANCE_MESSAGE:
                    "お地蔵様に触れると、狛犬が怒り、火を噴くので注意",

                //天界でコウスケに触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "こんにちは、僕はコウスケ！",
                KOSUKE_SCROLL_MESSAGE:
                    "このゲームを作りし者さ！\n" +
                    "僕のゲームで遊んでくれてありがとう！\n" +
                    "次のチャプターでは、炎を使って敵と戦おう！",
            };
        } else {
            this.consts = {
                timeStep: 100,

                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",

                //スタートと同時に表示される巻物
                FIRST_SCROLL_TITLE: "Come to my house!",
                FIRST_SCROLL_MESSAGE:
                    "Hello, newbie! My name is Pochi. I am a Ninja Master!\n" +
                    "I heard you came to Japan to learn Ninja Skills!\n" +
                    "Please come to my house by pushing [＜] button at the bottom of the screen!",

                //ジャンプの説明
                JUMP_INSTRUCTION_TITLE: "How to jump!",
                JUMP_INSTRUCTION_MESSAGE:
                    "Keep pushing the [＜] button,\n" +
                    "and push [ ↑jump↑ ] button!\n",

                //ポチの家でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "Nice to meet you!",
                POCHI_SCROLL_MESSAGE:
                    "I'm Pochi!\n" +
                    "To become a Ninja Master, you should collect the scrolls of the four elements!\n" +
                    "I have one. Please grab the scroll at the altar, and read!",

                //城でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "Congratulation!",
                POCHI_SCROLL2_MESSAGE:
                    "Well done!\n" +
                    "This is your final scroll.\n" +
                    "Please collect!",

                //火の書（ポチの家の仏壇）
                FIRE_SCROLL_TITLE: "火の書",
                FIRE_SCROLL_MESSAGE:
                    "This is the Fire Element Scroll.\n" +
                    "You can learn 'Fire Jump' from this scroll.\n" +
                    "You can fly using updraft from fire.",

                //風の書（宿の屋根の上）
                AIR_SCROLL_TITLE: "風の書",
                AIR_SCROLL_MESSAGE:
                    "This is the scroll of the air element.\n" +
                    "You can learn 'Air Walk' from this scroll.\n" +
                    "You can jump while in the air!",

                //水の書（宇宙の岩の上）
                WATER_SCROLL_TITLE: "水の書",
                WATER_SCROLL_MESSAGE:
                    "This is the scroll of the water element.\n" +
                    "You can learn 'Water Spider' from this scroll.\n" +
                    "You can walk in water normally!",

                //地の書（城の岩の上）
                EARTH_SCROLL_TITLE: "地の書",
                EARTH_SCROLL_MESSAGE:
                    "This is the scroll of the earth element.\n" +
                    "You can make a mud doll.\n" +
                    "Please push [＜] button and [＞] button at the same time!",

                //河原の看板
                KAWARA_SCROLL_TITLE: "Dangerous Waters!",
                KAWARA_SCROLL_MESSAGE:
                    "Caution: Normal people can not go this way,\n" +
                    "water flow is too strong.",

                //川でシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "Hi",
                SHINO_SCROLL_MESSAGE:
                    "I'm your senior, Shino.\n" +
                    "If you go forward, there will be a castle. However, at this time it's too difficult.\n" +
                    "Touch the fire while pushing [＞] button at Master Pochi's house.",

                //鳥居の上でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "How are you?",
                SHINO_SCROLL2_MESSAGE:
                    "If you keep right, you can get the Air Element Scroll.\n" +
                    "After getting the scroll, please try to push the [↑jump↑] button twice.\n" +
                    "You can jump in the air twice!",

                //水路の岩肌のシノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "Hello!",
                SHINO_SCROLL3_MESSAGE:
                    "After learning to jump in the air,\n" +
                    "please go to the Shrine of Guardian Dogs to get the Water Element Scroll.\n" +
                    "To go to the shrine, keep going right from Master Pochi's house.",

                //城でシノに触った時のメッセージ
                SHINO_SCROLL4_TITLE: "You did it!",
                SHINO_SCROLL4_MESSAGE:
                    "You gained all four element skills!\n" +
                    "Now you are a Ninja Master!\n" +
                    "Ninja Masters should go to meet the huge Guardian Dog of the shrine...",

                //大きな狛犬の前でシノに触った時のメッセージ
                SHINO_SCROLL5_TITLE: "There is a regend...",
                SHINO_SCROLL5_MESSAGE:
                    "It is said that the big Gardian Dog can bring you to a secret world\n" +
                    "after becoming a Ninja Master...",

                //神社入り口のメッセージ
                SHRINE_ENTRANCE_TITLE: "Shrine of Guardian Dogs",
                SHRINE_ENTRANCE_MESSAGE:
                    "If you touch the Ksitigarbha in the shrine,\n" +
                    "The Guardian Dogs will be angry.",

                //天界でコウスケに触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "Hello, I'm Kosuke!",
                KOSUKE_SCROLL_MESSAGE:
                    "I am the creator of this game!\n" +
                    "Thank you for playing my game!\n" +
                    "In the next chapter, you should defeat the enemies using fire!",
            };
        }

        // ------------------------------------------------------------
        // ステート設定
        // ------------------------------------------------------------
        this.setState({
            screenStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight - 15 * this.UL,
                ...this.backgroundSetting,
            },
            ninjaStat: {
                left: true,
                ninjaX: this.ninja.posX * this.UL,
                ninjaY: this.ninja.posY * this.UL,
            },
        });

        //←ボタン押下判定
        this.lButton = false;
        //→ボタン押下判定
        this.rButton = false;
        //jumpボタン押下判定
        this.jButton = false;

        //キーボード押下時イベントセット
        this.setKeyboardEvent(this);
    }

    checkTerminalPC() {
        // ------------------------------------------------------------
        // (PC) or (スマホ/タブレット) 判定
        // ------------------------------------------------------------
        if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
            // スマホ・タブレット（iOS・Android）の場合
            return false;
        } else {
            // PCの場合
            return true;
        }
    }

    //---------------↓　resize　↓---------------
    getWindowSize() {
        let pageWidth: number, pageHeight: number;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        if (screenWidth > screenHeight) {
            //横長
            pageHeight = screenHeight;
            pageWidth = (pageHeight * 16) / 9;

            if (pageWidth > screenWidth) {
                //横がはみ出たら(正方形に近い画面)
                pageWidth = screenWidth;
                pageHeight = (pageWidth * 9) / 16;

                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    top: (screenHeight - pageHeight) / 2,
                };
            } else {
                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: (screenWidth - pageWidth) / 2,
                };
            }
        } else {
            //縦長
            pageHeight = (screenWidth * 9) / 10;
            pageWidth = (pageHeight * 16) / 9;

            if (pageWidth > (screenHeight * 9) / 10) {
                //横がはみ出そうだったら(正方形に近い画面)
                pageWidth = (screenHeight * 9) / 10;
                pageHeight = (pageWidth * 9) / 16;

                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: (screenWidth + pageHeight) / 2,
                    top: screenHeight / 20,
                };
            } else {
                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: (screenWidth * 95) / 100,
                    top: (screenHeight - pageWidth) / 2,
                };
            }
        }

        return { pageWidth, pageHeight };
    }
    //---------------↑　resize　↑---------------

    onLoadPage() {
        //初回描画時のみ処理の登録を行う
        if (this.initFlag) {
            //タイムステップ毎に処理を呼び出す
            this.timerId = window.setInterval(() => {
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
                        boolLeft = true; //画像左向き
                    }
                    if (this.rButton === true) {
                        this.ninja.speedX = 6;
                        boolLeft = false; //画像右向き
                    }
                    if (this.lButton === true && this.rButton === true) {
                        //右と左同時押しでハニワ生成
                        if (
                            this.ninja.readScroll.indexOf(
                                this.ninja.game.consts.EARTH_SCROLL_TITLE
                            ) > 0
                        ) {
                            //地の書を既に読んでいる場合
                            this.objs.haniwa = {
                                size: 12,
                                posX: this.ninja.posX,
                                posY: this.ninja.posY,
                                zIndex: 20,
                                img: imgHaniwa,
                                onTouch: onTouchNothing,
                                haniwa: true,
                            };
                        }
                    }
                }

                //前タイムステップでジャンプをした時のため、元に戻す
                this.closeScroll = false;

                if (this.jButton === true) {
                    if (this.ninja.speedY === 0) {
                        //通常ジャンプ
                        this.ninja.speedY = -11;

                        //ジャンプ時に巻物を閉じる
                        this.closeScroll = true;
                    }
                    if (
                        this.ninja.readScroll.indexOf(
                            this.ninja.game.consts.AIR_SCROLL_TITLE
                        ) > 0
                    ) {
                        //風の書を読んでいる
                        if (this.ninja.posY > 14) {
                            //2段ジャンプ実行限界高度に達していない
                            this.ninja.speedY = -11;
                        }
                    }
                    this.jButton = false;
                }

                if (this.closeButton === true) {
                    //巻物を閉じる（Enterキー等押下時）
                    this.closeScroll = true;
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
                    if (
                        checkRelativityLeftAndTop(
                            ninjaTop,
                            objTop,
                            objLeft,
                            objRight,
                            ninjaFoot,
                            ninjaLeft,
                            ninjaRight,
                            this.ninja.size
                        ) === true
                    ) {
                        stageChangedFlag = this.objs[key].onTouch(
                            this.ninja,
                            "upper"
                        );
                    }
                    //忍者が右から
                    if (
                        checkRelativityRightAndFoot(
                            objRight,
                            ninjaRight,
                            objTop,
                            objFoot,
                            ninjaLeft,
                            ninjaTop,
                            ninjaFoot,
                            this.ninja.size
                        ) === true
                    ) {
                        stageChangedFlag = this.objs[key].onTouch(
                            this.ninja,
                            "right"
                        );
                    }
                    //忍者が下から
                    if (
                        checkRelativityRightAndFoot(
                            objFoot,
                            ninjaFoot,
                            objLeft,
                            objRight,
                            ninjaTop,
                            ninjaLeft,
                            ninjaRight,
                            this.ninja.size
                        ) === true
                    ) {
                        stageChangedFlag = this.objs[key].onTouch(
                            this.ninja,
                            "lower"
                        );
                    }
                    //忍者が左から
                    if (
                        checkRelativityLeftAndTop(
                            ninjaLeft,
                            objLeft,
                            objTop,
                            objFoot,
                            ninjaRight,
                            ninjaTop,
                            ninjaFoot,
                            this.ninja.size
                        ) === true
                    ) {
                        stageChangedFlag = this.objs[key].onTouch(
                            this.ninja,
                            "left"
                        );
                    }

                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
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
                    },
                });
            }, this.consts.timeStep);

            //2回目以降の描画時はタイムステップごとの処理を重複して登録しないようにする
            this.initFlag = false;
        }
    }

    setKeyboardEvent(objGame: any) {
        // ------------------------------------------------------------
        // キーボードを押したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeydown = function (e: any) {
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
            } else if (
                keyCode === 13 ||
                keyCode === 8 ||
                keyCode === 46 ||
                keyCode === 27
            ) {
                keyType = "close";
            }
            objGame.onClickButton(keyType);
        };

        // ------------------------------------------------------------
        // キーボードを離したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeyup = function (e: any) {
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
            } else if (
                keyCode === 13 ||
                keyCode === 8 ||
                keyCode === 46 ||
                keyCode === 27
            ) {
                keyType = "close";
            }
            objGame.onMouseUp(keyType);
        };
    }

    //ボタン押下時処理
    onClickButton(btnType: string) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = true;
        } else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = true;
        } else if (btnType === "jump") {
            //jumpボタン押下判定
            this.jButton = true;
        } else if (btnType === "close") {
            //closeキー押下判定（Enter、Delete等）
            this.closeButton = true;
        }
    }
    //ボタン押下終了時処理
    onMouseUp(btnType: string) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = false;
        } else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = false;
        } else if (btnType === "close") {
            //closeキー押下判定（Enter、Delete等）
            this.closeButton = false;
        }
    }

    render() {
        if (this.prevStage !== this.props.stage) {
            //ステージ変更時のみ1回実行

            if (this.props.stage === 1) {
                // ------------------------------------------------------------
                // ステージ1（出発の宿）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    openFirstScroll: {
                        size: 10,
                        posX: 145,
                        posY: -20,
                        zIndex: 20,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.FIRST_SCROLL_TITLE,
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
                        speakerImg: imgPochi,
                    },
                    jumpInstruction: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.JUMP_INSTRUCTION_TITLE,
                        message: this.consts.JUMP_INSTRUCTION_MESSAGE,
                        fontSize: 3,
                    },
                    rock1: {
                        size: 10,
                        posX: 100,
                        posY: 70,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.JUMP_INSTRUCTION_TITLE,
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
                    airScroll: {
                        size: 10,
                        posX: 11,
                        posY: 13,
                        boolLeft: true,
                        zIndex: 22,
                        img: imgScroll,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.AIR_SCROLL_TITLE,
                    },
                    airScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.AIR_SCROLL_TITLE,
                        message: this.consts.AIR_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    stepUnderAirScroll: {
                        size: 40,
                        posX: 0,
                        posY: 23,
                        boolLeft: true,
                        zIndex: 22,
                        onTouch: onTouchTree,
                        openTargetTitle: this.consts.AIR_SCROLL_TITLE,
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
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = furuie;
            } else if (this.props.stage === 2) {
                // ------------------------------------------------------------
                // ステージ2（鳥居がある町）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    shino: {
                        size: 10,
                        posX: 120,
                        posY: 2,
                        zIndex: 27,
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
                        onTouch: onTouchGateWall,
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
                };
                //ステージの背景画像を設定
                this.bgImg = town1;
            } else if (this.props.stage === 3) {
                // ------------------------------------------------------------
                // ステージ3（ポチの家）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    fire1: {
                        size: 13,
                        posX: 74,
                        posY: 62,
                        zIndex: 20,
                        img: imgfire1,
                        onTouch: onTouchFire,
                        jumpHeight: 25,
                    },
                    pochi: {
                        size: 10,
                        posX: 50,
                        posY: 62,
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
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.FIRE_SCROLL_TITLE,
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
                        title: this.consts.FIRE_SCROLL_TITLE,
                        message: this.consts.FIRE_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    kanban1Pic: {
                        size: 15,
                        posX: 18,
                        posY: 22,
                        zIndex: 10,
                        img: imgKanban1,
                        onTouch: onTouchNothing,
                    },
                    kanban1ArrowPic: {
                        size: 7,
                        posX: 22,
                        posY: 25,
                        boolLeft: true,
                        zIndex: 11,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -270,
                        zIndex: 30,
                        next: 4,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = ryokan1;
            } else if (this.props.stage === 4) {
                // ------------------------------------------------------------
                // ステージ4（看板がある河原）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    kanban1Pic: {
                        size: 20,
                        posX: 47,
                        posY: 60,
                        zIndex: 10,
                        img: imgKanban1,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KAWARA_SCROLL_TITLE,
                    },
                    kanban1ArrowPic: {
                        size: 10,
                        posX: 51,
                        posY: 63,
                        boolLeft: true,
                        zIndex: 11,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    },
                    scrollFromKanban: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KAWARA_SCROLL_TITLE,
                        message: this.consts.KAWARA_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    rock1: {
                        size: 17,
                        posX: 90,
                        posY: 65,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    rock2: {
                        size: 20,
                        posX: 15,
                        posY: 63,
                        zIndex: 30,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    rock3Pic: {
                        size: 50,
                        posX: -25,
                        posY: 40,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock3Actual: {
                        size: 50,
                        posX: -25,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    riverPic: {
                        size: 200,
                        posX: -175,
                        posY: 72,
                        divType: "water",
                        zIndex: 29,
                        onTouch: onTouchNothing,
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
                };
                //ステージの背景画像を設定
                this.bgImg = riverside1;
            } else if (this.props.stage === 5) {
                // ------------------------------------------------------------
                // ステージ5（シノがいる川）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    rock1Pic: {
                        size: 50,
                        posX: 135,
                        posY: 40,
                        zIndex: 20,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 50,
                        posX: 135,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    rock2Pic: {
                        size: 50,
                        posX: 5,
                        posY: 40,
                        zIndex: 15,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 50,
                        posX: 5,
                        posY: 43,
                        zIndex: 15,
                        onTouch: onTouchBlock,
                    },
                    rock3Pic: {
                        size: 50,
                        posX: -25,
                        posY: 40,
                        zIndex: 20,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock3Actual: {
                        size: 50,
                        posX: -25,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    shino: {
                        size: 10,
                        posX: 20,
                        posY: 29,
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
                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 60,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    },
                    riverActual: {
                        size: 200,
                        posX: -20,
                        posY: 72,
                        zIndex: 30,
                        onTouch: onTouchRiverToRight,
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
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = river1;
            } else if (this.props.stage === 6) {
                // ------------------------------------------------------------
                // ステージ6（岩の下の水路）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    shino: {
                        size: 10,
                        posX: 73,
                        posY: 5,
                        zIndex: 35,
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
                    rock1Pic: {
                        size: 50,
                        posX: 135,
                        posY: 40,
                        zIndex: 20,
                        img: imgRockR,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 50,
                        posX: 135,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    rock2Pic: {
                        size: 90,
                        posX: -5,
                        posY: -25,
                        zIndex: 29,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock2Actual: {
                        size: 90,
                        posX: -12,
                        posY: -28,
                        zIndex: 15,
                        onTouch: onTouchBlock,
                    },
                    rock3Pic: {
                        size: 90,
                        posX: -25,
                        posY: -25,
                        zIndex: 30,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock3Actual: {
                        size: 90,
                        posX: -25,
                        posY: -28,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 60,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    },
                    riverActual: {
                        size: 200,
                        posX: -20,
                        posY: 72,
                        zIndex: 30,
                        onTouch: onTouchRiverToRight,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 5,
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
                };
                //ステージの背景画像を設定
                this.bgImg = river2;
            } else if (this.props.stage === 7) {
                // ------------------------------------------------------------
                // ステージ7（石像複数）
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    kanban1Pic: {
                        size: 20,
                        posX: 77,
                        posY: 60,
                        zIndex: 10,
                        img: imgKanban1,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHRINE_ENTRANCE_TITLE,
                    },
                    kanban1ArrowPic: {
                        size: 10,
                        posX: 82,
                        posY: 63,
                        zIndex: 11,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    },
                    scrollFromKanban: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHRINE_ENTRANCE_TITLE,
                        message: this.consts.SHRINE_ENTRANCE_MESSAGE,
                        fontSize: 3,
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
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 1,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = jizos;
            } else if (this.props.stage === 8) {
                // ------------------------------------------------------------
                // ステージ8 (狛犬)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    jizo1: {
                        size: 14,
                        posX: 40,
                        posY: 62,
                        zIndex: 15,
                        boolLeft: true,
                        img: imgJizo,
                        onTouch: onTouchJizo,
                    },
                    fire1: {
                        size: 13,
                        posX: 97,
                        posY: 6,
                        zIndex: 20,
                        img: imgfire1,
                        fireContinueTime: 5, //0.5秒
                        onTouch: onTouchFire,
                        jumpHeight: 20,
                    },
                    shino: {
                        size: 10,
                        posX: 77,
                        posY: 62,
                        zIndex: 23,
                        img: imgShino,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL5_TITLE,
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
                        title: this.consts.SHINO_SCROLL5_TITLE,
                        message: this.consts.SHINO_SCROLL5_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgShino,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchGateWall,
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
                    topGate: {
                        size: 150,
                        posX: 5,
                        posY: -230,
                        zIndex: 30,
                        next: 14,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = gardianDog;
            } else if (this.props.stage === 9) {
                // ------------------------------------------------------------
                // ステージ9 (神社)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    rock1: {
                        size: 60,
                        posX: 60,
                        posY: 35,
                        zIndex: 20,
                        boolLeft: true,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    jizo1: {
                        size: 14,
                        posX: 83,
                        posY: 24,
                        zIndex: 15,
                        boolLeft: true,
                        img: imgJizo,
                        onTouch: onTouchJizo,
                    },
                    fire1: {
                        size: 13,
                        posX: 58,
                        posY: 17,
                        zIndex: 20,
                        img: imgfire1,
                        fireContinueTime: 20, //2秒
                        onTouch: onTouchFire,
                        jumpHeight: 30,
                    },
                    fire2: {
                        size: 13,
                        posX: 114,
                        posY: 13,
                        zIndex: 20,
                        img: imgfire1,
                        fireContinueTime: 20, //2秒
                        onTouch: onTouchFire,
                        jumpHeight: 30,
                    },
                    leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: 0,
                        zIndex: 30,
                        next: 8,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                    topGate: {
                        size: 300,
                        posX: 50,
                        posY: -310,
                        zIndex: 30,
                        next: 10,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = shrine;
            } else if (this.props.stage === 10) {
                // ------------------------------------------------------------
                // ステージ10 (空の岩)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,

                    waterScroll: {
                        size: 10,
                        posX: 30,
                        posY: 12,
                        boolLeft: true,
                        zIndex: 18,
                        img: imgScroll,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.WATER_SCROLL_TITLE,
                    },
                    waterScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.WATER_SCROLL_TITLE,
                        message: this.consts.WATER_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    rock1: {
                        size: 30,
                        posX: 20,
                        posY: 20,
                        zIndex: 20,
                        boolLeft: true,
                        img: imgRock,
                        onTouch: onTouchBlock,
                    },
                    fire1: {
                        size: 15,
                        posX: 20,
                        posY: 45,
                        zIndex: 19,
                        img: imgfireR,
                        onTouch: onTouchNothing,
                        jumpHeight: 25,
                    },
                    fire2: {
                        size: 15,
                        posX: 35,
                        posY: 45,
                        zIndex: 19,
                        img: imgfireR,
                        onTouch: onTouchNothing,
                        jumpHeight: 25,
                    },
                    bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = skyStone;
            } else if (this.props.stage === 11) {
                // ------------------------------------------------------------
                // ステージ11 (河原の城壁)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 71,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    },
                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchGateWallStage11,
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
                };
                //ステージの背景画像を設定
                this.bgImg = castleRiver;
            } else if (this.props.stage === 12) {
                // ------------------------------------------------------------
                // ステージ12 (城壁の岩肌)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 11,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
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
                };
                //ステージの背景画像を設定
                this.bgImg = castleWall;
            } else if (this.props.stage === 13) {
                // ------------------------------------------------------------
                // ステージ13 (城)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

                    pochi: {
                        size: 10,
                        posX: 110,
                        posY: 62,
                        zIndex: 22,
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
                    earthScrollIcon: {
                        size: 10,
                        posX: 85,
                        posY: 46,
                        boolLeft: true,
                        zIndex: 22,
                        img: imgScroll,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.EARTH_SCROLL_TITLE,
                    },
                    earthScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.EARTH_SCROLL_TITLE,
                        message: this.consts.EARTH_SCROLL_MESSAGE,
                        fontSize: 3,
                    },
                    rock1Pic: {
                        size: 40,
                        posX: 70,
                        posY: 50,
                        zIndex: 20,
                        img: imgRock,
                        onTouch: onTouchNothing,
                    },
                    rock1Actual: {
                        size: 40,
                        posX: 70,
                        posY: 53,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    },
                    shino: {
                        size: 10,
                        posX: 30,
                        posY: 62,
                        zIndex: 17,
                        img: imgShino,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL4_TITLE,
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
                        title: this.consts.SHINO_SCROLL4_TITLE,
                        message: this.consts.SHINO_SCROLL4_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgShino,
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
                };
                //ステージの背景画像を設定
                this.bgImg = castle;
            } else if (this.props.stage === 14) {
                // ------------------------------------------------------------
                // ステージ14 (天)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...this.objFloor,

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
                    toriiMessage: {
                        size: 30,
                        posX: 90,
                        posY: 10,
                        zIndex: 30,
                        message: "天",
                        fontSize: 10,
                        onTouch: onTouchNothing,
                    },
                    kosuke: {
                        size: 13,
                        posX: 88,
                        posY: 52,
                        zIndex: 17,
                        img: imgKosuke,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KOSUKE_SCROLL_TITLE,
                    },
                    kosukeScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: imgScrollOpen,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KOSUKE_SCROLL_TITLE,
                        message: this.consts.KOSUKE_SCROLL_MESSAGE,
                        fontSize: 3,
                        finalMessage: true,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = heaven;
            }

            this.prevStage = this.props.stage;

            //localStorageに自動セーブ
            const { game, ...rest } = this.ninja;
            const saveData = { ninja: rest, stage: this.props.stage };
            localStorage.setItem("saveData1", JSON.stringify(saveData));

            //背景画像の変更
            if (this.backgroundSetting) {
                this.backgroundSetting.backgroundImage = `url(${this.bgImg})`;
            }
        }

        return (
            <div id="Page2" style={this.pageStyle}>
                <div
                    id="gameScreen"
                    style={this.state.screenStyle}
                    onLoad={() => {
                        this.onLoadPage();
                    }}
                >
                    <NinjaChar
                        imgAlt="Running Ninja"
                        width={this.ninja.size * (this?.UL || 0)}
                        x={this.state.ninjaStat.ninjaX}
                        y={this.state.ninjaStat.ninjaY}
                        boolLeft={this.state.ninjaStat.left}
                    />
                    <RenderObjs game={this} />
                </div>
                <b>
                    <RenderScreenBottom
                        onClickButton={this.onClickButton.bind(this)}
                        onMouseUp={this.onMouseUp.bind(this)}
                        terminalPC={this.terminalPC}
                        UL={this.UL}
                        lang={this.props.language}
                    />
                </b>
            </div>
        );
    }
}

function RenderObjs(props: any) {
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

function RenderScreenBottom(props: any) {
    const UL = props.UL;

    //画面下部のボタンなどの表示の出し分け
    if (props.terminalPC) {
        let styleDivPcMessage: any = {
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
        let styleTextPcMessage: any = {
            fontSize: "xx-large",
            color: "white",
        };
        if (props.lang === "Japanese") {
            return (
                <div style={styleDivPcMessage}>
                    <span style={styleTextPcMessage}>
                        PCでは、キーボードの「←」「↑」「→」キーで操作をしてください。
                    </span>
                </div>
            );
        } else {
            return (
                <div style={styleDivPcMessage}>
                    <span style={styleTextPcMessage}>
                        Please use [←], [↑], and [→] keys to play!
                    </span>
                </div>
            );
        }
    } else {
        //スマホ・タブレットの場合、画面下部にボタンを表示
        return (
            <RenderButtons
                onClickButton={props.onClickButton}
                onMouseUp={props.onMouseUp}
                UL={props.UL}
            />
        );
    }
}

function RenderButtons(props: {
    onClickButton: EventFunc;
    onMouseUp: EventFunc;
    UL: number;
}) {
    const UL = props.UL;

    //ボタンがあるテーブルのスタイル
    let controllerStyle: any = {
        position: "absolute",
        top: 75 * UL,
        width: 160 * UL,
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
        <>
            <table id="controller" style={controllerStyle}>
                <tbody>
                    <tr>
                        <td align="right">
                            <button
                                style={sideButtonStyle}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("left");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("left");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("left");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("left");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("left");
                                }}
                            >
                                {"＜"}
                            </button>
                        </td>
                        <td align="center">
                            <button
                                style={jumpButtonStyle}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("jump");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("jump");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("jump");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("jump");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("jump");
                                }}
                            >
                                {"↑　jump　↑"}
                            </button>
                        </td>
                        <td align="left">
                            <button
                                style={sideButtonStyle}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("right");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("right");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("right");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("right");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("right");
                                }}
                            >
                                {"＞"}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table
                id="controller"
                style={{ ...controllerStyle, top: 60 * UL, opacity: 0 }}
            >
                <tbody>
                    <tr>
                        <td align="right">
                            <button
                                style={{ ...sideButtonStyle, height: 30 * UL }}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("left");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("left");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("left");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("left");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("left");
                                }}
                            >
                                {"＜"}
                            </button>
                        </td>
                        <td align="center">
                            <button
                                style={{ ...jumpButtonStyle, height: 30 * UL }}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("jump");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("jump");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("jump");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("jump");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("jump");
                                }}
                            >
                                {"↑　jump　↑"}
                            </button>
                        </td>
                        <td align="left">
                            <button
                                style={{ ...sideButtonStyle, height: 30 * UL }}
                                className={"btn btn-info btn-lg btn-block"}
                                onMouseDown={() => {
                                    props.onClickButton("right");
                                }}
                                onTouchStart={() => {
                                    props.onClickButton("right");
                                }}
                                onMouseUp={() => {
                                    props.onMouseUp("right");
                                }}
                                onMouseOut={() => {
                                    props.onMouseUp("right");
                                }}
                                onTouchEnd={() => {
                                    props.onMouseUp("right");
                                }}
                            >
                                {"＞"}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

function checkRelativityRightAndFoot(
    objRight: number,
    ninjaRight: number,
    objTop: number,
    objFoot: number,
    ninjaLeft: number,
    ninjaTop: number,
    ninjaFoot: number,
    ninjaSize: number
) {
    //コメントは忍者が右から来た想定
    if (objRight > ninjaLeft) {
        //忍者が右から
        if (objRight < ninjaRight) {
            //忍者の右端がオブジェクトの右端を左向きに超えてはいない
            if (objTop < ninjaFoot - (ninjaSize * 7) / 12) {
                //オブジェクトの上をまたいでいない
                if (objFoot > ninjaTop + (ninjaSize * 7) / 12) {
                    //オブジェクトの下をくぐっていない
                    return true;
                }
            }
        }
    }
    return false;
}
function checkRelativityLeftAndTop(
    ninjaLeft: number,
    objLeft: number,
    objTop: number,
    objFoot: number,
    ninjaRight: number,
    ninjaTop: number,
    ninjaFoot: number,
    ninjaSize: number
) {
    //コメントは忍者が左から来た想定
    if (objLeft < ninjaRight) {
        //忍者が左から
        if (objLeft > ninjaLeft) {
            //忍者の左端がオブジェクトの左端を右向きに超えてはいない
            if (objTop < ninjaFoot - (ninjaSize * 7) / 12) {
                //オブジェクトの上をまたいでいない
                if (objFoot > ninjaTop + (ninjaSize * 7) / 12) {
                    //オブジェクトの下をくぐっていない
                    return true;
                }
            }
        }
    }
    return false;
}

//=======================================
// 巻物を開くためのトリガーに触った際のタッチ関数
//=======================================
function onTouchScrollOpener(ninja: Ninja) {
    //@ts-ignore
    if (ninja.game?.props.readElementScroll.indexOf(this.openTargetTitle) < 0) {
        //まだターゲットの巻物が読まれていない（ステージ遷移の度にリセット）

        let objs = ninja.game?.objs;
        for (let key in objs) {
            //@ts-ignore
            if (objs[key].title !== this.openTargetTitle && objs[key].scroll) {
                //表示が被らないように、他の巻物を消す
                objs[key].visible = false;
                //@ts-ignore
            } else if (objs[key].title === this.openTargetTitle) {
                //該当の巻物を表示する
                objs[key].visible = true;
            }
        }
    }
    //読み終えたリストの中に該当の巻物を追加
    //@ts-ignore
    ninja.readScroll.push(this.openTargetTitle);
    //@ts-ignore
    void ninja.game?.props.readElementScroll.push(this.openTargetTitle);
}

//=======================================
// 貫通不可能ブロック用のタッチ関数
//=======================================
function onTouchBlock(ninja: Ninja, from: string) {
    if (from === "upper") {
        //上から
        //@ts-ignore
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;
    } else if (from === "right") {
        //右から
        //@ts-ignore
        ninja.posX = this.posX + this.size;
        ninja.speedX = 0;
    } else if (from === "lower") {
        //下から
        //@ts-ignore
        ninja.posY = this.posY + this.size;
        ninja.speedY = 0;
    } else if (from === "left") {
        //左から
        //@ts-ignore
        ninja.posX = this.posX - ninja.size;
        ninja.speedX = 0;
    }
}

//=======================================
// 上から乗れる木などのタッチ関数
//=======================================
function onTouchTree(ninja: Ninja, from: string) {
    if (from === "upper") {
        //上から
        //@ts-ignore
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;
    }
}

//=======================================
// 右向きにに流れる川へのタッチ関数
//=======================================
function onTouchRiverToRight(ninja: Ninja) {
    if (ninja.readScroll.indexOf(ninja.game?.consts.WATER_SCROLL_TITLE) < 0) {
        //水の書を読んでいなければ、流される
        ninja.posX += 10;
        //@ts-ignore
        ninja.posY = this.posY - ninja.size;
        ninja.speedX = 30;
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
function onTouchGateWall(ninja: Ninja, from: string) {
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
    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（ステージ11から水路に戻る場合）
//=======================================
function onTouchGateWallStage11(ninja: Ninja, from: string) {
    if (from === "left") {
        //左から
        ninja.posX = 0;
        ninja.posY = 60;
        ninja.speedX = 0;
        ninja.speedY = 0;
    }
    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（上下）
//=======================================
function onTouchGateTopOrBottom(ninja: Ninja, from: string) {
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
    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 炎にタッチ
//=======================================
function onTouchFire(ninja: Ninja) {
    //@ts-ignore
    if (this.fireContinueTime && this.visible !== true) {
        //時間制限付きの火でありながら、不可視となっている場合はジャンプしない
        return;
    }
    if (ninja.readScroll.indexOf(ninja.game?.consts.FIRE_SCROLL_TITLE) > 0) {
        //火の書を読んでいればジャンプする
        //@ts-ignore
        ninja.speedY = this.jumpHeight * -1;
    }
}

//=======================================
// 地蔵にタッチ
//=======================================
function onTouchJizo(ninja: Ninja) {
    let objs = ninja.game?.objs;
    for (let key in objs) {
        if (objs[key].fireContinueTime) {
            //fireContinueTimeを持っている要素を表示する
            objs[key].visible = true;
        }
    }
}

export { Page2 };
