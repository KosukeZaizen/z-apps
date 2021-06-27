import * as React from "react";
import { Link } from "react-router-dom";
import * as Consts from "../Consts";

export default class Obj extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onClickOkButtonInScroll = this.onClickOkButtonInScroll.bind(this);
    }

    onClickOkButtonInScroll() {
        this.props.obj.visible = false;
    }

    render() {
        if (!this.props.obj) return <span></span>;

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
                let fontSize = (this.props.obj.fontSize || 4) * UL;
                let title = this.props.obj.title;
                let message = this.props.obj.message;
                let speakerImg = this.props.obj.speakerImg;

                let styleImg: any = {
                    position: "absolute",
                    left: posX,
                    top: posY,
                    zIndex: zIndex,
                    width: size,
                };

                let styleTexts: any = {
                    position: "absolute",
                    left: posX,
                    top: posY + (size * 9) / 100,
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: size,
                    lineHeight: fontSize / 20,
                };

                let h1Style: any = {
                    margin: size / 50,
                    fontSize: (fontSize * 3) / 2,
                };

                let btnWidth = size / 3;
                let styleBtnClose: any = {
                    position: "absolute",
                    left: posX + size / 3,
                    top: posY + (size * 3) / 10,
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: btnWidth,
                };

                let arrlines = message.split("\n");
                const listlines = arrlines.map(
                    (line: string, index: number) => (
                        <p key={index} style={{ fontSize: fontSize }}>
                            {line}
                        </p>
                    )
                );

                return (
                    <div>
                        <img
                            src={img}
                            style={styleImg}
                            alt={"ninja game object"}
                        />
                        <div style={styleTexts}>
                            <div className="center">
                                <h1 style={h1Style}>{title}</h1>
                                <span>{listlines}</span>
                            </div>
                        </div>
                        <CloseElement
                            className={"btn btn-dark btn-lg btn-block"}
                            style={styleBtnClose}
                            onClick={() => {
                                this.onClickOkButtonInScroll();
                            }}
                            styleBtnClose={styleBtnClose}
                            obj={this.props.obj}
                            game={this.props.game}
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
            let opacity = this.props.obj.opacity;

            let style: any = {
                position: "absolute",
                left: posX,
                top: posY,
                transform: rotateLeft,
                zIndex: zIndex,
                opacity: opacity,
            };
            return <img src={img} width={size} style={style} alt={"object"} />;
        } else if (this.props.obj.divType) {
            //水や、画面の外を黒くするためのdiv要素
            //divTypeの中の文字列がそのままclass名になり、CSSが効く
            let size = this.props.obj.size * UL;
            let posX = this.props.obj.posX * UL;
            let posY = this.props.obj.posY * UL;
            let zIndex = this.props.obj.zIndex;

            let style: any = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                width: size,
                height: size,
            };
            return <div style={style} className={this.props.obj.divType}></div>;
        } else {
            //該当の引数を受け取っていない場合、div要素を生成
            let size = this.props.obj.size * UL;
            let posX = this.props.obj.posX * UL;
            let posY = this.props.obj.posY * UL;
            let zIndex = this.props.obj.zIndex;
            let fontSize = this.props.obj.fontSize * UL || 4 * UL;
            let message = this.props.obj.message;
            let fontColor = this.props.obj.fontColor;

            let style: any = {
                position: "absolute",
                left: posX,
                top: posY,
                zIndex: zIndex,
                fontSize: fontSize,
                color: fontColor,
                width: size,
                textAlign: "left",
            };
            return <div style={style}>{message}</div>;
        }
    }
}

//巻物に話者の画像がついていた場合、それも表示する
function SpeakerImage(props: any) {
    let img = props.img;

    if (img) {
        let size = props.size / 10;
        let zIndex = props.zIndex + 3;
        let posX = props.posX + size * 1.3;
        let posY = props.posY + size * 0.5;

        let style: any = {
            position: "absolute",
            left: posX,
            top: posY,
            zIndex: zIndex,
        };

        return <img src={img} width={size} alt={"object"} style={style} />;
    } else {
        return <div></div>;
    }
}

function CloseElement(props: any) {
    if (props.obj.finalMessage) {
        //全クリ時のメッセージ

        //localStorageに自動セーブ（次回起動時データ）
        const saveData = {
            ninja: null,
            stage: 1,
        };
        localStorage.setItem(Consts.SAVE_NAME, JSON.stringify(saveData));

        //タイムステップ毎のループの終了
        clearInterval(props.game.timerId);

        return (
            <Link to="/ninja">
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
        if (props.game.closeScroll) {
            //ジャンプボタンが押されていたら、巻物を閉じる
            props.onClick();
            props.game.closeScroll = false;
        }
        return (
            <button
                className={"btn btn-dark btn-lg btn-block"}
                style={props.styleBtnClose}
                onClick={() => {
                    props.onClick();
                }}
            >
                {"Close"}
            </button>
        );
    }
}
export { Obj };
