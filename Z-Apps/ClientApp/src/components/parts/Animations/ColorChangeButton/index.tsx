import * as React from "react";
import { useEffect, useState } from "react";
import Button from "reactstrap/lib/Button";
import "./style.css";

interface FolktaleMenuProps {
    label: React.ReactNode;
    initialColor?: typeof buttonColor[ButtonKey];
    size?: string;
    style?: React.CSSProperties;
}
const buttonColor = { 1: "secondary", 2: "success", 3: "primary" } as const;
const arrColors = Object.values(buttonColor);
type ButtonKey = keyof typeof buttonColor;
export const ColorChangeButton = ({
    label,
    initialColor,
    size,
    style,
}: FolktaleMenuProps) => {
    const [buttonKey, setButtonKey] = useState<ButtonKey>(1);

    useEffect(() => {
        if (!initialColor || !arrColors.indexOf(initialColor)) {
            return;
        }
        const initialColorKey = initialColor
            ? ((arrColors.indexOf(initialColor) + 1) as ButtonKey)
            : 1;
        setButtonKey(initialColorKey);
    }, [initialColor]);

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const nextKey = (buttonKey - 1 || 3) as ButtonKey;
            setButtonKey(nextKey);
        }, 3000);
        return () => clearTimeout(timerId);
    }, [buttonKey]);

    return (
        <Button
            size={size}
            color={buttonColor[buttonKey]}
            style={style}
            className="colorChangeButton"
        >
            {label}
        </Button>
    );
};
