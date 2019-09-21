//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//背景画像
import bgImg from '../img/background/tengumura1.jpg';

const Stage = {};

//夜の階段（仙人の家の近く）
Stage.getObjs = (ninja) => {

    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 1 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getSoroll("SIGN2", 20, 115, 60, Imgs.Kanban1, null, 10),

        rightGate: StageParts.getRightGate(11),
        leftGate: StageParts.getLeftGate(9),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSnows(0.15, 30),
        }
    }
    return returnObjs;
}
export default Stage;