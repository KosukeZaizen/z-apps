import React from "react";
import { Link } from "react-router-dom";

export const LinkRender = (props: {
    href: string;
    children: React.ReactNode;
}) => {
    const { href, children } = props;
    if (href.includes("https://") || href.includes("http://")) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
    return <Link to={href}>{children}</Link>;
};
