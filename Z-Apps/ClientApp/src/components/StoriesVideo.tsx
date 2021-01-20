import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AnimationEngine, initializeAnimation } from "../common/animation";
import * as consts from "../common/consts";
import { sleepAsync } from "../common/functions";
import * as storiesEditStore from "../store/StoriesEditStore";
import { sentence, word } from "../types/stories";
import ShurikenProgress from "./parts/Animations/ShurikenProgress";
import Head from "./parts/Helmet";

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

type Props = storiesEditStore.StoriesEditState &
    storiesEditStore.IActionCreators & { match: { params: any } };
type State = {
    storyName: string;
    ninjaX: number;
    time: number;
};
class StoriesVideo extends React.Component<Props, State> {
    canvasRef: React.RefObject<CanvasElement>;
    animation?: AnimationEngine<State>;
    screenHeight: number;

    constructor(props: Props) {
        super(props);

        initializeAnimation();

        const body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";

        const { params } = props.match;
        const storyName = params.storyName.toString();

        this.state = {
            storyName: storyName,
            ninjaX: 20,
            time: 0,
        };

        this.screenHeight = window.innerHeight;

        this.props.loadStory(this.state.storyName);

        this.canvasRef = React.createRef();
    }

    startVideo = async () => {
        const { storyDesc, sentences, words } = this.props;

        const playOne = async (currentIndex: number) => {
            if (sentences.length === currentIndex) {
                alert("fin");
                return;
            } else {
                return new Promise(async r => {
                    const music = new Audio(
                        `https://lingualninja.blob.core.windows.net/lingual-storage/folktalesAudio/${storyDesc.storyName}/folktale-audio${sentences[currentIndex].lineNumber}.m4a`
                    );
                    music.onended = async () => {
                        await sleepAsync(2000);
                        music.currentTime = 0;
                        music.onended = async () => {
                            await sleepAsync(3000);
                            r(undefined);
                        };
                        music.play();
                    };
                    music.play();
                });
            }
        };
        for (let k in sentences) {
            await playOne(Number(k));
        }
    };

    componentDidUpdate() {
        if (this.props.storyDesc.storyId) {
            if (!this.props.sentences || this.props.sentences.length <= 0) {
                this.props.loadSentences(this.props.storyDesc.storyId);
                this.props.loadWords(this.props.storyDesc.storyId);
            }
        }
    }

    render() {
        const { sentences, words } = this.props;

        const storyName = this.props.storyDesc.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const showSentences =
            sentences && sentences.length > 0 && words && words.length > 0;

        console.log("props", this.props);

        return (
            <div className="center" style={{ overflow: "hidden" }}>
                <Head title={title + " Story"} noindex />
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#1b181b",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: -1,
                    }}
                ></div>
                <h1
                    style={{
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    }}
                >
                    <b>{title}</b>
                </h1>
                {sentences?.length > 0 && words?.length > 0 ? (
                    <button onClick={this.startVideo}>{"start video"}</button>
                ) : (
                    <p>{"loading"}</p>
                )}
                <canvas
                    ref={this.canvasRef}
                    width="400"
                    height="300"
                    style={{ backgroundColor: "white" }}
                >
                    図形を表示するには、canvasタグをサポートしたブラウザが必要です。
                </canvas>
                <br />
                {this.state.storyName ? (
                    <img
                        src={`${consts.BLOB_URL}/folktalesImg/${
                            storyName.split("--")[0]
                        }.png`}
                        width="100px"
                        alt={title}
                    />
                ) : null}
                <br />
                <br />
                {this.props.storyDesc.description ? (
                    <Description
                        desc={this.props.storyDesc.description}
                        handleChangeDesc={this.props.handleChangeDesc}
                    />
                ) : null}
                <br />
                {showSentences ? (
                    <Sentences
                        storyId={this.props.storyDesc.storyId}
                        sentences={this.props.sentences}
                        loadSentences={this.props.loadSentences}
                        words={this.props.words}
                        loadWords={this.props.loadWords}
                        handleChangeSentence={this.props.handleChangeSentence}
                        addLine={this.props.addLine}
                        handleChangeWord={this.props.handleChangeWord}
                        addWord={this.props.addWord}
                        removeWord={this.props.removeWord}
                        removeLine={this.props.removeLine}
                        translate={this.props.translate}
                        translateWord={this.props.translateWord}
                        isTranslating={this.props.isTranslating}
                        mergeWord={this.props.mergeWord}
                    />
                ) : (
                    <div className="center">
                        <ShurikenProgress key="circle" size="20%" />
                    </div>
                )}
            </div>
        );
    }
}

interface DescriptionProps {
    desc: string;
    handleChangeDesc: () => void;
}
class Description extends React.Component<DescriptionProps> {
    constructor(props: DescriptionProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    padding: "10px",
                    marginBottom: "10px",
                    border: "5px double #333333",
                    color: "#eb6905",
                }}
            >
                <textarea
                    rows={10}
                    style={{
                        width: "100%",
                        backgroundColor: "#1b181b",
                        color: "#eb6905",
                        border: "thin solid #594e46",
                    }}
                    value={this.props.desc}
                    onChange={this.props.handleChangeDesc}
                />
            </div>
        );
    }
}

interface SentencesProps {
    storyId: number;
    sentences: sentence[];
    words: word[];
    loadSentences: (storyId: number) => void;
    loadWords: (storyId: number) => void;
    handleChangeSentence: (
        e: React.ChangeEvent<HTMLInputElement>,
        i: number,
        type: string
    ) => void;
    handleChangeWord: () => void;
    addWord: () => void;
    addLine: (idx: number, s?: string) => void;
    removeWord: () => void;
    removeLine: (lineNumber: number) => void;
    translate: (s: sentence) => void;
    translateWord: () => void;
    isTranslating: boolean;
    mergeWord: () => void;
}
class Sentences extends React.Component<SentencesProps> {
    constructor(props: SentencesProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                {this.props.sentences &&
                    this.props.sentences.map((s, i) => (
                        <span key={s.lineNumber}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr
                                        style={{
                                            backgroundColor: "black",
                                            color: "#757575",
                                        }}
                                    >
                                        <td style={{ width: "20px" }}>
                                            <b>Ｋ:　</b>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={s.kanji}
                                                onChange={e =>
                                                    this.props.handleChangeSentence(
                                                        e,
                                                        i,
                                                        "kanji"
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#1b181b",
                                                    color: "#eb6905",
                                                    border:
                                                        "thin solid #594e46",
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td style={{ textAlign: "left" }}>
                                            <button
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    height: 28,
                                                    paddingTop: 0,
                                                    color: "black",
                                                }}
                                                className="btn btn-dark btn-xs"
                                                onClick={() =>
                                                    this.props.translate(s)
                                                }
                                            >
                                                <b>↓　Translate Sentence　↓</b>
                                            </button>
                                            {this.props.isTranslating ? (
                                                <span
                                                    style={{
                                                        color: "white",
                                                        marginLeft: 20,
                                                    }}
                                                >
                                                    Translating...
                                                </span>
                                            ) : null}
                                            <div
                                                style={{
                                                    textAlign: "right",
                                                    float: "right",
                                                }}
                                            >
                                                <button
                                                    style={{
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        height: 28,
                                                        paddingTop: 0,
                                                        color: "black",
                                                    }}
                                                    className="btn btn-dark btn-xs"
                                                    onClick={() =>
                                                        this.props.removeLine(
                                                            s.lineNumber
                                                        )
                                                    }
                                                >
                                                    <b>Remove Sentence</b>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            backgroundColor: "black",
                                            color: "#757575",
                                        }}
                                    >
                                        <td style={{ width: "20px" }}>
                                            <b>Ｈ:　</b>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={s.hiragana}
                                                onChange={e =>
                                                    this.props.handleChangeSentence(
                                                        e,
                                                        i,
                                                        "hiragana"
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#1b181b",
                                                    color: "#eb6905",
                                                    border:
                                                        "thin solid #594e46",
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            backgroundColor: "black",
                                            color: "#757575",
                                        }}
                                    >
                                        <td style={{ width: "20px" }}>
                                            <b>Ｒ:　</b>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={s.romaji}
                                                onChange={e =>
                                                    this.props.handleChangeSentence(
                                                        e,
                                                        i,
                                                        "romaji"
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#1b181b",
                                                    color: "#eb6905",
                                                    border:
                                                        "thin solid #594e46",
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            backgroundColor: "black",
                                            color: "#757575",
                                        }}
                                    >
                                        <td style={{ width: "20px" }}>
                                            <b>Ｅ:　</b>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={s.english}
                                                onChange={e =>
                                                    this.props.handleChangeSentence(
                                                        e,
                                                        i,
                                                        "english"
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#1b181b",
                                                    color: "#eb6905",
                                                    border:
                                                        "thin solid #594e46",
                                                }}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {this.props.words && this.props.words.length > 0 ? (
                                <WordList
                                    words={this.props.words}
                                    s={s}
                                    storyId={this.props.storyId}
                                    handleChangeWord={
                                        this.props.handleChangeWord
                                    }
                                    addWord={this.props.addWord}
                                    removeWord={this.props.removeWord}
                                    translateWord={this.props.translateWord}
                                    mergeWord={this.props.mergeWord}
                                />
                            ) : null}
                            <button
                                style={{
                                    marginTop: 10,
                                    marginBottom: 2,
                                    height: 28,
                                    paddingTop: 0,
                                    color: "black",
                                }}
                                className="btn btn-dark btn-xs"
                                onClick={() => this.props.addLine(s.lineNumber)}
                            >
                                <b>Add Line</b>
                            </button>

                            <br />
                            <br />
                            <hr />
                        </span>
                    ))}
            </div>
        );
    }
}

interface WordListProps {
    words: word[];
    s: sentence;
    storyId: number;
    handleChangeWord: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        lineNumber: number,
        wordNumber: number,
        type: string
    ) => void;
    addWord: (lineNumber: number, wordNumber: number) => void;
    removeWord: (lineNumber: number, wordNumber: number) => void;
    translateWord: (w: word) => void;
    mergeWord: (lineNumber: number, wordNumber: number) => void;
}
class WordList extends React.Component<
    WordListProps,
    {
        showWordList: boolean;
    }
> {
    constructor(props: WordListProps) {
        super(props);

        this.state = {
            showWordList: true,
        };
    }

    showWordList = () => {
        this.setState({ showWordList: true });
    };

    hideWordList = () => {
        this.setState({ showWordList: false });
    };

    render() {
        return (
            <span>
                <br />
                <div style={{ backgroundColor: "#1b181b" }}>
                    {this.state.showWordList ? (
                        <div className="center">
                            <table
                                style={{
                                    border: 1,
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <tbody>
                                    {this.props.words &&
                                        this.props.words
                                            .filter(
                                                w =>
                                                    w.lineNumber ===
                                                    this.props.s.lineNumber
                                            )
                                            .sort(
                                                (a, b) =>
                                                    a.wordNumber - b.wordNumber
                                            )
                                            .map((w, i) => (
                                                <tr key={w.wordNumber}>
                                                    <td
                                                        style={{
                                                            width: "10px",
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                height: "100%",
                                                                paddingTop: 0,
                                                                color: "black",
                                                            }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() =>
                                                                this.props.mergeWord(
                                                                    w.lineNumber,
                                                                    w.wordNumber
                                                                )
                                                            }
                                                        >
                                                            <b>M</b>
                                                        </button>
                                                    </td>
                                                    <td
                                                        style={{ width: "20%" }}
                                                    >
                                                        <textarea
                                                            value={w.kanji}
                                                            onChange={e =>
                                                                this.props.handleChangeWord(
                                                                    e,
                                                                    this.props.s
                                                                        .lineNumber,
                                                                    w.wordNumber,
                                                                    "kanji"
                                                                )
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                backgroundColor:
                                                                    "#1b181b",
                                                                color:
                                                                    "#eb6905",
                                                                border:
                                                                    "thin solid #594e46",
                                                            }}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "10px",
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                height: "100%",
                                                                paddingTop: 0,
                                                                color: "black",
                                                            }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() =>
                                                                this.props.translateWord(
                                                                    w
                                                                )
                                                            }
                                                        >
                                                            <b>⇒</b>
                                                        </button>
                                                    </td>
                                                    <td
                                                        style={{ width: "23%" }}
                                                    >
                                                        <textarea
                                                            value={w.hiragana}
                                                            onChange={e =>
                                                                this.props.handleChangeWord(
                                                                    e,
                                                                    this.props.s
                                                                        .lineNumber,
                                                                    w.wordNumber,
                                                                    "hiragana"
                                                                )
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                backgroundColor:
                                                                    "#1b181b",
                                                                color:
                                                                    "#eb6905",
                                                                border:
                                                                    "thin solid #594e46",
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            value={w.english}
                                                            onChange={e =>
                                                                this.props.handleChangeWord(
                                                                    e,
                                                                    this.props.s
                                                                        .lineNumber,
                                                                    w.wordNumber,
                                                                    "english"
                                                                )
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                backgroundColor:
                                                                    "#1b181b",
                                                                color:
                                                                    "#eb6905",
                                                                border:
                                                                    "thin solid #594e46",
                                                            }}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "10px",
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                height: "100%",
                                                                paddingTop: 0,
                                                                color: "black",
                                                            }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() =>
                                                                this.props.removeWord(
                                                                    w.lineNumber,
                                                                    w.wordNumber
                                                                )
                                                            }
                                                        >
                                                            <b>－</b>
                                                        </button>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "10px",
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                height: "100%",
                                                                paddingTop: 0,
                                                                color: "black",
                                                            }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() =>
                                                                this.props.addWord(
                                                                    w.lineNumber,
                                                                    w.wordNumber
                                                                )
                                                            }
                                                        >
                                                            <b>＋</b>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </span>
        );
    }
}

export default connect(
    (state: any) => state.storiesEdit,
    dispatch => bindActionCreators(storiesEditStore.actionCreators, dispatch)
)(StoriesVideo);
