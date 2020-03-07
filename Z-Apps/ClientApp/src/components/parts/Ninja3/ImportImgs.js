"use strict";
//------------------------------------------------------------
//　全てのオブジェクトの画像をimportし、exportするモジュール
//------------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//＜過去要素引継ぎ＞
//岩
var rock_png_1 = __importDefault(require("./../Ninja/objs/rock.png"));
//逆向きの岩
var rockRiverse_png_1 = __importDefault(require("./../Ninja/objs/rockRiverse.png"));
//逆向きの炎
var fireReverse_png_1 = __importDefault(require("./../Ninja/objs/fireReverse.png"));
//ポチ
var pochi_png_1 = __importDefault(require("./../Ninja/objs/pochi.png"));
//閉じている巻物
var scrollObj_png_1 = __importDefault(require("./../Ninja/objs/scrollObj.png"));
//開いている巻物
var scrollOpen_png_1 = __importDefault(require("./../Ninja/objs/scrollOpen.png"));
//シノ（先輩くのいち）
var shino_png_1 = __importDefault(require("./../Ninja/objs/shino.png"));
//看板
var kanban1_png_1 = __importDefault(require("./../Ninja/objs/kanban1.png"));
//看板の矢印
var arrow1_png_1 = __importDefault(require("./../Ninja/objs/arrow1.png"));
//鳥居
var torii_png_1 = __importDefault(require("./../Ninja/objs/torii.png"));
//額縁
var frame_jpg_1 = __importDefault(require("./../Ninja/objs/frame.jpg"));
//木
var tree1_png_1 = __importDefault(require("./../Ninja/objs/tree1.png"));
//仏壇
var butsudan_png_1 = __importDefault(require("./../Ninja/objs/butsudan.png"));
//地蔵
var jizo_png_1 = __importDefault(require("./../Ninja/objs/jizo.png"));
//鬼
var oni_png_1 = __importDefault(require("./../Ninja2/objs/oni.png"));
//おばけ1
var cat_png_1 = __importDefault(require("./../Ninja2/objs/cat.png"));
//おばけ2
var bat_png_1 = __importDefault(require("./../Ninja2/objs/bat.png"));
//一つ目
var hitotsume_png_1 = __importDefault(require("./../Ninja2/objs/hitotsume.png"));
//火の玉
var hinotama_png_1 = __importDefault(require("./../Ninja2/objs/hinotama.png"));
//ボス
var badDog_png_1 = __importDefault(require("./../Ninja2/objs/badDog.png"));
//炎（右）
var fireBallR_png_1 = __importDefault(require("./../Ninja2/objs/fireBallR.png"));
//木ブロック
var woodenBox_jpg_1 = __importDefault(require("./../Ninja2/objs/woodenBox.jpg"));
//ブロック
var block_jpg_1 = __importDefault(require("./../Ninja2/objs/block.jpg"));
//------------------------------------------------------------
//＜新要素＞
//雪だるま
var snowman_png_1 = __importDefault(require("./objs/snowman.png"));
//小僧
var monk_png_1 = __importDefault(require("./objs/monk.png"));
//氷
var ice_jpg_1 = __importDefault(require("./objs/ice.jpg"));
//岩（右）
var rockRight_png_1 = __importDefault(require("./objs/rockRight.png"));
//扉
var darkDoor_jpg_1 = __importDefault(require("./objs/darkDoor.jpg"));
//死神
var shinigami_png_1 = __importDefault(require("./objs/shinigami.png"));
//墓
var grave_png_1 = __importDefault(require("./objs/grave.png"));
//老婆
var oldWoman_png_1 = __importDefault(require("./objs/oldWoman.png"));
//少女１
var girl1_png_1 = __importDefault(require("./objs/girl1.png"));
//少女２
var girl2_png_1 = __importDefault(require("./objs/girl2.png"));
//仙人
var sennin_png_1 = __importDefault(require("./objs/sennin.png"));
//サファイア
var sapphire_png_1 = __importDefault(require("./objs/sapphire.png"));
//雪の結晶
var iceStone_png_1 = __importDefault(require("./objs/iceStone.png"));
//下向きの看板
var downArrow_png_1 = __importDefault(require("./objs/downArrow.png"));
//青キノコ
var aoKinoko_png_1 = __importDefault(require("./objs/aoKinoko.png"));
//赤キノコ
var akaKinoko_png_1 = __importDefault(require("./objs/akaKinoko.png"));
//ひげ
var hige_gif_1 = __importDefault(require("./objs/hige.gif"));
exports.default = {
    Rock: rock_png_1.default,
    RockR: rockRiverse_png_1.default,
    FireR: fireReverse_png_1.default,
    Pochi: pochi_png_1.default,
    Scroll: scrollObj_png_1.default,
    ScrollOpen: scrollOpen_png_1.default,
    Shino: shino_png_1.default,
    Kanban1: kanban1_png_1.default,
    Arrow1: arrow1_png_1.default,
    Torii: torii_png_1.default,
    Frame: frame_jpg_1.default,
    Tree: tree1_png_1.default,
    Butsudan: butsudan_png_1.default,
    Jizo: jizo_png_1.default,
    Oni: oni_png_1.default,
    Obake1: cat_png_1.default,
    Obake2: bat_png_1.default,
    Hitotsume: hitotsume_png_1.default,
    Hinotama: hinotama_png_1.default,
    Boss: badDog_png_1.default,
    FireRight: fireBallR_png_1.default,
    DarkDoor: darkDoor_jpg_1.default,
    Block: woodenBox_jpg_1.default,
    StoneBlock: block_jpg_1.default,
    Snowman: snowman_png_1.default,
    Monk: monk_png_1.default,
    Ice: ice_jpg_1.default,
    RockRight: rockRight_png_1.default,
    Shinigami: shinigami_png_1.default,
    Grave: grave_png_1.default,
    OldWoman: oldWoman_png_1.default,
    Girl1: girl1_png_1.default,
    Girl2: girl2_png_1.default,
    Sennin: sennin_png_1.default,
    Sapphire: sapphire_png_1.default,
    IceStone: iceStone_png_1.default,
    DownArrow: downArrow_png_1.default,
    AoKinoko: aoKinoko_png_1.default,
    AkaKinoko: akaKinoko_png_1.default,
    Hige: hige_gif_1.default,
};
