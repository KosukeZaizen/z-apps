import React from "react";
import { Button } from "reactstrap";
import { Renderable } from "../StageItems";

type ButtonName = "right" | "left" | "jump";
export type ButtonClickStatus = { [key in ButtonName]: boolean };
type OnButtonEvent = (keyType: ButtonName) => void;

type SetButtonStatus = {
    [key in ButtonName]: React.Dispatch<React.SetStateAction<boolean>>;
};

// 画面からはみ出したコンポーネントを隠すための黒いフレーム
export class GameController extends Renderable {
    isTerminalPC: boolean;
    setButtonStatus: SetButtonStatus;

    constructor(setButtonStatus: SetButtonStatus) {
        super();
        this.isTerminalPC = !navigator.userAgent.match(
            /(iPhone|iPad|iPod|Android)/i
        );
        this.setButtonStatus = setButtonStatus;
    }

    //ボタン押下時処理
    onClickButton = (buttonName: ButtonName) => {
        this.setButtonStatus[buttonName](true);
    };

    //ボタン押下終了時処理
    onMouseUp = (buttonName: ButtonName) => {
        this.setButtonStatus[buttonName](false);
    };

    renderItem(UL: number) {
        if (this.isTerminalPC) {
            return (
                <div
                    style={{
                        position: "absolute",
                        top: 75 * UL,
                        width: 160 * UL,
                        height: 15 * UL,
                        zIndex: 10001,
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: 5 * UL,
                            color: "white",
                        }}
                    >
                        On a PC, please use [←], [↑], and [→] keys to play!
                    </span>
                </div>
            );
        } else {
            return (
                <SmartPhoneButtons
                    onClickButton={this.onClickButton}
                    onMouseUp={this.onMouseUp}
                    UL={UL}
                />
            );
        }
    }
}

function SmartPhoneButtons({
    onClickButton,
    onMouseUp,
    UL,
}: {
    onClickButton: OnButtonEvent;
    onMouseUp: OnButtonEvent;
    UL: number;
}) {
    return (
        <>
            <Button
                color="info"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 0,
                    height: 13 * UL,
                    width: 35 * UL,
                    zIndex: 10001,
                }}
            >
                {"＜"}
            </Button>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: -10 * UL,
                    height: 95 * UL,
                    width: 46 * UL,
                    zIndex: 10002,
                }}
                onMouseDown={() => {
                    onClickButton("left");
                }}
                onTouchStart={() => {
                    onClickButton("left");
                }}
                onMouseUp={() => {
                    onMouseUp("left");
                }}
                onMouseOut={() => {
                    onMouseUp("left");
                }}
                onTouchEnd={() => {
                    onMouseUp("left");
                }}
            />
            <Button
                color="info"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 37 * UL,
                    height: 13 * UL,
                    width: 86 * UL,
                    zIndex: 10001,
                }}
            >
                {"↑ jump ↑"}
            </Button>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 36 * UL,
                    height: 95 * UL,
                    width: 88 * UL,
                    zIndex: 10002,
                }}
                onMouseDown={() => {
                    onClickButton("jump");
                }}
                onTouchStart={() => {
                    onClickButton("jump");
                }}
                onMouseUp={() => {
                    onMouseUp("jump");
                }}
                onMouseOut={() => {
                    onMouseUp("jump");
                }}
                onTouchEnd={() => {
                    onMouseUp("jump");
                }}
            />
            <Button
                color="info"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 125 * UL,
                    height: 13 * UL,
                    width: 35 * UL,
                    zIndex: 10001,
                }}
            >
                {"＞"}
            </Button>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 124 * UL,
                    height: 95 * UL,
                    width: 46 * UL,
                    zIndex: 10002,
                }}
                onMouseDown={() => {
                    onClickButton("right");
                }}
                onTouchStart={() => {
                    onClickButton("right");
                }}
                onMouseUp={() => {
                    onMouseUp("right");
                }}
                onMouseOut={() => {
                    onMouseUp("right");
                }}
                onTouchEnd={() => {
                    onMouseUp("right");
                }}
            />
        </>
    );
}

// function setKeyboardEvent() {
//     // ------------------------------------------------------------
//     // キーボードを押したときに実行されるイベント
//     // ------------------------------------------------------------
//     document.onkeydown = function (e: any) {
//         if (!e) e = window.event; // レガシー

//         // ------------------------------------------------------------
//         // 入力情報を取得
//         // ------------------------------------------------------------
//         // キーコード
//         let keyCode = e.keyCode;
//         let keyType;
//         if (keyCode === 37) {
//             keyType = "left";
//         } else if (keyCode === 39) {
//             keyType = "right";
//         } else if (keyCode === 38) {
//             keyType = "jump";
//         } else if (keyCode === 32) {
//             keyType = "jump";
//         } else if (
//             keyCode === 13 ||
//             keyCode === 8 ||
//             keyCode === 46 ||
//             keyCode === 27
//         ) {
//             keyType = "close";
//         }
//         objGame.onClickButton(keyType);
//     };

//     // ------------------------------------------------------------
//     // キーボードを離したときに実行されるイベント
//     // ------------------------------------------------------------
//     document.onkeyup = function (e: any) {
//         if (!e) e = window.event; // レガシー

//         // キーコード
//         let keyCode = e.keyCode;
//         let keyType;
//         if (keyCode === 37) {
//             keyType = "left";
//         } else if (keyCode === 39) {
//             keyType = "right";
//         } else if (keyCode === 38) {
//             keyType = "jump";
//         } else if (keyCode === 32) {
//             keyType = "jump";
//         } else if (
//             keyCode === 13 ||
//             keyCode === 8 ||
//             keyCode === 46 ||
//             keyCode === 27
//         ) {
//             keyType = "close";
//         }
//         onMouseUp(keyType);
//     };
// }
