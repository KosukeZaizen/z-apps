import * as React from "react";
import "./style.css";

interface Props {
    style?: React.CSSProperties;
    children: React.ReactNode;
}
export const ScrollBox = (props: Props) => {
    const { children, style } = props;
    return (
        <div style={style} className="style-scroll">
            {children}
        </div>
    );
};
