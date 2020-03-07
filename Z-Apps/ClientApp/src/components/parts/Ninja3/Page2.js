"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ninja_1 = require("./objs/ninja/ninja"); //忍者オブジェクト（主人公）
var obj_1 = require("./objs/obj"); //オブジェクト描画
var Messages_1 = require("./Messages"); //メッセージ
var Consts_1 = require("./Consts"); //定数
var Messages_2 = require("./Messages"); //メッセージ
var GameCore = __importStar(require("./GameCore")); //ゲームのコア関数
var CommonFnc = __importStar(require("./CommonFnc")); //共通関数
//各ステージ情報
var Stage01_1 = __importDefault(require("./stages/Stage01"));
var Stage02_1 = __importDefault(require("./stages/Stage02"));
var Stage03_1 = __importDefault(require("./stages/Stage03"));
var Stage04_1 = __importDefault(require("./stages/Stage04"));
var Stage05_1 = __importDefault(require("./stages/Stage05"));
var Stage06_1 = __importDefault(require("./stages/Stage06"));
var Stage07_1 = __importDefault(require("./stages/Stage07"));
var Stage08_1 = __importDefault(require("./stages/Stage08"));
var Stage09_1 = __importDefault(require("./stages/Stage09"));
var Stage10_1 = __importDefault(require("./stages/Stage10"));
var Stage11_1 = __importDefault(require("./stages/Stage11"));
var Stage12_1 = __importDefault(require("./stages/Stage12"));
var Stage13_1 = __importDefault(require("./stages/Stage13"));
var Stage14_1 = __importDefault(require("./stages/Stage14"));
var Stage15_1 = __importDefault(require("./stages/Stage15"));
var Stage16_1 = __importDefault(require("./stages/Stage16"));
var Stage17_1 = __importDefault(require("./stages/Stage17"));
var Stage18_1 = __importDefault(require("./stages/Stage18"));
var Stage19_1 = __importDefault(require("./stages/Stage19"));
var Stage20_1 = __importDefault(require("./stages/Stage20"));
var Stage21_1 = __importDefault(require("./stages/Stage21"));
var Stage22_1 = __importDefault(require("./stages/Stage22"));
//【Unit Length】このゲームの単位長さ
var UL;
var Page2 = /** @class */ (function (_super) {
    __extends(Page2, _super);
    function Page2(props) {
        var _this = _super.call(this, props) || this;
        //(PC) or (スマホ/タブレット) 判定
        _this.terminalPC = GameCore.checkTerminalPC();
        //GameCoreからimportした関数の設定
        _this.getWindowSize = GameCore.getWindowSize;
        _this.setKeyboardEvent = GameCore.setKeyboardEvent;
        _this.onClickButton = GameCore.onClickButton.bind(_this);
        _this.onMouseUp = GameCore.onMouseUp.bind(_this);
        //引数で受け取った関数と言語設定を、各import元ファイルから使えるように設定
        CommonFnc.setChangeStage(props.changeStage);
        Messages_1.setLang(props.language);
        _this.lang = props.language;
        //前のステージ（ステージ変更判定に利用）
        _this.prevStage = 0;
        //画面の高さと幅を取得
        var pageSize = _this.getWindowSize();
        //【Unit Length】画面の高さを90等分した長さを、このゲームの単位長さとする
        UL = parseInt(pageSize.pageHeight, 10) / 90;
        //呼び出し元から受け取った忍者の初期値を設定
        _this.ninja = _this.props.ninja;
        _this.ninja.lang = _this.lang;
        //既読の巻物(ステージ遷移の度にリセット)
        _this.readElementScroll = _this.props.readElementScroll;
        //忍者オブジェクトに、ゲーム情報への参照を持たせる
        //（各関数からゲーム情報を参照・更新できるようにするため）
        _this.ninja.game = _this;
        //背景の初期設定
        _this.backgroundSetting = GameCore.getBgImg(Stage01_1.default.bgImg);
        // ------------------------------------------------------------
        // ステート初期設定
        // ------------------------------------------------------------
        _this.state = {
            screenStyle: __assign({ width: pageSize.pageWidth, height: pageSize.pageHeight - 15 * UL }, _this.backgroundSetting),
            ninjaStat: {
                left: true,
                ninjaX: _this.ninja.posX * UL,
                ninjaY: _this.ninja.posY * UL,
            }
        };
        //←ボタン押下判定　初期値
        _this.lButton = false;
        //→ボタン押下判定　初期値
        _this.rButton = false;
        //jumpボタン押下判定　初期値
        _this.jButton = false;
        //キーボード押下時イベントセット
        _this.setKeyboardEvent(_this);
        //タイムステップ毎に処理を呼び出す
        _this.timerId = setInterval(function () {
            //タイムステップごとの計算
            //空中では風の影響を受ける
            if (_this.ninja.speedY !== 0)
                _this.ninja.posX += _this.wind;
            /* ↓　物体速度・位置計算　↓ */
            //ボタン押下判定
            if (_this.lButton === false && _this.rButton === false) {
                _this.ninja.speedX = 0;
            }
            else {
                if (_this.lButton === true) {
                    _this.ninja.speedX = _this.ninja.inWater ? -3 : -6;
                    _this.ninja.boolLeft = true; //画像左向き
                }
                else if (_this.rButton === true) {
                    _this.ninja.speedX = _this.ninja.inWater ? 3 : 6;
                    _this.ninja.boolLeft = false; //画像右向き
                }
            }
            //前タイムステップでジャンプをした時のため、元に戻す
            _this.closeScroll = false;
            if (_this.jButton === true) {
                if (_this.ninja.speedY === 0) {
                    //通常ジャンプ
                    _this.ninja.speedY = -11;
                    //ジャンプ時に巻物を閉じる
                    _this.closeScroll = true;
                }
                if (_this.ninja.inWater) {
                    //水中
                    if (_this.ninja.posY > -10) {
                        //2段ジャンプ実行限界高度に達していない
                        _this.ninja.speedY = -7;
                    }
                }
                _this.jButton = false;
            }
            if (_this.closeButton === true) {
                //巻物を閉じる（Enterキー等押下時）
                _this.closeScroll = true;
            }
            //重力加速度
            _this.ninja.speedY += _this.ninja.inWater ? 1.1 * Consts_1.TIME_STEP : 2.1 * Consts_1.TIME_STEP;
            //落下速度限界
            if (_this.ninja.inWater) {
                //水中
                if (_this.ninja.speedY > 2) {
                    _this.ninja.speedY = 2;
                }
            }
            else {
                //陸上
                if (_this.ninja.speedY > 10.5) {
                    _this.ninja.speedY = 10.5;
                }
            }
            //位置計算
            _this.ninja.posX += _this.ninja.speedX * Consts_1.TIME_STEP;
            _this.ninja.posY += _this.ninja.speedY * Consts_1.TIME_STEP;
            //オブジェクトとの接触判定
            for (var key in _this.objs) {
                //途中でステージ遷移したら、関数を中止するためのフラグ
                var stageChangedFlag = "";
                //当たり判定と、相対位置の取得
                var relativePos = CommonFnc.checkRelativity(_this.ninja, _this.objs[key]);
                //当たり判定結果確認
                if (relativePos) {
                    //当たり時の処理を実行
                    stageChangedFlag = _this.objs[key].onTouch(_this.ninja, relativePos);
                }
                //ステージ遷移をしていたら、関数中止
                if (stageChangedFlag === "changed")
                    return;
                //敵などが各タイムステップごとの処理を持っていれば、実行する
                //（ステージ遷移はしない）
                if (_this.objs[key].eachTime) {
                    _this.objs[key].eachTime(_this.ninja, key);
                }
            }
            /* ↑　物体速度・位置計算　↑ */
            //ページサイズ取得（ウィンドウサイズが変更された時のため）
            var pageSize = _this.getWindowSize();
            //画面の高さを90等分した長さを、このゲームの「単位長さ」とする
            UL = pageSize.pageHeight / 90;
            //物体の位置などを更新し、再描画
            _this.setState({
                screenStyle: __assign({ width: pageSize.pageWidth, height: pageSize.pageHeight - 15 * UL }, _this.backgroundSetting),
                ninjaStat: {
                    left: _this.ninja.boolLeft,
                    ninjaX: _this.ninja.posX * UL,
                    ninjaY: _this.ninja.posY * UL,
                }
            });
        }, Consts_1.TIME_STEP * 100);
        return _this;
    }
    Page2.prototype.componentWillUnmount = function () {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    };
    Page2.prototype.setStage = function (newStage) {
        //ステージのオブジェクトを設定
        this.objs = newStage.getObjs(this.ninja);
        //ステージの背景画像を設定
        this.bgImg = newStage.bgImg;
        //風 設定
        this.wind = newStage.windSpeed || 0;
    };
    Page2.prototype.render = function () {
        if (this.prevStage !== this.props.stage) {
            //ステージ変更時のみ1回実行
            //忍者のFireBallCountを0に戻す
            this.ninja.fireBallCount = 0;
            //水中判定を一旦falseとする（水中の場合は、各ステージにてtrueを代入）
            this.ninja.inWater = false;
            //------------------------------------------------------------
            // 各ステージの設定読み込み
            //------------------------------------------------------------
            if (this.props.stage === 1) {
                this.setStage(Stage01_1.default);
            }
            else if (this.props.stage === 2) {
                this.setStage(Stage02_1.default);
            }
            else if (this.props.stage === 3) {
                this.setStage(Stage03_1.default);
            }
            else if (this.props.stage === 4) {
                this.setStage(Stage04_1.default);
            }
            else if (this.props.stage === 5) {
                this.setStage(Stage05_1.default);
            }
            else if (this.props.stage === 6) {
                this.setStage(Stage06_1.default);
            }
            else if (this.props.stage === 7) {
                this.setStage(Stage07_1.default);
            }
            else if (this.props.stage === 8) {
                this.setStage(Stage08_1.default);
            }
            else if (this.props.stage === 9) {
                this.setStage(Stage09_1.default);
            }
            else if (this.props.stage === 10) {
                this.setStage(Stage10_1.default);
            }
            else if (this.props.stage === 11) {
                this.setStage(Stage11_1.default);
            }
            else if (this.props.stage === 12) {
                this.setStage(Stage12_1.default);
            }
            else if (this.props.stage === 13) {
                this.setStage(Stage13_1.default);
            }
            else if (this.props.stage === 14) {
                this.setStage(Stage14_1.default);
            }
            else if (this.props.stage === 15) {
                this.setStage(Stage15_1.default);
            }
            else if (this.props.stage === 16) {
                this.setStage(Stage16_1.default);
            }
            else if (this.props.stage === 17) {
                this.setStage(Stage17_1.default);
            }
            else if (this.props.stage === 18) {
                this.setStage(Stage18_1.default);
            }
            else if (this.props.stage === 19) {
                this.setStage(Stage19_1.default);
            }
            else if (this.props.stage === 20) {
                this.setStage(Stage20_1.default);
            }
            else if (this.props.stage === 21) {
                this.setStage(Stage21_1.default);
            }
            else if (this.props.stage === 22) {
                this.setStage(Stage22_1.default);
            }
            //------------------------------------------------------------
            //ステージ変更を検知するために、現在のステージを記憶
            this.prevStage = this.props.stage;
            //localStorageに自動セーブ
            var _a = this.ninja, game = _a.game, rest = __rest(_a, ["game"]);
            var saveData = { ninja: rest, stage: this.props.stage };
            localStorage.setItem('saveData3', JSON.stringify(saveData));
            //背景画像の変更
            this.backgroundSetting.backgroundImage = "url(" + this.bgImg + ")";
        }
        return (React.createElement("div", { id: "Page2", style: this.pageStyle },
            React.createElement("div", { id: "gameScreen", style: this.state.screenStyle },
                React.createElement(ninja_1.NinjaChar, { imgAlt: "Running Ninja", width: this.ninja.size * UL, x: this.state.ninjaStat.ninjaX, y: this.state.ninjaStat.ninjaY, boolLeft: this.state.ninjaStat.left }),
                React.createElement(RenderObjs, { game: this })),
            React.createElement("b", null,
                React.createElement(RenderScreenBottom, { onClickButton: GameCore.onClickButton.bind(this), onMouseUp: GameCore.onMouseUp.bind(this), terminalPC: this.terminalPC }))));
    };
    return Page2;
}(React.Component));
exports.Page2 = Page2;
exports.default = Page2;
function RenderObjs(props) {
    var objList = [];
    for (var key in props.game.objs) {
        objList.push(React.createElement(obj_1.Obj, { key: key, obj: props.game.objs[key], UL: UL, game: props.game }));
    }
    return React.createElement("span", null, objList);
}
function RenderScreenBottom(props) {
    //画面下部のボタンなどの表示の出し分け
    if (props.terminalPC) {
        //PCの場合、キーボード操作を促すメッセージ表示
        var styleDivPcMessage = {
            position: "absolute",
            top: 75 * UL,
            width: 160 * UL,
            height: 15 * UL,
            zIndex: "99999999",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        var styleTextPcMessage = {
            fontSize: "xx-large",
            color: "white",
        };
        return (React.createElement("div", { style: styleDivPcMessage },
            React.createElement("span", { style: styleTextPcMessage }, Messages_2.messages.PC_KEYBOARD)));
    }
    else {
        //スマホ・タブレットの場合、画面下部にボタンを表示
        return (React.createElement(RenderButtons, { onClickButton: props.onClickButton, onMouseUp: props.onMouseUp }));
    }
}
function RenderButtons(props) {
    //ボタンがあるテーブルのスタイル
    var controllerStyle = {
        position: "absolute",
        top: 75 * UL,
        width: 160 * UL,
        zIndex: "99999999",
        backgroundColor: "black",
    };
    //左右のボタンのスタイル
    var sideButtonStyle = {
        width: 30 * UL,
        height: 15 * UL,
        fontSize: 4 * UL + "px",
        margin: "1px",
    };
    //ジャンプボタンのスタイル
    var jumpButtonStyle = {
        width: 100 * UL,
        height: 15 * UL,
        fontSize: 4 * UL,
        margin: "1px",
    };
    return (React.createElement("table", { id: "controller", style: controllerStyle },
        React.createElement("tbody", null,
            React.createElement("tr", null,
                React.createElement("td", { align: "right" },
                    React.createElement("button", { style: sideButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("left"); }, onTouchStart: function () { props.onClickButton("left"); }, onMouseUp: function () { props.onMouseUp("left"); }, onMouseOut: function () { props.onMouseUp("left"); }, onTouchEnd: function () { props.onMouseUp("left"); } }, "＜")),
                React.createElement("td", { align: "center" },
                    React.createElement("button", { style: jumpButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("jump"); }, onTouchStart: function () { props.onClickButton("jump"); }, onMouseUp: function () { props.onMouseUp("jump"); }, onMouseOut: function () { props.onMouseUp("jump"); }, onTouchEnd: function () { props.onMouseUp("jump"); } }, "↑　jump　↑")),
                React.createElement("td", { align: "left" },
                    React.createElement("button", { style: sideButtonStyle, className: "btn btn-info btn-lg btn-block", onMouseDown: function () { props.onClickButton("right"); }, onTouchStart: function () { props.onClickButton("right"); }, onMouseUp: function () { props.onMouseUp("right"); }, onMouseOut: function () { props.onMouseUp("right"); }, onTouchEnd: function () { props.onMouseUp("right"); } }, "＞"))))));
}
