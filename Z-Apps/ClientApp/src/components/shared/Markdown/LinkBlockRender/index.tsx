import React from "react";
import { Link } from "react-router-dom";
import { ATargetBlank } from "../../ATargetBlank";
import { linkShadowStyle } from "./linkShadowStyle";

export const LinkRender = (props: {
    href: string;
    children: React.ReactNode;
}) => {
    const { href, children } = props;
    if (href.includes("https://") || href.includes("http://")) {
        return (
            <ATargetBlank href={href} style={linkShadowStyle}>
                {children}
            </ATargetBlank>
        );
    }
    return (
        <Link to={href} style={linkShadowStyle}>
            {children}
        </Link>
    );
};
