import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import "./style.css";

interface FolktaleMenuProps {
    label: React.ReactNode;
    initialColor?: typeof buttonColor[ButtonKey];
    size?: string;
    style?: React.CSSProperties;
}
const buttonColor = { 1: "secondary", 2: "success", 3: "primary" } as const;
type ButtonKey = keyof typeof buttonColor;
export const ColorChangeButton = ({
    label,
    initialColor,
    size,
    style,
}: FolktaleMenuProps) => {
    const initialColorKey = initialColor
        ? ((Object.keys(buttonColor).indexOf(initialColor) + 1) as ButtonKey)
        : 1;
    const [buttonKey, setButtonKey] = useState<ButtonKey>(initialColorKey);
    const btnSize = size || "lg";
    const btnStyle = style || {
        width: 100,
    };

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const nextKey = (buttonKey - 1 || 3) as ButtonKey;
            setButtonKey(nextKey);
        }, 3000);
        return () => clearTimeout(timerId);
    }, [buttonKey]);

    return (
        <Button
            size={btnSize}
            color={buttonColor[buttonKey]}
            style={btnStyle}
            className="colorChangeButton"
        >
            {label}
        </Button>
    );
};
