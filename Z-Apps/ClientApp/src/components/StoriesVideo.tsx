import * as React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { initializeAnimation } from "../common/animation";
import * as consts from "../common/consts";
import { sleepAsync } from "../common/functions";
import * as storiesEditStore from "../store/StoriesEditStore";
import { sentence } from "../types/stories";
import CharacterComment from "./parts/CharacterComment";
import Head from "./parts/Helmet";

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

type Props = storiesEditStore.StoriesEditState &
    storiesEditStore.IActionCreators & { match: { params: any } };
type State = {
    storyName: string;
    isStarted: boolean;
    isEnding: boolean;
    playingSentence: number;
};
class StoriesVideo extends React.Component<Props, State> {
    canvasRef: React.RefObject<CanvasElement>;

    constructor(props: Props) {
        super(props);

        initializeAnimation();

        const { params } = props.match;
        const storyName = params.storyName.toString();

        this.state = {
            storyName: storyName,
            playingSentence: -1,
            isStarted: false,
            isEnding: false,
        };

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
                        await sleepAsync(1000);
                        music.currentTime = 0;
                        music.onended = async () => {
                            await sleepAsync(2000);
                            r(undefined);
                        };
                        music.play();
                    };
                    music.play();
                });
            }
        };
        this.setState({ isStarted: true });
        await sleepAsync(5000);
        for (let k in sentences) {
            this.setState({ playingSentence: Number(k) });
            await playOne(Number(k));
        }
        await sleepAsync(1000);
        this.setState({ isEnding: true });
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
        const { playingSentence, isStarted, isEnding } = this.state;

        const storyName = this.props.storyDesc.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");

        const transition = "0.5s";

        const typeButton = (type: string) => (
            <Button
                color="success"
                style={{
                    fontSize: "x-large",
                    fontWeight: "bold",
                    transition,
                }}
                size="sm"
            >
                {type}
            </Button>
        );
        const line = (type: keyof sentence) => (
            <ul style={{ margin: "5px 0 20px", transition }}>
                <li>{sentences[playingSentence][type]}</li>
            </ul>
        );

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
                <br />
                {isStarted && (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "white",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9999999999999999,
                            textAlign: "left",
                        }}
                    >
                        {this.state.storyName ? (
                            <img
                                src={`${consts.BLOB_URL}/folktalesImg/${
                                    storyName.split("--")[0]
                                }.png`}
                                width="100%"
                                alt={title}
                                style={{ position: "relative", zIndex: -9999 }}
                            />
                        ) : null}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 100,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "white",
                                opacity: 0.7,
                            }}
                            className="whiteShadow"
                        ></div>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                padding: 10,
                                fontSize: "xx-large",
                                fontWeight: "bold",
                                zIndex: 999999,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {playingSentence >= 0 ? (
                                !isEnding ? (
                                    <div className="whiteShadow">
                                        {typeButton("Kanji")}
                                        {line("kanji")}
                                        {typeButton("Hiragana")}
                                        {line("hiragana")}
                                        {typeButton("Romaji")}
                                        {line("romaji")}
                                        {typeButton("English")}
                                        {line("english")}
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                            //flexDirection: "column",
                                        }}
                                    >
                                        <div style={{ textAlign: "center" }}>
                                            <h1
                                                style={{
                                                    margin: 35,
                                                    fontSize: "50px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Thank you for watching!
                                            </h1>
                                            <CharacterComment
                                                imgNumber={1}
                                                comment="Don't forget to subscribe to this channel!"
                                                screenWidth={window.innerWidth}
                                                commentStyle={{
                                                    textAlign: "left",
                                                    padding: "10px 30px",
                                                    fontSize: "30px",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    className="whiteShadow"
                                >
                                    <h1
                                        style={{
                                            display: "block",
                                            fontSize: "100px",
                                        }}
                                    >
                                        {storyName}
                                    </h1>
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                padding: 5,
                                fontSize: "large",

                                zIndex: 999999,
                                width: "100%",
                                backgroundColor: "white",
                                textAlign: "center",
                            }}
                        >
                            If you want to check the word list for this story,
                            please visit:{" "}
                            <span style={{ color: "blue" }}>
                                {window.location.href.replace("Video", "")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    (state: any) => state.storiesEdit,
    dispatch => bindActionCreators(storiesEditStore.actionCreators, dispatch)
)(StoriesVideo);
