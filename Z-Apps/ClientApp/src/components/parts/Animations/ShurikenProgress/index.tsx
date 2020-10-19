import * as React from "react";
import "./animation.css";

const shuriken = require("../../../../img/shuriken.png");

interface Props {
    size?: string;
    style?: React.CSSProperties;
}
export default function ShurikenProgress({ size, style }: Props) {
    return (
        <div style={style} className="center">
            <img
                src={shuriken}
                alt="shuriken"
                className="ShurikenProgress"
                style={{ width: size, height: size }}
            />
        </div>
    );
}
