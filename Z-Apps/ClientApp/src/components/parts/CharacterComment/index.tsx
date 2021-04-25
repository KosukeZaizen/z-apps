import * as React from "react";
import * as consts from "../../../common/consts";
import "./CharacterComment.css";

type TProps = {
    imgNumber: number;
    screenWidth: number;
    comment: string | React.ReactNode;
    style?: React.CSSProperties;
    commentStyle?: React.CSSProperties;
    imgStyle?: React.CSSProperties;
    containerRef?: React.RefObject<HTMLDivElement>;
};
export default function CharacterComment(props: TProps) {
    const {
        imgNumber,
        screenWidth,
        comment,
        style,
        commentStyle,
        imgStyle,
        containerRef,
    } = props;
    return (
        <div
            style={{
                display: "flex",
                maxWidth: 600,
                margin: "auto",
                ...style,
            }}
            ref={containerRef}
        >
            <div style={{ flex: 1 }}>
                <img
                    src={`${consts.BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="Japanese ninja"
                    style={{
                        width: (screenWidth * 2) / 10,
                        maxWidth: 120,
                        height: "auto",
                        verticalAlign: "top",
                        ...imgStyle,
                    }}
                    className="ninjaPic"
                />
            </div>
            <div
                className="chatting"
                style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    flex: 3,
                }}
            >
                <div
                    className="says"
                    style={{
                        width:
                            screenWidth > 767
                                ? (screenWidth * 7) / 10 - 15
                                : "100%",
                        maxWidth: 420,
                        ...commentStyle,
                    }}
                >
                    {comment}
                </div>
            </div>
        </div>
    );
}
