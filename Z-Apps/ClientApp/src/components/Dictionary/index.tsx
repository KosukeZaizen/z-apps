import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardText from "reactstrap/lib/CardText";
import CardTitle from "reactstrap/lib/CardTitle";
import { cFetch } from "../../common/util/cFetch";
import { storyDesc } from "../../types/stories";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import Head from "../parts/Helmet";
import { StoriesList } from "../Stories/StoriesTop/StoriesList";
import { getRomaji } from "./romajiConvert";

type Props = {
    location: { pathname: string };
    match: { params: { word: string } };
};
type State = {
    word: string;
    translatedWord: string;
    snippet: string;
    wordId: string;
    furigana: string;
    romaji: string;
    noindex: boolean;
    screenWidth: number;
    screenHeight: number;
    imgNumber: number;
    otherStories: storyDesc[];
};

class Dictionary extends React.Component<Props, State> {
    refSentences?: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const originalWord = params.word?.toString()?.split("#")[0] || "";

        const encodedWord = originalWord.split(",").join("%2C");
        if (originalWord !== encodedWord) {
            //If the comma was not encoded, use encoded URL to prevent the duplication of the pages
            window.location.href = `/category/${encodedWord}`;
        }

        if (window.location.pathname.split("#")[0].includes("%27")) {
            //基本的にはエンコードされたURLを正とするが、react-routerの仕様上、
            //「%27」のみは「'」を正とする。
            window.location.href = window.location.pathname
                .split("%27")
                .join("'");
        }

        const word = decodeURIComponent(originalWord)
            ?.split("?")
            ?.join("")
            ?.split("&")
            ?.join("");

        this.state = {
            word,
            translatedWord: "",
            snippet: "",
            wordId: "",
            furigana: "",
            romaji: "",
            noindex: false,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            imgNumber: this.getImgNumber(word?.length),
            otherStories: [],
        };

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
    }

    componentDidMount() {
        const getData = async () => {
            try {
                const url = `api/Wiki/GetEnglishWordAndSnippet?word=${this.state.word}`;
                const res = await cFetch(url);

                const { response, noindex } = await res.json();
                const { xml, wordId, snippet, translatedWord } = JSON.parse(
                    response
                );

                this.setState({
                    wordId,
                    translatedWord,
                    snippet,
                    noindex,
                });

                const getFuriganaAndRomaji = async () => {
                    try {
                        if (!xml) {
                            window.location.href = `/not-found?p=${window.location.pathname}`;
                            return;
                        }

                        const parser = new DOMParser();
                        const word = parser.parseFromString(xml, "text/xml");

                        const getInnerHTML = (type: string) =>
                            Array.prototype.map
                                .call(
                                    word?.getElementsByTagName("Word"),
                                    (w: HTMLElement) => {
                                        const forType = w?.getElementsByTagName(
                                            type
                                        );
                                        if (forType?.length <= 0) {
                                            return w?.getElementsByTagName(
                                                "Surface"
                                            )[0]?.innerHTML;
                                        } else {
                                            return forType[0]?.innerHTML;
                                        }
                                    }
                                )
                                ?.join(" ")
                                .split("<![CDATA[ ]]>")
                                .join(" ");

                        const furigana = getInnerHTML("Furigana");
                        const romaji = getRomaji(furigana);

                        this.setState({
                            furigana,
                            romaji,
                        });

                        this.getStories();
                    } catch (e) {
                        window.location.href = `/not-found?p=${window.location.pathname}`;
                    }
                };
                getFuriganaAndRomaji();
            } catch (ex) {
                window.location.href = `/not-found?p=${window.location.pathname}`;
            }
        };
        getData();

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    componentDidUpdate(previousProps: Props) {
        if (previousProps.location !== this.props.location) {
            const word =
                this.props.location.pathname
                    .split("/")
                    .filter(a => a)
                    .pop() || "";
            this.setState({
                word: decodeURIComponent(word),
            });
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

    getImgNumber = (num: number = 0) => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate() + num;
        const mod = todayNumber % 27;
        if (mod > 13) return 2;
        if (mod > 5) return 3;
        return 1;
    };

    getStories = async () => {
        //other stories
        const url = `api/Stories/GetOtherStories/${this.state.wordId}`;
        const response = await cFetch(url);
        const otherStories = await response.json();
        this.setState({ otherStories });
    };

    render() {
        const {
            screenWidth,
            furigana,
            romaji,
            word,
            noindex,
            imgNumber,
            translatedWord,
            snippet,
            otherStories,
        } = this.state;

        const title = romaji && `${romaji} (${translatedWord})`;

        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };
        const styleDiv: React.CSSProperties = {
            background: "antiquewhite",
            boxShadow: "0px 0px 0px 5px antiquewhite",
            border: "dashed 2px white",
            padding: "0.2em 0.5em",
            marginBottom: "10px",
        };

        return (
            <div className="center">
                <Head
                    title={title}
                    desc={snippet}
                    // noindex={noindex}
                    noindex
                />
                <div style={{ maxWidth: 900 }}>
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
                                to="/dictionary"
                                itemProp="item"
                                style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                }}
                            >
                                <span itemProp="name">
                                    {"Japanese dictionary"}
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
                    <article
                        style={{
                            borderBottom: "1px solid gainsboro",
                            paddingBottom: 20,
                            marginBottom: 15,
                        }}
                    >
                        {title && (
                            <h1
                                style={{
                                    margin: "25px 0",
                                    lineHeight:
                                        screenWidth > 500 ? "45px" : "35px",
                                    width: "100%",
                                    fontWeight: "bold",
                                }}
                                className="whiteShadow"
                            >
                                {title}
                            </h1>
                        )}
                        <br />
                        <div
                            style={{
                                borderBottom: "1px solid gainsboro",
                            }}
                        >
                            <CharacterComment
                                screenWidth={screenWidth}
                                imgNumber={imgNumber}
                                comment={
                                    furigana && romaji ? (
                                        <p>
                                            {"Check the information about "}
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {romaji}
                                                </span>
                                            </span>{" "}
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                }}
                                            >
                                                {"("}
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {word}
                                                </span>
                                                {")!"}
                                            </span>
                                        </p>
                                    ) : (
                                        <ShurikenProgress
                                            key="circle"
                                            size="20%"
                                        />
                                    )
                                }
                            />
                            <br />
                        </div>
                        <br />
                        {romaji ? (
                            <>
                                <section
                                    style={{
                                        borderBottom: "1px solid gainsboro",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <h2 style={styleDiv}>{title}</h2>
                                    <p style={{ textAlign: "left" }}>
                                        {snippet + "..."}
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        This information originally came from{" "}
                                        <a
                                            href={
                                                "https://ja.wikipedia.org/wiki/" +
                                                word
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {"Japanese wikipedia >>"}
                                        </a>
                                    </p>
                                </section>
                                <br />
                                <section
                                    style={{
                                        borderBottom: "1px solid gainsboro",
                                    }}
                                >
                                    <h2 style={styleDiv}>
                                        {"Hiragana and Kanji for " + romaji}
                                    </h2>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        style={
                                                            tableElementStyle
                                                        }
                                                        align="center"
                                                    >
                                                        Hiragana
                                                    </TableCell>
                                                    <TableCell
                                                        style={
                                                            tableElementStyle
                                                        }
                                                        align="center"
                                                    >
                                                        {furigana}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell
                                                        style={
                                                            tableElementStyle
                                                        }
                                                        align="center"
                                                    >
                                                        Kanji
                                                    </TableCell>
                                                    <TableCell
                                                        style={
                                                            tableElementStyle
                                                        }
                                                        align="center"
                                                    >
                                                        {word}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <br />
                                </section>
                                <br />
                                <section>
                                    <h2 style={styleDiv}>
                                        {"Learn Japanese from folktales"}
                                    </h2>
                                    <div style={{ padding: "20px 0" }}>
                                        <CharacterComment
                                            screenWidth={screenWidth}
                                            imgNumber={imgNumber - 1 || 3}
                                            comment={
                                                <p>
                                                    Reading a lot of sample
                                                    sentences are the best way
                                                    to learn new languages!
                                                    <br />
                                                    Let's learn Japanese by
                                                    reading popular Japanese
                                                    folktales in English,
                                                    Hiragana, Kanji, and Romaji!
                                                </p>
                                            }
                                        />
                                    </div>
                                    <StoriesList
                                        headLevel="h3"
                                        stories={otherStories}
                                        screenWidth={screenWidth}
                                    />
                                    <Link
                                        to="/folktales"
                                        style={{
                                            fontSize: "x-large",
                                            display: "block",
                                            marginTop: 15,
                                        }}
                                    >
                                        {"All folktales >>"}
                                    </Link>
                                </section>
                            </>
                        ) : (
                            <ShurikenProgress
                                key="circle"
                                size="20%"
                                style={{ marginBottom: 25 }}
                            />
                        )}
                    </article>
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
                    <FB />
                    <SeasonAnimation
                        frequencySec={2}
                        screenWidth={screenWidth}
                    />
                </div>
            </div>
        );
    }
}

export default Dictionary;
