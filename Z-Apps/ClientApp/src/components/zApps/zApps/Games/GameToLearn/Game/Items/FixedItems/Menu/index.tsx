import Button from "@material-ui/core/Button/Button";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Slide from "@material-ui/core/Slide/Slide";
import React from "react";
import { Link } from "react-router-dom";
import { gameOpenAnimationTime } from "../../../../GameFrame";
import { gameState } from "../../../GameState";
import { Renderable } from "../../StageItems";
import { MenuContent } from "./Contents/MenuContent";

export type SubMenu = "game" | "study";

export const menuStyle = {
    screenMargin: 1,
    buttonWidth: 28,
    buttonHeight: 8,
    buttonMargin: 1,
    sectionMargin: 2,
    buttonFontSize: 3,
    smallButtonFontSize: 2,
};

// ゲームメニューボタン
export class Menu extends Renderable {
    renderItem(UL: number) {
        const { menu } = gameState;

        return (
            <GameMenu
                key="game menu"
                UL={UL}
                open={menu.isMenuOpen}
                setOpen={open => {
                    menu.isMenuOpen = open;
                }}
                subMenu={menu.subMenu}
            />
        );
    }
}

function GameMenu({
    UL,
    open,
    setOpen,
    subMenu,
}: {
    UL: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    subMenu: SubMenu;
}) {
    return (
        <>
            <MenuButton UL={UL} open={open} onClick={() => setOpen(!open)} />
            <SideBar UL={UL} open={open} subMenu={subMenu} />
            <MenuScreen UL={UL} open={open} />
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
    const opacity = UL ? (open ? 1 : 0.9) : 0;
    return (
        <Button
            variant="contained"
            color={open ? "secondary" : "primary"}
            style={{
                zIndex: 20005,
                position: "absolute",
                top: menuStyle.screenMargin * UL,
                right: (menuStyle.screenMargin + menuStyle.buttonMargin) * UL,
                width: menuStyle.buttonWidth * UL,
                height: menuStyle.buttonHeight * UL,
                fontSize: menuStyle.buttonFontSize * UL,
                fontWeight: "bold",
                opacity,
                transition: gameOpenAnimationTime,
            }}
            onClick={onClick}
        >
            {open ? "Close" : "Menu"}
        </Button>
    );
}

function SideBar({
    UL,
    open,
    subMenu,
}: {
    UL: number;
    open: boolean;
    subMenu: SubMenu;
}) {
    return (
        <Collapse
            in={open}
            style={{
                position: "absolute",
                top:
                    (menuStyle.screenMargin +
                        menuStyle.buttonHeight +
                        menuStyle.sectionMargin +
                        (subMenu === "game" ? menuStyle.buttonMargin : 0)) *
                    UL,
                transition: "500ms",
                right: menuStyle.screenMargin * UL,
                width:
                    (menuStyle.buttonWidth + 2 * menuStyle.buttonMargin) * UL,
                zIndex: 20004,
            }}
            timeout={500}
        >
            <div
                style={{
                    width: "100%",
                    backgroundColor:
                        subMenu === "game"
                            ? "rgba(255,255,255,0.7)"
                            : undefined,
                    transition: "500ms",
                    borderTopRightRadius: UL,
                    borderBottomRightRadius: UL,
                }}
            >
                <Button
                    variant="contained"
                    color={subMenu === "game" ? "primary" : "default"}
                    style={{
                        margin: menuStyle.buttonMargin * UL,
                        width: menuStyle.buttonWidth * UL,
                        height: menuStyle.buttonHeight * UL,
                        fontSize: menuStyle.buttonFontSize * UL,
                        zIndex: 20004,
                        fontWeight: "bold",
                        transition: "500ms",
                    }}
                    onClick={() => {
                        gameState.menu.subMenu = "game";
                    }}
                >
                    Game
                </Button>
                <Collapse in={subMenu === "game"}>
                    <Button
                        variant="outlined"
                        color="default"
                        style={{
                            margin: menuStyle.buttonMargin * UL,
                            width: menuStyle.buttonWidth * UL,
                            height: menuStyle.buttonHeight * UL,
                            fontSize: menuStyle.smallButtonFontSize * UL,
                            fontWeight: "bold",
                            zIndex: 20004,
                        }}
                    >
                        Status
                    </Button>
                    <Button
                        variant="outlined"
                        color="default"
                        style={{
                            margin: menuStyle.buttonMargin * UL,
                            width: menuStyle.buttonWidth * UL,
                            height: menuStyle.buttonHeight * UL,
                            fontSize: menuStyle.smallButtonFontSize * UL,
                            fontWeight: "bold",
                            zIndex: 20004,
                        }}
                    >
                        Skills
                    </Button>
                </Collapse>
            </div>
            <div
                style={{
                    marginTop: menuStyle.sectionMargin * UL,
                    width:
                        (menuStyle.buttonWidth + 2 * menuStyle.buttonMargin) *
                        UL,
                    backgroundColor:
                        subMenu === "study"
                            ? "rgba(255,255,255,0.7)"
                            : undefined,
                    transition: "500ms",
                    borderTopRightRadius: UL,
                    borderBottomRightRadius: UL,
                }}
            >
                <Button
                    variant="contained"
                    color={subMenu === "study" ? "primary" : "default"}
                    style={{
                        margin: menuStyle.buttonMargin * UL,
                        width: menuStyle.buttonWidth * UL,
                        height: menuStyle.buttonHeight * UL,
                        fontSize: menuStyle.buttonFontSize * UL,
                        zIndex: 20004,
                        fontWeight: "bold",
                        transition: "500ms",
                    }}
                    onClick={() => {
                        gameState.menu.subMenu = "study";
                    }}
                >
                    Study
                </Button>
                <Collapse in={subMenu === "study"}>
                    <Link to="/folktales">
                        <Button
                            variant="outlined"
                            color="default"
                            style={{
                                margin: menuStyle.buttonMargin * UL,
                                width: menuStyle.buttonWidth * UL,
                                height: menuStyle.buttonHeight * UL,
                                fontSize: menuStyle.smallButtonFontSize * UL,
                                fontWeight: "bold",
                                zIndex: 20004,
                            }}
                        >
                            Folktales
                        </Button>
                    </Link>
                    <Link to="/articles">
                        <Button
                            variant="outlined"
                            color="default"
                            style={{
                                margin: menuStyle.buttonMargin * UL,
                                width: menuStyle.buttonWidth * UL,
                                height: menuStyle.buttonHeight * UL,
                                fontSize: menuStyle.smallButtonFontSize * UL,
                                fontWeight: "bold",
                                zIndex: 20004,
                            }}
                        >
                            Articles
                        </Button>
                    </Link>
                    <Link to="/hiragana-katakana">
                        <Button
                            variant="outlined"
                            color="default"
                            style={{
                                margin: menuStyle.buttonMargin * UL,
                                width: menuStyle.buttonWidth * UL,
                                height: menuStyle.buttonHeight * UL,
                                fontSize: menuStyle.smallButtonFontSize * UL,
                                fontWeight: "bold",
                                zIndex: 20004,
                                lineHeight: 1.2,
                            }}
                        >
                            Hiragana Katakana
                        </Button>
                    </Link>
                    <Link to="/vocabulary-list">
                        <Button
                            variant="outlined"
                            color="default"
                            style={{
                                margin: menuStyle.buttonMargin * UL,
                                width: menuStyle.buttonWidth * UL,
                                height: menuStyle.buttonHeight * UL,
                                fontSize: menuStyle.smallButtonFontSize * UL,
                                fontWeight: "bold",
                                zIndex: 20004,
                            }}
                        >
                            Vocab
                        </Button>
                    </Link>
                </Collapse>
            </div>
        </Collapse>
    );
}

function MenuScreen({ UL, open }: { UL: number; open: boolean }) {
    return (
        <div
            style={{
                position: "absolute",
                top: menuStyle.screenMargin * UL,
                right: open
                    ? (menuStyle.screenMargin +
                          2 * menuStyle.buttonMargin +
                          menuStyle.buttonWidth) *
                      UL
                    : menuStyle.screenMargin,
                width: open
                    ? (160 -
                          (2 * menuStyle.screenMargin +
                              2 * menuStyle.buttonMargin +
                              menuStyle.buttonWidth)) *
                      UL
                    : 0,
                height: open ? (90 - 2 * menuStyle.screenMargin) * UL : 0,
                transition: gameOpenAnimationTime,
                zIndex: 20002,
                backgroundColor: "white",
                borderRadius: 1 * UL,
                overflow: "hidden",
            }}
        >
            <MenuContent open={open} UL={UL} />
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
