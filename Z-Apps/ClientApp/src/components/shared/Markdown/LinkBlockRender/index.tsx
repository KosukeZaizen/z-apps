import React from "react";
import { Link } from "react-router-dom";
import { ATargetBlank } from "../../Link/ATargetBlank";
import { linkShadowStyle } from "./linkShadowStyle";

export const LinkRender = (props: {
    href: string;
    children: React.ReactNode;
}) => <LinkRenderBase {...props} />;

export const LinkWithoutShadowRender = (props: {
    href: string;
    children: React.ReactNode;
}) => <LinkRenderBase {...props} noLinkShadow />;

const LinkRenderBase = ({
    href,
    children,
    noLinkShadow,
}: {
    href: string;
    children: React.ReactNode;
    noLinkShadow?: boolean;
}) => {
    const style = noLinkShadow ? undefined : linkShadowStyle;

    if (href.includes("https://") || href.includes("http://")) {
        return (
            <ATargetBlank href={href} style={style}>
                {children}
            </ATargetBlank>
        );
    }
    return (
        <Link to={href} style={style}>
            {children}
        </Link>
    );
};
