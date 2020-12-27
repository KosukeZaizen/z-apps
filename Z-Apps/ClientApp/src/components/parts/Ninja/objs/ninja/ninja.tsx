import * as React from "react";
import { appsPublicImg } from "../../../../../common/consts";

const runningNinja = appsPublicImg + "ninja_hashiru.png";

function NinjaChar(props: {
    x: number;
    y: number;
    boolLeft: boolean;
    imgAlt: string;
    width: number;
}) {
    let left = props.boolLeft ? "" : "scale(-1, 1)";

    let style: any = {
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: left,
        zIndex: 25,
    };

    return (
        <img
            src={runningNinja}
            alt={props.imgAlt}
            width={props.width}
            style={style}
        />
    );
}

export { NinjaChar };
