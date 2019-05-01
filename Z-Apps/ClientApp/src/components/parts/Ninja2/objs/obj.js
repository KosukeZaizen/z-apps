import React from 'react';
import { Link } from 'react-router-dom';

export default class Obj extends React.Component {

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
                const listlines = arrlines.map((line, index) =>
                    <p key={index}>{line}</p>
                );

                return (
                    <div>
                        <img
                            src={img}
                            style={styleImg}
                            alt={"object"}
                        />
                        <div style={styleTexts}>
                            <center>
                                <h1 style={h1Style}>{title}</h1>
                                <span>{listlines}</span>
                            </center>
                        </div>
                        <CloseElement
                            className={"btn btn-dark btn-lg btn-block"}
                            style={styleBtnClose}
                            onClick={() => { this.onClickOkButtonInScroll() }}
                            styleBtnClose={styleBtnClose}
                            obj={this.props.obj}
                        />
                        <SpeakerImage
                            img={speakerImg}
                            size={size}
                            zIndex={zIndex}
                            posX={posX}
                            posY={posY}
                        />
                    </div>
                );
            } else {
                //visible falseの場合、巻物を表示しない
                return <div></div>;
            }

        } else if (img) {
            //imgという引数を受け取っている場合、画像要素を生成
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
            return (
                <img
                    src={img}
                    width={size}
                    style={style}
                    alt={"object"}
                />
            );
        } else if (this.props.obj.divType) {
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
            return (
                <div
                    style={style} className={this.props.obj.divType}
                >
                </div>
            );
        } else {
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
            };
            return (
                <div
                    width={size}
                    style={style}
                >
                    {message}
                </div>
            );
        }
    }
}

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
        }

        return (
            <img
                src={img}
                width={size}
                alt={"object"}
                style={style}
            />
        );
    } else {
        return <div></div>;
    }
}

function CloseElement(props) {
    if (props.obj.finalMessage) {
        //全クリ時のメッセージ
        return (
            <Link to="/">
                <button
                    className={"btn btn-dark btn-lg btn-block"}
                    style={props.styleBtnClose}
                >
                    {"Exit Game"}
                </button>
            </Link>
        );
    } else {
        //全クリ時のメッセージでない通常メッセージ
        return (
            <button
                className={"btn btn-dark btn-lg btn-block"}
                style={props.styleBtnClose}
                onClick={() => { props.onClick() }}
            >
                {"Close"}
            </button>
        );
    }
}

export { Obj };