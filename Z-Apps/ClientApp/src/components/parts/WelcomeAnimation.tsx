import { rgbToHex } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

const runningNinja = require('./Ninja/objs/ninja/ninja_hashiru.png');

export default function WelcomeAnimation() {

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const squareLength = innerWidth < innerHeight ? innerWidth : innerHeight;
    const leftTopPosition = [(innerWidth - squareLength) / 2, (innerHeight - squareLength) / 2];
    const U = squareLength / 1000; // unit length

    const [shown, setShown] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const [ninjaPosition, setNinjaPosition] = useState([3000]);
    const [time, setTime] = useState(0);

    useEffect(
        () => {
            setOpen(true);
            setInterval(() => {
                setTime(time + 1);
                if (time > 5000) {
                    setShown(false);
                }
            }, 10);
        },
        []
    );

    const charHeight = 30 * U;
    const charTop = leftTopPosition[1] + ((squareLength - charHeight) / 2);

    console.log("squareLength", squareLength);
    console.log("charHeight", charHeight);
    console.log("charTop", charTop);

    return (
        shown &&
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999999999,
                backgroundColor: "white",
            }}>
            <div
                style={{
                    width: innerWidth,
                    height: innerHeight,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: "black",
                    transition: '5s',
                    opacity: isOpen ? 1 : 0,
                }}>
                <div
                    style={{
                        width: 1000 * U,
                        position: "fixed",
                        left: leftTopPosition[0],
                        top: leftTopPosition[1],
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            color: "white",
                        }}
                    >{"Lingual Ninja"}</p>
                </div>
                <img
                    src={runningNinja}
                    alt={"running ninja"}
                    style={{
                        width: 250 * U,
                        position: "fixed",
                        left: leftTopPosition[0] + (100 * U),
                        top: leftTopPosition[1] + (400 * U),
                    }}
                />
            </div>
        </div >
    );
}