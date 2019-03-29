import React from 'react';

function Obj(props) {

    let left = props.boolLeft ? "scale(-1, 1)" : "";

    let style = {
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: left,
        zIndex: props.zIndex,
        fontSize: props.fontSize,
    };

    if (props.img) {
    //imgという引数を受け取っている場合、画像要素を生成
        return (
            <img
                src={props.img}
                width={props.width}
                style={style}
                alt={"object"}
            />
        );
    } else {
        //該当の引数を受け取っていない場合、div要素を生成
        return (
            <div
                width={props.width}
                style={style}
            >
                {props.message}
            </div>
        );
    }
}

export { Obj };