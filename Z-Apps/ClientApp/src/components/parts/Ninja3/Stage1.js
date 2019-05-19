import { getObjOutOfScreen, getObjWalls, getOnePic } from './AllStages';
import { imgPochi, imgScrollOpen, imgHouse1 } from './ImportImgs';
import { onTouchNothing, onTouchBlock, onTouchScrollOpener, onTouchGateTop1 } from './OnTouch';
import { getMessage } from './Messages';
import { changeStage } from './CommonFnc'


// ------------------------------------------------------------
// ステージ1 (出発地点　屋根の上)
// ------------------------------------------------------------

import bgImg from './img/background/castle1.jpg';

const Stage1 = {}
Stage1.bgImg = bgImg;

Stage1.getObjs = function () {
    let objs = {
        ...getObjOutOfScreen(),
        ...getObjWalls(),

        ...getOnePic("house1Pic", 60, 120, 35, imgHouse1, 35, onTouchNothing),

        house1Actual: {
            size: 60,
            posX: 120,
            posY: 47,
            onTouch: onTouchBlock,
        },

        house2Pic: {
            size: 60,
            posX: 90,
            posY: 55,
            zIndex: 34,
            img: imgHouse1,
            onTouch: onTouchNothing,
        },
        houseActual: {
            size: 60,
            posX: 97,
            posY: 67,
            onTouch: onTouchBlock,
        },

        pochi: {
            size: 10,
            posX: 115,
            posY: 53,
            zIndex: 20,
            img: imgPochi,
            onTouch: onTouchScrollOpener,
            openTargetTitle: getMessage("POCHI_SCROLL_TITLE"),
        },

        pochiScroll: {
            size: 150,
            posX: 5,
            posY: 5,
            zIndex: 1000,
            img: imgScrollOpen,
            scroll: true,
            visible: false,
            onTouch: onTouchNothing,
            title: getMessage("POCHI_SCROLL_TITLE"),
            message: getMessage("POCHI_SCROLL_MESSAGE"),
            fontSize: 3,
            speakerImg: imgPochi,
        },

        bottomGate: {
            size: 300,
            posX: -80,
            posY: 80,
            zIndex: 30,
            next: 2,
            onTouch: onTouchGateTop1,
            changeStage: changeStage,
        },
    };
    return objs;
}

export { Stage1 };