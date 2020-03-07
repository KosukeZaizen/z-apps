"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommonFnc_1 = require("./CommonFnc");
var consts = __importStar(require("./Consts")); //定数
var Messages_1 = require("./Messages"); //メッセージモジュール
//------------------------------------------------------------
//
//　　　　　オブジェクトタッチ時の関数
//
//------------------------------------------------------------
//=======================================
// 何も起こらないタッチ関数
//=======================================
function toNothing() { }
exports.toNothing = toNothing;
//=======================================
// 巻物を開くためのトリガーに触った際のタッチ関数
//=======================================
function toScrollOpener(ninja) {
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
    if (ninja.readScroll.indexOf(this.openTargetTitle) < 0) {
        //該当のメッセージをまだ読んでいない場合
        //読み終えたリストの中に該当の巻物を追加
        ninja.readScroll.push(this.openTargetTitle);
    }
    if (ninja.game.props.readElementScroll.indexOf(this.openTargetTitle) < 0) {
        //該当のメッセージをまだ読んでいない場合
        //読み終えたリスト(ステージ遷移の度にリセット)の中に該当の巻物を追加
        ninja.game.props.readElementScroll.push(this.openTargetTitle);
    }
}
exports.toScrollOpener = toScrollOpener;
//=======================================
// 貫通不可能ブロック用のタッチ関数
//=======================================
function toBlock(ninja, from) {
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
exports.toBlock = toBlock;
//=======================================
// 氷ブロック用のタッチ関数
//=======================================
function toIceBlock(ninja, from) {
    if (ninja.readScroll.indexOf(Messages_1.messages.MELT_SCROLL_TITLE) >= 0) {
        //氷溶かしの書を読んでいる
        this.melt = true;
        return;
    }
    //氷溶かしの書を読んでいなければただのブロック
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
exports.toIceBlock = toIceBlock;
//=======================================
// 上からのみ乗れる木などのタッチ関数
//=======================================
function toTree(ninja) {
    //上から
    if (this.posY > ninja.posY && this.posY < ninja.posY + ninja.size) {
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;
    }
}
exports.toTree = toTree;
//=======================================
// 飛び石のタッチ関数
//=======================================
function toFlyingRock(ninja, from) {
    if (from === "upper") {
        //上から
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;
        if (ninja.readScroll.indexOf(Messages_1.messages.TOBIISHI_SCROLL_TITLE) >= 0) {
            //飛び石の書を読んでいる
            if (!this.Flying) {
                //飛行開始
                if (!this.direction) {
                    //上向き
                    this.isFlying = true;
                    ninja.game.objs[this.fireName].isFlying = true;
                }
                else if (this.direction === "right") {
                    //右向き
                    this.isFlying = true;
                    ninja.game.objs[this.fireName].isFlying = true;
                    if (Math.abs(this.posX - ninja.posX) < 3) {
                        ninja.boolLeft = false;
                        ninja.posX += 3 * consts.TIME_STEP;
                    }
                }
                else if (this.direction === "left") {
                    //右向き
                    this.isFlying = true;
                    ninja.game.objs[this.fireName].isFlying = true;
                    if (Math.abs((this.posX + this.size) - (ninja.posX + ninja.size)) < 3) {
                        ninja.boolLeft = true;
                        ninja.posX -= 3 * consts.TIME_STEP;
                    }
                }
            }
        }
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
exports.toFlyingRock = toFlyingRock;
//=======================================
// 別ステージへのゲートのタッチ関数（汎用化したもの）
//=======================================
function toStageChangeCommon(ninja, from) {
    // X
    if (this.nextX != null) {
        ninja.posX = this.nextX;
    }
    else {
        //遷移後の位置を明示的に渡されていない場合は、自動的に算出
        if (from === "right") {
            //右から
            ninja.posX += 160 - ninja.size;
        }
        else if (from === "left") {
            //左から
            ninja.posX = 0;
        }
    }
    // Y
    if (this.nextY != null) {
        ninja.posY = this.nextY;
    }
    else {
        //遷移後の位置を明示的に渡されていない場合は、自動的に算出
        if (from === "upper") {
            //上から
            ninja.posY = 0;
        }
        else if (from === "lower") {
            //下から
            ninja.posY = 75 - ninja.size;
        }
    }
    ninja.boolLeft = this.nextLeft;
    CommonFnc_1.changeStage(this.next, ninja);
    return "changed";
}
exports.toStageChangeCommon = toStageChangeCommon;
//=======================================
// 倒せない敵に触ってゲームオーバー
//=======================================
function toEnemy(ninja) {
    if (!!ninja && !!ninja.game) {
        //ゲームを停止
        clearInterval(ninja.game.timerId);
        //ゲームオーバー画面へリダイレクト
        window.location.href = "/game-over?g=" + consts.GAME_NAME + "&l=" + ninja.game.lang;
    }
}
exports.toEnemy = toEnemy;
//=======================================
// 倒せる敵に触ってゲームオーバー
//=======================================
function toMortalEnemy(ninja, from) {
    if (ninja.readScroll.indexOf(Messages_1.messages.HUMITSUKE_SCROLL_TITLE) >= 0) {
        //踏みつけの書を読んでいる
        if (from === "upper") {
            //上から
            this.isDead = true;
            ninja.speedY = -11;
            return;
        }
    }
    if (ninja && ninja.game) {
        //ゲームを停止
        clearInterval(ninja.game.timerId);
        //ゲームオーバー画面へリダイレクト
        window.location.href = "/game-over?g=" + consts.GAME_NAME + "&l=" + ninja.game.lang;
    }
}
exports.toMortalEnemy = toMortalEnemy;
//=======================================
// 青キノコ　タッチ関数
//=======================================
function toAoKinoko(ninja) {
    if (ninja.readScroll.indexOf(Messages_1.messages.HANKA_SCROLL_TITLE) >= 0) {
        ninja.size = 6;
    }
}
exports.toAoKinoko = toAoKinoko;
//=======================================
// 赤キノコ　タッチ関数
//=======================================
function toAkaKinoko(ninja) {
    ninja.size = 12;
}
exports.toAkaKinoko = toAkaKinoko;
//=======================================
// 雪をやませる
//=======================================
function toStopSnow(ninja) {
    ninja.snow = false;
}
exports.toStopSnow = toStopSnow;
