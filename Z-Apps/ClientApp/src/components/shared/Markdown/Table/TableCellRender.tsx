import React, { Children } from "react";

export function TableCellRender({
    children,
    isHeader,
    align,
    ...rest
}: {
    children: JSX.Element | JSX.Element[];
    isHeader: boolean;
    align: "left" | "right" | "center";
    [key: string]: any;
}) {
    const content = Children.map(children, c => {
        if (c.props.value === "<br />") {
            return <br />;
        }
        return c;
    });

    if (isHeader) {
        return (
            <th {...rest}>
                {content}
            </th>
        );
    }
    return (
        <td style={{ textAlign: align }} {...rest}>
            {content}
        </td>
    );
}
