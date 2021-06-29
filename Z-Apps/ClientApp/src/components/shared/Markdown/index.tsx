import React, { ReactChildren } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { CodeRender } from "./CodeRender";
import { HeadingRenderer } from "./HeadingRenderer";
import { ImageRender } from "./ImageRender";
import "./index.css";
import { InlineCodeRender } from "./InlineCodeRender";
import { LinkRender } from "./LinkBlockRender";

interface MarkdownProps {
    source: string;
    style?: React.CSSProperties;
    section?: boolean;
}
export function Markdown({ source, style, section }: MarkdownProps) {
    const markdown = (
        <ReactMarkdown
            source={source}
            renderers={{
                link: LinkRender,
                heading: HeadingRenderer,
                image: ImageRender,
                code: CodeRender,
                inlineCode: InlineCodeRender,
                paragraph: ParagraphRender,
            }}
            plugins={[gfm]}
        />
    );

    return section ? (
        <section style={style} className="markdownArea">
            {markdown}
        </section>
    ) : (
        <div style={style} className="markdownArea">
            {markdown}
        </div>
    );
}

function ParagraphRender({ children }: { children: ReactChildren }) {
    return (
        <span style={{ display: "block", marginBottom: 15 }}>{children}</span>
    );
}
