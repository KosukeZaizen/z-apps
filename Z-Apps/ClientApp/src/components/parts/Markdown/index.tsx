import React from "react";
import ReactMarkdown from "react-markdown";
import "./index.css";

interface MarkdownProps {
    source: string;
    style?: React.CSSProperties;
}
export function Markdown(props: MarkdownProps) {
    const { source, style } = props;
    return (
        <div style={style}>
            <ReactMarkdown source={source} />
        </div>
    );
}
