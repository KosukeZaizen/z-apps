import React from "react";
import { Helmet } from "../../parts/Helmet";
import { HideHeaderAndFooter } from "../../parts/Layout";
import { GameFrame } from "./GameFrame";

export default function GameToLearn({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return (
        <>
            <Helmet
                title="Action Game to Learn Japanese Vocabulary"
                desc="You can learn Japanese vocabulary while playing an action game!"
            />
            <HideHeaderAndFooter />
            <GameFrame>{children}</GameFrame>
        </>
    );
}
