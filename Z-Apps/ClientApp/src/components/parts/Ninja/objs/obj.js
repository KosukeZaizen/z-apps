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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Obj = /** @class */ (function (_super) {
    __extends(Obj, _super);
    function Obj(props) {
        var _this = _super.call(this, props) || this;
        _this.onClickOkButtonInScroll = _this.onClickOkButtonInScroll.bind(_this);
        return _this;
    }
    Obj.prototype.onClickOkButtonInScroll = function () {
        this.props.obj.visible = false;
    };
    Obj.prototype.render = function () {
        var _this = this;
        var UL = this.props.UL;
        var img = this.props.obj.img;
        if (this.props.obj.scroll) {
            //画面全体に表示するメッセージを含んだ巻物
            if (this.props.obj.visible === true) {
                //巻物表示時
                var size = this.props.obj.size * UL;
                var posX = this.props.obj.posX * UL;
                var posY = this.props.obj.posY * UL;
                var zIndex = this.props.obj.zIndex;
                var fontSize = this.props.obj.fontSize * UL || 4 * UL;
                var title = this.props.obj.title;
                var message = this.props.obj.message;
                var speakerImg = this.props.obj.speakerImg;
                var styleImg = {
                    position: "absolute",
                    left: posX,
                    top: posY,
                    zIndex: zIndex,
                    width: size,
                };
                var styleTexts = {
                    position: "absolute",
                    left: posX,
                    top: posY + (size * 9 / 100),
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: size,
                    lineHeight: fontSize / 20,
                };
                var h1Style = {
                    margin: size / 50,
                    fontSize: fontSize * 3 / 2,
                };
                var btnWidth = size / 3;
                var styleBtnClose = {
                    position: "absolute",
                    left: posX + size / 3,
                    top: posY + size * 3 / 10,
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: btnWidth,
                };
                var arrlines = message.split("\n");
                var listlines = arrlines.map(function (line, index) {
                    return <p key={index}>{line}</p>;
                });
                return (<div>
                        <img src={img} style={styleImg} alt={"ninja game object"}/>
                        <div style={styleTexts}>
                            <center>
                                <h1 style={h1Style}>{title}</h1>
                                <span>{listlines}</span>
                            </center>
                        </div>
                        <CloseElement className={"btn btn-dark btn-lg btn-block"} style={styleBtnClose} onClick={function () { _this.onClickOkButtonInScroll(); }} styleBtnClose={styleBtnClose} obj={this.props.obj} game={this.props.game}/>
                        <SpeakerImage img={speakerImg} size={size} zIndex={zIndex} posX={posX} posY={posY}/>
                    </div>);
            }
            else {
                //visible falseの場合、巻物を表示しない
                return <div></div>;
            }
        }
        else if (img) {
            //imgという引数を受け取っている場合、画像要素を生成
            var fireContinueTime = this.props.obj.fireContinueTime;
            if (fireContinueTime) {
                //fireContinueTimeを持っている場合、条件に応じて出現する要素とみなす
                if (this.props.obj.visible) {
                    //地蔵に触れることでvisibleがtrueになった
                    if (!this.props.obj.fireContinueCount) {
                        //初回のためカウントが無ければ、初期値を代入
                        this.props.obj.fireContinueCount = fireContinueTime;
                    }
                    else if (this.props.obj.fireContinueCount <= 1) {
                        //カウント終了時
                        if (this.props.game.objs.haniwa
                            && Math.pow((this.props.game.objs.haniwa.posX - this.props.game.objs.jizo1.posX), 2) < 100
                            && Math.pow((this.props.game.objs.haniwa.posY - this.props.game.objs.jizo1.posY), 2) < 100) {
                            this.props.obj.visible = true;
                            this.props.obj.fireContinueCount = fireContinueTime;
                        }
                        else {
                            this.props.obj.visible = false;
                            this.props.obj.fireContinueCount = fireContinueTime;
                        }
                    }
                    else {
                        //カウント中
                        this.props.obj.fireContinueCount -= 1;
                    }
                    var rotateLeft = this.props.obj.boolLeft ? "scale(-1, 1)" : "";
                    var img_1 = this.props.obj.img;
                    var size = this.props.obj.size * UL;
                    var posX = this.props.obj.posX * UL;
                    var posY = this.props.obj.posY * UL;
                    var zIndex = this.props.obj.zIndex;
                    var style = {
                        position: "absolute",
                        left: posX,
                        top: posY,
                        transform: rotateLeft,
                        zIndex: zIndex,
                    };
                    return (<img_1 src={img_1} width={size} style={style} alt={"ninja game object"}/>);
                }
                else {
                    //visibleがfalse
                    return <div></div>;
                }
            }
            else {
                //fireContinueTimeという要素を持っていない場合、通常の画像要素とみなす
                var rotateLeft = this.props.obj.boolLeft ? "scale(-1, 1)" : "";
                var img_2 = this.props.obj.img;
                var size = this.props.obj.size * UL;
                var posX = this.props.obj.posX * UL;
                var posY = this.props.obj.posY * UL;
                var zIndex = this.props.obj.zIndex;
                var style = {
                    position: "absolute",
                    left: posX,
                    top: posY,
                    transform: rotateLeft,
                    zIndex: zIndex,
                };
                return (<img_2 src={img_2} width={size} style={style} alt={"ninja game object"}/>);
            }
        }
        else if (this.props.obj.divType) {
            //水や、画面の外を黒くするためのdiv要素
            //divTypeの中の文字列がそのままclass名になり、CSSが効く
            var size = this.props.obj.size * UL;
            var posX = this.props.obj.posX * UL;
            var posY = this.props.obj.posY * UL;
            var zIndex = this.props.obj.zIndex;
            var style = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                width: size,
                height: size,
            };
            return (<div style={style} className={this.props.obj.divType}>
                </div>);
        }
        else {
            //該当の引数を受け取っていない場合、div要素を生成
            var size = this.props.obj.size * UL;
            var posX = this.props.obj.posX * UL;
            var posY = this.props.obj.posY * UL;
            var zIndex = this.props.obj.zIndex;
            var fontSize = this.props.obj.fontSize * UL || 4 * UL;
            var message = this.props.obj.message;
            var style = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                fontSize: fontSize,
            };
            return (<div width={size} style={style}>
                    {message}
                </div>);
        }
    };
    return Obj;
}(React.Component));
exports.Obj = Obj;
exports.default = Obj;
//巻物に話者の画像がついていた場合、それも表示する
function SpeakerImage(props) {
    var img = props.img;
    if (img) {
        var size = props.size / 10;
        var zIndex = props.zIndex + 3;
        var posX = props.posX + size * 1.3;
        var posY = props.posY + size * 0.5;
        var style = {
            position: "absolute",
            left: posX,
            top: posY,
            zIndex: zIndex,
        };
        return (<img src={img} width={size} alt={"ninja game object"} style={style}/>);
    }
    else {
        return <div></div>;
    }
}
function CloseElement(props) {
    if (props.obj.finalMessage) {
        //localStorageに自動セーブ（次回起動時データ）
        var saveData = {
            ninja: null,
            stage: 1,
        };
        localStorage.setItem('saveData1', JSON.stringify(saveData));
        //タイムステップ毎のループの終了
        clearInterval(props.game.timerId);
        //全クリ時のメッセージ
        return (<react_router_dom_1.Link to="/ninja2">
                <button className={"btn btn-dark btn-lg btn-block"} style={props.styleBtnClose}>
                    {"Next Chapter"}
                </button>
            </react_router_dom_1.Link>);
    }
    else {
        //全クリ時のメッセージでない通常メッセージ
        if (props.game.closeScroll) {
            //ジャンプボタンが押されていたら、巻物を閉じる
            props.onClick();
            props.game.closeScroll = false;
        }
        return (<button className={"btn btn-dark btn-lg btn-block"} style={props.styleBtnClose} onClick={function () { props.onClick(); }}>
                {"Close"}
            </button>);
    }
}
