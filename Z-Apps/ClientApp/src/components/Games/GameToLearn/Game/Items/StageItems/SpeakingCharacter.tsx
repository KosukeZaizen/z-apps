import { Popover } from "@material-ui/core";
import React from "react";
import { BasicElementToRender, StageItem } from ".";
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
        this.isSpeaking = true;
    }

    onEachTime() {}

    onTouchNinja(ninja: Ninja) {
        this.isSpeaking = true;
    }

    renderItem(UL: number) {
        return (
            <>
                <BasicElementToRender
                    imgSrc={this.imgSrc}
                    key={this.key}
                    x={this.x}
                    y={this.y}
                    width={this.width}
                    zIndex={this.zIndex}
                    UL={UL}
                />
                <Popover open={this.isSpeaking}>Hello!</Popover>
            </>
        );
    }
}
