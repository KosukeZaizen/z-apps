import { Button, Slide } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { gameOpenAnimationTime } from "../../../GameFrame";
import { gameState } from "../../GameState";
import { Renderable } from "../StageItems";

// ゲームメニューボタン
export class Menu extends Renderable {
    renderItem(UL: number, children: JSX.Element | JSX.Element[]) {
        const { menu } = gameState;
        const [isChildrenMounted, setIsChildrenMounted] = useState(
            menu.isMenuOpen
        );

        useEffect(() => {
            const time = menu.isMenuOpen ? 0 : 500;
            setTimeout(() => {
                setIsChildrenMounted(menu.isMenuOpen);
            }, time);
        }, [menu.isMenuOpen]);

        useEffect(() => {
            const { pathname } = window.location;
            if (pathname === "/game") {
                // パスがgameの時のみ、初期時点でメニューを開かない
                gameState.menu.isMenuOpen = false;
            } else {
                // パスがゲーム以外の時は、初期時点でメニューパネルを開く
                gameState.menu.isMenuOpen = true;
            }
        }, []);

        return (
            <GameMenu
                key="game menu"
                UL={UL}
                open={menu.isMenuOpen}
                setOpen={open => {
                    menu.isMenuOpen = open;
                }}
                isChildrenMounted={isChildrenMounted}
            >
                {children}
            </GameMenu>
        );
    }
}

function GameMenu({
    UL,
    open,
    setOpen,
    children,
    isChildrenMounted,
}: {
    UL: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: JSX.Element | JSX.Element[];
    isChildrenMounted: boolean;
}) {
    return (
        <>
            {UL && (
                <MenuButton
                    UL={UL}
                    open={open}
                    onClick={() => setOpen(!open)}
                />
            )}
            <div
                style={{
                    backgroundColor: "white",
                    opacity: 0.5,
                    position: "absolute",
                    top: 1 * UL,
                    left: 139 * UL,
                    width: 20 * UL,
                    height: open ? 50 * UL : 0,
                    transition: "500ms",
                    zIndex: 20004,
                    borderRadius: UL,
                }}
            ></div>
            <MenuScreen
                UL={UL}
                open={open}
                isChildrenMounted={isChildrenMounted}
            >
                {children}
            </MenuScreen>
            <BlackLayer open={open} UL={UL} onClick={() => setOpen(false)} />
        </>
    );
}

function MenuButton({
    UL,
    open,
    onClick,
}: {
    UL: number;
    open: boolean;
    onClick: () => void;
}) {
    return (
        <Button
            variant="contained"
            color={open ? "secondary" : "primary"}
            style={{
                zIndex: 20005,
                position: "absolute",
                top: 1 * UL,
                left: 139 * UL,
                width: 20 * UL,
                height: 6 * UL,
                fontSize: 3 * UL,
                fontWeight: "bold",
                opacity: open ? 1 : 0.9,
                transitionDuration: gameOpenAnimationTime,
            }}
            onClick={onClick}
        >
            {open ? "Close" : "Menu"}
        </Button>
    );
}

function MenuScreen({
    UL,
    open,
    isChildrenMounted,
    children,
}: {
    UL: number;
    open: boolean;
    isChildrenMounted: boolean;
    children: JSX.Element | JSX.Element[];
}) {
    return (
        <div
            style={{
                position: "absolute",
                top: 1 * UL,
                right: open ? 21 * UL : 1,
                width: open ? 138 * UL : 0,
                height: open ? 88 * UL : 0,
                transition: gameOpenAnimationTime,
                zIndex: 20002,
                backgroundColor: "white",
                borderRadius: 3 * UL,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    marginTop: 3 * UL,
                    width: 138 * UL,
                    height: 82 * UL,
                    overflowY: "scroll",
                    opacity: open ? 1 : 0,
                    transition: "500ms",
                }}
            >
                {isChildrenMounted && children}
            </div>
        </div>
    );
}

function BlackLayer({
    UL,
    open,
    onClick,
}: {
    UL: number;
    open: boolean;
    onClick: () => void;
}) {
    return (
        <Slide in={open} direction="down">
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 160 * UL,
                    height: 90 * UL,
                    zIndex: 20001,
                    backgroundColor: "black",
                    opacity: 0.5,
                }}
                onClick={onClick}
            />
        </Slide>
    );
}
