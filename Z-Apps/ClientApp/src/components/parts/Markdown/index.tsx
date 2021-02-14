import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import gfm from "remark-gfm";
import * as consts from "../../../common/consts";
import ShurikenProgress from "../Animations/ShurikenProgress";
import { FolktaleExample } from "./ExampleSentence/Folktale";
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
    var slug = encodeURIComponent(text);
    return React.createElement("h" + props.level, { id: slug }, props.children);
};

interface SpeakerProps {
    src: string;
    alt: string;
}
export class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    vocabSound?: HTMLAudioElement;
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);

        this.state = {
            showImg: false,
        };

        this.didUnmount = false;
    }

    componentDidMount = () => {
        this.loadSound();
    };

    loadSound = () => {
        const { src } = this.props;

        this.vocabSound = new Audio();
        this.vocabSound.preload = "none";
        this.vocabSound.autoplay = false;
        this.vocabSound.src = src;

        this.vocabSound.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
        };
        this.vocabSound.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { alt } = this.props;
        const { showImg } = this.state;
        const { vocabSound } = this;
        return showImg ? (
            <Button color="success" active>
                <img
                    alt={alt}
                    src={consts.BLOB_URL + "/articles/img/speaker.png"}
                    style={{
                        width: "60%",
                        maxWidth: 60,
                        cursor: "pointer",
                        zIndex: 900,
                    }}
                    onClick={() => {
                        vocabSound && vocabSound.play();
                    }}
                />
            </Button>
        ) : (
            <ShurikenProgress
                key="circle"
                size="100%"
                style={{ width: "60%", maxWidth: 30 }}
            />
        );
    }
}

const imgExtensions = [".png", ".jpg"];
const soundExtensions = [".m4a"];

export function checkImgExtension(str: string) {
    if (!str) {
        return false;
    }
    return imgExtensions.some(e => str.toLowerCase().includes(e));
}

function checkSoundExtension(str: string) {
    if (!str) {
        return false;
    }
    return soundExtensions.some(e => str.toLowerCase().includes(e));
}

const ImageRender = (props: any) => {
    if (checkSoundExtension(props.src)) {
        return <Speaker {...props} />;
    }
    return <img {...props} title={props.alt} className="renderedImg" />;
};

const RenderCode = (props: any) => {
    const { language, value } = props;

    if (!value) {
        return null;
    }

    if (language === "ex") {
        const storyNameAndLineNumber = value.split("\n");
        const { length } = storyNameAndLineNumber;
        const getInfo = (n: number) =>
            length > n ? storyNameAndLineNumber[n] : "";

        return (
            <FolktaleExample
                storyName={getInfo(0)}
                lineNumber={getInfo(1)}
                boldInfo={getInfo(2)}
            />
        );
    } else if (language === "box") {
        return (
            <div className="greenBox">
                <Markdown source={value} />
            </div>
        );
    }

    return (
        <div className="pointBox">
            <Markdown source={value} />
        </div>
    );
};

const InlineCode = (props: any) => {
    return <strong style={{ color: "red" }}>{props.value}</strong>;
};

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
                link: linkBlock,
                heading: HeadingRenderer,
                image: ImageRender,
                code: RenderCode,
                inlineCode: InlineCode,
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
