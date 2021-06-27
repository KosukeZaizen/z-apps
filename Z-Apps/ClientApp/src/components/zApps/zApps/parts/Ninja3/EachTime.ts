//@ts-nocheck
import { TIME_STEP } from "./Consts";
import Imgs from "./ImportImgs";
import * as OnTouch from "./OnTouch"; //タッチ関数

//------------------------------------------------------------
//
//　　　　　タイムステップごとの関数
//
//------------------------------------------------------------

//=======================================
// 通常敵キャラ　タイムステップ毎
//=======================================
export function Enemy(ninja: any, key: any) {
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
            if (ninja.posX >= this.posX + this.size - ninja.size / 2) {
                this.posX += this.speedX * TIME_STEP;
                this.boolLeft = false;
            } else if (ninja.posX + ninja.size / 2 <= this.posX) {
                this.posX += this.speedX * -1 * TIME_STEP;
                this.boolLeft = true;
            } else {
                this.posX += ninja.posX < this.posX ? -1 * TIME_STEP : 0;
                this.posX += ninja.posX > this.posX ? 1 * TIME_STEP : 0;
            }
        }
        //Y軸について、忍者を追いかける
        if (ninja.posY >= this.posY + this.size - ninja.size / 2) {
            this.posY += this.speedY * TIME_STEP;
        } else if (ninja.posY + ninja.size / 2 <= this.posY) {
            this.posY += this.speedY * -1 * TIME_STEP;
        }

        if (this.isDead) {
            //既に踏みつけられていた場合
            delete ninja.game.objs[key];
        }
    }
}

//=======================================
// 一つ目小僧　タイムステップ毎
//=======================================
export function OneEye(ninja, key) {
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
                    posX: this.posX,
                    posY: this.posY,
                    speedX: random2 / 10,
                    speedY: random3 / 10,
                    zIndex: 5,
                    img: Imgs.Hinotama,
                    onTouch: OnTouch.toEnemy,
                    enemy: true,
                    eachTime: Enemy,
                };
            }
        }

        if (this.isDead) {
            //既に踏みつけられていた場合
            delete ninja.game.objs[key];
        }
    }
}

//=======================================
// ボス　タイムステップ毎
//=======================================
export function Boss(ninja, key) {
    if (this && this.enemy) {
        //重複を防ぐために現在時刻をプロパティ名に
        let day = new Date().getTime();

        //5回に1回コウモリ生成
        let random1 = Math.floor(Math.random() * 14);
        let random2 = Math.floor(Math.random() * 8);
        let random3 = Math.floor(Math.random() * 8) || 1;

        if (random1 * random2 === 9) {
            ninja.game.objs["shinigami" + day] = {
                size: 13,
                posX: this.posX,
                posY: this.posY,
                speedX: random3 / 5,
                speedY: random2 / 10,
                zIndex: 5,
                img: Imgs.Shinigami,
                onTouch: OnTouch.toMortalEnemy,
                enemy: true,
                eachTime: Enemy,
            };
        }

        if (this.isDead) {
            delete ninja.game.objs[key];
        }
    }
}

//=======================================
// 氷ブロック　タイムステップ毎
//=======================================
export function IceBlock(ninja, key) {
    if (this.melt) {
        //溶けて消える
        delete ninja.game.objs[key];
    }
}

//=======================================
// 飛び石　タイムステップ毎
//=======================================
export function FlyingRock(ninja, key) {
    if (!this.direction) {
        const maxHeight = this.maxHeight || -500;
        if (this.isFlying) {
            if (this.posY < maxHeight) {
                //画面から大きくはみ出した場合、消す
                delete ninja.game.objs[key];
            } else {
                this.posY -= 3 * TIME_STEP;
            }
        }
    } else if (this.direction === "right") {
        const maxRight = this.maxRight || 500;
        if (this.isFlying) {
            if (this.posX > maxRight) {
                //画面から大きくはみ出した場合、消す
                delete ninja.game.objs[key];
            } else {
                this.posX += 3 * TIME_STEP;
            }
        }
    } else if (this.direction === "left") {
        const maxLeft = this.maxLeft || -500;
        if (this.isFlying) {
            if (this.posX < maxLeft) {
                //画面から大きくはみ出した場合、消す
                delete ninja.game.objs[key];
            } else {
                this.posX -= 3 * TIME_STEP;
            }
        }
    }
}

//=======================================
// 雪　タイムステップ毎
//=======================================
export function Snow(ninja) {
    //雪の位置更新
    this.posY += 1;
    this.posX += ninja.game.wind;

    //雪が画面をはみ出したら、逆側へ再出現
    if (this.posX > 160) this.posX = 0;
    if (this.posX < 0) this.posX = 160;

    if (this.posY > 75) {
        this.posY = -10;
        this.posX = Math.floor(Math.random() * 161);
    }
    if (this.posY < -10) this.posY = 75;
}

//=======================================
// 【逆向き】雪　タイムステップ毎
//=======================================
export function SnowR(ninja) {
    //雪の位置更新
    this.posY += -2;

    //雪が画面をはみ出したら、逆側へ再出現
    if (this.posY > 75) {
        this.posY = -10;
        this.posX = Math.floor(Math.random() * 161);
    }
    if (this.posY < -10) this.posY = 75;
}
