"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ninja_1 = require("./objs/ninja/ninja");
var obj_1 = require("./objs/obj");
//オブジェクト素材画像----------------
//岩
var rock_png_1 = __importDefault(require("./objs/rock.png"));
//岩（上下反転）
var rockRiverse_png_1 = __importDefault(require("./objs/rockRiverse.png"));
//木
var tree1_png_1 = __importDefault(require("./objs/tree1.png"));
//看板
var kanban1_png_1 = __importDefault(require("./objs/kanban1.png"));
//看板の矢印
var arrow1_png_1 = __importDefault(require("./objs/arrow1.png"));
//鳥居
var torii_png_1 = __importDefault(require("./objs/torii.png"));
//Welcomeのフレーム
var frame_jpg_1 = __importDefault(require("./objs/frame.jpg"));
//火
var fire1_png_1 = __importDefault(require("./objs/fire1.png"));
//火（上下反転）
var fireReverse_png_1 = __importDefault(require("./objs/fireReverse.png"));
//ポチ
var pochi_png_1 = __importDefault(require("./objs/pochi.png"));
//閉じている巻物
var scrollObj_png_1 = __importDefault(require("./objs/scrollObj.png"));
//開いている巻物
var scrollOpen_png_1 = __importDefault(require("./objs/scrollOpen.png"));
//仏壇
var butsudan_png_1 = __importDefault(require("./objs/butsudan.png"));
//シノ（先輩くのいち）
var shino_png_1 = __importDefault(require("./objs/shino.png"));
//地蔵
var jizo_png_1 = __importDefault(require("./objs/jizo.png"));
//ハニワ
var haniwa_png_1 = __importDefault(require("./objs/haniwa.png"));
//コウスケ
var kosuke_png_1 = __importDefault(require("./objs/kosuke.png"));
//背景画像//---------------------------
//stage1
var furuie5_jpg_1 = __importDefault(require("./img/background/furuie5.jpg"));
//stage2
var town1_jpg_1 = __importDefault(require("./img/background/town1.jpg"));
//stage3
var ryokan1_jpg_1 = __importDefault(require("./img/background/ryokan1.jpg"));
//stage4
var riverside_jpg_1 = __importDefault(require("./img/background/riverside.jpg"));
//stage5
var river_jpg_1 = __importDefault(require("./img/background/river.jpg"));
//stage6
var river2_jpg_1 = __importDefault(require("./img/background/river2.jpg"));
//stage7
var jizos_jpg_1 = __importDefault(require("./img/background/jizos.jpg"));
//stage8
var gardianDog_jpg_1 = __importDefault(require("./img/background/gardianDog.jpg"));
//stage9
var shrine_jpg_1 = __importDefault(require("./img/background/shrine.jpg"));
//stage10
var sky1_jpg_1 = __importDefault(require("./img/background/sky1.jpg"));
//stage11
var castleRiver_jpg_1 = __importDefault(require("./img/background/castleRiver.jpg"));
//stage12
var castleWall_jpg_1 = __importDefault(require("./img/background/castleWall.jpg"));
//stage13
var castle_jpg_1 = __importDefault(require("./img/background/castle.jpg"));
//stage14
var heaven_png_1 = __importDefault(require("./img/background/heaven.png"));
var Page2 = /** @class */ (function (_super) {
    __extends(Page2, _super);
    function Page2(props) {
        var _this = _super.call(this, props) || this;
        //(PC) or (スマホ/タブレット) 判定
        _this.terminalPC = _this.checkTerminalPC();
        //初期描画の時のみtrueとする（2回目以降はfalse）
        //タイムステップごとの処理の登録を1回のみ行うために用いる
        _this.initFlag = true;
        //前のステージ（ステージ変更判定に利用）
        _this.prevStage = 0;
        //画面の高さと幅を取得
        var pageSize = _this.getWindowSize();
        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        _this.UL = parseInt(pageSize.pageHeight, 10) / 90;
        //前のステージから受け取った忍者の初期値を設定
        _this.ninja = _this.props.ninja;
        _this.readElementScroll = _this.props.readElementScroll;
        _this.ninja.game = _this;
        //画面外を黒くする要素
        _this.objOutOfScreen = {
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
        _this.objWalls = {
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
        _this.objFloor = {
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
        _this.backgroundSetting = {
            /* 背景画像 */
            backgroundImage: "url(" + furuie5_jpg_1.default + ")",
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
        if (_this.props.language === "Japanese") {
            _this.consts = {
                timeStep: 100,
                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",
                //スタートと同時に表示される巻物
                FIRST_SCROLL_TITLE: "拙者の屋敷に参るがよい",
                FIRST_SCROLL_MESSAGE: "よく来たな、異国の者よ。我が名はポチ。忍者マスターである。\n" +
                    "おぬしは忍術を学ぶため、はるばるこの地へ来たと聞いている。\n" +
                    "画面下の [＜] ボタンを押し、拙者の家まで来るがよい。",
                //ジャンプの説明
                JUMP_INSTRUCTION_TITLE: "ジャンプの方法",
                JUMP_INSTRUCTION_MESSAGE: "画面下の [＜] ボタンを押しながら、\n" +
                    "[ ↑jump↑ ] ボタンを押してください。\n",
                //ポチの家でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "異国の地より、よく参った！",
                POCHI_SCROLL_MESSAGE: "我が名はポチ！\n" +
                    "忍者マスターになるには [火] [風] [水] [地] の4つの巻物を集めねばならぬ。\n" +
                    "火の書は既に拙者が持っている。そこの仏壇にある巻物に触れてみるがよい。",
                //城でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "よくぞここまで成長した！",
                POCHI_SCROLL2_MESSAGE: "これがおぬしの最後の巻物、\n" +
                    "「地の書」である！\n" +
                    "手にするがよい！",
                //火の書（ポチの家の仏壇）
                FIRE_SCROLL_TITLE: "火の書",
                FIRE_SCROLL_MESSAGE: "火の力が宿った巻物。\n" +
                    "炎の上昇気流を利用して、飛び上がることができる。\n" +
                    "炎に触れてみるがよい。",
                //風の書（宿の屋根の上）
                AIR_SCROLL_TITLE: "風の書",
                AIR_SCROLL_MESSAGE: "風の力が宿った巻物\n" +
                    "空中を自由に跳びまわることができる。\n" +
                    "空中でもう一度ジャンプボタンを押してみるがよい。",
                //水の書（宇宙の岩の上）
                WATER_SCROLL_TITLE: "水の書",
                WATER_SCROLL_MESSAGE: "水の力が宿った巻物。\n" +
                    "水の流れの影響を受けず、水中を自由に歩き回ることができる。\n" +
                    "水に潜ってみるがよい。",
                //地の書（城の岩の上）
                EARTH_SCROLL_TITLE: "地の書",
                EARTH_SCROLL_MESSAGE: "大地の力が宿った巻物。\n" +
                    "泥のハニワを作ることができる。\n" +
                    "[＜] ボタンと [＞] ボタンを同時に押してみるがよい。",
                //河原の看板
                KAWARA_SCROLL_TITLE: "急流注意！",
                KAWARA_SCROLL_MESSAGE: "川の流れが激しいため、普通の者は進むべからず。\n" +
                    "水の力を修めし忍者のみ、進むべし。",
                //川でシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "こんにちは",
                SHINO_SCROLL_MESSAGE: "あたいはシノ。あんたの先輩だよ。\n" +
                    "この先に進むと城がある。でも、たどり着くのは難しいよ。\n" +
                    "ポチ師匠の家から、右に飛んでみた？",
                //鳥居の上でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "調子はどうだい？",
                SHINO_SCROLL2_MESSAGE: "もう少し右に行くと、風の書が手に入るよ。\n" +
                    "風の書を読んだら、 [↑jump↑] ボタンを空中で押してごらん。\n" +
                    "空中を自由に進めるよ！",
                //水路の岩肌のイクノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "川の流れが強いね",
                SHINO_SCROLL3_MESSAGE: "空中を歩けるようになったら、「狛犬神社」に行ってみると良いよ。\n" +
                    "そこで「水の書」が手に入ると言われている。\n" +
                    "ポチ師匠の家から、ひたすら右に進んでごらん。",
                //城でシノに触った時のメッセージ
                SHINO_SCROLL4_TITLE: "遂にやったわね！",
                SHINO_SCROLL4_MESSAGE: "全ての忍術をマスターしたね！\n" +
                    "これであなたも忍者マスターよ。\n" +
                    "忍者マスターになったら、狛犬神社の巨大な狛犬に会いに行ってごらん…",
                //大きな狛犬の前でシノに触った時のメッセージ
                SHINO_SCROLL5_TITLE: "こんな噂を聞いたことがある…",
                SHINO_SCROLL5_MESSAGE: "忍者マスターになったら、\n" +
                    "この巨大な狛犬が、別の世界に連れて行ってくれるとか…",
                //神社入り口のメッセージ
                SHRINE_ENTRANCE_TITLE: "この先、「狛犬神社」",
                SHRINE_ENTRANCE_MESSAGE: "お地蔵様に触れると、狛犬が怒り、火を噴くので注意",
                //天界でコウスケに触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "こんにちは、僕はコウスケ！",
                KOSUKE_SCROLL_MESSAGE: "このゲームを作りし者さ！\n" +
                    "僕のゲームで遊んでくれてありがとう！\n" +
                    "次のチャプターでは、炎を使って敵と戦おう！",
            };
        }
        else {
            _this.consts = {
                timeStep: 100,
                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",
                //スタートと同時に表示される巻物
                FIRST_SCROLL_TITLE: "Come to my house!",
                FIRST_SCROLL_MESSAGE: "Hello, newbie! My name is Pochi. I am a Ninja Master!\n" +
                    "I heard you came to Japan to learn Ninja Skills!\n" +
                    "Please come to my house by pushing [＜] button at the bottom of the screen!",
                //ジャンプの説明
                JUMP_INSTRUCTION_TITLE: "How to jump!",
                JUMP_INSTRUCTION_MESSAGE: "Keep pushing the [＜] button,\n" +
                    "and push [ ↑jump↑ ] button!\n",
                //ポチの家でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "Nice to meet you!",
                POCHI_SCROLL_MESSAGE: "I'm Pochi!\n" +
                    "To become a Ninja Master, you should collect the scrolls of the four elements!\n" +
                    "I have one. Please grab the scroll at the altar, and read!",
                //城でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "Congratulation!",
                POCHI_SCROLL2_MESSAGE: "Well done!\n" +
                    "This is your final scroll.\n" +
                    "Please collect!",
                //火の書（ポチの家の仏壇）
                FIRE_SCROLL_TITLE: "火の書",
                FIRE_SCROLL_MESSAGE: "This is the Fire Element Scroll.\n" +
                    "You can learn 'Fire Jump' from this scroll.\n" +
                    "You can fly using updraft from fire.",
                //風の書（宿の屋根の上）
                AIR_SCROLL_TITLE: "風の書",
                AIR_SCROLL_MESSAGE: "This is the scroll of the air element.\n" +
                    "You can learn 'Air Walk' from this scroll.\n" +
                    "You can jump while in the air!",
                //水の書（宇宙の岩の上）
                WATER_SCROLL_TITLE: "水の書",
                WATER_SCROLL_MESSAGE: "This is the scroll of the water element.\n" +
                    "You can learn 'Water Spider' from this scroll.\n" +
                    "You can walk in water normally!",
                //地の書（城の岩の上）
                EARTH_SCROLL_TITLE: "地の書",
                EARTH_SCROLL_MESSAGE: "This is the scroll of the earth element.\n" +
                    "You can make a mud doll.\n" +
                    "Please push [＜] button and [＞] button at the same time!",
                //河原の看板
                KAWARA_SCROLL_TITLE: "Dangerous Waters!",
                KAWARA_SCROLL_MESSAGE: "Caution: Normal people can not go this way,\n" +
                    "water flow is too strong.",
                //川でシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "Hi",
                SHINO_SCROLL_MESSAGE: "I'm your senior, Shino.\n" +
                    "If you go forward, there will be a castle. However, at this time it's too difficult.\n" +
                    "Touch the fire while pushing [＞] button at Master Pochi's house.",
                //鳥居の上でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "How are you?",
                SHINO_SCROLL2_MESSAGE: "If you keep right, you can get the Air Element Scroll.\n" +
                    "After getting the scroll, please try to push the [↑jump↑] button twice.\n" +
                    "You can jump in the air twice!",
                //水路の岩肌のシノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "Hello!",
                SHINO_SCROLL3_MESSAGE: "After learning to jump in the air,\n" +
                    "please go to the Shrine of Guardian Dogs to get the Water Element Scroll.\n" +
                    "To go to the shrine, keep going right from Master Pochi's house.",
                //城でシノに触った時のメッセージ
                SHINO_SCROLL4_TITLE: "You did it!",
                SHINO_SCROLL4_MESSAGE: "You gained all four element skills!\n" +
                    "Now you are a Ninja Master!\n" +
                    "Ninja Masters should go to meet the huge Guardian Dog of the shrine...",
                //大きな狛犬の前でシノに触った時のメッセージ
                SHINO_SCROLL5_TITLE: "There is a regend...",
                SHINO_SCROLL5_MESSAGE: "It is said that the big Gardian Dog can bring you to a secret world\n" +
                    "after becoming a Ninja Master...",
                //神社入り口のメッセージ
                SHRINE_ENTRANCE_TITLE: "Shrine of Guardian Dogs",
                SHRINE_ENTRANCE_MESSAGE: "If you touch the Ksitigarbha in the shrine,\n" +
                    "The Guardian Dogs will be angry.",
                //天界でコウスケに触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "Hello, I'm Kosuke!",
                KOSUKE_SCROLL_MESSAGE: "I am the creator of this game!\n" +
                    "Thank you for playing my game!\n" +
                    "In the next chapter, you should defeat the enemies using fire!",
            };
        }
        // ------------------------------------------------------------
        // ステート設定
        // ------------------------------------------------------------
        _this.state = {
            screenStyle: __assign({ width: pageSize.pageWidth, height: pageSize.pageHeight - 15 * _this.UL }, _this.backgroundSetting),
            ninjaStat: {
                left: true,
                ninjaX: _this.ninja.posX * _this.UL,
                ninjaY: _this.ninja.posY * _this.UL,
            }
        };
        //←ボタン押下判定
        _this.lButton = false;
        //→ボタン押下判定
        _this.rButton = false;
        //jumpボタン押下判定
        _this.jButton = false;
        //キーボード押下時イベントセット
        _this.setKeyboardEvent(_this);
        return _this;
    }
    Page2.prototype.checkTerminalPC = function () {
        // ------------------------------------------------------------
        // (PC) or (スマホ/タブレット) 判定
        // ------------------------------------------------------------
        if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
            // スマホ・タブレット（iOS・Android）の場合
            return false;
        }
        else {
            // PCの場合
            return true;
        }
    };
    //---------------↓　resize　↓---------------
    Page2.prototype.getWindowSize = function () {
        var pageWidth, pageHeight;
        var screenWidth = parseInt(window.innerWidth, 10);
        var screenHeight = parseInt(window.innerHeight, 10);
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
                };
            }
            else {
                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: (screenWidth - pageWidth) / 2
                };
            }
        }
        else {
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
                };
            }
            else {
                this.pageStyle = {
                    //ページの余白設定
                    position: "absolute",
                    left: screenWidth * 95 / 100,
                    top: (screenHeight - pageWidth) / 2,
                };
            }
        }
        return { pageWidth: pageWidth, pageHeight: pageHeight };
    };
    //---------------↑　resize　↑---------------
    Page2.prototype.onLoadPage = function () {
        var _this = this;
        //初回描画時のみ処理の登録を行う
        if (this.initFlag) {
            //タイムステップ毎に処理を呼び出す
            this.timerId = setInterval(function () {
                //タイムステップごとの計算
                /* ↓　物体速度・位置計算　↓ */
                //忍者の画像の向き
                var boolLeft = _this.state.ninjaStat.left;
                //ボタン押下判定
                if (_this.lButton === false && _this.rButton === false) {
                    _this.ninja.speedX = 0;
                }
                else {
                    if (_this.lButton === true) {
                        _this.ninja.speedX = -6;
                        boolLeft = true; //画像左向き
                    }
                    if (_this.rButton === true) {
                        _this.ninja.speedX = 6;
                        boolLeft = false; //画像右向き
                    }
                    if (_this.lButton === true && _this.rButton === true) {
                        //右と左同時押しでハニワ生成
                        if (_this.ninja.readScroll.indexOf(_this.ninja.game.consts.EARTH_SCROLL_TITLE) > 0) {
                            //地の書を既に読んでいる場合
                            _this.objs.haniwa = {
                                size: 12,
                                posX: _this.ninja.posX,
                                posY: _this.ninja.posY,
                                zIndex: 20,
                                img: haniwa_png_1.default,
                                onTouch: onTouchNothing,
                                haniwa: true,
                            };
                        }
                    }
                }
                //前タイムステップでジャンプをした時のため、元に戻す
                _this.closeScroll = false;
                if (_this.jButton === true) {
                    if (_this.ninja.speedY === 0) {
                        //通常ジャンプ
                        _this.ninja.speedY = -11;
                        //ジャンプ時に巻物を閉じる
                        _this.closeScroll = true;
                    }
                    if (_this.ninja.readScroll.indexOf(_this.ninja.game.consts.AIR_SCROLL_TITLE) > 0) {
                        //風の書を読んでいる
                        if (_this.ninja.posY > 14) {
                            //2段ジャンプ実行限界高度に達していない
                            _this.ninja.speedY = -11;
                        }
                    }
                    _this.jButton = false;
                }
                if (_this.closeButton === true) {
                    //巻物を閉じる（Enterキー等押下時）
                    _this.closeScroll = true;
                }
                //重力加速度
                _this.ninja.speedY += 2.1;
                //落下速度限界
                if (_this.ninja.speedY > 9) {
                    _this.ninja.speedY = 9;
                }
                //位置計算
                _this.ninja.posX += _this.ninja.speedX;
                _this.ninja.posY += _this.ninja.speedY;
                //オブジェクトとの接触判定
                //忍者の上下左右の端の位置
                var ninjaLeft = _this.ninja.posX;
                var ninjaRight = ninjaLeft + _this.ninja.size;
                var ninjaTop = _this.ninja.posY;
                var ninjaFoot = ninjaTop + _this.ninja.size;
                for (var key in _this.objs) {
                    //途中でステージ遷移したら、関数を中止するためのフラグ
                    var stageChangedFlag = "";
                    //オブジェクトの上下左右の端の位置
                    var objLeft = _this.objs[key].posX;
                    var objRight = objLeft + _this.objs[key].size;
                    var objTop = _this.objs[key].posY;
                    var objFoot = objTop + _this.objs[key].size;
                    //忍者が上から
                    if (checkRelativityLeftAndTop(ninjaTop, objTop, objLeft, objRight, ninjaFoot, ninjaLeft, ninjaRight, _this.ninja.size) === true) {
                        stageChangedFlag = _this.objs[key].onTouch(_this.ninja, "upper");
                    }
                    //忍者が右から
                    if (checkRelativityRightAndFoot(objRight, ninjaRight, objTop, objFoot, ninjaLeft, ninjaTop, ninjaFoot, _this.ninja.size) === true) {
                        stageChangedFlag = _this.objs[key].onTouch(_this.ninja, "right");
                    }
                    //忍者が下から
                    if (checkRelativityRightAndFoot(objFoot, ninjaFoot, objLeft, objRight, ninjaTop, ninjaLeft, ninjaRight, _this.ninja.size) === true) {
                        stageChangedFlag = _this.objs[key].onTouch(_this.ninja, "lower");
                    }
                    //忍者が左から
                    if (checkRelativityLeftAndTop(ninjaLeft, objLeft, objTop, objFoot, ninjaRight, ninjaTop, ninjaFoot, _this.ninja.size) === true) {
                        stageChangedFlag = _this.objs[key].onTouch(_this.ninja, "left");
                    }
                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
                    }
                }
                /* ↑　物体速度・位置計算　↑ */
                //ページサイズ取得（ウィンドウサイズが変更された時のため）
                var pageSize = _this.getWindowSize();
                //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
                _this.UL = pageSize.pageHeight / 90;
                //物体の位置などを更新し、再描画
                _this.setState({
                    screenStyle: __assign({ width: pageSize.pageWidth, height: pageSize.pageHeight - 15 * _this.UL }, _this.backgroundSetting),
                    ninjaStat: {
                        left: boolLeft,
                        ninjaX: _this.ninja.posX * _this.UL,
                        ninjaY: _this.ninja.posY * _this.UL,
                    }
                });
            }, this.consts.timeStep);
            //2回目以降の描画時はタイムステップごとの処理を重複して登録しないようにする
            this.initFlag = false;
        }
    };
    Page2.prototype.setKeyboardEvent = function (objGame) {
        // ------------------------------------------------------------
        // キーボードを押したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeydown = function (e) {
            if (!e)
                e = window.event; // レガシー
            // ------------------------------------------------------------
            // 入力情報を取得
            // ------------------------------------------------------------
            // キーコード
            var keyCode = e.keyCode;
            var keyType;
            if (keyCode === 37) {
                keyType = "left";
            }
            else if (keyCode === 39) {
                keyType = "right";
            }
            else if (keyCode === 38) {
                keyType = "jump";
            }
            else if (keyCode === 32) {
                keyType = "jump";
            }
            else if (keyCode === 13 || keyCode === 8 || keyCode === 46 || keyCode === 27) {
                keyType = "close";
            }
            objGame.onClickButton(keyType);
        };
        // ------------------------------------------------------------
        // キーボードを離したときに実行されるイベント
        // ------------------------------------------------------------
        document.onkeyup = function (e) {
            if (!e)
                e = window.event; // レガシー
            // キーコード
            var keyCode = e.keyCode;
            var keyType;
            if (keyCode === 37) {
                keyType = "left";
            }
            else if (keyCode === 39) {
                keyType = "right";
            }
            else if (keyCode === 38) {
                keyType = "jump";
            }
            else if (keyCode === 32) {
                keyType = "jump";
            }
            else if (keyCode === 13 || keyCode === 8 || keyCode === 46 || keyCode === 27) {
                keyType = "close";
            }
            objGame.onMouseUp(keyType);
        };
    };
    //ボタン押下時処理
    Page2.prototype.onClickButton = function (btnType) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = true;
        }
        else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = true;
        }
        else if (btnType === "jump") {
            //jumpボタン押下判定
            this.jButton = true;
        }
        else if (btnType === "close") {
            //closeキー押下判定（Enter、Delete等）
            this.closeButton = true;
        }
    };
    //ボタン押下終了時処理
    Page2.prototype.onMouseUp = function (btnType) {
        if (btnType === "left") {
            //←ボタン押下判定
            this.lButton = false;
        }
        else if (btnType === "right") {
            //→ボタン押下判定
            this.rButton = false;
        }
        else if (btnType === "close") {
            //closeキー押下判定（Enter、Delete等）
            this.closeButton = false;
        }
    };
    Page2.prototype.render = function () {
        var _this = this;
        if (this.prevStage !== this.props.stage) {
            //ステージ変更時のみ1回実行
            if (this.props.stage === 1) {
                // ------------------------------------------------------------
                // ステージ1（出発の宿）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { openFirstScroll: {
                        size: 10,
                        posX: 145,
                        posY: -20,
                        zIndex: 20,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.FIRST_SCROLL_TITLE,
                    }, firstScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.FIRST_SCROLL_TITLE,
                        message: this.consts.FIRST_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: pochi_png_1.default,
                    }, jumpInstruction: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.JUMP_INSTRUCTION_TITLE,
                        message: this.consts.JUMP_INSTRUCTION_MESSAGE,
                        fontSize: 3,
                    }, rock1: {
                        size: 10,
                        posX: 100,
                        posY: 70,
                        zIndex: 20,
                        img: rock_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.JUMP_INSTRUCTION_TITLE,
                    }, rock2: {
                        size: 17,
                        posX: 90,
                        posY: 65,
                        zIndex: 20,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, kanban1Pic: {
                        size: 20,
                        posX: 7,
                        posY: 60,
                        zIndex: 10,
                        img: kanban1_png_1.default,
                        onTouch: onTouchNothing,
                    }, kanban1ArrowPic: {
                        size: 10,
                        posX: 11,
                        posY: 63,
                        boolLeft: true,
                        zIndex: 11,
                        img: arrow1_png_1.default,
                        onTouch: onTouchNothing,
                    }, airScroll: {
                        size: 10,
                        posX: 11,
                        posY: 13,
                        boolLeft: true,
                        zIndex: 22,
                        img: scrollObj_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.AIR_SCROLL_TITLE,
                    }, airScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.AIR_SCROLL_TITLE,
                        message: this.consts.AIR_SCROLL_MESSAGE,
                        fontSize: 3,
                    }, stepUnderAirScroll: {
                        size: 40,
                        posX: 0,
                        posY: 23,
                        boolLeft: true,
                        zIndex: 22,
                        onTouch: onTouchTree,
                        openTargetTitle: this.consts.AIR_SCROLL_TITLE,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 7,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = furuie5_jpg_1.default;
            }
            else if (this.props.stage === 2) {
                // ------------------------------------------------------------
                // ステージ2（鳥居がある町）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { shino: {
                        size: 10,
                        posX: 120,
                        posY: 2,
                        zIndex: 27,
                        img: shino_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL2_TITLE,
                    }, shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL2_TITLE,
                        message: this.consts.SHINO_SCROLL2_MESSAGE,
                        fontSize: 3,
                        speakerImg: shino_png_1.default,
                    }, rock1: {
                        size: 17,
                        posX: 50,
                        posY: 63,
                        zIndex: 30,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, tree1Pic: {
                        size: 60,
                        posX: 120,
                        posY: 20,
                        zIndex: 15,
                        img: tree1_png_1.default,
                        onTouch: onTouchNothing,
                    }, tree1Actual: {
                        size: 60,
                        posX: 120,
                        posY: 30,
                        onTouch: onTouchTree,
                    }, toriiPic: {
                        size: 120,
                        posX: 35,
                        posY: 3,
                        zIndex: 10,
                        img: torii_png_1.default,
                        onTouch: onTouchNothing,
                    }, toriiActual: {
                        size: 120,
                        posX: 35,
                        posY: 9,
                        zIndex: 10,
                        onTouch: onTouchTree,
                    }, toriiFramePic: {
                        size: 40,
                        posX: 75,
                        posY: 5,
                        zIndex: 30,
                        img: frame_jpg_1.default,
                        onTouch: onTouchNothing,
                    }, toriiMessage1: {
                        size: 30,
                        posX: 87,
                        posY: 10,
                        zIndex: 30,
                        message: "Welcome",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    }, toriiMessage2: {
                        size: 30,
                        posX: 93,
                        posY: 15,
                        zIndex: 30,
                        message: "to",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    }, toriiMessage3: {
                        size: 30,
                        posX: 89,
                        posY: 20,
                        zIndex: 30,
                        message: "Japan!",
                        fontSize: 4,
                        onTouch: onTouchNothing,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 1,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 3,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = town1_jpg_1.default;
            }
            else if (this.props.stage === 3) {
                // ------------------------------------------------------------
                // ステージ3（ポチの家）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 2,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, fire1: {
                        size: 13,
                        posX: 74,
                        posY: 62,
                        zIndex: 20,
                        img: fire1_png_1.default,
                        onTouch: onTouchFire,
                        jumpHeight: 25,
                    }, pochi: {
                        size: 10,
                        posX: 50,
                        posY: 62,
                        zIndex: 20,
                        img: pochi_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL_TITLE,
                    }, pochiScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.POCHI_SCROLL_TITLE,
                        message: this.consts.POCHI_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: pochi_png_1.default,
                    }, butsudan: {
                        size: 40,
                        posX: 5,
                        posY: 32,
                        zIndex: 20,
                        img: butsudan_png_1.default,
                        onTouch: onTouchTree,
                    }, scrollButsudanIcon: {
                        size: 10,
                        posX: 19,
                        posY: 42,
                        boolLeft: true,
                        zIndex: 22,
                        img: scrollObj_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.FIRE_SCROLL_TITLE,
                    }, butsudanScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.FIRE_SCROLL_TITLE,
                        message: this.consts.FIRE_SCROLL_MESSAGE,
                        fontSize: 3,
                    }, kanban1Pic: {
                        size: 15,
                        posX: 18,
                        posY: 22,
                        zIndex: 10,
                        img: kanban1_png_1.default,
                        onTouch: onTouchNothing,
                    }, kanban1ArrowPic: {
                        size: 7,
                        posX: 22,
                        posY: 25,
                        boolLeft: true,
                        zIndex: 11,
                        img: arrow1_png_1.default,
                        onTouch: onTouchNothing,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -270,
                        zIndex: 30,
                        next: 4,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = ryokan1_jpg_1.default;
            }
            else if (this.props.stage === 4) {
                // ------------------------------------------------------------
                // ステージ4（看板がある河原）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { kanban1Pic: {
                        size: 20,
                        posX: 47,
                        posY: 60,
                        zIndex: 10,
                        img: kanban1_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KAWARA_SCROLL_TITLE,
                    }, kanban1ArrowPic: {
                        size: 10,
                        posX: 51,
                        posY: 63,
                        boolLeft: true,
                        zIndex: 11,
                        img: arrow1_png_1.default,
                        onTouch: onTouchNothing,
                    }, scrollFromKanban: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KAWARA_SCROLL_TITLE,
                        message: this.consts.KAWARA_SCROLL_MESSAGE,
                        fontSize: 3,
                    }, rock1: {
                        size: 17,
                        posX: 90,
                        posY: 65,
                        zIndex: 20,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, rock2: {
                        size: 20,
                        posX: 15,
                        posY: 63,
                        zIndex: 30,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, rock3Pic: {
                        size: 50,
                        posX: -25,
                        posY: 40,
                        zIndex: 20,
                        img: rock_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock3Actual: {
                        size: 50,
                        posX: -25,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, riverPic: {
                        size: 200,
                        posX: -175,
                        posY: 72,
                        divType: "water",
                        zIndex: 29,
                        onTouch: onTouchNothing,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 3,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = riverside_jpg_1.default;
            }
            else if (this.props.stage === 5) {
                // ------------------------------------------------------------
                // ステージ5（シノがいる川）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { rock1Pic: {
                        size: 50,
                        posX: 135,
                        posY: 40,
                        zIndex: 20,
                        img: rockRiverse_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock1Actual: {
                        size: 50,
                        posX: 135,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, rock2Pic: {
                        size: 50,
                        posX: 5,
                        posY: 40,
                        zIndex: 15,
                        img: rockRiverse_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock2Actual: {
                        size: 50,
                        posX: 5,
                        posY: 43,
                        zIndex: 15,
                        onTouch: onTouchBlock,
                    }, rock3Pic: {
                        size: 50,
                        posX: -25,
                        posY: 40,
                        zIndex: 20,
                        img: rockRiverse_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock3Actual: {
                        size: 50,
                        posX: -25,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, shino: {
                        size: 10,
                        posX: 20,
                        posY: 29,
                        zIndex: 17,
                        img: shino_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL_TITLE,
                    }, shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL_TITLE,
                        message: this.consts.SHINO_SCROLL_MESSAGE,
                        fontSize: 3,
                        speakerImg: shino_png_1.default,
                    }, riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 60,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    }, riverActual: {
                        size: 200,
                        posX: -20,
                        posY: 72,
                        zIndex: 30,
                        onTouch: onTouchRiverToRight,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 4,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = river_jpg_1.default;
            }
            else if (this.props.stage === 6) {
                // ------------------------------------------------------------
                // ステージ6（岩の下の水路）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { shino: {
                        size: 10,
                        posX: 73,
                        posY: 5,
                        zIndex: 35,
                        img: shino_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL3_TITLE,
                    }, shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL3_TITLE,
                        message: this.consts.SHINO_SCROLL3_MESSAGE,
                        fontSize: 3,
                        speakerImg: shino_png_1.default,
                    }, rock1Pic: {
                        size: 50,
                        posX: 135,
                        posY: 40,
                        zIndex: 20,
                        img: rockRiverse_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock1Actual: {
                        size: 50,
                        posX: 135,
                        posY: 43,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, rock2Pic: {
                        size: 90,
                        posX: -5,
                        posY: -25,
                        zIndex: 29,
                        img: rock_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock2Actual: {
                        size: 90,
                        posX: -12,
                        posY: -28,
                        zIndex: 15,
                        onTouch: onTouchBlock,
                    }, rock3Pic: {
                        size: 90,
                        posX: -25,
                        posY: -25,
                        zIndex: 30,
                        img: rock_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock3Actual: {
                        size: 90,
                        posX: -25,
                        posY: -28,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 60,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    }, riverActual: {
                        size: 200,
                        posX: -20,
                        posY: 72,
                        zIndex: 30,
                        onTouch: onTouchRiverToRight,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 5,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 11,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = river2_jpg_1.default;
            }
            else if (this.props.stage === 7) {
                // ------------------------------------------------------------
                // ステージ7（石像複数）
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { kanban1Pic: {
                        size: 20,
                        posX: 77,
                        posY: 60,
                        zIndex: 10,
                        img: kanban1_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHRINE_ENTRANCE_TITLE,
                    }, kanban1ArrowPic: {
                        size: 10,
                        posX: 82,
                        posY: 63,
                        zIndex: 11,
                        img: arrow1_png_1.default,
                        onTouch: onTouchNothing,
                    }, scrollFromKanban: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHRINE_ENTRANCE_TITLE,
                        message: this.consts.SHRINE_ENTRANCE_MESSAGE,
                        fontSize: 3,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 8,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 1,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = jizos_jpg_1.default;
            }
            else if (this.props.stage === 8) {
                // ------------------------------------------------------------
                // ステージ8 (狛犬)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { jizo1: {
                        size: 14,
                        posX: 40,
                        posY: 62,
                        zIndex: 15,
                        boolLeft: true,
                        img: jizo_png_1.default,
                        onTouch: onTouchJizo,
                    }, fire1: {
                        size: 13,
                        posX: 97,
                        posY: 6,
                        zIndex: 20,
                        img: fire1_png_1.default,
                        fireContinueTime: 5,
                        onTouch: onTouchFire,
                        jumpHeight: 20,
                    }, shino: {
                        size: 10,
                        posX: 77,
                        posY: 62,
                        zIndex: 23,
                        img: shino_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL5_TITLE,
                    }, shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL5_TITLE,
                        message: this.consts.SHINO_SCROLL5_MESSAGE,
                        fontSize: 3,
                        speakerImg: shino_png_1.default,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 7,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, topGate: {
                        size: 150,
                        posX: 5,
                        posY: -230,
                        zIndex: 30,
                        next: 14,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = gardianDog_jpg_1.default;
            }
            else if (this.props.stage === 9) {
                // ------------------------------------------------------------
                // ステージ9 (神社)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { rock1: {
                        size: 60,
                        posX: 60,
                        posY: 35,
                        zIndex: 20,
                        boolLeft: true,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, jizo1: {
                        size: 14,
                        posX: 83,
                        posY: 24,
                        zIndex: 15,
                        boolLeft: true,
                        img: jizo_png_1.default,
                        onTouch: onTouchJizo,
                    }, fire1: {
                        size: 13,
                        posX: 58,
                        posY: 17,
                        zIndex: 20,
                        img: fire1_png_1.default,
                        fireContinueTime: 20,
                        onTouch: onTouchFire,
                        jumpHeight: 30,
                    }, fire2: {
                        size: 13,
                        posX: 114,
                        posY: 13,
                        zIndex: 20,
                        img: fire1_png_1.default,
                        fireContinueTime: 20,
                        onTouch: onTouchFire,
                        jumpHeight: 30,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: 0,
                        zIndex: 30,
                        next: 8,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, topGate: {
                        size: 300,
                        posX: 50,
                        posY: -310,
                        zIndex: 30,
                        next: 10,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = shrine_jpg_1.default;
            }
            else if (this.props.stage === 10) {
                // ------------------------------------------------------------
                // ステージ10 (空の岩)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), { waterScroll: {
                        size: 10,
                        posX: 30,
                        posY: 12,
                        boolLeft: true,
                        zIndex: 18,
                        img: scrollObj_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.WATER_SCROLL_TITLE,
                    }, waterScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.WATER_SCROLL_TITLE,
                        message: this.consts.WATER_SCROLL_MESSAGE,
                        fontSize: 3,
                    }, rock1: {
                        size: 30,
                        posX: 20,
                        posY: 20,
                        zIndex: 20,
                        boolLeft: true,
                        img: rock_png_1.default,
                        onTouch: onTouchBlock,
                    }, fire1: {
                        size: 15,
                        posX: 20,
                        posY: 45,
                        zIndex: 19,
                        img: fireReverse_png_1.default,
                        onTouch: onTouchNothing,
                        jumpHeight: 25,
                    }, fire2: {
                        size: 15,
                        posX: 35,
                        posY: 45,
                        zIndex: 19,
                        img: fireReverse_png_1.default,
                        onTouch: onTouchNothing,
                        jumpHeight: 25,
                    }, bottomGate: {
                        size: 300,
                        posX: -70,
                        posY: 80,
                        zIndex: 30,
                        next: 9,
                        onTouch: onTouchGateTopOrBottom,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = sky1_jpg_1.default;
            }
            else if (this.props.stage === 11) {
                // ------------------------------------------------------------
                // ステージ11 (河原の城壁)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { riverPic: {
                        size: 200,
                        posX: -20,
                        posY: 71,
                        divType: "water",
                        zIndex: 40,
                        onTouch: onTouchNothing,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 6,
                        onTouch: onTouchGateWallStage11,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 12,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = castleRiver_jpg_1.default;
            }
            else if (this.props.stage === 12) {
                // ------------------------------------------------------------
                // ステージ12 (城壁の岩肌)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 11,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    }, leftGateWall: {
                        size: 300,
                        posX: -300,
                        posY: -200,
                        zIndex: 30,
                        next: 13,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = castleWall_jpg_1.default;
            }
            else if (this.props.stage === 13) {
                // ------------------------------------------------------------
                // ステージ13 (城)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { pochi: {
                        size: 10,
                        posX: 110,
                        posY: 62,
                        zIndex: 22,
                        img: pochi_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL2_TITLE,
                    }, pochiScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.POCHI_SCROLL2_TITLE,
                        message: this.consts.POCHI_SCROLL2_MESSAGE,
                        fontSize: 3,
                        speakerImg: pochi_png_1.default,
                    }, earthScrollIcon: {
                        size: 10,
                        posX: 85,
                        posY: 46,
                        boolLeft: true,
                        zIndex: 22,
                        img: scrollObj_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.EARTH_SCROLL_TITLE,
                    }, earthScrollOpened: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.EARTH_SCROLL_TITLE,
                        message: this.consts.EARTH_SCROLL_MESSAGE,
                        fontSize: 3,
                    }, rock1Pic: {
                        size: 40,
                        posX: 70,
                        posY: 50,
                        zIndex: 20,
                        img: rock_png_1.default,
                        onTouch: onTouchNothing,
                    }, rock1Actual: {
                        size: 40,
                        posX: 70,
                        posY: 53,
                        zIndex: 30,
                        onTouch: onTouchBlock,
                    }, shino: {
                        size: 10,
                        posX: 30,
                        posY: 62,
                        zIndex: 17,
                        img: shino_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.SHINO_SCROLL4_TITLE,
                    }, shinoScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.SHINO_SCROLL4_TITLE,
                        message: this.consts.SHINO_SCROLL4_MESSAGE,
                        fontSize: 3,
                        speakerImg: shino_png_1.default,
                    }, rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 12,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    } });
                //ステージの背景画像を設定
                this.bgImg = castle_jpg_1.default;
            }
            else if (this.props.stage === 14) {
                // ------------------------------------------------------------
                // ステージ14 (天)
                // ------------------------------------------------------------
                this.objs = __assign(__assign(__assign(__assign({}, this.objOutOfScreen), this.objWalls), this.objFloor), { toriiPic: {
                        size: 120,
                        posX: 35,
                        posY: 3,
                        zIndex: 10,
                        img: torii_png_1.default,
                        onTouch: onTouchNothing,
                    }, toriiActual: {
                        size: 120,
                        posX: 35,
                        posY: 9,
                        zIndex: 10,
                        onTouch: onTouchTree,
                    }, toriiFramePic: {
                        size: 40,
                        posX: 75,
                        posY: 5,
                        zIndex: 30,
                        img: frame_jpg_1.default,
                        onTouch: onTouchNothing,
                    }, toriiMessage: {
                        size: 30,
                        posX: 90,
                        posY: 10,
                        zIndex: 30,
                        message: "天",
                        fontSize: 10,
                        onTouch: onTouchNothing,
                    }, kosuke: {
                        size: 13,
                        posX: 88,
                        posY: 52,
                        zIndex: 17,
                        img: kosuke_png_1.default,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.KOSUKE_SCROLL_TITLE,
                    }, kosukeScroll: {
                        size: 150,
                        posX: 5,
                        posY: 5,
                        zIndex: 1000,
                        img: scrollOpen_png_1.default,
                        scroll: true,
                        visible: false,
                        onTouch: onTouchNothing,
                        title: this.consts.KOSUKE_SCROLL_TITLE,
                        message: this.consts.KOSUKE_SCROLL_MESSAGE,
                        fontSize: 3,
                        finalMessage: true,
                    } });
                //ステージの背景画像を設定
                this.bgImg = heaven_png_1.default;
            }
            this.prevStage = this.props.stage;
            //localStorageに自動セーブ
            var _a = this.ninja, game = _a.game, rest = __rest(_a, ["game"]);
            var saveData = { ninja: rest, stage: this.props.stage };
            localStorage.setItem('saveData1', JSON.stringify(saveData));
            //背景画像の変更
            this.backgroundSetting.backgroundImage = "url(" + this.bgImg + ")";
        }
        return (React.createElement("div", { id: "Page2", style: this.pageStyle },
            React.createElement("div", { id: "gameScreen", style: this.state.screenStyle, onLoad: function () { _this.onLoadPage(); } },
                React.createElement(ninja_1.NinjaChar, { imgAlt: "Running Ninja", width: this.ninja.size * this.UL, x: this.state.ninjaStat.ninjaX, y: this.state.ninjaStat.ninjaY, boolLeft: this.state.ninjaStat.left }),
                React.createElement(RenderObjs, { game: this })),
            React.createElement("b", null,
                React.createElement(RenderScreenBottom, { onClickButton: this.onClickButton.bind(this), onMouseUp: this.onMouseUp.bind(this), terminalPC: this.terminalPC, UL: this.UL, lang: this.props.language }))));
    };
    return Page2;
}(React.Component));
exports.Page2 = Page2;
exports.default = Page2;
function RenderObjs(props) {
    var objList = [];
    for (var key in props.game.objs) {
        objList.push(React.createElement(obj_1.Obj, { key: key, obj: props.game.objs[key], UL: props.game.UL, game: props.game }));
    }
    return React.createElement("span", null, objList);
}
function RenderScreenBottom(props) {
    var UL = props.UL;
    //画面下部のボタンなどの表示の出し分け
    if (props.terminalPC) {
        var styleDivPcMessage = {
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
        var styleTextPcMessage = {
            fontSize: "xx-large",
            color: "white",
        };
        if (props.lang === "Japanese") {
            return (React.createElement("div", { style: styleDivPcMessage },
                React.createElement("span", { style: styleTextPcMessage }, "PC\u3067\u306F\u3001\u30AD\u30FC\u30DC\u30FC\u30C9\u306E\u300C\u2190\u300D\u300C\u2191\u300D\u300C\u2192\u300D\u30AD\u30FC\u3067\u64CD\u4F5C\u3092\u3057\u3066\u304F\u3060\u3055\u3044\u3002")));
        }
        else {
            return (React.createElement("div", { style: styleDivPcMessage },
                React.createElement("span", { style: styleTextPcMessage }, "Please use [\u2190], [\u2191], and [\u2192] keys to play!")));
        }
    }
    else {
        //スマホ・タブレットの場合、画面下部にボタンを表示
        return (React.createElement(RenderButtons, { onClickButton: props.onClickButton, onMouseUp: props.onMouseUp, UL: props.UL }));
    }
}
function RenderButtons(props) {
    var UL = props.UL;
    //ボタンがあるテーブルのスタイル
    var controllerStyle = {
        position: "absolute",
        top: 75 * UL,
        width: 160 * UL,
        zIndex: "99999999",
        backgroundColor: "black",
    };
    //左右のボタンのスタイル
    var sideButtonStyle = {
        width: 30 * UL,
        height: 15 * UL,
        fontSize: 4 * UL + "px",
        margin: "1px",
    };
    //ジャンプボタンのスタイル
    var jumpButtonStyle = {
        width: 100 * UL,
        height: 15 * UL,
        fontSize: 4 * UL,
        margin: "1px",
    };
    return (React.createElement("table", { id: "controller", style: controllerStyle },
        React.createElement("tbody", null,
            React.createElement("tr", null,
                React.createElement("td", { align: "right" },
                    React.createElement("button", { style: sideButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("left"); }, onTouchStart: function () { props.onClickButton("left"); }, onMouseUp: function () { props.onMouseUp("left"); }, onMouseOut: function () { props.onMouseUp("left"); }, onTouchEnd: function () { props.onMouseUp("left"); } }, "＜")),
                React.createElement("td", { align: "center" },
                    React.createElement("button", { style: jumpButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("jump"); }, onTouchStart: function () { props.onClickButton("jump"); }, onMouseUp: function () { props.onMouseUp("jump"); }, onMouseOut: function () { props.onMouseUp("jump"); }, onTouchEnd: function () { props.onMouseUp("jump"); } }, "↑　jump　↑")),
                React.createElement("td", { align: "left" },
                    React.createElement("button", { style: sideButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("right"); }, onTouchStart: function () { props.onClickButton("right"); }, onMouseUp: function () { props.onMouseUp("right"); }, onMouseOut: function () { props.onMouseUp("right"); }, onTouchEnd: function () { props.onMouseUp("right"); } }, "＞"))))));
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
// 巻物を開くためのトリガーに触った際のタッチ関数
//=======================================
function onTouchScrollOpener(ninja) {
    if (ninja.game.props.readElementScroll.indexOf(this.openTargetTitle) < 0) {
        //まだターゲットの巻物が読まれていない（ステージ遷移の度にリセット）
        var objs = ninja.game.objs;
        for (var key in objs) {
            if (objs[key].title !== this.openTargetTitle && objs[key].scroll) {
                //表示が被らないように、他の巻物を消す
                objs[key].visible = false;
            }
            else if (objs[key].title === this.openTargetTitle) {
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
    }
    else if (from === "right") {
        //右から
        ninja.posX = this.posX + this.size;
        ninja.speedX = 0;
    }
    else if (from === "lower") {
        //下から
        ninja.posY = this.posY + this.size;
        ninja.speedY = 0;
    }
    else if (from === "left") {
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
// 右向きにに流れる川へのタッチ関数
//=======================================
function onTouchRiverToRight(ninja) {
    if (ninja.readScroll.indexOf(ninja.game.consts.WATER_SCROLL_TITLE) < 0) {
        //水の書を読んでいなければ、流される
        ninja.posX += 10;
        ninja.posY = this.posY - ninja.size;
        ninja.speedX = 30;
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
    }
    else {
        //左から
        ninja.posX = 0;
        ninja.speedX = 0;
        ninja.speedY = 0;
    }
    this.changeStage(this.next, ninja);
    return "changed";
}
//=======================================
// 別ステージへのゲートのタッチ関数（ステージ11から水路に戻る場合）
//=======================================
function onTouchGateWallStage11(ninja, from) {
    if (from === "left") {
        //左から
        ninja.posX = 0;
        ninja.posY = 60;
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
    }
    else if (from === "lower") {
        //下から
        ninja.posY += 70 - ninja.size;
        ninja.speedX = 0;
        ninja.speedY = -15;
    }
    this.changeStage(this.next, ninja);
    return "changed";
}
//=======================================
// 炎にタッチ
//=======================================
function onTouchFire(ninja) {
    if (this.fireContinueTime && this.visible !== true) {
        //時間制限付きの火でありながら、不可視となっている場合はジャンプしない
        return;
    }
    if (ninja.readScroll.indexOf(ninja.game.consts.FIRE_SCROLL_TITLE) > 0) {
        //火の書を読んでいればジャンプする
        ninja.speedY = this.jumpHeight * (-1);
    }
}
//=======================================
// 地蔵にタッチ
//=======================================
function onTouchJizo(ninja) {
    var objs = ninja.game.objs;
    for (var key in objs) {
        if (objs[key].fireContinueTime) {
            //fireContinueTimeを持っている要素を表示する
            objs[key].visible = true;
        }
    }
}
