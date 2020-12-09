import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./index.css";

const linkBlock = (props: { href: string; children: React.ReactNode }) => {
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

function flatten(text: string, child: any): string {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}

const HeadingRenderer = (props: any) => {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement("h" + props.level, { id: slug }, props.children);
};

interface MarkdownProps {
    source: string;
    style?: React.CSSProperties;
}
export function Markdown(props: MarkdownProps) {
    const { source, style } = props;
    return (
        <div style={style} className="markdownArea">
            <ReactMarkdown
                source={source}
                renderers={{
                    link: linkBlock,
                    heading: HeadingRenderer,
                }}
            />
        </div>
    );
}
