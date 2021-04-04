import Popover from "@material-ui/core/Popover";
import React, { useRef } from "react";
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
    withoutIcon?: boolean;
}

export class SpeakingCharacter extends StageItem {
    isSpeaking: boolean;
    withoutIcon?: boolean;

    constructor(props: Props) {
        super({ type: "speakingCharacter", ...props });
        this.isSpeaking = false;
        this.withoutIcon = props.withoutIcon;
    }

    onEachTime() {
        if (this.isSpeaking) {
            this.isSpeaking = false;
        }
    }

    onTouchNinja(ninja: Ninja) {
        if (!this.isSpeaking) {
            this.isSpeaking = true;
        }
    }

    renderItem(UL: number) {
        const ref = useRef(null);
        return (
            <div key={this.key}>
                <img
                    alt={this.key}
                    key={this.key}
                    src={this.imgSrc}
                    style={{
                        position: "absolute",
                        top: this.y * UL,
                        left: this.x * UL,
                        width: this.width * UL,
                        zIndex: this.zIndex || 10,
                    }}
                    ref={ref}
                />
                <Popover
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                    PaperProps={{
                        style: {
                            padding: 1 * UL,
                            fontSize: 5 * UL,
                            margin: 1 * UL,
                            maxWidth: 150 * UL,
                        },
                    }}
                    anchorEl={ref.current}
                    open={this.isSpeaking}
                >
                    {!this.withoutIcon && (
                        <img
                            alt={this.key}
                            src={this.imgSrc}
                            style={{
                                width: 10 * UL,
                                float: "left",
                                margin: 3 * UL,
                            }}
                        />
                    )}
                    {getMessages(UL, "pochi1")}
                </Popover>
            </div>
        );
    }
}

type messageKey = "pochi1" | "hello";
function getMessages(UL: number, key: messageKey) {
    return {
        pochi1: (
            <div>
                Welcome!
                <br />
                If you want to be a good lingual ninja, you should collect
                Kotodama souls!
                <br />
                あああああああああああああああああああああああああああああああ
            </div>
        ),
        hello: <div>hello</div>,
    }[key];
}
