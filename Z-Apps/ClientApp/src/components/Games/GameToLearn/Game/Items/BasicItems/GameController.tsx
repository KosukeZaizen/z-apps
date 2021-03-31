import { Button } from "@material-ui/core";
import React from "react";
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
        this.setKeyboardEvent();
    }

    //ボタン押下時処理
    onClickButton = (buttonName: ButtonName) => {
        this.setButtonStatus[buttonName](true);
    };

    //ボタン押下終了時処理
    onMouseUp = (buttonName: ButtonName) => {
        this.setButtonStatus[buttonName](false);
    };

    setKeyboardEvent() {
        const that = this;
        document.onkeydown = function (e: any) {
            if (!e) e = window.event; // レガシー

            switch (e.keyCode) {
                case 37: {
                    that.onClickButton("left");
                    break;
                }
                case 39: {
                    that.onClickButton("right");
                    break;
                }
                case 32:
                case 38:
                case 13:
                case 8:
                case 46:
                case 27: {
                    that.onClickButton("jump");
                }
            }

            document.onkeyup = function (e: any) {
                if (!e) e = window.event; // レガシー

                switch (e.keyCode) {
                    case 37: {
                        that.onMouseUp("left");
                        break;
                    }
                    case 39: {
                        that.onMouseUp("right");
                        break;
                    }
                    case 32:
                    case 38:
                    case 13:
                    case 8:
                    case 46:
                    case 27: {
                        that.onMouseUp("jump");
                    }
                }
            };
        };
    }

    renderItem(UL: number) {
        return (
            UL && (
                <div
                    key="game controller"
                    style={{ position: "absolute", top: 0, left: 0 }}
                >
                    {this.isTerminalPC ? (
                        <PCMessage UL={UL} />
                    ) : (
                        <SmartPhoneButtons
                            onClickButton={this.onClickButton}
                            onMouseUp={this.onMouseUp}
                            UL={UL}
                        />
                    )}
                </div>
            )
        );
    }
}

function PCMessage({ UL }: { UL: number }) {
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
                transition: "1s",
            }}
        >
            <span
                style={{
                    fontSize: 5 * UL,
                    color: "white",
                    transition: "1s",
                }}
            >
                On a PC, please use [←], [↑], and [→] keys to play!
            </span>
        </div>
    );
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
                variant="contained"
                color="primary"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 0,
                    height: 13 * UL,
                    width: 35 * UL,
                    zIndex: 10001,
                    fontSize: 5 * UL,
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
                onTouchCancel={() => {
                    onMouseUp("left");
                }}
            />
            <Button
                variant="contained"
                color="primary"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 37 * UL,
                    height: 13 * UL,
                    width: 86 * UL,
                    zIndex: 10001,
                    fontSize: 5 * UL,
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
                onTouchCancel={() => {
                    onMouseUp("jump");
                }}
            />
            <Button
                variant="contained"
                color="primary"
                style={{
                    position: "absolute",
                    top: 77 * UL,
                    left: 125 * UL,
                    height: 13 * UL,
                    width: 35 * UL,
                    zIndex: 10001,
                    fontSize: 5 * UL,
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
                onTouchCancel={() => {
                    onMouseUp("right");
                }}
            />
        </>
    );
}
