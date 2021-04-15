import React, { useState } from "react";
import { ChangePage, Page } from ".";

export function MenuPage({ changePage }: { changePage: ChangePage }) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    return isButtonShown ? (
        <>
            <button
                onClick={() => {
                    setTimeout(() => {
                        changePage(Page.title);
                    }, 3000);
                    setIsButtonShown(false);
                }}
            >
                Title Page
            </button>
        </>
    ) : null;
}
