//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//背景画像
import bgImg from '../img/background/washitsu.jpg';

const Stage = {};

//仙人の家（室内）
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        sapphire: StageParts.getOnePic(25, 69, 3, Imgs.Sapphire, 10, OnTouch.toNothing),

        ...StageParts.getSoroll("YUKIFURASHI", 10, 3, 65, Imgs.Scroll, Imgs.Snowman, 22),

        ...StageParts.getIceBlocks(10, [
            [-2, 5], [-1, 5], [0, 5], [1, 5], [2, 5],
            [2, 6],
        ], OnTouch.toBlock, Imgs.Ice, 90),

        rightGate: StageParts.getRightGate(9, 100, 75 - ninja.size),
    };

    if (ninja.snow) {
        returnObjs = {
            ...returnObjs,
            ...StageParts.getSoroll("SENNIN", 14, 50, 60, Imgs.Sennin, Imgs.Sennin, 20),
            ...StageParts.getSnows(0.1, 30, true),
        }
    }
    return returnObjs;
}
export default Stage;