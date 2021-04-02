import { Button, Slide } from "@material-ui/core";
import React, { useState } from "react";
import { gameState } from "../../GameState";
import { Renderable } from "../StageItems";

// サイドメニュー
const SideMenu = {
    base: "Base",
    folktale: "Folktale",
    article: "Article",
} as const;
type SideMenu = typeof SideMenu[keyof typeof SideMenu];

// ゲームメニューボタン
export class Menu extends Renderable {
    renderItem(UL: number, children: JSX.Element | JSX.Element[]) {
        const { menu } = gameState;
        return (
            <GameMenu
                key="game menu"
                UL={UL}
                open={menu.isMenuOpen}
                setOpen={open => {
                    menu.isMenuOpen = open;
                }}
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
}: {
    UL: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: JSX.Element | JSX.Element[];
}) {
    const [sideMenu, setSideMenu] = useState<SideMenu>(SideMenu.base);
    return (
        <>
            {UL && (
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
                        transitionDuration: "1s",
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {open ? "Close" : "Menu"}
                </Button>
            )}
            <div
                style={{
                    position: "absolute",
                    top: 1 * UL,
                    right: open ? 21 * UL : 1,
                    width: open ? 138 * UL : 0,
                    height: open ? 88 * UL : 0,
                    transition: "500ms",
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
                    }}
                >
                    {open && children}
                </div>
            </div>
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
                    onClick={() => setOpen(false)}
                />
            </Slide>
        </>
    );
}
