import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import gfm from "remark-gfm";
import * as consts from "../../../common/consts";
import { sentence, word } from "../../../types/stories";
import { AudioControl, WordList } from "../../Stories";
import ShurikenProgress from "../Animations/ShurikenProgress";
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

interface BoldInfo {
    K?: number[];
    H?: number[];
    R?: number[];
    E?: number[];
}
function FolktaleExample({
    storyName,
    lineNumber,
    boldInfo,
}: {
    storyName: string;
    lineNumber: number;
    boldInfo: string;
}) {
    const [s, setSentence] = useState<sentence>({
        storyId: 0,
        lineNumber: 0,
        kanji: "",
        hiragana: "",
        romaji: "",
        english: "",
    });
    const [words, setWords] = useState<word[]>([]);
    const [bold, setBold] = useState<BoldInfo>({});

    useEffect(() => {
        const fetchSentence = async () => {
            const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
            const response = await fetch(url);
            const { sentence, words } = await response.json();
            setSentence(sentence);
            setWords(words);
        };
        storyName && lineNumber && fetchSentence();
    }, [storyName, lineNumber]);

    useEffect(() => {
        if (!boldInfo) {
            setBold({});
            return;
        }
        try {
            const objBold: BoldInfo = JSON.parse(
                boldInfo
                    .replace("K", '"K"')
                    .replace("H", '"H"')
                    .replace("R", '"R"')
                    .replace("E", '"E"')
            );
            setBold(objBold);
        } catch (ex) {}
    }, [boldInfo]);

    if (!s.lineNumber) {
        return <p>Loading...</p>;
    }

    const audioFolder = storyName?.split("--")[0];
    const id = `${storyName}-${s.lineNumber}`;
    const folktaleTitle = storyName
        .split("--")
        .join(" - ")
        .split("_")
        .join(" ");

    return (
        <div id={id} key={id} style={{ marginBottom: 20 }}>
            <img
                src={`${consts.BLOB_URL}/folktalesImg/${
                    storyName.split("--")[0]
                }.png`}
                alt={folktaleTitle}
                title={folktaleTitle}
                className="renderedImg"
            />
            <div style={{ fontWeight: "bold", marginBottom: 20 }}>
                {"Below is a sentence from the folktale "}
                <Link to={`/folktales/${storyName}`}>
                    {`${folktaleTitle}>>`}
                </Link>
            </div>
            <span style={{ fontSize: "small", marginBottom: 5 }}>
                <span
                    style={{
                        backgroundColor: "#fff0f2",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>K</b>: Kanji
                </span>
                <span
                    style={{
                        backgroundColor: "#ffffe0",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>H</b>: Hiragana
                </span>
                <span
                    style={{
                        backgroundColor: "#f0fff2",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>R</b>: Romaji
                </span>
                <span
                    style={{
                        backgroundColor: "#f0f8ff",
                        padding: 2,
                        margin: 3,
                    }}
                >
                    <b>E</b>: English
                </span>
            </span>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#fff0f2",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="kanji">Ｋ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.kanji, bold?.K)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#ffffe0",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="hiragana">Ｈ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.hiragana, bold?.H)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#f0fff2",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="romaji">Ｒ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.romaji, bold?.R)}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#f0f8ff",
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        marginRight: "1em",
                    }}
                >
                    <abbr title="english">Ｅ</abbr>:
                </div>
                <div style={{ width: "100%" }}>
                    {getBoldSentence(s.english, bold?.E)}
                </div>
            </div>
            <AudioControl s={s} audioFolder={audioFolder} />
            <WordList words={words} s={s} storyId={s.storyId} />
        </div>
    );
}

function getBoldSentence(sentence: string, minAndMax?: number[]) {
    if (!minAndMax || minAndMax.length % 2 !== 0) {
        return sentence;
    }

    const copyMinAndMax = [...minAndMax];
    const arrToShow = [];

    const firstPart = sentence.substr(0, copyMinAndMax[0]);

    while (copyMinAndMax.length > 0) {
        const min = copyMinAndMax.shift() || 0;
        const max = copyMinAndMax.shift() || 500;

        const strongPart = sentence.substr(min, max - min);
        const thirdPart = sentence.substr(
            max,
            (copyMinAndMax[0] || sentence.length) - max
        );
        arrToShow.push(
            <span key={min}>
                <strong style={{ color: "red" }}>{strongPart}</strong>
                {thirdPart}
            </span>
        );
    }

    return (
        <>
            {firstPart}
            {arrToShow}
        </>
    );
}

const RenderCode = (props: any) => {
    const { language, value } = props;

    if (language === "ex") {
        if (!value) {
            return null;
        }
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
