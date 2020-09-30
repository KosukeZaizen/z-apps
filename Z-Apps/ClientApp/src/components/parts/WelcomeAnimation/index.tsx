import * as React from "react";
import { useEffect, useState } from "react";
import "./animation.css";

const runningNinja = require("./../Ninja/objs/ninja/ninja_hashiru.png");
const shuriken = require("../../../img/shuriken.png");

export default function WelcomeAnimation() {
    const [shown, setShown] = useState(true);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
        setTimeout(() => {
            setShown(false);
        }, 4350);
    }, []);

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const squareLength = innerWidth < innerHeight ? innerWidth : innerHeight;
    const leftTopPosition = [
        (innerWidth - squareLength) / 2,
        (innerHeight - squareLength) / 2,
    ];
    const U = squareLength / 1000; // unit length

    const charHeight = 130 * U;
    const charTop = leftTopPosition[1] + (squareLength - charHeight) * (2 / 5);

    return shown ? (
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999999999,
                backgroundColor: "white",
            }}
            className="screen"
        >
            <p
                style={{
                    width: 1000 * U,
                    position: "absolute",
                    left: leftTopPosition[0],
                    top: charTop,
                    textAlign: "center",
                    fontSize: charHeight,
                    padding: 0,
                    fontWeight: "bold",
                    transition: "2s",
                    opacity: isOpen ? 1 : 0,
                    fontStyle: "italic",
                }}
            >
                {"Lingual Ninja"}
            </p>
            <img
                src={runningNinja}
                alt={"running ninja"}
                style={{
                    width: 210 * U,
                    position: "absolute",
                    left: leftTopPosition[0] + 100 * U,
                    top: leftTopPosition[1] + 470 * U,
                }}
                className="ninja"
            />
            <img
                src={shuriken}
                alt={"shuriken"}
                style={{
                    width: 170 * U,
                    position: "absolute",
                    left: leftTopPosition[0] + 750 * U,
                    top: leftTopPosition[1] + 270 * U,
                }}
                className="shuriken"
            />
        </div>
    ) : null;
}
