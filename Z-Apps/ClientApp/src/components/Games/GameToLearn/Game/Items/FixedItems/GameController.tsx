import Button from "@material-ui/core/Button/Button";
import React from "react";
import { gameOpenAnimationTime } from "../../../GameFrame";
import { gameState } from "../../GameState";
import { Renderable } from "../StageItems";

function changeLeftButtonState(isClick: boolean) {
    gameState.controller.isLeftButtonClicked = isClick;
}

function changeRightButtonState(isClick: boolean) {
    gameState.controller.isRightButtonClicked = isClick;
}

function changeJumpButtonState(isClick: boolean) {
    gameState.controller.isJumpButtonClicked = isClick;
}

function onClickClose(isClick: boolean) {
    if (isClick) {
        gameState.menu.isMenuOpen = !gameState.menu.isMenuOpen;
    }
}

export class GameController extends Renderable {
    isTerminalPC: boolean;

    constructor() {
        super();
        this.isTerminalPC = !navigator.userAgent.match(
            /(iPhone|iPad|iPod|Android)/i
        );
        this.setKeyboardEvent();
    }

    setKeyboardEvent() {
        const getKeyEventFnc = function (isClick: boolean) {
            return function (e: any) {
                if (!e) e = window.event; // レガシー

                switch (e.keyCode) {
                    case 37: {
                        changeLeftButtonState(isClick);
                        break;
                    }
                    case 39: {
                        changeRightButtonState(isClick);
                        break;
                    }
                    case 13:
                    case 8:
                    case 46:
                    case 27: {
                        onClickClose(isClick);
                        break;
                    }
                    case 32:
                    case 38: {
                        changeJumpButtonState(isClick);
                    }
                }
            };
        };
        document.onkeydown = getKeyEventFnc(true);
        document.onkeyup = getKeyEventFnc(false);
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
                        <SmartPhoneButtons UL={UL} />
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
                transition: gameOpenAnimationTime,
            }}
        >
            <span
                style={{
                    fontSize: 5 * UL,
                    color: "white",
                    transition: gameOpenAnimationTime,
                }}
            >
                On a PC, please use [←], [↑], and [→] keys to play!
            </span>
        </div>
    );
}

function SmartPhoneButtons({ UL }: { UL: number }) {
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
                    changeLeftButtonState(true);
                }}
                onTouchStart={() => {
                    changeLeftButtonState(true);
                }}
                onMouseUp={() => {
                    changeLeftButtonState(false);
                }}
                onMouseOut={() => {
                    changeLeftButtonState(false);
                }}
                onTouchEnd={() => {
                    changeLeftButtonState(false);
                }}
                onTouchCancel={() => {
                    changeLeftButtonState(false);
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
                    changeJumpButtonState(true);
                }}
                onTouchStart={() => {
                    changeJumpButtonState(true);
                }}
                onMouseUp={() => {
                    changeJumpButtonState(false);
                }}
                onMouseOut={() => {
                    changeJumpButtonState(false);
                }}
                onTouchEnd={() => {
                    changeJumpButtonState(false);
                }}
                onTouchCancel={() => {
                    changeJumpButtonState(false);
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
                    changeRightButtonState(true);
                }}
                onTouchStart={() => {
                    changeRightButtonState(true);
                }}
                onMouseUp={() => {
                    changeRightButtonState(false);
                }}
                onMouseOut={() => {
                    changeRightButtonState(false);
                }}
                onTouchEnd={() => {
                    changeRightButtonState(false);
                }}
                onTouchCancel={() => {
                    changeRightButtonState(false);
                }}
            />
        </>
    );
}
