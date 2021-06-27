import { css, StyleSheet } from "aphrodite";
import React from "react";

export function PointBox({
    language,
    children,
    style,
}: {
    language: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}) {
    const styles = StyleSheet.create({
        pointBox: {
            ":before": {
                fontSize: 15,
                position: "absolute",
                top: -23,
                left: 0,
                height: 23,
                padding: "0 1em",
                content: language
                    ? `'${language.split("_").join(" ")}'`
                    : "'NOTE'",
                color: "#fff",
                borderRadius: "10px 10px 0 0",
                background: "#22ac38",
            },
            position: "relative",
            padding: "15px 20px 2px",
            color: "black",
            borderRadius: "0 10px 10px 10px",
            background: "#e3f5d8",
            margin: "45px 0 30px",
            display: "inline-block",
            ...style,
        } as any,
    });

    return <div className={css(styles.pointBox)}>{children}</div>;
}
