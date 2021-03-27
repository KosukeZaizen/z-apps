//各オブジェクト用画像の読み込み
import { gameStorage } from "../../../../common/consts";
import Imgs from "../ImportImgs";
//タッチ関数の読み込み
import * as OnTouch from "../OnTouch";
//ステージの部品作成用関数群の読み込み
import * as StageParts from "./StagePartsGenerator";
//背景画像
const bgImg = `${gameStorage}ninja3/background/snow5.jpg`;

const Stage: any = {};

//仙人の家（外）
Stage.getObjs = (ninja: any) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = ninja.snow ? 0 : 0; //風速

    let returnObjs: any = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ice: StageParts.getOnePic(
            16,
            71,
            12,
            Imgs.IceStone,
            15,
            OnTouch.toNothing
        ),

        toriiFramePic: StageParts.getOnePic(
            15,
            72,
            45,
            Imgs.Frame,
            20,
            OnTouch.toNothing
        ),
        toriiMessage1: StageParts.getMessage(
            20,
            77,
            46,
            "仙",
            5,
            22,
            OnTouch.toNothing
        ),

        jizo1: StageParts.getOnePic(12, 50, 64, Imgs.Jizo, 20, OnTouch.toBlock),
        jizo2: StageParts.getOnePic(12, 96, 64, Imgs.Jizo, 20, OnTouch.toBlock),

        door: StageParts.getDoor(
            15,
            72,
            60,
            Imgs.DarkDoor,
            10,
            16,
            135,
            63,
            true
        ),

        rightGate: StageParts.getRightGate(10),
        leftGate: StageParts.getLeftGate(8, null, null, -9),
    };

    if (ninja.snow) {
        //雪の時
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.15, 30, true),

            //英雄の墓への飛び石
            //...StageParts.getFlyingRock(2, 17, 15, 63, 30),
            //topGate: StageParts.getTopGate(15, -100, 32, 10),
        };
        if (ninja.posX < 80) {
            //左から来た時
            returnObjs = {
                ...returnObjs,
                ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),
            };
        }
    } else {
        //雪がやんだとき
        returnObjs = {
            ...returnObjs,
            obake2: StageParts.getEnemy(16, 65, 45, Imgs.Obake2, 100, 0.4, 0.4),
        };
    }
    return returnObjs;
};
export default Stage;
