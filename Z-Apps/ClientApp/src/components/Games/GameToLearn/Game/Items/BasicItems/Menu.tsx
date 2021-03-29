import { Button, Fade, Popover } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Renderable } from "../StageItems";

// ゲームメニューボタン
export class Menu extends Renderable {
    renderItem(UL: number) {
        return <GameMenu UL={UL} />;
    }
}

function GameMenu({ UL }: { UL: number }) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                style={{
                    zIndex: 20001,
                    position: "absolute",
                    top: 1 * UL,
                    left: 139 * UL,
                    width: 20 * UL,
                    height: 8 * UL,
                    fontSize: 3 * UL,
                    fontWeight: "bold",
                    transition: "1s",
                }}
                onClick={() => setOpen(true)}
                ref={btnRef}
            >
                Menu
            </Button>
            <Popover
                open={open}
                anchorEl={btnRef?.current}
                style={{ zIndex: 20001 }}
                modal
            >
                hello
            </Popover>
            <Fade in={open} timeout={1000}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 160 * UL,
                        height: 90 * UL,
                        zIndex: 20000,
                        backgroundColor: "black",
                        opacity: 0.5,
                    }}
                    //onClick={() => setOpen(false)}
                />
            </Fade>
        </>
    );
}
