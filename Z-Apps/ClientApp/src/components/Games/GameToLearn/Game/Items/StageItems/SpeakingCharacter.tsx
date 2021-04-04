import React from "react";
import { StageItem } from ".";
import { ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

interface Props {
    key: string;
    x: number;
    y: number;
    width: number;
    zIndex?: number;
    imgSrc?: ImgSrc;
}

export class SpeakingCharacter extends StageItem {
    isSpeaking: boolean;

    constructor(props: Props) {
        super({ type: "speakingCharacter", ...props });
        this.isSpeaking = false;
    }

    onEachTime() {}

    onTouchNinja(ninja: Ninja) {
        this.isSpeaking = true;
    }

    renderItem(UL: number) {
        return (
            <div key={this.key}>
                {super.renderItem(UL)}
                {/* <Popover open={this.isSpeaking}>Hello!</Popover> */}
            </div>
        );
    }
}
