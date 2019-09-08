//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//背景画像
import bgImg from '../img/background/cliff.jpg';

const Stage5 = {};
Stage5.bgImg = bgImg;

Stage5.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        snowman: StageParts.getStageChangeSnowman(12, 30, 55, 500),

        ...StageParts.getCliffRocks(),

        rightGate: StageParts.getRightGate(4, 1, 63),
        bottomFall: StageParts.getDangerousObj(3, -70, 100),
    };
}
export { Stage5 };