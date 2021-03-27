import * as React from "react";
import { appsPublicImg, gameStorage } from "../../../common/consts";
import { Ninja } from "../../Games/NinjaGame2";
import { NinjaChar } from "./objs/ninja/ninja";
import { Obj } from "./objs/obj";

//オブジェクト素材画像----------------

//岩
const imgRock = `${gameStorage}ninja1/objs/rock.png`;
//岩（上下反転）
const imgRockR = `${gameStorage}ninja1/objs/rockRiverse.png`;
//ポチ
const imgPochi = `${gameStorage}ninja1/objs/pochi.png`;
//閉じている巻物
const imgScroll = `${gameStorage}ninja1/objs/scrollObj.png`;
//開いている巻物
const imgScrollOpen = `${gameStorage}ninja1/objs/scrollOpen.png`;
//シノ（先輩くのいち）
const imgShino = `${gameStorage}ninja1/objs/shino.png`;
//屋敷（屋根）
const imgHouse1 = `${gameStorage}ninja2/objs/house.png`;
//悪忍者
const imgBadNinja = `${appsPublicImg}ninja_bad.png`;
//鷲
const imgWashi = `${gameStorage}ninja2/objs/washi.png`;
//木箱
const imgBox1 = `${gameStorage}ninja2/objs/box.jpg`;
//レンガ
const imgBlock1 = `${gameStorage}ninja2/objs/block.jpg`;
//カニ
const imgKani = `${gameStorage}ninja2/objs/kani.png`;
//フグ
const imgFugu = `${gameStorage}ninja2/objs/fugu.png`;
//海藻
const imgKaisou = `${gameStorage}ninja2/objs/kaisou.png`;
//デカい魚
const imgKimme = `${gameStorage}ninja2/objs/onikinme.png`;
//FireBall
const imgFireBallR = `${gameStorage}ninja2/objs/fireBallR.png`;
//扉
const imgDoor = `${gameStorage}ninja2/objs/tobira.jpg`;
//木のブロック
const imgWoodenBlock = `${gameStorage}ninja2/objs/woodenBox.jpg`;
//鍵
const imgKey = `${gameStorage}ninja2/objs/kagi.png`;
//はしご
const imgHashigo = `${gameStorage}ninja2/objs/hashigo_wood.png`;
//一つ目
const imgOneEye = `${gameStorage}ninja2/objs/hitotsume.png`;
//青い火の玉
const imgBlueFire = `${gameStorage}ninja2/objs/hinotama.png`;
//鬼
const imgOni = `${gameStorage}ninja2/objs/oni.png`;
//ボス
const imgBoss = `${gameStorage}ninja2/objs/badDog.png`;
//コウモリ
const imgBat = `${gameStorage}ninja2/objs/bat.png`;
//看板
const imgKanban1 = `${gameStorage}ninja1/objs/kanban1.png`;
//看板の矢印
const imgArrow1 = `${gameStorage}ninja1/objs/arrow1.png`;
//鳥居
const imgTorii = `${gameStorage}ninja1/objs/torii.png`;

//背景画像//---------------------------

//stage1
const stage1 = `${gameStorage}ninja2/background/castle1.jpg`;
//stage2
const stage2 = `${gameStorage}ninja2/background/whiteWall.jpg`;
//stage3
const stage3 = `${gameStorage}ninja2/background/whiteWall2.jpg`;
//stage4
const stage4 = `${gameStorage}ninja2/background/whiteWall3.jpg`;
//stage5
const stage5 = `${gameStorage}ninja2/background/waterCastle.jpg`;
//stage6～8
const inWater = `${gameStorage}ninja2/background/rockWall.jpg`;
//stage9
const stage9 = `${gameStorage}ninja2/background/furo.jpg`;
//stage10
const stage10 = `${gameStorage}ninja2/background/datsuiJo.jpg`;
//stage11～13
const twoLayer = `${gameStorage}ninja2/background/washitsu.jpg`;
//stage14
const stage14 = `${gameStorage}ninja2/background/wa1.jpg`;
//stage15
const stage15 = `${gameStorage}ninja2/background/soto.jpg`;
//stage16
const stage16 = `${gameStorage}ninja2/background/wa2.jpg`;
//stage17
const stage17 = `${gameStorage}ninja2/background/wa3.jpg`;
//stage18
const stage18 = `${gameStorage}ninja2/background/wa4.jpg`;
//stage19
const stage19 = `${gameStorage}ninja2/background/boss.jpg`;
//stage19（クリア後）
const stage19a = `${gameStorage}ninja2/background/afterBoss.jpg`;
//stage20
const stage20 = `${gameStorage}ninja2/background/wa5.jpg`;

export default class Page2 extends React.Component {
    props: any;
    state: any;

    terminalPC?: boolean;
    lang: any;
    prevStage?: number;
    UL?: number;
    ninja: any;
    readElementScroll: any;
    objOutOfScreen: any;
    objWalls: any;
    objFloor: any;
    backgroundSetting: any;
    consts: any;
    lButton?: boolean;
    rButton?: boolean;
    jButton?: boolean;
    timerId: any;
    objs: any;
    closeScroll?: boolean;
    closeButton?: boolean;
    pageStyle: any;
    bgImg: any;

    UNSAFE_componentWillMount() {
        //(PC) or (スマホ/タブレット) 判定
        this.terminalPC = this.checkTerminalPC();

        //ゲームオーバー画面に送信するための言語情報
        this.lang = this.props.language;

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

                //屋根の上でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "あれが敵の城じゃ！",
                POCHI_SCROLL_MESSAGE:
                    "今回のお主の任務は、敵の城に忍び込み、\n" +
                    "敵の忍者の長を倒すことである。\n" +
                    "敵の手下捕まるでないぞ！検討を祈る！",

                //水辺でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "水路を使うがよい",
                POCHI_SCROLL2_MESSAGE:
                    "敵の城に忍び込むには、地下水路を使うのが良さそうじゃ。\n" +
                    "水中では [jump]ボタン を何度も押すことで、浮上できるぞ。\n" +
                    "さらに「火遁」は水中でも使える！検討を祈る！",

                //ボス部屋前でポチに触った時のメッセージ
                POCHI_SCROLL3_TITLE: "敵のボスはすぐそこじゃ！",
                POCHI_SCROLL3_MESSAGE:
                    "敵のボスに炎を当てればお主の勝ちじゃ！\n" +
                    "[<]ボタン と [>]ボタン を押しっぱなしにして\n" +
                    "火を吹いている間は、奴の手下どもの攻撃を受けないぞ！",

                //全クリ時にポチに触った時のメッセージ
                POCHI_SCROLL4_TITLE: "よくやった！",
                POCHI_SCROLL4_MESSAGE:
                    "ついにやつを倒したな！\n" +
                    "お主ももう、立派な忍者じゃ。\n" +
                    "これが敵の秘伝の巻物である。",

                //火遁の巻物
                FIRE_SCROLL_TITLE: "火遁",
                FIRE_SCROLL_MESSAGE:
                    "火遁の術を学ぶための巻物。\n" +
                    "[<]ボタン と [>]ボタン を同時に押すことで、火の玉を飛ばせるぞ。\n" +
                    "敵に当てることで、敵を倒すことができる！",

                //階段のシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "調子はどう？",
                SHINO_SCROLL_MESSAGE:
                    "貴方も火遁が使えるようになったのね。\n" +
                    "木の箱を見付けたら、炎をぶつけてみると良いわ。\n" +
                    "箱を壊して、中身を確認することができるわ。",

                //風呂場でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "鍵が必要なようね。",
                SHINO_SCROLL2_MESSAGE:
                    "城に入るための扉には鍵がかかっているわ。\n" +
                    "確か水の中で鍵を見た気がするけど…\n" +
                    "あなた、水路で鍵を拾ったりした？",

                //扉の部屋でシノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "鍵がかかっているわね...",
                SHINO_SCROLL3_MESSAGE:
                    "２つの扉の鍵は、この城のどこかにあるはず…\n" +
                    "扉を開けてあの箱を燃やせれば、はしごを登れそうね。\n" +
                    "敵のボスの部屋はすぐそこよ！",

                //水中のカギに触った時のメッセージ
                KEY_SCROLL_TITLE: "浴場の鍵",
                KEY_SCROLL_MESSAGE:
                    "城の風呂場の鍵を手に入れた！\n" +
                    "城に侵入する際に使おう！\n" +
                    "なくすでないぞ！",

                //鬼が守るカギに触った時のメッセージ
                KEY2_SCROLL_TITLE: "ボスの部屋の鍵",
                KEY2_SCROLL_MESSAGE:
                    "敵のボスがいる部屋への扉を開ける鍵。\n" +
                    "２つの鍵が必要。",

                //屋根裏のカギに触った時のメッセージ
                KEY3_SCROLL_TITLE: "ボス部屋の鍵",
                KEY3_SCROLL_MESSAGE:
                    "敵のボスの部屋への扉を通るための鍵。\n" +
                    "２つの鍵を集めると、ボスの部屋に入れる。",

                //最後の巻物に触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "おめでとう！",
                KOSUKE_SCROLL_MESSAGE:
                    "クリアおめでとう！\n" +
                    "これで君も立派な忍者だ！\n" +
                    "次の章では、雪山の村を救おう！",
            };
        } else {
            this.consts = {
                timeStep: 100,

                //操作ボタン
                BUTTON: "btn btn-info btn-lg btn-block",

                //屋根の上でポチに触った時のメッセージ
                POCHI_SCROLL_TITLE: "Sneak into the enemy's castle!",
                POCHI_SCROLL_MESSAGE:
                    "Can you see the enemy's castle!?\n" +
                    "Your mission is to sneak into the castle, and steal the secret scroll!\n" +
                    "Don't touch the enemy! Good luck!",

                //水辺でポチに触った時のメッセージ
                POCHI_SCROLL2_TITLE: "Go under the water!",
                POCHI_SCROLL2_MESSAGE:
                    "Best way to sneak into the castle is by going under the water!\n" +
                    "In the water, you can swim by pushing [jump] button many times!\n" +
                    "Don't touch the enemy! Good luck!",

                //ボス部屋前でポチに触った時のメッセージ
                POCHI_SCROLL3_TITLE: "The boss is there!",
                POCHI_SCROLL3_MESSAGE:
                    "If your fire hits the Boss, you will win!\n" +
                    "While using fire pushing [<] button and [>] button,\n" +
                    "enemies cannot touch you! Good luck!",

                //全クリ時にポチに触った時のメッセージ
                POCHI_SCROLL4_TITLE: "You did it!",
                POCHI_SCROLL4_MESSAGE:
                    "You defeated the enemy!\n" +
                    "You have become such a strong Ninja!\n" +
                    "That is the enemy's secret scroll. Take it!",

                //火遁の巻物
                FIRE_SCROLL_TITLE: "火遁",
                FIRE_SCROLL_MESSAGE:
                    "This is the scroll to learn 'Fire Ball'.\n" +
                    "Push [<] button and [>] button at the same time.\n" +
                    "You can defeat the enemy using Fire Ball.",

                //階段のシノに触った時のメッセージ
                SHINO_SCROLL_TITLE: "Hello!",
                SHINO_SCROLL_MESSAGE:
                    "Now, you can use Fire Ball.\n" +
                    "When you find a wooden box, you should use fire.\n" +
                    "It will burn the box, and you can see what's inside.",

                //風呂場でシノに触った時のメッセージ
                SHINO_SCROLL2_TITLE: "Do you have the key?",
                SHINO_SCROLL2_MESSAGE:
                    "The door is locked!\n" +
                    "I think I saw the key in the water.\n" +
                    "Did you find the key?",

                //扉の部屋でシノに触った時のメッセージ
                SHINO_SCROLL3_TITLE: "The doors are locked...",
                SHINO_SCROLL3_MESSAGE:
                    "The keys for these two doors must be in this castle!\n" +
                    "The boss's room is just there. We need two keys!\n" +
                    "You should burn the wooden boxes to climb the ladder.",

                //水中のカギに触った時のメッセージ
                KEY_SCROLL_TITLE: "Key to the bath room",
                KEY_SCROLL_MESSAGE:
                    "You got the key of the bath room!\n" +
                    "You will use this to enter the castle.\n" +
                    "Don't lose it!",

                //鬼が守るカギに触った時のメッセージ
                KEY2_SCROLL_TITLE: "Key of the Boss's room",
                KEY2_SCROLL_MESSAGE:
                    "This is the key to the Boss's room.\n" +
                    "To enter the Boss's room, you need to collect two keys!",

                //屋根裏のカギに触った時のメッセージ
                KEY3_SCROLL_TITLE: "Key to enter the boss's room!",
                KEY3_SCROLL_MESSAGE:
                    "This is the key to the Boss's room.\n" +
                    "To enter the Boss's room, you need to collect two keys!",

                //最後の巻物に触った時のメッセージ
                //天界でコウスケに触った時のメッセージ
                KOSUKE_SCROLL_TITLE: "Congratulations!",
                KOSUKE_SCROLL_MESSAGE:
                    "You completed the game!\n" +
                    "In the next chapter,\n" +
                    "save the village in the snowy mountain!",
            };
        }

        // ------------------------------------------------------------
        // ステート初期設定
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

        //←ボタン押下判定　初期値
        this.lButton = false;
        //→ボタン押下判定　初期値
        this.rButton = false;
        //jumpボタン押下判定　初期値
        this.jButton = false;

        //キーボード押下時イベントセット
        this.setKeyboardEvent(this);

        //タイムステップ毎に処理を呼び出す
        this.timerId = setInterval(() => {
            //タイムステップごとの計算

            /* ↓　物体速度・位置計算　↓ */

            //ボタン押下判定
            if (this.lButton === false && this.rButton === false) {
                this.ninja.speedX = 0;
            } else {
                if (this.lButton === true && this.rButton === true) {
                    //右と左同時押しでファイヤーボール
                    if (
                        this.ninja.readScroll.indexOf(
                            this.ninja.game.consts.FIRE_SCROLL_TITLE
                        ) >= 0
                    ) {
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
                        };
                        this.ninja.fireBallCount++;
                    }
                } else {
                    if (this.lButton === true) {
                        this.ninja.speedX = this.ninja.inWater ? -3 : -6;
                        this.ninja.boolLeft = true; //画像左向き
                    } else if (this.rButton === true) {
                        this.ninja.speedX = this.ninja.inWater ? 3 : 6;
                        this.ninja.boolLeft = false; //画像右向き
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
                if (this.ninja.inWater) {
                    //水中
                    if (this.ninja.posY > -10) {
                        //2段ジャンプ実行限界高度に達していない
                        this.ninja.speedY = -7;
                    }
                }
                this.jButton = false;
            }

            if (this.closeButton === true) {
                //巻物を閉じる（Enterキー等押下時）
                this.closeScroll = true;
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
                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
                    }
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
                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
                    }
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
                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
                    }
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
                    //ステージ遷移をしていたら、関数中止
                    if (stageChangedFlag && stageChangedFlag === "changed") {
                        return;
                    }
                    stageChangedFlag = this.objs[key].onTouch(
                        this.ninja,
                        "left"
                    );
                }

                //ステージ遷移をしていたら、関数中止
                if (stageChangedFlag && stageChangedFlag === "changed") {
                    return;
                }

                //各タイムステップごとの処理を持っていれば、実行する
                if (this.objs[key].eachTime) {
                    this.objs[key].eachTime(this.ninja, key);
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
                    left: this.ninja.boolLeft,
                    ninjaX: this.ninja.posX * this.UL,
                    ninjaY: this.ninja.posY * this.UL,
                },
            });
        }, this.consts.timeStep);
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
        let pageWidth, pageHeight;
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

        return { pageWidth: pageWidth, pageHeight: pageHeight };
    }
    //---------------↑　resize　↑---------------

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
                };
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
                };
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
                        size: 11,
                        posX: 0,
                        posY: 0,
                        speedX: 2,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    washi2: {
                        size: 11,
                        posX: -40,
                        posY: -60,
                        speedX: 2,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    washi3: {
                        size: 11,
                        posX: 0,
                        posY: -100,
                        speedX: 2,
                        speedY: 1,
                        zIndex: 20,
                        img: imgWashi,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                };
                //ステージの背景画像を設定
                this.bgImg = stage3;
            } else if (this.props.stage === 4) {
                // ------------------------------------------------------------
                // ステージ4 (岩に隠れた忍者たち)
                // ------------------------------------------------------------
                this.objs = {
                    ...this.objOutOfScreen,
                    ...this.objWalls,
                    ...getHoleFloor(80, 130),

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
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                };
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
                };
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

                    ...getKeys(
                        this.ninja,
                        120,
                        20,
                        20,
                        this.consts.KEY_SCROLL_TITLE
                    ),

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
                    ...getBlocks(
                        10,
                        [
                            [6, 0],
                            [7, 0],
                            [8, 0],
                            [9, 0],
                            [10, 0],
                            [6, 1],
                            [7, 1],
                            [8, 1],
                            [9, 1],
                            [10, 1],
                            [6, 2],
                            [7, 2],
                            [8, 2],
                            [9, 2],
                            [10, 2],
                            [10, 3],
                            [11, 3],
                            [12, 3],
                            [13, 3],
                            [14, 3],
                            [15, 3],
                            [16, 3],
                            [10, 4],
                            [11, 4],
                            [12, 4],
                            [13, 4],
                            [14, 4],
                            [15, 4],
                            [16, 4],
                            [2, 5],
                            [3, 5],
                            [4, 5],
                            [5, 5],
                            [6, 5],
                            [7, 5],
                            [10, 5],
                            [11, 5],
                            [12, 5],
                            [13, 5],
                            [14, 5],
                            [15, 5],
                            [16, 5],
                            [2, 6],
                            [3, 6],
                            [4, 6],
                            [5, 6],
                            [6, 6],
                            [7, 6],
                            [1, 7],
                            [0, 7],
                            [2, 7],
                            [3, 7],
                            [4, 7],
                            [5, 7],
                            [6, 7],
                            [7, 7],
                        ],
                        onTouchBlock,
                        imgBlock1,
                        23
                    ),

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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [15, -1],
                            [16, -1],
                            [15, 0],
                            [16, 0],
                            [14, 1],
                            [15, 1],
                            [16, 1],
                            [12, 2],
                            [13, 2],
                            [14, 2],
                            [15, 2],
                            [16, 2],
                            [-1, 3],
                            [0, 3],
                            [1, 3],
                            [2, 3],
                            [3, 3],
                            [4, 3],
                            [5, 3],
                            [6, 3],
                            [7, 3],
                            [8, 3],
                            [9, 3],
                            [10, 3],
                            [11, 3],
                            [12, 3],
                            [13, 3],
                            [14, 3],
                            [15, 3],
                            [16, 3],
                            [-1, 4],
                            [0, 4],
                            [1, 4],
                            [2, 4],
                            [3, 4],
                            [4, 4],
                            [5, 4],
                            [6, 4],
                            [7, 4],
                            [15, 4],
                            [16, 4],
                            [-1, 5],
                            [0, 5],
                            [1, 5],
                        ],
                        onTouchBlock,
                        imgBlock1,
                        23
                    ),

                    kani1: {
                        size: 17,
                        posX: 80,
                        posY: 65,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 20,
                        img: imgKani,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    fugu1: {
                        size: 20,
                        posX: 160,
                        posY: 0,
                        speedX: 0.5,
                        speedY: 0.5,
                        zIndex: 24,
                        img: imgFugu,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    fugu2: {
                        size: 20,
                        posX: 70,
                        posY: 50,
                        speedX: 0.5,
                        speedY: 0.5,
                        zIndex: 24,
                        img: imgFugu,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },
                    kaisou1: {
                        size: 9,
                        posX: 90,
                        posY: 61,
                        zIndex: 19,
                        img: imgKaisou,
                        onTouch: onTouchNothing,
                    },
                    kaisou2: {
                        size: 9,
                        posX: 112,
                        posY: 61,
                        zIndex: 19,
                        img: imgKaisou,
                        onTouch: onTouchNothing,
                    },
                    kaisou3: {
                        size: 9,
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [-1, -2],
                            [0, -2],
                            [3, -2],
                            [4, -2],
                            [5, -2],
                            [6, -2],
                            [7, -2],
                            [8, -2],
                            [9, -2],
                            [10, -2],
                            [11, -2],
                            [12, -2],
                            [13, -2],
                            [14, -2],
                            [15, -2],
                            [16, -2],
                            [-1, -1],
                            [0, -1],
                            [3, -1],
                            [4, -1],
                            [5, -1],
                            [6, -1],
                            [7, -1],
                            [8, -1],
                            [9, -1],
                            [10, -1],
                            [11, -1],
                            [12, -1],
                            [13, -1],
                            [14, -1],
                            [15, -1],
                            [16, -1],
                            [-1, 0],
                            [0, 0],
                            [3, 0],
                            [4, 0],
                            [5, 0],
                            [6, 0],
                            [7, 0],
                            [8, 0],
                            [9, 0],
                            [10, 0],
                            [11, 0],
                            [12, 0],
                            [13, 0],
                            [14, 0],
                            [15, 0],
                            [16, 0],
                            [-1, 1],
                            [0, 1],
                            [-1, 2],
                            [0, 2],
                            [-1, 3],
                            [0, 3],
                            [1, 3],
                            [2, 3],
                            [3, 3],
                            [4, 3],
                            [5, 3],
                            [6, 3],
                            [7, 3],
                            [8, 3],
                            [9, 3],
                            [10, 3],
                            [11, 3],
                            [11.5, 3.5],
                            [-1, 4],
                            [0, 4],
                            [1, 4],
                            [2, 4],
                            [3, 4],
                            [4, 4],
                            [5, 4],
                            [6, 4],
                            [7, 4],
                            [8, 4],
                            [9, 4],
                            [10, 4],
                            [11, 4],
                        ],
                        onTouchBlock,
                        imgBlock1,
                        23
                    ),

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
                        size: 17,
                        posX: 80,
                        xMin: 10,
                        xMax: 95,
                        posY: 20,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 19,
                        img: imgKani,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                };
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [12, 2],
                            [13, 2],
                            [14, 2],
                            [15, 2],
                            [16, 2],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    enemy1: {
                        size: 13,
                        posX: 104,
                        xMax: 104,
                        posY: 60,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [-2, -1],
                            [-1, -1],
                            [0, -1],
                            [1, -1],
                            [2, -1],
                            [3, -1],
                            [4, -1],
                            [5, -1],
                            [6, -1],
                            [7, -1],
                            [8, -1],
                            [9, -1],
                            [10, -1],
                            [11, -1],
                            [12, -1],
                            [13, -1],
                            [14, -1],
                            [15, -1],
                            [16, -1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [1, 2],
                            [2, 2],
                            [3, 2],
                            [4, 2],
                            [5, 2],
                            [6, 2],
                            [8, 2],
                            [9, 2],
                            [10, 2],
                            [11, 2],
                            [12, 2],
                            [13, 2],
                            [14, 2],
                            [15, 2],
                            [16, 2],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    enemy1: {
                        size: 13,
                        posX: 75,
                        posY: 60,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBadNinja,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
                    },

                    bat1: {
                        size: 13,
                        posX: 75,
                        posY: 0,
                        speedX: 0.7,
                        speedY: 1,
                        zIndex: 31,
                        img: imgBat,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [-2, -1],
                            [-1, -1],
                            [0, -1],
                            [1, -1],
                            [2, -1],
                            [3, -1],
                            [4, -1],
                            [5, -1],
                            [6, -1],
                            [7, -1],
                            [8, -1],
                            [9, -1],
                            [10, -1],
                            [11, -1],
                            [14, -1],
                            [15, -1],
                            [16, -1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [1, 2],
                            [2, 2],
                            [3, 2],
                            [4, 2],
                            [5, 2],
                            [6, 2],
                            [7, 2],
                            [8, 2],
                            [9, 2],
                            [10, 2],
                            [11, 2],
                            [12, 2],
                            [13, 2],
                            [14, 2],
                            [15, 2],
                            [16, 2],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    oni1: {
                        size: 19,
                        posX: 75,
                        posY: 57,
                        speedX: 0.7,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOni,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeEnemy,
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
                        nextX: 5,
                        nextY: 62,
                        nextLeft: false,
                        next: 14,
                        changeStage: this.props.changeStage,
                    },
                };
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
                    ...getBlocks(
                        10,
                        [
                            [-2, -1],
                            [-1, -1],
                            [0, -1],
                            [1, -1],
                            [2, -1],
                            [3, -1],
                            [4, -1],
                            [5, -1],
                            [6, -1],
                            [9, -1],
                            [10, -1],
                            [11, -1],
                            [12, -1],
                            [13, -1],
                            [14, -1],
                            [15, -1],
                            [16, -1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [1, 2],
                            [2, 2],
                            [3, 2],
                            [4, 2],
                            [6, 2],
                            [7, 2],
                            [8, 2],
                            [9, 2],
                            [10, 2],
                            [11, 2],
                            [12, 2],
                            [13, 2],
                            [14, 2],
                            [15, 2],
                            [16, 2],
                            [13, 7],
                            [14, 7],
                            [15, 7],
                            [16, 7],
                            [17, 7],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    hitotsume1: {
                        size: 12,
                        posX: 110,
                        posY: 7,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOneEye,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeOneEye,
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [1, -0.5],
                            [2, -0.5],
                            [3, -0.5],
                            [4, -0.5],
                            [5, -0.5],
                            [6, -0.5],
                            [7, -0.5],
                            [8, -0.5],
                            [9, -0.5],
                            [10, -0.5],
                            [13, -0.5],
                            [14, -0.5],
                            [-2, 0],
                            [-1, 0],
                            [0, 0],
                            [15, 0],
                            [16, 0],
                            [-2, 0],
                            [-1, 0],
                            [0, 0],
                            [15, 0],
                            [16, 0],
                            [-2, 1],
                            [-1, 1],
                            [0, 1],
                            [15, 1],
                            [16, 1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [15, 2],
                            [16, 2],
                            [-2, 3],
                            [-1, 3],
                            [0, 3],
                            [15, 3],
                            [16, 3],
                            [-2, 4],
                            [-1, 4],
                            [0, 4],
                            [15, 4],
                            [16, 4],
                            [15, 5],
                            [16, 5],
                            [15, 6],
                            [16, 6],
                            [-2, 7],
                            [-1, 7],
                            [0, 7],
                            [1, 7],
                            [2, 7],
                            [3, 7],
                            [4, 7],
                            [5, 7],
                            [6, 7],
                            [7, 7],
                            [8, 7],
                            [9, 7],
                            [10, 7],
                            [11, 7],
                            [12, 7],
                            [13, 7],
                            [14, 7],
                            [15, 7],
                            [16, 7],

                            [11.5, 2],
                            [6, 3],
                            [9, 3],
                            [3, 5],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    hitotsume1: {
                        size: 12,
                        posX: 116,
                        posY: 8,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgOneEye,
                        onTouch: onTouchEnemy,
                        enemy: true,
                        eachTime: eachTimeOneEye,
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
                    leftGate: {
                        size: 300,
                        posX: -305,
                        posY: -10,
                        zIndex: 30,
                        next: 12,
                        onTouch: onTouchStageChangeCommon,
                        nextX: 125,
                        nextY: 0,
                        nextLeft: true,
                        changeStage: this.props.changeStage,
                    },
                };
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
                    },

                    ...getKeys(
                        this.ninja,
                        107,
                        57,
                        20,
                        this.consts.KEY3_SCROLL_TITLE
                    ),
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [-2, -1],
                            [-1, -1],
                            [0, -1],
                            [1, -1],
                            [2, -1],
                            [2, 0],
                            [2, 1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [1, 2],
                            [2, 2],

                            [14, 2],
                            [15, 2],
                            [16, 2],
                            [17, 2],
                            [13, 3],
                            [14, 3],
                            [15, 3],
                            [16, 3],
                            [17, 3],
                            [12, 4],
                            [13, 4],
                            [14, 4],
                            [15, 4],
                            [16, 4],
                            [17, 4],
                            [11, 5],
                            [12, 5],
                            [13, 5],
                            [14, 5],
                            [15, 5],
                            [16, 5],
                            [17, 5],
                            [10, 6],
                            [11, 6],
                            [12, 6],
                            [13, 6],
                            [14, 6],
                            [15, 6],
                            [16, 6],
                            [17, 6],
                            [-2, 7],
                            [-1, 7],
                            [0, 7],
                            [1, 7],
                            [2, 7],
                            [3, 7],
                            [4, 7],
                            [5, 7],
                            [6, 7],
                            [7, 7],
                            [8, 7],
                            [9, 7],
                            [10, 7],
                            [11, 7],
                            [12, 7],
                            [13, 7],
                            [14, 7],
                            [15, 7],
                            [16, 7],
                            [17, 7],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

                    oni1: {
                        size: 58,
                        posX: 70,
                        posY: 20,
                        speedX: 1.2,
                        speedY: 0,
                        zIndex: 30,
                        img: imgOni,
                        onTouch: onTouchBlock,
                        enemy: true,
                        eachTime: eachTimeKimme,
                    },

                    ...getKeys(
                        this.ninja,
                        147,
                        10,
                        20,
                        this.consts.KEY2_SCROLL_TITLE
                    ),
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
                };
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
                    ...getBlocks(
                        10,
                        [
                            [1, -0.5],
                            [2, -0.5],
                            [3, -0.5],
                            [4, -0.5],
                            [5, -0.5],
                            [6, -0.5],
                            [7, -0.5],
                            [8, -0.5],
                            [9, -0.5],
                            [10, -0.5],
                            [1, 0.4],
                            [2, 0.4],
                            [3, 0.4],
                            [4, 0.4],
                            [5, 0.4],
                            [6, 0.4],
                            [7, 0.4],
                            [-2, 0],
                            [-1, 0],
                            [0, 0],
                            [15, 0],
                            [16, 0],
                            [10, 0],
                            [-2, 1],
                            [-1, 1],
                            [0, 1],
                            [15, 1],
                            [16, 1],
                            [10, 1],
                            [-2, 2],
                            [-1, 2],
                            [0, 2],
                            [15, 2],
                            [16, 2],
                            [10, 2],
                            [-2, 3],
                            [-1, 3],
                            [0, 3],
                            [15, 3],
                            [16, 3],
                            [10, 3],
                            [-2, 4],
                            [-1, 4],
                            [0, 4],
                            [15, 4],
                            [16, 4],
                            [-2, 5],
                            [-1, 5],
                            [0, 5],
                            [15, 5],
                            [16, 5],
                            [-2, 6],
                            [-1, 6],
                            [0, 6],
                            [15, 6],
                            [16, 6],
                            [-2, 7],
                            [-1, 7],
                            [0, 7],
                            [3, 7],
                            [4, 7],
                            [5, 7],
                            [6, 7],
                            [7, 7],
                            [8, 7],
                            [9, 7],
                            [10, 7],
                            [11, 7],
                            [12, 7],
                            [13, 7],
                            [14, 7],
                            [15, 7],
                            [16, 7],

                            [-2, 3.7],
                            [-1, 3.7],
                            [0, 3.7],
                            [1, 3.7],
                            [2, 3.7],
                            [5, 3.7],
                            [6, 3.7],
                            [7, 3.7],
                            [8, 3.7],
                            [9, 3.7],
                            [10, 3.7],

                            [4, 6],
                        ],
                        onTouchBlock,
                        imgWoodenBlock,
                        23
                    ),

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
                };
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

                    pochi: {
                        size: 10,
                        posX: 73,
                        posY: 62,
                        zIndex: 20,
                        img: imgPochi,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL3_TITLE,
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
                        title: this.consts.POCHI_SCROLL3_TITLE,
                        message: this.consts.POCHI_SCROLL3_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgPochi,
                    },

                    kanban1Pic: {
                        size: 20,
                        posX: 130,
                        posY: 60,
                        zIndex: 10,
                        img: imgKanban1,
                        onTouch: onTouchNothing,
                    },
                    kanban1ArrowPic: {
                        size: 10,
                        posX: 135,
                        posY: 63,
                        boolLeft: false,
                        zIndex: 11,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    },

                    rightGateWall: {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 19,
                        onTouch: onTouchGateWall,
                        changeStage: this.props.changeStage,
                    },
                };
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

                    boss: {
                        size: 12,
                        posX: 72,
                        posY: 4,
                        speedX: 2,
                        speedY: 0,
                        zIndex: 19,
                        img: imgBoss,
                        onTouch: onTouchEnemy,
                        changeStage: this.props.changeStage,
                        enemy: true,
                        eachTime: eachTimeBoss,
                    },

                    toriiPic: {
                        size: 120,
                        posX: 17,
                        posY: 3,
                        zIndex: 0,
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

                    //バグで床が抜けたとき用
                    bottomGate1: {
                        size: 300,
                        posX: -70,
                        posY: 90,
                        zIndex: 30,
                        onTouch: onTouchEnemy,
                    },
                    bottomGate2: {
                        size: 1160,
                        posX: -500,
                        posY: 150,
                        zIndex: 30,
                        onTouch: onTouchEnemy,
                    },
                };
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

                    kosuke: {
                        size: 10,
                        posX: 85,
                        posY: 65,
                        zIndex: 17,
                        img: imgScroll,
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

                    pochi: {
                        size: 10,
                        posX: 53,
                        posY: 62,
                        zIndex: 20,
                        img: imgPochi,
                        onTouch: onTouchScrollOpener,
                        openTargetTitle: this.consts.POCHI_SCROLL4_TITLE,
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
                        title: this.consts.POCHI_SCROLL4_TITLE,
                        message: this.consts.POCHI_SCROLL4_MESSAGE,
                        fontSize: 3,
                        speakerImg: imgPochi,
                    },
                };
                //ステージの背景画像を設定
                this.bgImg = stage20;
            }

            this.prevStage = this.props.stage;

            //localStorageに自動セーブ
            const { game, ...rest } = this.ninja;
            const saveData = { ninja: rest, stage: this.props.stage };
            localStorage.setItem("saveData2", JSON.stringify(saveData));

            //背景画像の変更
            this.backgroundSetting.backgroundImage = `url(${this.bgImg})`;
        }

        return (
            <div id="Page2" style={this.pageStyle}>
                <div id="gameScreen" style={this.state.screenStyle}>
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
    //画面下部のボタンなどの表示の出し分け

    const UL = props.UL;

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

function RenderButtons(props: any) {
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
    let sideButtonStyle: any = {
        width: 30 * UL,
        height: 15 * UL,
        fontSize: 4 * UL + "px",
        margin: "1px",
    };
    //ジャンプボタンのスタイル
    let jumpButtonStyle: any = {
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

//当たり判定
function checkTouch(obj1: any, obj2: any) {
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
function getBlocks(
    size: number,
    arrPos: any,
    onTouch: any,
    imgBlock: any,
    zIndex: number
) {
    let objResult: any = {};

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

//鍵　生成関数
function getKeys(
    ninja: Ninja,
    posX: number,
    posY: number,
    zIndex: number,
    openTargetTitle: string
) {
    let objResult: any = {};

    if (ninja.readScroll.indexOf(openTargetTitle) < 0) {
        //まだ鍵を見付けていない場合のみ表示
        objResult["key"] = {
            size: 10,
            posX: posX,
            posY: posY,
            zIndex: zIndex,
            img: imgKey,
            onTouch: onTouchScrollOpener,
            openTargetTitle: openTargetTitle,
            boolLeft: true,
        };
    }
    return objResult;
}

//穴が開いた床　生成関数
function getHoleFloor(holeStart: number, holeEnd: number) {
    let objResult: any = {};

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
function onTouchScrollOpener(ninja: Ninja) {
    //@ts-ignore
    if (ninja.game.props.readElementScroll.indexOf(this.openTargetTitle) < 0) {
        //まだターゲットの巻物が読まれていない（ステージ遷移の度にリセット）

        let objs = ninja.game.objs;
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
    ninja.game.props.readElementScroll.push(this.openTargetTitle);
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
// 風呂場の鍵がかかったドアのタッチ関数
//=======================================
//@ts-ignore
function onTouchLockedDoor(ninja: Ninja, from: string) {
    //@ts-ignore
    if (ninja.readScroll.indexOf(this.keyName) < 0) {
        //鍵を持っていなければブロック
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
// 別ステージへのゲートのタッチ関数（stage1から下へ落ちる）
//=======================================
function onTouchGateTop1(ninja: Ninja, from: string) {
    if (from === "upper") {
        //上から
        ninja.posX = 145;
        ninja.posY = 0;
        ninja.speedY = 0;
        ninja.speedX = 0;
    }
    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（stage2等から上へ飛ばされる）
//=======================================
function onTouchGateTop2(ninja: Ninja, from: string) {
    //下から
    ninja.posX = 145;
    ninja.posY = -100;
    ninja.speedX = 0;
    ninja.speedY = 0;

    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 別ステージへのゲートのタッチ関数（汎用化したもの）
//=======================================
function onTouchStageChangeCommon(ninja: Ninja, from: string) {
    //@ts-ignore
    ninja.posX = this.nextX;
    //@ts-ignore
    ninja.posY = this.nextY;
    //@ts-ignore
    ninja.boolLeft = this.nextLeft;
    //@ts-ignore
    this.changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 敵に触ってゲームオーバー
//=======================================
function onTouchEnemy(ninja: Ninja) {
    if (!!ninja && !!ninja.game) {
        //ゲームを停止
        clearInterval(ninja.game.timerId);
        //ゲームオーバー画面へリダイレクト
        const url = "/game-over?g=ninja2&l=" + ninja.game.lang;
        setTimeout(() => {
            if (ninja.push) {
                ninja.push(url);
            } else {
                window.location.href = url;
            }
        }, 1000);
    }
}

//------------------------------------------------------------
//
//　　　　　タイムステップごとの関数
//
//------------------------------------------------------------

//=======================================
// 通常敵キャラ　タイムステップ毎
//=======================================
function eachTimeEnemy(ninja: Ninja, key: any) {
    //@ts-ignore
    if (this && this.enemy) {
        //敵の行動可能域計算
        //@ts-ignore
        if (this.xMax && this.posX > this.xMax) {
            //x最大値を超えている場合
            //@ts-ignore
            this.posX = this.xMax;
            return;
            //@ts-ignore
        } else if (this.xMin && this.posX < this.xMin) {
            //x最小値を超えている場合
            //@ts-ignore
            this.posX = this.xMin;
            return;
        }
        //@ts-ignore
        if (this.yMax && this.posY > this.yMax) {
            //y最大値を超えている場合
            //@ts-ignore
            this.posY = this.yMax;
            return;
            //@ts-ignore
        } else if (this.yMin && this.posY < this.yMin) {
            //y最小値を超えている場合
            //@ts-ignore
            this.posY = this.yMin;
            return;
        }

        //X軸について、忍者を追いかける
        //@ts-ignore
        if (this.speedX !== 0) {
            //@ts-ignore
            if (ninja.posX >= this.posX + this.size - ninja.size / 2) {
                //@ts-ignore
                this.posX += this.speedX;
                //@ts-ignore
                this.boolLeft = false;
                //@ts-ignore
            } else if (ninja.posX + ninja.size / 2 <= this.posX) {
                //@ts-ignore
                this.posX += this.speedX * -1;
                //@ts-ignore
                this.boolLeft = true;
            } else {
                //@ts-ignore
                this.posX += ninja.posX < this.posX ? -1 : 0;
                //@ts-ignore
                this.posX += ninja.posX > this.posX ? 1 : 0;
            }
        }
        //Y軸について、忍者を追いかける
        //@ts-ignore
        if (ninja.posY >= this.posY + this.size - ninja.size / 2) {
            //@ts-ignore
            this.posY += this.speedY;
            //@ts-ignore
        } else if (ninja.posY + ninja.size / 2 <= this.posY) {
            //@ts-ignore
            this.posY += this.speedY * -1;
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                //@ts-ignore
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
function eachTimeOneEye(ninja: Ninja, key: any) {
    //@ts-ignore
    if (this && this.enemy) {
        //重複を防ぐために現在時刻をプロパティ名に
        let day = new Date().getTime();

        //5回に1回火の玉生成
        var random1 = Math.floor(Math.random() * 6);
        var random2 = Math.floor(Math.random() * 6);
        var random3 = Math.floor(Math.random() * 6);
        if (random1 === 0) {
            if (random2 !== 0 && random3 !== 0) {
                ninja.game.objs["oneEye" + day] = {
                    size: 13,
                    //@ts-ignore
                    posX: this.posX,
                    //@ts-ignore
                    posY: this.posY,
                    speedX: random2 / 5,
                    speedY: random3 / 5,
                    zIndex: 5,
                    img: imgBlueFire,
                    onTouch: onTouchEnemy,
                    enemy: true,
                    eachTime: eachTimeEnemy,
                };
            }
        }

        //Y軸について、忍者を追いかける
        //@ts-ignore
        if (ninja.posY >= this.posY + this.size - ninja.size / 2) {
            //@ts-ignore
            this.posY += this.speedY;
            //@ts-ignore
        } else if (ninja.posY + ninja.size / 2 <= this.posY) {
            //@ts-ignore
            this.posY += this.speedY * -1;
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                //@ts-ignore
                if (checkTouch(this, ninja.game.objs["fireBall" + i])) {
                    //敵がFireBallに触れた場合
                    delete ninja.game.objs[key];
                }
            }
        }
    }
}

//=======================================
// ボス　タイムステップ毎
//=======================================
function eachTimeBoss(ninja: Ninja, key: any) {
    //@ts-ignore
    if (this && this.enemy) {
        //重複を防ぐために現在時刻をプロパティ名に
        let day = new Date().getTime();

        //5回に1回コウモリ生成
        let random1 = Math.floor(Math.random() * 6);
        let random2 = Math.floor(Math.random() * 6);
        let random3 = Math.floor(Math.random() * 6);
        let randomHalf = Math.floor(Math.random() * 3);

        if (random1 * random2 === 9 && randomHalf === 2) {
            ninja.game.objs["bat" + day] = {
                size: 13,
                //@ts-ignore
                posX: this.posX,
                //@ts-ignore
                posY: this.posY,
                speedX: random3 / 3,
                speedY: random2 / 3,
                zIndex: 5,
                img: imgBat,
                onTouch: onTouchEnemy,
                enemy: true,
                eachTime: eachTimeEnemy,
            };
        }

        let random4 = Math.floor(Math.random() * 6);

        //一つ目生成
        if (random1 * random2 * random3 * random4 === 27 && randomHalf === 2) {
            //3が3つと1ひとつ　⇒　右から
            ninja.game.objs["hitotsumeR" + day] = {
                size: 12,
                posX: 147,
                xMin: 147,
                posY: -12,
                speedX: 0,
                speedY: 0.5,
                zIndex: 5,
                img: imgOneEye,
                onTouch: onTouchEnemy,
                enemy: true,
                eachTime: eachTimeOneEye,
            };
        }
        if (random1 * random2 * random3 * random4 === 625 && randomHalf === 2) {
            //全部5　⇒　左から
            ninja.game.objs["hitotsumeL" + day] = {
                size: 12,
                posX: 1,
                xMax: 1,
                posY: -12,
                speedX: 0,
                speedY: 0.5,
                zIndex: 5,
                img: imgOneEye,
                onTouch: onTouchEnemy,
                enemy: true,
                eachTime: eachTimeOneEye,
            };
        }

        let random5 = Math.floor(Math.random() * 6);

        if (
            random4 * random5 === 4 ||
            random4 * random5 === 9 ||
            random4 * random5 === 25
        ) {
            //ボックス
            ninja.game.objs["box" + day] = {
                size: 5 * random1,
                posX: 32 * random2 - 5 * random1,
                posY: 11 * random3 - 5 * random1 + 40,
                speedX: 0,
                speedY: 0,
                zIndex: 22,
                img: imgBox1,
                onTouch: onTouchBlock,
                enemy: true,
                eachTime: eachTimeEnemy,
            };
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                //@ts-ignore
                if (checkTouch(this, ninja.game.objs["fireBall" + i])) {
                    ninja.game.objs["rightGateWall"] = {
                        size: 300,
                        posX: 160,
                        posY: -200,
                        zIndex: 30,
                        next: 20,
                        onTouch: onTouchGateWall,
                        //@ts-ignore
                        changeStage: this.changeStage,
                    };

                    ninja.game.objs["kanban1Pic"] = {
                        size: 20,
                        posX: 130,
                        posY: 60,
                        zIndex: 24,
                        img: imgKanban1,
                        onTouch: onTouchNothing,
                    };

                    ninja.game.objs["kanban1ArrowPic"] = {
                        size: 10,
                        posX: 135,
                        posY: 63,
                        boolLeft: false,
                        zIndex: 24,
                        img: imgArrow1,
                        onTouch: onTouchNothing,
                    };

                    //背景変更
                    ninja.game.backgroundSetting.backgroundImage = `url(${stage19a})`;

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
function eachTimeFireBall(ninja: Ninja, key: any) {
    //fireBall
    //@ts-ignore
    if (this && this.fireBall) {
        //@ts-ignore
        if (this.posX + this.size < 0 || this.posX > 160) {
            //fireBallが画面からはみ出した場合、消す
            delete ninja.game.objs[key];
        } else {
            //fireBallが画面内にある場合
            //@ts-ignore
            if (this.boolLeft) {
                //左向き
                //@ts-ignore
                this.posX -= 10;
            } else {
                //右向き
                //@ts-ignore
                this.posX += 10;
            }
        }
    }
}

//=======================================
// デカい魚　タイムステップ毎
//=======================================
function eachTimeKimme(ninja: Ninja, key: any) {
    //@ts-ignore
    if (this && this.enemy) {
        //X軸について、忍者を追いかける
        //@ts-ignore
        if (this.speedX !== 0) {
            //@ts-ignore
            if (ninja.posX >= this.posX + this.size - ninja.size / 2) {
                //@ts-ignore
                this.posX += this.speedX;
                //@ts-ignore
                this.boolLeft = false;
                //@ts-ignore
            } else if (ninja.posX + ninja.size / 2 <= this.posX) {
                //@ts-ignore
                this.posX += this.speedX * -1;
                //@ts-ignore
                this.boolLeft = true;
            } else {
                //@ts-ignore
                this.posX += ninja.posX < this.posX ? -1 : 0;
                //@ts-ignore
                this.posX += ninja.posX > this.posX ? 1 : 0;
            }
        }

        //敵の行動可能域計算
        //@ts-ignore
        if (this.xMax && this.posX > this.xMax) {
            //x最大値を超えている場合
            //@ts-ignore
            this.posX = this.xMax;
            //@ts-ignore
        } else if (this.xMin && this.posX < this.xMin) {
            //x最小値を超えている場合
            //@ts-ignore
            this.posX = this.xMin;
        }

        for (let i = 0; i <= ninja.fireBallCount; i++) {
            if (ninja.game.objs["fireBall" + i]) {
                //まだ消えていないFireBallについて

                //@ts-ignore
                if (checkTouch(this, ninja.game.objs["fireBall" + i])) {
                    //敵がFireBallに触れた場合
                    //@ts-ignore
                    this.posX += 0.5;
                }
            }
        }
    }
}

export { Page2 };
