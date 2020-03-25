"use strict";
//------------------------------------------------------------
//
//　　　　共通関数群
//
//------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.checkTouch = checkTouch;
//相対位置判定
function checkRelativity(obj1, obj2) {
    //obj2から見たobj1の位置を返す関数
    //石から見た忍者　等
    if (checkTouch(obj1, obj2)) {
        //かすっている
        //中心座標計算
        let obj1_center = [obj1.posX + (obj1.size / 2), obj1.posY + (obj1.size / 2)];
        let obj2_center = [obj2.posX + (obj2.size / 2), obj2.posY + (obj2.size / 2)];
        //2オブジェクトの中心間の差を計算
        let dX = obj2_center[0] - obj1_center[0];
        let dY = obj2_center[1] - obj1_center[1];
        //0除算除外
        if (dX === 0) {
            //2つの物体のx座標が一致
            return (dY > 0) ? "upper" : "lower";
        }
        //傾き
        let a = dY / dX;
        //傾きから相対位置判定
        if (1 > a && a > -1) {
            return (dX > 0) ? "left" : "right";
        }
        else {
            return (dY > 0) ? "upper" : "lower";
        }
    }
    return false;
}
exports.checkRelativity = checkRelativity;
let changeStage;
exports.changeStage = changeStage;
function setChangeStage(fnc) {
    exports.changeStage = changeStage = fnc;
}
exports.setChangeStage = setChangeStage;
