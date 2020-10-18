import * as React from "react";
import "./animation.css";

const shuriken = require("../../../../img/shuriken.png");

interface Props {
    size?: string;
}
export default function ShurikenProgress({ size }: Props) {
    return (
        <div style={{ width: size, height: size }}>
            <img
                src={shuriken}
                alt="shuriken"
                className="ShurikenProgress"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
