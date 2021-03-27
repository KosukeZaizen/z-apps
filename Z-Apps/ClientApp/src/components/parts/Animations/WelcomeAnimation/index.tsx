import * as React from "react";
import { useEffect, useState } from "react";
import "./animation.css";

export let finishWelcomeAnimation: () => void = () => {};

export default function WelcomeAnimation() {
    const [shown, setIsShown] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 10);
        setTimeout(() => setIsShown(false), 2000);
    }, []);

    if (!shown) {
        return null;
    }

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

    return (
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
            }}
            className="screen"
        >
            <div
                style={{
                    borderRadius: 1,
                    border: "solid 1px #007bff",
                    backgroundColor: "#007bff",
                    height: 0,
                    marginTop: charTop + charHeight * 1.5,
                }}
                className="blueLine"
            ></div>
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
                    transition: "1s",
                    opacity: isOpen ? 1 : 0,
                    fontStyle: "italic",
                }}
            >
                {"Lingual Ninja"}
            </p>
        </div>
    );
}
