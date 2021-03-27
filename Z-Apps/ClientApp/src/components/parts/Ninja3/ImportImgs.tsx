//------------------------------------------------------------
//　全てのオブジェクトの画像をconstし、exportするモジュール
//------------------------------------------------------------

import { appsPublicImg, gameStorage } from "../../../common/consts";

//＜過去要素引継ぎ＞

//岩
const Rock = `${gameStorage}ninja1/objs/rock.png`;
//逆向きの岩
const RockR = `${gameStorage}ninja1/objs/rockRiverse.png`;
//逆向きの炎
const FireR = `${gameStorage}ninja1/objs/fireReverse.png`;
//ポチ
const Pochi = `${gameStorage}ninja1/objs/pochi.png`;
//閉じている巻物
const Scroll = `${gameStorage}ninja1/objs/scrollObj.png`;
//開いている巻物
const ScrollOpen = `${gameStorage}ninja1/objs/scrollOpen.png`;
//シノ（先輩くのいち）
const Shino = `${gameStorage}ninja1/objs/shino.png`;
//看板
const Kanban1 = `${gameStorage}ninja1/objs/kanban1.png`;
//看板の矢印
const Arrow1 = `${gameStorage}ninja1/objs/arrow1.png`;
//鳥居
const Torii = `${gameStorage}ninja1/objs/torii.png`;
//額縁
const Frame = `${gameStorage}ninja1/objs/frame.jpg`;
//木
const Tree = `${gameStorage}ninja1/objs/tree1.png`;
//仏壇
const Butsudan = `${gameStorage}ninja1/objs/butsudan.png`;
//地蔵
const Jizo = `${gameStorage}ninja1/objs/jizo.png`;

//鬼
const Oni = `${gameStorage}ninja2/objs/oni.png`;
//おばけ1
const Obake1 = `${gameStorage}ninja2/objs/cat.png`;
//おばけ2
const Obake2 = `${gameStorage}ninja2/objs/bat.png`;
//一つ目
const Hitotsume = `${gameStorage}ninja2/objs/hitotsume.png`;
//火の玉
const Hinotama = `${gameStorage}ninja2/objs/hinotama.png`;
//ボス
const Boss = `${gameStorage}ninja2/objs/badDog.png`;
//炎（右）
const FireRight = `${gameStorage}ninja2/objs/fireBallR.png`;
//木ブロック
const Block = `${gameStorage}ninja2/objs/woodenBox.jpg`;
//ブロック
const StoneBlock = `${gameStorage}ninja2/objs/block.jpg`;

//------------------------------------------------------------
//＜新要素＞

//雪だるま
const Snowman = `${gameStorage}ninja3/objs/snowman.png`;
//小僧
const Monk = `${gameStorage}ninja3/objs/monk.png`;
//氷
const Ice = `${gameStorage}ninja3/objs/ice.jpg`;
//岩（右）
const RockRight = `${appsPublicImg}rockRight.png`;
//扉
const DarkDoor = `${gameStorage}ninja3/objs/darkDoor.jpg`;
//死神
const Shinigami = `${gameStorage}ninja3/objs/shinigami.png`;
//墓
const Grave = `${gameStorage}ninja3/objs/grave.png`;
//老婆
const OldWoman = `${gameStorage}ninja3/objs/oldWoman.png`;
//少女１
const Girl1 = `${gameStorage}ninja3/objs/girl1.png`;
//少女２
const Girl2 = `${gameStorage}ninja3/objs/girl2.png`;
//仙人
const Sennin = `${gameStorage}ninja3/objs/sennin.png`;
//サファイア
const Sapphire = `${gameStorage}ninja3/objs/sapphire.png`;
//雪の結晶
const IceStone = `${gameStorage}ninja3/objs/iceStone.png`;
//下向きの看板
const DownArrow = `${gameStorage}ninja3/objs/downArrow.png`;
//青キノコ
const AoKinoko = `${gameStorage}ninja3/objs/aoKinoko.png`;
//赤キノコ
const AkaKinoko = `${gameStorage}ninja3/objs/akaKinoko.png`;
//ひげ
const Hige = `${gameStorage}ninja3/objs/hige.gif`;

export default {
    Rock,
    RockR,
    FireR,
    Pochi,
    Scroll,
    ScrollOpen,
    Shino,
    Kanban1,
    Arrow1,
    Torii,
    Frame,
    Tree,
    Butsudan,
    Jizo,

    Oni,
    Obake1,
    Obake2,
    Hitotsume,
    Hinotama,
    Boss,
    FireRight,
    DarkDoor,
    Block,
    StoneBlock,

    Snowman,
    Monk,
    Ice,
    RockRight,
    Shinigami,
    Grave,
    OldWoman,
    Girl1,
    Girl2,
    Sennin,
    Sapphire,
    IceStone,
    DownArrow,
    AoKinoko,
    AkaKinoko,
    Hige,
};
