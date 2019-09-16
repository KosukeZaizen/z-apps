//ステージの部品作成用関数群の読み込み
import * as StageParts from './StagePartsGenerator';
//各オブジェクト用画像の読み込み
import Imgs from '../ImportImgs';
//タッチ関数の読み込み
import * as OnTouch from '../OnTouch';
//タイムステップごとの処理
import * as EachTime from '../EachTime';
//背景画像
import bgImg from '../img/background/grave4.jpg';

const Stage = {};

//半化の書
Stage.getObjs = (ninja) => {
    Stage.bgImg = bgImg;

    let returnObjs = {
        ...StageParts.getObjOutOfScreen(),
        ...StageParts.getObjWalls(),

        ...StageParts.getFlyingRock("toUp", 17, 32, 150, 30, -100),

        ...StageParts.getSoroll("HANKA", 10, 88, 43, Imgs.Scroll, Imgs.AoKinoko, 22),

        ...StageParts.getIceBlocks(10, [
            [8.4, 5.3], [9.4, 5.3],
        ], OnTouch.toBlock, Imgs.StoneBlock, 50),

        bottomGate: StageParts.getBottomGate(19, 200)
    };
    return returnObjs;
}
export default Stage;