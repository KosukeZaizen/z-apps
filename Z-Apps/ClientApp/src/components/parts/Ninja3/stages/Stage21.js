//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/grave5.jpg';

const Stage = {};

//踏みつけの書
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("HUMITSUKE", 10, 67, 59, Imgs.Scroll, Imgs.Hige, 22),
        akaKinoko: StageParts.getOnePic(20, 61, 62, Imgs.AkaKinoko, 10, OnTouch.toAkaKinoko),

        ...StageParts.getFlyingRock("toUp", 17, 8, 62, 30),

        topGate: StageParts.getTopGate(15, -50, 125, 63),
        leftGate: StageParts.getLeftGate(15, 125, 63, -9),
    };
    return returnObjs;
}
export default Stage;