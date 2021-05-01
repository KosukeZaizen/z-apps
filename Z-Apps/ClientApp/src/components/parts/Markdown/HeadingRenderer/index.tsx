import React from "react";

function flatten(text: string, child: any): string {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}

export const HeadingRenderer = (props: any) => {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = encodeURIComponent(text);
    return React.createElement("h" + props.level, { id: slug }, props.children);
};
