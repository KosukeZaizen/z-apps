"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class Obj extends React.Component {
    constructor(props) {
        super(props);
        this.onClickOkButtonInScroll = this.onClickOkButtonInScroll.bind(this);
    }
    onClickOkButtonInScroll() {
        this.props.obj.visible = false;
    }
    render() {
        let UL = this.props.UL;
        let img = this.props.obj.img;
        if (this.props.obj.scroll) {
            //画面全体に表示するメッセージを含んだ巻物
            if (this.props.obj.visible === true) {
                //巻物表示時
                let size = this.props.obj.size * UL;
                let posX = this.props.obj.posX * UL;
                let posY = this.props.obj.posY * UL;
                let zIndex = this.props.obj.zIndex;
                let fontSize = this.props.obj.fontSize * UL || 4 * UL;
                let title = this.props.obj.title;
                let message = this.props.obj.message;
                let speakerImg = this.props.obj.speakerImg;
                let styleImg = {
                    position: "absolute",
                    left: posX,
                    top: posY,
                    zIndex: zIndex,
                    width: size,
                };
                let styleTexts = {
                    position: "absolute",
                    left: posX,
                    top: posY + (size * 9 / 100),
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: size,
                    lineHeight: fontSize / 20,
                };
                let h1Style = {
                    margin: size / 50,
                    fontSize: fontSize * 3 / 2,
                };
                let btnWidth = size / 3;
                let styleBtnClose = {
                    position: "absolute",
                    left: posX + size / 3,
                    top: posY + size * 3 / 10,
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: btnWidth,
                };
                let arrlines = message.split("\n");
                const listlines = arrlines.map((line, index) => React.createElement("p", { key: index }, line));
                return (React.createElement("div", null,
                    React.createElement("img", { src: img, style: styleImg, alt: "ninja game object" }),
                    React.createElement("div", { style: styleTexts },
                        React.createElement("div", { className: "center" },
                            React.createElement("h1", { style: h1Style }, title),
                            React.createElement("span", null, listlines))),
                    React.createElement(CloseElement, { className: "btn btn-dark btn-lg btn-block", style: styleBtnClose, onClick: () => { this.onClickOkButtonInScroll(); }, styleBtnClose: styleBtnClose, obj: this.props.obj, game: this.props.game }),
                    React.createElement(SpeakerImage, { img: speakerImg, size: size, zIndex: zIndex, posX: posX, posY: posY })));
            }
            else {
                //visible falseの場合、巻物を表示しない
                return React.createElement("div", null);
            }
        }
        else if (img) {
            //imgという引数を受け取っている場合、画像要素を生成
            let fireContinueTime = this.props.obj.fireContinueTime;
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
                    let rotateLeft = this.props.obj.boolLeft ? "scale(-1, 1)" : "";
                    let img = this.props.obj.img;
                    let size = this.props.obj.size * UL;
                    let posX = this.props.obj.posX * UL;
                    let posY = this.props.obj.posY * UL;
                    let zIndex = this.props.obj.zIndex;
                    let style = {
                        position: "absolute",
                        left: posX,
                        top: posY,
                        transform: rotateLeft,
                        zIndex: zIndex,
                    };
                    return (React.createElement("img", { src: img, width: size, style: style, alt: "ninja game object" }));
                }
                else {
                    //visibleがfalse
                    return React.createElement("div", null);
                }
            }
            else {
                //fireContinueTimeという要素を持っていない場合、通常の画像要素とみなす
                let rotateLeft = this.props.obj.boolLeft ? "scale(-1, 1)" : "";
                let img = this.props.obj.img;
                let size = this.props.obj.size * UL;
                let posX = this.props.obj.posX * UL;
                let posY = this.props.obj.posY * UL;
                let zIndex = this.props.obj.zIndex;
                let style = {
                    position: "absolute",
                    left: posX,
                    top: posY,
                    transform: rotateLeft,
                    zIndex: zIndex,
                };
                return (React.createElement("img", { src: img, width: size, style: style, alt: "ninja game object" }));
            }
        }
        else if (this.props.obj.divType) {
            //水や、画面の外を黒くするためのdiv要素
            //divTypeの中の文字列がそのままclass名になり、CSSが効く
            let size = this.props.obj.size * UL;
            let posX = this.props.obj.posX * UL;
            let posY = this.props.obj.posY * UL;
            let zIndex = this.props.obj.zIndex;
            let style = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                width: size,
                height: size,
            };
            return (React.createElement("div", { style: style, className: this.props.obj.divType }));
        }
        else {
            //該当の引数を受け取っていない場合、div要素を生成
            let size = this.props.obj.size * UL;
            let posX = this.props.obj.posX * UL;
            let posY = this.props.obj.posY * UL;
            let zIndex = this.props.obj.zIndex;
            let fontSize = this.props.obj.fontSize * UL || 4 * UL;
            let message = this.props.obj.message;
            let style = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                fontSize: fontSize,
                width: size,
            };
            return (React.createElement("div", { style: style }, message));
        }
    }
}
exports.default = Obj;
exports.Obj = Obj;
//巻物に話者の画像がついていた場合、それも表示する
function SpeakerImage(props) {
    let img = props.img;
    if (img) {
        let size = props.size / 10;
        let zIndex = props.zIndex + 3;
        let posX = props.posX + size * 1.3;
        let posY = props.posY + size * 0.5;
        let style = {
            position: "absolute",
            left: posX,
            top: posY,
            zIndex: zIndex,
        };
        return (React.createElement("img", { src: img, width: size, alt: "ninja game object", style: style }));
    }
    else {
        return React.createElement("div", null);
    }
}
function CloseElement(props) {
    if (props.obj.finalMessage) {
        //localStorageに自動セーブ（次回起動時データ）
        const saveData = {
            ninja: null,
            stage: 1,
        };
        localStorage.setItem('saveData1', JSON.stringify(saveData));
        //タイムステップ毎のループの終了
        clearInterval(props.game.timerId);
        //全クリ時のメッセージ
        return (React.createElement(react_router_dom_1.Link, { to: "/ninja2" },
            React.createElement("button", { className: "btn btn-dark btn-lg btn-block", style: props.styleBtnClose }, "Next Chapter")));
    }
    else {
        //全クリ時のメッセージでない通常メッセージ
        if (props.game.closeScroll) {
            //ジャンプボタンが押されていたら、巻物を閉じる
            props.onClick();
            props.game.closeScroll = false;
        }
        return (React.createElement("button", { className: "btn btn-dark btn-lg btn-block", style: props.styleBtnClose, onClick: () => { props.onClick(); } }, "Close"));
    }
}
