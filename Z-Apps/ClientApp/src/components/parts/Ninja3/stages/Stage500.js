//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//背景画像
import bgImg from '../img/background/cliff.jpg';

const Stage500 = {};
Stage500.bgImg = bgImg;
Stage500.windSpeed = 2.5;//風速の最大・最小

Stage500.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        snowman: StageParts.getStageChangeSnowman(12, 30, 55, 5),

        ...StageParts.getCliffRocks(),

        rightGate: StageParts.getRightGate(400, 1, 63),
        bottomFall: StageParts.getDangerousObj(300, -70, 100),

        ...StageParts.getSnows(0.15, 30),
    };
}
export { Stage500 };