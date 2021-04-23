import React from "react";
import { StopAnimation } from "../../../common/animation";
import { Helmet } from "../../parts/Helmet";
import { HideHeaderAndFooter } from "../../parts/HideHeaderAndFooter";
import { GameFrame } from "./GameFrame";

export default function GameToLearn() {
    return (
        <>
            <Helmet
                title="Action Game to Learn Japanese Vocabulary"
                desc="You can learn Japanese vocabulary while playing an action game!"
            />
            <HideHeaderAndFooter />
            <StopAnimation />
            <GameFrame />
        </>
    );
}
