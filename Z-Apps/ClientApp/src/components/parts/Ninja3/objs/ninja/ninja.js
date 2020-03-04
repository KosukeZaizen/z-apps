import * as React from 'react';
import runningNinja from './../../../Ninja/objs/ninja/ninja_hashiru.png';


function NinjaChar(props) {

    let left = props.boolLeft ? "" : "scale(-1, 1)";

    let style = {
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