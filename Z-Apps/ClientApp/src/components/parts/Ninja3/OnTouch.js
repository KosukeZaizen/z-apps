import { changeStage } from './CommonFnc'
import * as consts from './Consts'//定数
import { messages } from './Messages';//メッセージモジュール

//------------------------------------------------------------
//
//　　　　　オブジェクトタッチ時の関数
//
//------------------------------------------------------------

//=======================================
// 何も起こらないタッチ関数
//=======================================
export function toNothing() { }

//=======================================
// 巻物を開くためのトリガーに触った際のタッチ関数
//=======================================
export function toScrollOpener(ninja) {
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

//=======================================
// 貫通不可能ブロック用のタッチ関数
//=======================================
export function toBlock(ninja, from) {
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
// 上からのみ乗れる木などのタッチ関数
//=======================================
export function toTree(ninja) {
    //上から
    if (this.posY > ninja.posY && this.posY < ninja.posY + ninja.size) {
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;
    }
}

//=======================================
// 飛び石のタッチ関数
//=======================================
export function toFlyingRock(ninja, from) {
    if (from === "upper") {
        //上から
        ninja.posY = this.posY - ninja.size;
        ninja.speedY = 0;

        if (ninja.readScroll.indexOf(messages.TOBIISHI_SCROLL_TITLE) > 0) {
            //飛び石の書を読んでいる
            if (!this.Flying) {
                //飛行開始
                this.isFlying = true;
                ninja.game.objs[this.fireName].isFlying = true;
            }
        }
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
// 別ステージへのゲートのタッチ関数（汎用化したもの）
//=======================================
export function toStageChangeCommon(ninja, from) {

    if (this.nextX && this.nextY) {
        ninja.posX = this.nextX;
        ninja.posY = this.nextY;
    } else {
        //遷移後の位置を明示的に渡されていない場合は、自動的に算出
        if (from === "right") {
            //右から
            ninja.posX += 160 - ninja.size;
        } else if (from === "left") {
            //左から
            ninja.posX = 0;
        } else if (from === "upper") {
            //上から
            ninja.posY = 0;
        } else if (from === "lower") {
            //下から
            ninja.posY = 75 - ninja.size;
        }
    }
    ninja.boolLeft = this.nextLeft;

    changeStage(this.next, ninja);

    return "changed";
}

//=======================================
// 敵に触ってゲームオーバー
//=======================================
export function toEnemy(ninja) {
    if (!!ninja && !!ninja.game) {
        //ゲームを停止
        clearInterval(ninja.game.timerId);
        //ゲームオーバー画面へリダイレクト
        window.location.href = "/game-over?g=" + consts.GAME_NAME + "&l=" + ninja.game.lang;
    }
}
