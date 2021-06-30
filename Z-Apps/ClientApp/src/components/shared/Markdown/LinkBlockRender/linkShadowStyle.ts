import { CSSProperties } from "react";

// 0 から 4.9 まで 0.1 刻み
export const whiteShadow = Array.from(Array(50).keys())
    .map(n => `0 0 ${n / 10}px white`)
    .join(",");

export const linkShadowStyle: CSSProperties = {
    textShadow: "initial",
    backgroundColor: "white",
    boxShadow: whiteShadow,
};
