import React, { AnchorHTMLAttributes } from "react";

export function ATargetBlank(
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { nofollow?: boolean }
) {
    const { nofollow, children, ...rest } = props;

    const rel = nofollow
        ? "nofollow noopener noreferrer"
        : "noopener noreferrer";

    return (
        <a target="_blank" rel={rel} {...rest}>
            {children}
        </a>
    );
}
