import { Collapse } from "@material-ui/core";
import * as React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { bindActionCreators } from "redux";
import * as consts from "../common/consts";
import { TReducers } from "../store/configureStore";
import * as storiesStore from "../store/StoriesStore";
import { sentence, storyDesc, word } from "../types/stories";
import { SeasonAnimation } from "./parts/Animations/SeasonAnimation";
import ShurikenProgress from "./parts/Animations/ShurikenProgress";
import { Author } from "./parts/Author";
import CharacterComment from "./parts/CharacterComment";
import FB from "./parts/FaceBook";
import GoogleAd from "./parts/GoogleAd";
import Head from "./parts/Helmet";
import { Markdown } from "./parts/Markdown";
import "./parts/PleaseScrollDown.css";
import { ScrollBox } from "./parts/ScrollBox";
import { FBShareBtn, TwitterShareBtn } from "./parts/SnsShareButton";

type BtnType = "kanji" | "hiragana" | "romaji" | "english";

type Props = storiesStore.StoriesState &
    storiesStore.IActionCreators & {
        location: { pathname: string };
        otherStories: storyDesc[];
        match: { params: { [key: string]: string } };
    };
type State = {
    storyName: string;
    screenWidth: number;
    screenHeight: number;
    pleaseScrollDown: boolean;
    showFooterMenu: boolean;
    kanji?: boolean;
    hiragana?: boolean;
    romaji?: boolean;
    english?: boolean;
    imgNumber: 1 | 2 | 3;
};

class Stories extends React.Component<Props, State> {
    refSentences: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const storyName = params.storyName.toString().split("#")[0];

        this.state = {
            storyName: storyName,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pleaseScrollDown: false,
            showFooterMenu: false,
            imgNumber: this.getImgNumber(storyName.length),
        };

        const saveData = localStorage.getItem("folktales-languages");
        const objSaveData = saveData && JSON.parse(saveData);
        if (objSaveData) {
            this.state = {
                ...this.state,
                kanji: objSaveData.kanji == null ? true : objSaveData.kanji,
                hiragana:
                    objSaveData.hiragana == null ? true : objSaveData.hiragana,
                romaji: objSaveData.romaji == null ? false : objSaveData.romaji,
                english:
                    objSaveData.english == null ? true : objSaveData.english,
            };
        } else {
            this.state = {
                ...this.state,
                kanji: true,
                hiragana: true,
                romaji: true,
                english: true,
            };
        }

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };

        window.addEventListener("scroll", this.judgeFooter);
        this.refSentences = React.createRef();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.judgeFooter);
        window.onresize = null;
    }

    componentDidMount() {
        this.props.loadStory(this.state.storyName);

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
                this.judgeFooter();
            }, i * 1000);
        }
    }

    componentDidUpdate(previousProps: Props) {
        if (previousProps.location !== this.props.location) {
            const storyName =
                this.props.location.pathname
                    .split("/")
                    .filter(a => a)
                    .pop() || "";
            this.setState({
                storyName,
                imgNumber: this.getImgNumber(storyName.length),
            });
            this.props.loadStory(storyName);
        }
    }

    changeScreenSize = () => {
        if (
            this.state.screenWidth !== window.innerWidth ||
            this.state.screenHeight !== window.innerHeight
        ) {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        }
    };

    judgeFooter = () => {
        if (!this.refSentences) return;

        const divSentences = this.refSentences.current;
        if (!divSentences) return;

        const { screenHeight } = this.state;
        const offsetY = divSentences.getBoundingClientRect().top;
        const t_height = divSentences.offsetHeight;
        const t_position = offsetY - screenHeight;

        if (t_position >= 0) {
            // sentencesよりも上側の時
            this.setState({
                pleaseScrollDown: true,
                showFooterMenu: false,
            });
        } else if (-screenHeight > t_position + t_height) {
            // sentencesよりも下側の時
            this.setState({
                pleaseScrollDown: false,
                showFooterMenu: false,
            });
        } else {
            // sentencesが画面内
            this.setState({
                pleaseScrollDown: false,
                showFooterMenu: true,
            });
        }
    };

    onClickLangBtn = (btnType: BtnType) => {
        let saveData;
        switch (btnType) {
            case "kanji":
                saveData = {
                    kanji: !this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ kanji: !this.state.kanji });
                break;

            case "hiragana":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: !this.state.hiragana,
                    romaji: this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ hiragana: !this.state.hiragana });
                break;

            case "romaji":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: !this.state.romaji,
                    english: this.state.english,
                };
                this.setState({ romaji: !this.state.romaji });
                break;

            case "english":
                saveData = {
                    kanji: this.state.kanji,
                    hiragana: this.state.hiragana,
                    romaji: this.state.romaji,
                    english: !this.state.english,
                };
                this.setState({ english: !this.state.english });
                break;

            default:
        }

        localStorage.setItem("folktales-languages", JSON.stringify(saveData));
    };

    getImgNumber = (num: number = 0) => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate() + num;
        const mod = todayNumber % 30;
        if (mod > 20) return 2;
        if (mod > 10) return 3;
        return 1;
    };

    render() {
        const storyName =
            this.props.storyDesc.storyName || this.state.storyName || "";
        const title = storyName.split("--").join(" - ").split("_").join(" ");
        const titleOfAbout = storyName.split("--")[0].split("_").join(" ");

        const {
            screenWidth,
            pleaseScrollDown,
            showFooterMenu,
            imgNumber,
        } = this.state;
        const {
            storyDesc,
            sentences,
            words,
            explanation,
            otherStories,
        } = this.props;

        const isWide = screenWidth > 767;
        const isVeryWide = screenWidth > 991;

        const styleForStoryTitle: React.CSSProperties = isWide
            ? {
                  fontSize: "x-large",
                  fontWeight: "bold",
                  marginTop: 45,
              }
            : {
                  fontSize: "x-large",
                  fontWeight: "bold",
                  marginTop: 30,
              };
        const styleForAboutTitle: React.CSSProperties = {
            fontSize: isWide ? "x-large" : "large",
            background: "#fee8b4",
            boxShadow: "0px 0px 0px 5px #fee8b4",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
            fontWeight: "bold",
        };

        const videoIndex = storyDesc.youtube ? [title + " Video"] : [];

        const articleIndex = explanation
            ? explanation
                  .split("\n")
                  .filter(c => c.includes("##") && !c.includes("###"))
                  .map(c => c.split("#").join("").trim())
            : [];

        const indexLi = [
            `About ${titleOfAbout}`,
            ...videoIndex,
            `${title} Story`,
            ...articleIndex,
            "More folktales",
        ].map(c => {
            const linkText = c.split("#").join("").trim();
            return (
                <li key={linkText} style={{ marginTop: 10, marginBottom: 5 }}>
                    <AnchorLink href={"#" + encodeURIComponent(linkText)}>
                        {linkText}
                    </AnchorLink>
                </li>
            );
        });

        const index = (
            <div
                style={{
                    display: "flex",
                    flexDirection: isVeryWide ? "row" : "column",
                    margin: isVeryWide ? "40px 0" : "20px 0",
                }}
            >
                <ScrollBox
                    style={{
                        display: "inline-block",
                        flex: 1,
                        marginRight: isVeryWide ? 30 : undefined,
                        textAlign: "left",
                    }}
                >
                    <div
                        style={{
                            fontSize: "large",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: "bold",
                                fontSize: "large",
                            }}
                        >
                            Index
                        </span>
                        {indexLi && indexLi.length > 0 ? (
                            <ol
                                style={{
                                    display: "inline-block",
                                    margin: "auto",
                                    paddingRight: 20,
                                }}
                            >
                                {indexLi}
                            </ol>
                        ) : (
                            <ShurikenProgress size="20%" />
                        )}
                    </div>
                </ScrollBox>
                <GoogleAd style={{ flex: 1 }} />
            </div>
        );

        return (
            <div className="center">
                <Head
                    title={title + " Story | Japanese Folktales"}
                    desc={
                        storyDesc.description &&
                        storyDesc.description.split("\\n").join(" ")
                    }
                    img={`${consts.BLOB_URL}/folktalesImg/${
                        storyName.split("--")[0]
                    }.png`}
                />
                <main style={{ maxWidth: 1000 }}>
                    <div
                        className="breadcrumbs"
                        itemScope
                        itemType="https://schema.org/BreadcrumbList"
                        style={{ textAlign: "left" }}
                    >
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                to="/"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">{"Home"}</span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </span>
                        {" > "}
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                to="/folktales"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">
                                    {"Learn Japanese from Folktales"}
                                </span>
                                <meta itemProp="position" content="2" />
                            </Link>
                        </span>
                        {" > "}
                        <span
                            itemProp="itemListElement"
                            itemScope
                            itemType="http://schema.org/ListItem"
                        >
                            <span
                                itemProp="name"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                {title}
                            </span>
                            <meta itemProp="position" content="3" />
                        </span>
                    </div>
                    <article style={isWide ? { fontSize: "large" } : {}}>
                        <h1
                            style={{
                                margin: "25px",
                                lineHeight: screenWidth > 500 ? "45px" : "35px",
                                fontWeight: "bolder",
                            }}
                            className="whiteShadow"
                        >
                            {title}
                        </h1>
                        <br />
                        {this.state.storyName ? (
                            <img
                                src={`${consts.BLOB_URL}/folktalesImg/${
                                    storyName.split("--")[0]
                                }.png`}
                                width="90%"
                                alt={title}
                                title={title}
                                style={{ position: "relative", zIndex: -120 }}
                            />
                        ) : null}
                        {index}
                        {storyDesc.description ? (
                            <section
                                style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                    border: "5px double #333333",
                                    backgroundColor: "white",
                                }}
                                id="aboutFolktale"
                            >
                                <h2
                                    style={styleForAboutTitle}
                                    id={encodeURIComponent(
                                        `About ${titleOfAbout}`
                                    )}
                                >
                                    About {titleOfAbout}
                                </h2>
                                <div
                                    style={{
                                        textAlign: "left",
                                        display: "inline-block",
                                        padding: "0 10px",
                                    }}
                                >
                                    {storyDesc.description
                                        .split("\\n")
                                        .map((d, i) => (
                                            <span key={i}>
                                                {d}
                                                <br />
                                            </span>
                                        ))}
                                </div>
                            </section>
                        ) : null}
                        {storyDesc.youtube && (
                            <section style={{ margin: "5px 0 35px" }}>
                                <h2
                                    style={{
                                        ...styleForStoryTitle,
                                        textAlign: "left",
                                    }}
                                    id={encodeURIComponent(`${title} Video`)}
                                >
                                    {`${title} Video`}
                                </h2>
                                <div
                                    style={{
                                        backgroundColor:
                                            screenWidth > 600
                                                ? "rgb(231, 233, 231)"
                                                : undefined,
                                        padding: "5px 0",
                                        border: 0,
                                    }}
                                >
                                    <div style={{ maxWidth: 600 }}>
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                paddingTop: "56.25%",
                                            }}
                                        >
                                            <iframe
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                                src={
                                                    "https://www.youtube.com/embed/" +
                                                    storyDesc.youtube
                                                }
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                        {storyDesc.storyId ? (
                            <section ref={this.refSentences}>
                                <h2
                                    style={{
                                        ...styleForStoryTitle,
                                        textAlign: "left",
                                    }}
                                    id={encodeURIComponent(`${title} Story`)}
                                >
                                    {`${title} Story`}
                                </h2>
                                <br />
                                <Sentences
                                    storyId={storyDesc.storyId}
                                    sentences={sentences}
                                    words={words}
                                    langState={this.state}
                                    audioFolder={storyName?.split("--")[0]}
                                />
                            </section>
                        ) : (
                            <div className="center">
                                <ShurikenProgress key="circle" size="20%" />
                            </div>
                        )}
                        <FooterMenu
                            onClickLangBtn={this.onClickLangBtn}
                            langState={this.state}
                            screenWidth={screenWidth}
                            showFooterMenu={showFooterMenu}
                        />
                        {explanation && (
                            <Markdown
                                source={explanation}
                                style={{
                                    marginTop: isWide ? 0 : -20,
                                    marginBottom: 40,
                                }}
                                section
                            />
                        )}
                        <div
                            style={{
                                margin: "20px 0",
                            }}
                        >
                            <CharacterComment
                                comment={[
                                    <p key="commentContent">
                                        {
                                            "If you like this story, please share!"
                                        }
                                    </p>,
                                    <FBShareBtn
                                        key="fbShareButton"
                                        urlToShare={
                                            "https://www.lingual-ninja.com/folktales/" +
                                            storyName
                                        }
                                        style={{
                                            width: "200px",
                                            marginTop: "10px",
                                        }}
                                    />,
                                    <TwitterShareBtn
                                        key="twitterShareButton"
                                        urlToShare={
                                            "https://www.lingual-ninja.com/folktales/" +
                                            storyName
                                        }
                                        textToShare={title}
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                        }}
                                    />,
                                ]}
                                imgNumber={imgNumber}
                                screenWidth={screenWidth}
                            />
                        </div>
                        <hr />
                        <GoogleAd />
                        <hr />
                        <section>
                            {otherStories?.length > 0 ? (
                                <h2
                                    style={{
                                        ...styleForStoryTitle,
                                        textAlign: "left",
                                        marginTop: "30px",
                                        marginBottom: "20px",
                                    }}
                                    id={encodeURIComponent("More folktales")}
                                >
                                    More folktales
                                </h2>
                            ) : null}
                            {otherStories?.map(s => {
                                const nameForUrl = s.storyName;
                                const nameToShow = s.storyName
                                    .split("--")
                                    .join(" - ")
                                    .split("_")
                                    .join(" ");

                                return (
                                    <section
                                        key={s.storyId}
                                        style={{
                                            marginTop: 45,
                                        }}
                                    >
                                        <ScrollBox>
                                            {screenWidth > 500 ? (
                                                <>
                                                    <h3
                                                        style={{
                                                            margin:
                                                                "0 20px 20px",
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                        className="center"
                                                    >
                                                        <Link
                                                            to={`/folktales/${nameForUrl}`}
                                                            style={{
                                                                color: "black",
                                                            }}
                                                        >
                                                            {nameToShow}
                                                        </Link>
                                                    </h3>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style={{
                                                                        width:
                                                                            "50%",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/folktales/${nameForUrl}`}
                                                                    >
                                                                        <img
                                                                            src={`${
                                                                                consts.BLOB_URL
                                                                            }/folktalesImg/${
                                                                                nameForUrl.split(
                                                                                    "--"
                                                                                )[0]
                                                                            }.png`}
                                                                            width="90%"
                                                                            alt={
                                                                                nameToShow
                                                                            }
                                                                            title={
                                                                                nameToShow
                                                                            }
                                                                            style={{
                                                                                marginLeft:
                                                                                    "10px",
                                                                                marginBottom:
                                                                                    "10px",
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        textAlign:
                                                                            "left",
                                                                    }}
                                                                >
                                                                    {s.description
                                                                        .split(
                                                                            "\\n"
                                                                        )
                                                                        .map(
                                                                            (
                                                                                d,
                                                                                i
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        d
                                                                                    }
                                                                                    <br />
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    <div className="center">
                                                                        <p
                                                                            style={{
                                                                                margin:
                                                                                    "20px",
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                to={`/folktales/${nameForUrl}`}
                                                                            >{`Read ${nameToShow} >>`}</Link>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </>
                                            ) : (
                                                <>
                                                    <h3
                                                        style={{
                                                            color: "black",
                                                            marginBottom:
                                                                "20px",
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                    >
                                                        <Link
                                                            to={`/folktales/${nameForUrl}`}
                                                            style={{
                                                                color: "black",
                                                            }}
                                                        >
                                                            {nameToShow}
                                                        </Link>
                                                    </h3>
                                                    <Link
                                                        to={`/folktales/${nameForUrl}`}
                                                    >
                                                        <img
                                                            src={`${
                                                                consts.BLOB_URL
                                                            }/folktalesImg/${
                                                                nameForUrl.split(
                                                                    "--"
                                                                )[0]
                                                            }.png`}
                                                            width="90%"
                                                            alt={nameToShow}
                                                            title={nameToShow}
                                                        />
                                                    </Link>
                                                    <div
                                                        style={{
                                                            textAlign: "left",
                                                            margin: "10px",
                                                        }}
                                                    >
                                                        {s.description
                                                            .split("\\n")
                                                            .map((d, i) => (
                                                                <span
                                                                    key={i}
                                                                    style={{
                                                                        color:
                                                                            "black",
                                                                    }}
                                                                >
                                                                    {d}
                                                                    <br />
                                                                </span>
                                                            ))}
                                                    </div>
                                                    <p>
                                                        <Link
                                                            to={`/folktales/${nameForUrl}`}
                                                        >{`Read ${nameToShow} >>`}</Link>
                                                    </p>
                                                </>
                                            )}
                                        </ScrollBox>
                                    </section>
                                );
                            })}
                        </section>
                    </article>
                    <Link
                        to="/folktales"
                        style={{
                            fontSize: "x-large",
                            fontWeight: "bold",
                            marginBottom: 20,
                            display: "block",
                        }}
                    >
                        <Button color="primary" size="lg">
                            {"All folktales >>"}
                        </Button>
                    </Link>
                    <hr />
                    <Link to="/vocabulary-list">
                        <Card
                            body
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#333",
                                color: "white",
                            }}
                        >
                            <CardTitle>Japanese Vocabulary List</CardTitle>
                            <CardText>
                                Basic Japanese Vocabulary List!
                                <br />
                                Try to memorize all the vocabulary by using the
                                quizzes!
                            </CardText>
                            <Button color="secondary">Try!</Button>
                        </Card>
                    </Link>
                    <hr />
                    <Author
                        style={{ marginTop: 45 }}
                        screenWidth={screenWidth}
                    />
                    <FB />
                    <br />
                    <GoogleAd />
                    <PleaseScrollDown
                        pleaseScrollDown={pleaseScrollDown}
                        screenWidth={screenWidth}
                    />
                </main>
                <SeasonAnimation
                    frequencySec={2}
                    screenWidth={screenWidth}
                    season={storyDesc.season || "none"}
                />
            </div>
        );
    }
}

type SentencesProps = {
    storyId: number;
    sentences: sentence[];
    words: { [key: number]: word[] };
    langState: State;
    audioFolder: string;
};
function Sentences({
    storyId,
    sentences,
    words,
    langState,
    audioFolder,
}: SentencesProps) {
    const isLoading = !sentences || sentences.length <= 0;
    return (
        <div style={{ textAlign: "left" }}>
            {isLoading ? (
                <div className="center">
                    <ShurikenProgress key="circle" size="20%" />
                </div>
            ) : (
                sentences &&
                sentences.map(s => (
                    <div key={s.lineNumber}>
                        <Collapse
                            in={langState.kanji}
                            timeout={1000}
                            style={{
                                width: "100%",
                                backgroundColor: "#fff0f2",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                <div style={{ width: "100%" }}>{s.kanji}</div>
                            </div>
                        </Collapse>
                        <Collapse
                            in={langState.hiragana}
                            timeout={1000}
                            style={{
                                width: "100%",
                                backgroundColor: "#ffffe0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                    {s.hiragana}
                                </div>
                            </div>
                        </Collapse>
                        <Collapse
                            in={langState.romaji}
                            timeout={1000}
                            style={{
                                width: "100%",
                                backgroundColor: "#f0fff2",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                <div style={{ width: "100%" }}>{s.romaji}</div>
                            </div>
                        </Collapse>
                        <Collapse
                            in={langState.english}
                            timeout={1000}
                            style={{
                                width: "100%",
                                backgroundColor: "#f0f8ff",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                <div style={{ width: "100%" }}>{s.english}</div>
                            </div>
                        </Collapse>
                        <AudioControl s={s} audioFolder={audioFolder} />
                        <WordList words={words} s={s} storyId={storyId} />
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

interface AudioControlProps {
    s: sentence;
    audioFolder: string;
    style?: React.CSSProperties;
}
export class AudioControl extends React.Component<AudioControlProps> {
    refAudio: React.RefObject<HTMLAudioElement>;
    state: { showControl: boolean };

    constructor(props: AudioControlProps) {
        super(props);

        this.state = {
            showControl: false,
        };

        this.refAudio = React.createRef();
    }

    componentDidMount() {
        if (!this.refAudio) return;

        const audio = this.refAudio.current;
        void audio?.load();
    }

    render() {
        const { audioFolder, style } = this.props;
        const audioPath = `${consts.BLOB_URL}/folktalesAudio/${audioFolder}/folktale-audio${this.props.s.lineNumber}.m4a`;

        return (
            <audio
                ref={this.refAudio}
                src={audioPath}
                style={{
                    width: "100%",
                    height: "30px",
                    marginTop: "5px",
                    ...style,
                }}
                onCanPlayThrough={() => {
                    this.setState({ showControl: true });
                }}
                controls={this.state.showControl}
            />
        );
    }
}

interface WordListProps {
    words: { [key: number]: word[] };
    s: sentence;
    storyId: number;
}
export class WordList extends React.Component<
    WordListProps,
    {
        showWordList: boolean;
    }
> {
    constructor(props: WordListProps) {
        super(props);

        this.state = {
            showWordList: false,
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
                {this.props.words &&
                this.props.words[this.props.s.lineNumber]?.length > 0 ? (
                    this.state.showWordList ? (
                        <button
                            style={{
                                marginTop: 5,
                                marginBottom: 2,
                                height: 28,
                                paddingTop: 0,
                                color: "white",
                            }}
                            className="btn btn-dark btn-xs"
                            onClick={this.hideWordList}
                        >
                            ▲　Hide vocabulary list
                        </button>
                    ) : (
                        <button
                            style={{
                                marginTop: 5,
                                height: 28,
                                paddingTop: 0,
                                color: "white",
                            }}
                            className="btn btn-dark btn-xs"
                            onClick={this.showWordList}
                        >
                            ▼　Show vocabulary list
                        </button>
                    )
                ) : null}
                <Collapse in={this.state.showWordList} timeout={1000}>
                    <div
                        className="center"
                        style={{
                            backgroundColor: "#f8f7f8",
                            maxWidth: 700,
                            marginLeft: 0,
                            marginRight: "auto",
                        }}
                    >
                        <table
                            className="exclude"
                            style={{ fontSize: "normal" }}
                        >
                            <tbody>
                                {this.props.words &&
                                    this.props.words[
                                        this.props.s.lineNumber
                                    ]?.map(w => (
                                        <tr key={w.wordNumber}>
                                            <td
                                                style={{
                                                    minWidth: 100,
                                                    border: "1px solid",
                                                }}
                                            >
                                                {w.kanji}
                                                <br />
                                                {w.hiragana
                                                    ? `(${w.hiragana})`
                                                    : null}
                                            </td>
                                            <td
                                                style={{
                                                    paddingLeft: 3,
                                                    paddingRight: 3,
                                                    border: "1px solid",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "inline-block",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {w.english}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </Collapse>
            </span>
        );
    }
}

type TPleaseScrollDown = {
    pleaseScrollDown: boolean;
    screenWidth: number;
};
function PleaseScrollDown(props: TPleaseScrollDown) {
    const { screenWidth, pleaseScrollDown } = props;

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: pleaseScrollDown ? 999999990 : 0,
                width: `${screenWidth}px`,
                height: "70px",
                opacity: pleaseScrollDown ? 1.0 : 0,
                transition: pleaseScrollDown ? "all 2s ease" : "all 2s ease",
                fontSize: "x-large",
                backgroundColor: "#EEEEEE",
                borderRadius: "30px 30px 0px 0px",
            }}
        >
            <span id="pleaseScroll">
                <span></span>
                <AnchorLink href="#aboutFolktale">Scroll</AnchorLink>
            </span>
        </div>
    );
}

interface FooterMenuProps {
    onClickLangBtn: (btnType: any) => void;
    langState: Readonly<State>;
    screenWidth: number;
    showFooterMenu: boolean;
}
class FooterMenu extends React.Component<
    FooterMenuProps,
    {
        showLangMenu: boolean;
    }
> {
    constructor(props: FooterMenuProps) {
        super(props);

        this.state = {
            showLangMenu: true,
        };
    }

    showLangMenu = () => {
        this.setState({ showLangMenu: !this.state.showLangMenu });
    };

    render() {
        const { showLangMenu } = this.state;
        const { screenWidth, langState, showFooterMenu } = this.props;
        const tableWidth = screenWidth;
        const buttonWidth = tableWidth / 4 - 4;
        const tableLeft = 0;
        const tdStyle = { width: `${buttonWidth}px` };

        return (
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: showFooterMenu ? 999999999 : 0,
                    width: `${screenWidth}px`,
                    height: "50px",
                    backgroundColor: "white",
                    opacity: showFooterMenu ? 1.0 : 0,
                    transition: showFooterMenu ? "all 2s ease" : "all 2s ease",
                }}
            >
                <table
                    style={{
                        position: "fixed",
                        bottom: 3,
                        left: `${tableLeft}px`,
                        width: tableWidth,
                        backgroundColor: "#e7e9e7",
                        border: "1px solid gray",
                    }}
                >
                    <tbody>
                        <tr
                            style={{ width: "100%", cursor: "pointer" }}
                            onClick={this.showLangMenu}
                        >
                            <td colSpan={4} style={{ padding: 3 }}>
                                {showLangMenu ? (
                                    <div className="center">
                                        ▼ Select the languages to read ▼
                                    </div>
                                ) : (
                                    <div className="center">
                                        ▲ Show language menu ▲
                                    </div>
                                )}
                            </td>
                        </tr>
                        {showLangMenu ? (
                            <tr>
                                <td style={tdStyle}>
                                    <button
                                        className="btn btn-danger"
                                        style={{
                                            width: "100%",
                                            fontSize: "small",
                                            opacity: !langState.kanji ? 0.3 : 1,
                                        }}
                                        onClick={() =>
                                            this.props.onClickLangBtn("kanji")
                                        }
                                    >
                                        <b style={{ fontSize: "x-large" }}>K</b>
                                        anji
                                    </button>
                                </td>
                                <td style={tdStyle}>
                                    <button
                                        className="btn btn-warning"
                                        style={{
                                            width: "100%",
                                            fontSize: "small",
                                            color: "white",
                                            backgroundColor: "#d9c402",
                                            opacity: !langState.hiragana
                                                ? 0.3
                                                : 1,
                                        }}
                                        onClick={() =>
                                            this.props.onClickLangBtn(
                                                "hiragana"
                                            )
                                        }
                                    >
                                        <b style={{ fontSize: "x-large" }}>H</b>
                                        iragana
                                    </button>
                                </td>
                                <td style={tdStyle}>
                                    <button
                                        className="btn btn-success"
                                        style={{
                                            width: "100%",
                                            fontSize: "small",
                                            opacity: !langState.romaji
                                                ? 0.3
                                                : 1,
                                        }}
                                        onClick={() =>
                                            this.props.onClickLangBtn("romaji")
                                        }
                                    >
                                        <b style={{ fontSize: "x-large" }}>R</b>
                                        omaji
                                    </button>
                                </td>
                                <td style={tdStyle}>
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            width: "100%",
                                            fontSize: "small",
                                            opacity: !langState.english
                                                ? 0.3
                                                : 1,
                                        }}
                                        onClick={() =>
                                            this.props.onClickLangBtn("english")
                                        }
                                    >
                                        <b style={{ fontSize: "x-large" }}>E</b>
                                        nglish
                                    </button>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state: TReducers) => state.stories,
    dispatch => bindActionCreators(storiesStore.actionCreators as any, dispatch)
)(Stories);
