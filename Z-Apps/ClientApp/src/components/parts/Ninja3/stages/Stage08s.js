//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//背景画像
import bgImg from '../img/background/snow4.jpg';

const Stage = {};
Stage.bgImg = bgImg;
Stage.windSpeed = -2.5;//風速の最大・最小

Stage.getObjs = () => {
    return {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),
        ...StageParts.getObjFloor(),

        ...StageParts.getFlyingRockRight(1, 17, -17, 20, 50),

        ...StageParts.getFrozenObj("obake1", 10, 61, 54, Imgs.Obake1),
        ...StageParts.getFrozenObj("obake2", 10, 40, 35, Imgs.Obake2),
        ...StageParts.getFrozenObj("obake3", 10, 25, 34, Imgs.Obake1),
        ...StageParts.getFrozenObj("obake4", 10, 122, 44, Imgs.Obake2, 11),
        ...StageParts.getFrozenObj("obake5", 10, 140, 24, Imgs.Obake1),
        ...StageParts.getFrozenObj("obake6", 10, 82, 64, Imgs.Obake2),
        ...StageParts.getFrozenObj("obake7", 10, 110, 26, Imgs.Obake2),

        ...StageParts.getFrozenObj("oni1", 26, 98, 50, Imgs.Oni, 9),
        ...StageParts.getFrozenObj("oni2", 22, 125, 54, Imgs.Oni),
        ...StageParts.getFrozenObj("oni3", 12, 60, 64, Imgs.Oni),
        ...StageParts.getFrozenObj("oni5", 12, 10, 64, Imgs.Oni),
        ...StageParts.getFrozenObj("oni6", 24, 73, 52, Imgs.Oni, 9),
        ...StageParts.getFrozenObj("oni7", 32, 20, 44, Imgs.Oni, 9),

        leftGate: StageParts.getLeftGate(700, null, null, -9),
        rightGate: StageParts.getRightGate(900),

        ...StageParts.getSnows(0.15, 30),
    };
}
export default Stage;