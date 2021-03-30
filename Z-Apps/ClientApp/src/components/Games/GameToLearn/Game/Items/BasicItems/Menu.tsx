import { Button, Slide } from "@material-ui/core";
import React, { useRef, useState } from "react";
import Articles from "../../../../../Articles";
import { Renderable } from "../StageItems";

// ゲームメニューボタン
export class Menu extends Renderable {
    renderItem(UL: number) {
        return <GameMenu key="game menu" UL={UL} />;
    }
}

function GameMenu({ UL }: { UL: number }) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
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
                    ref={btnRef}
                >
                    {open ? "Close" : "Menu"}
                </Button>
            )}
            {/* <div
                style={{
                    position: "absolute",
                    top: 1 * UL,
                    right: 1 * UL,
                    width: 20 * UL,
                    height: open ? 88 * UL : 0,
                    transition: "500ms",
                    zIndex: 20003,
                    backgroundColor: "black",
                    borderRadius: 1 * UL,
                }}
            ></div> */}
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
                    opacity: 0.85,
                }}
            >
                <div
                    style={{
                        opacity: 1,
                        width: 150 * UL,
                        height: 80 * UL,
                        overflow: "scroll",
                    }}
                >
                    {open && (
                        <Articles
                            match={{
                                params: { pageName: "japanese-particle-no" },
                            }}
                            location={window.location}
                            history={window.history as any}
                        />
                    )}
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
