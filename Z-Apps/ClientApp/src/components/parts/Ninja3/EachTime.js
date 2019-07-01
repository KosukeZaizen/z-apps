import { TIME_STEP } from './Consts'
import { checkTouch } from './CommonFnc'

//------------------------------------------------------------
//
//　　　　　タイムステップごとの関数
//
//------------------------------------------------------------

//=======================================
// 通常敵キャラ　タイムステップ毎
//=======================================
export function Enemy(ninja, key) {
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
                this.posX += this.speedX * TIME_STEP;
                this.boolLeft = false;
            } else if (ninja.posX + (ninja.size / 2) <= this.posX) {
                this.posX += this.speedX * (-1) * TIME_STEP;
                this.boolLeft = true;
            } else {
                this.posX += ninja.posX < this.posX ? -1 * TIME_STEP : 0
                this.posX += ninja.posX > this.posX ? 1 * TIME_STEP : 0
            }
        }
        //Y軸について、忍者を追いかける
        if (ninja.posY >= this.posY + this.size - (ninja.size / 2)) {
            this.posY += this.speedY * TIME_STEP;
        } else if (ninja.posY + (ninja.size / 2) <= this.posY) {
            this.posY += this.speedY * (-1) * TIME_STEP;
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
export function FireBall(ninja, key) {
    //fireBall
    if (this && this.fireBall) {
        if (this.posX + this.size < 0 || this.posX > 160) {
            //fireBallが画面からはみ出した場合、消す
            delete ninja.game.objs[key];
        } else {
            //fireBallが画面内にある場合
            if (this.boolLeft) {
                //左向き
                this.posX -= 10 * TIME_STEP;
            } else {
                //右向き
                this.posX += 10 * TIME_STEP;
            }
        }
    }
}

//=======================================
// 雪　タイムステップ毎
//=======================================
export function Snow(ninja, key) {
    ninja.game.objs[key].posY += 1;
}