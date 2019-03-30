import React from 'react';


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
                    top: posY,
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: size,
                };

                let btnWidth = size / 3;
                let styleBtnClose = {
                    position: "absolute",
                    left: posX + size * 2 / 7,// 「2/7」はただの調整係数
                    top: posY + size * 4 / 15,// 「2/7」はただの調整係数
                    zIndex: zIndex + 1,
                    fontSize: fontSize,
                    width: btnWidth,
                };

                return (
                    <div>
                        <img
                            src={img}
                            style={styleImg}
                            alt={"object"}
                        />
                        <div style={styleTexts}>
                            <center>
                                <h1>{title}</h1>
                                <p>{message}</p>
                                <button
                                    style={styleBtnClose}
                                    onClick={() => { this.onClickOkButtonInScroll() }}
                                >
                                    {"Close"}
                                </button>
                            </center>
                        </div>
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

export { Obj };