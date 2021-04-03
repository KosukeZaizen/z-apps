import React from "react";
import { menuStyle } from "..";

export const MenuContent = Content;

function Content({
    open,
    children,
    UL,
}: {
    open: boolean;
    children: JSX.Element | JSX.Element[];
    UL: number;
}) {
    return (
        <div
            style={{
                width:
                    (160 -
                        (2 * menuStyle.screenMargin +
                            2 * menuStyle.buttonMargin +
                            menuStyle.buttonWidth)) *
                    UL,
                height: (90 - 2 * menuStyle.screenMargin) * UL,
                overflowY: "scroll",
                overflowX: "hidden",
                opacity: open ? 1 : 0,
                transition: "500ms",
            }}
        >
            {children}
        </div>
    );
}
