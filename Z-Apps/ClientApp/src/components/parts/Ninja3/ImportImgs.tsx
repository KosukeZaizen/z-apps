//------------------------------------------------------------
//　全てのオブジェクトの画像をconstし、exportするモジュール
//------------------------------------------------------------

//＜過去要素引継ぎ＞

//岩
const Rock = require("./../Ninja/objs/rock.png");
//逆向きの岩
const RockR = require("./../Ninja/objs/rockRiverse.png");
//逆向きの炎
const FireR = require("./../Ninja/objs/fireReverse.png");
//ポチ
const Pochi = require("./../Ninja/objs/pochi.png");
//閉じている巻物
const Scroll = require("./../Ninja/objs/scrollObj.png");
//開いている巻物
const ScrollOpen = require("./../Ninja/objs/scrollOpen.png");
//シノ（先輩くのいち）
const Shino = require("./../Ninja/objs/shino.png");
//看板
const Kanban1 = require("./../Ninja/objs/kanban1.png");
//看板の矢印
const Arrow1 = require("./../Ninja/objs/arrow1.png");
//鳥居
const Torii = require("./../Ninja/objs/torii.png");
//額縁
const Frame = require("./../Ninja/objs/frame.jpg");
//木
const Tree = require("./../Ninja/objs/tree1.png");
//仏壇
const Butsudan = require("./../Ninja/objs/butsudan.png");
//地蔵
const Jizo = require("./../Ninja/objs/jizo.png");

//鬼
const Oni = require("./../Ninja2/objs/oni.png");
//おばけ1
const Obake1 = require("./../Ninja2/objs/cat.png");
//おばけ2
const Obake2 = require("./../Ninja2/objs/bat.png");
//一つ目
const Hitotsume = require("./../Ninja2/objs/hitotsume.png");
//火の玉
const Hinotama = require("./../Ninja2/objs/hinotama.png");
//ボス
const Boss = require("./../Ninja2/objs/badDog.png");
//炎（右）
const FireRight = require("./../Ninja2/objs/fireBallR.png");
//木ブロック
const Block = require("./../Ninja2/objs/woodenBox.jpg");
//ブロック
const StoneBlock = require("./../Ninja2/objs/block.jpg");

//------------------------------------------------------------
//＜新要素＞

//雪だるま
const Snowman = require("./objs/snowman.png");
//小僧
const Monk = require("./objs/monk.png");
//氷
const Ice = require("./objs/ice.jpg");
//岩（右）
const RockRight = require("./objs/rockRight.png");
//扉
const DarkDoor = require("./objs/darkDoor.jpg");
//死神
const Shinigami = require("./objs/shinigami.png");
//墓
const Grave = require("./objs/grave.png");
//老婆
const OldWoman = require("./objs/oldWoman.png");
//少女１
const Girl1 = require("./objs/girl1.png");
//少女２
const Girl2 = require("./objs/girl2.png");
//仙人
const Sennin = require("./objs/sennin.png");
//サファイア
const Sapphire = require("./objs/sapphire.png");
//雪の結晶
const IceStone = require("./objs/iceStone.png");
//下向きの看板
const DownArrow = require("./objs/downArrow.png");
//青キノコ
const AoKinoko = require("./objs/aoKinoko.png");
//赤キノコ
const AkaKinoko = require("./objs/akaKinoko.png");
//ひげ
const Hige = require("./objs/hige.gif");

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
