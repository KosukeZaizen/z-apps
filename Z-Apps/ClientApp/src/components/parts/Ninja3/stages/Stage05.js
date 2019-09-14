//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//背景画像
import bgImg from '../img/background/cliff.jpg';

const Stage = {};

Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;
    Stage.windSpeed = (ninja.snow) ? 2.5 : 0;//風速

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        snowman: StageParts.getStageChangeSnowman(12, 30, 55, 5),

        ...StageParts.getCliffRocks(),

        rightGate: StageParts.getRightGate(4, 1, 63),
        bottomFall: StageParts.getDangerousObj(3, -70, 100),
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