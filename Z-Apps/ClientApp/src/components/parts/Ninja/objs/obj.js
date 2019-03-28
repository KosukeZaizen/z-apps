import React from 'react';

function Obj(props) {

    let left = props.boolLeft ? "" : "scale(-1, 1)";

    let style = {
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: left,
        zIndex: props.zIndex,
    };

    if (props.img) {
        return (
            <img
                src={props.img}
                width={props.width}
                style={style}
                alt={"object"}
            />
        );
    } else {
        return (
            <div
                width={props.width}
                style={style}
            >
            </div>
        );
    }
}

export { Obj };