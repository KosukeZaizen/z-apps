import { Button, Fade } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { ScrollBox } from "../../../../../parts/ScrollBox";
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
                    color="primary"
                    style={{
                        zIndex: 20002,
                        position: "absolute",
                        top: 1 * UL,
                        left: 139 * UL,
                        width: 20 * UL,
                        height: 6 * UL,
                        fontSize: 3 * UL,
                        fontWeight: "bold",
                        opacity: 0.9,
                    }}
                    onClick={() => setOpen(true)}
                    ref={btnRef}
                >
                    Menu
                </Button>
            )}
            <ScrollBox
                style={{
                    position: "absolute",
                    top: 3 * UL,
                    left: 5 * UL,
                    width: 0,
                    height: 70 * UL,
                    zIndex: 20003,
                    backgroundColor: "white",
                }}
            >
                hello
            </ScrollBox>
            <Fade in={open} timeout={1000}>
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
            </Fade>
        </>
    );
}
