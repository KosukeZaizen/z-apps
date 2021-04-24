import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardText from "reactstrap/lib/CardText";
import CardTitle from "reactstrap/lib/CardTitle";
import { bindActionCreators } from "redux";
import { cFetch } from "../../../common/util/cFetch";
import { ApplicationState } from "../../../store/configureStore";
import { actionCreators } from "../../../store/StoriesTopStore";
import { storyDesc } from "../../../types/stories";
import { Page } from "../../Articles";
import { ArticlesList } from "../../Articles/Top";
import { SeasonAnimation } from "../../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../../parts/Animations/ShurikenProgress";
import { Author } from "../../parts/Author";
import CharacterComment from "../../parts/CharacterComment";
import FB from "../../parts/FaceBook";
import { AnchorLink } from "../../parts/HashScroll";
//import GoogleAd from "../parts/GoogleAd";
import Head from "../../parts/Helmet";
import { Markdown } from "../../parts/Markdown";
import PleaseScrollDown from "../../parts/PleaseScrollDown";
import { StoriesList } from "./StoriesList";

interface StoriesTopProps {
    loadAllStories: () => void;
    allStories: storyDesc[];
}
interface StoriesTopState {
    pages: Page[];
    screenWidth: number;
    imgNumber: 1 | 2 | 3;
}
class StoriesTop extends React.Component<StoriesTopProps, StoriesTopState> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: StoriesTopProps) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            pages: [],
            imgNumber: this.getImgNumber(),
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

        this.ref = React.createRef();
    }

    getImgNumber = () => {
        const today = new Date();
        const todayNumber = today.getMonth() + today.getDate();
        const mod = todayNumber % 27;
        if (mod > 6) return 1;
        if (mod > 2) return 2;
        return 3;
    };

    componentDidMount() {
        this.props.loadAllStories();

        if (this.props.allStories.length > 0) {
            void this.getArticles();
        }
    }

    componentDidUpdate(previousProps: StoriesTopProps) {
        if (this.props.allStories.length !== previousProps.allStories.length) {
            void this.getArticles();
        }
    }

    getArticles = async () => {
        const response: Response = await cFetch(
            "api/Articles/GetAllArticles?isAboutFolktale=true"
        );
        const pages: Page[] = await response.json();
        this.setState({ pages });
    };

    changeScreenSize = () => {
        this.setState({
            screenWidth: window.innerWidth,
        });
    };

    render() {
        const { allStories } = this.props;
        const { screenWidth, pages, imgNumber } = this.state;
        const isWide = screenWidth > 767;
        return (
            <div className="center">
                <Head
                    title="Learn Japanese from Folktales"
                    desc="Free web application to learn Japanese from folktales! You can read traditional Japanese folktales in English, Hiragana, Kanji, and Romaji!"
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
                                <span itemProp="name">Home</span>
                            </Link>
                            <meta itemProp="position" content="1" />
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
                                Learn Japanese from Folktales
                            </span>
                            <meta itemProp="position" content="2" />
                        </span>
                    </div>
                    <h1
                        style={{
                            margin: "30px",
                            lineHeight: "40px",
                            fontWeight: "bolder",
                        }}
                        className="whiteShadow"
                    >
                        Learn Japanese from Folktales
                    </h1>
                    <CharacterComment
                        screenWidth={screenWidth}
                        imgNumber={imgNumber}
                        comment={
                            <div
                                style={{ textAlign: "left", padding: "0 10px" }}
                            >
                                Free web app to learn Japanese from folktales!
                                <br />
                                You can read traditional Japanese folktales in
                                Romaji, Hiragana, Kanji, and English!
                            </div>
                        }
                        style={isWide ? {} : { margin: "auto auto 40px auto" }}
                    />
                    {allStories && allStories.length > 0 ? null : (
                        <div className="center">
                            <ShurikenProgress key="circle" size="20%" />
                        </div>
                    )}
                    <div id="scrollTargetId" ref={this.ref}>
                        <StoriesList
                            headLevel="h2"
                            stories={allStories}
                            screenWidth={screenWidth}
                        />
                        <CharacterComment
                            screenWidth={screenWidth}
                            imgNumber={imgNumber - 1 || 3}
                            comment={
                                "Enjoy studying Japanese from traditional folktales!"
                            }
                        />
                        {pages.length > 0 && (
                            <section
                                style={{
                                    borderTop: "1px solid #dcdcdc",
                                    marginTop: 20,
                                    paddingTop: 20,
                                }}
                            >
                                <h2
                                    style={{
                                        maxWidth: 900,
                                        display: "block",
                                        margin: "40px auto 60px",
                                    }}
                                    className="markdownH2"
                                >
                                    Articles about Japanese Folktales
                                </h2>
                                <ArticlesList
                                    articles={pages}
                                    screenWidth={screenWidth}
                                    titleH="h3"
                                />
                            </section>
                        )}
                        <Author
                            style={{ marginTop: 45, maxWidth: 900 }}
                            screenWidth={screenWidth}
                        />
                    </div>
                    <hr />
                    <Markdown
                        style={{ textAlign: "left" }}
                        source={`
## Why you should learn Japanese using Japanese Folktales
The best way to learn a language is by *remembering many sentences*.

Of course, studying grammar is important.
However, only knowing grammar and vocabulary is not enough to speak and use languages.
When we speak naturally, we don't think about grammar.
There is no time to think about grammar when speaking with someone.
While you are thinking about grammar, the topic of the conversation
 with your Japanese friends will proceed on to the next thing.

### Getting used to the language is the most important part of learning languages

Please imagine how you learned your native language.
When you were born, of course, you couldn't use your native language at all.
When your parents spoke to you, you listened to them even though you couldn't
 understand what they were saying.
However, while you continued to listen, gradually,
 you slowly began to understand and remembered easy sentences.
Then perhaps you went to preschool and listened to your teacher.
After that, maybe you made friends and spoke about your favorite
 Anime characters with them.
And finally, you started to learn grammar in your school.

*If you have already gotten use to the language,
 you can speak without knowing grammar.*

### The big obstacle to learn Japanese

If you want to learn English,
 watching English movies with English subtitles is a good idea.
While you listen to the English sound and read the English subtitles,
 you will get used to English.
This is the way I learned English.

However, there is one big problem in learning Japanese this way.

It is *Kanji*.
When you try to read the Japanese subtitles in movies, they will include a lot of Kanji.
So if you haven't leaned the Kanji characters yet, it will be extremely difficult to read them.
(Maybe you will want to cry because there are too many Kanji characters!)

The same thing will happen when you try to read Japanese books.
They include a lot of Kanji characters.

### At first, you should learn Japanese in Romaji, Hiragana, and while listening.

As I explained before, normal Japanese books include a lot of Kanji,
 and it disturbs your studying at first.
Therefore, some kind of *special text book is necessary to learn Japanese*.
The ideal textbook to learn Japanese is one in which:
- You can listen to the native speaker's pronunciation over and over
- It includes a lot of easy sentences to remember
- You can read sentences in Romaji or Hiragana (without Kanji)
- You can check the meaning of each word

This is why I made this "Japanese Folktales" application.

## How to use Japanese Folktales application

If you choose and click one story from the folktale list above,
 you can read the story in English.
Maybe you should read the story in English at first in order to grasp the story.

Also, you can read the story in Romaji, Hiragana, and Kanji.
And when you push the "▶" button,
 you can listen to the sound spoken by a native Japanese speaker.

### Hide Kanji, listen to the sound

I would like you to listen to the sound a few times to get used to Japanese sound.

If you don't need to read Kanji, please push the *Kanji* button at the bottom
 of the screen.
Kanji sentences will be hidden after pushing it.

### Read in Romaji or Hiragana while listening

If you already remember Hiragana characters,
 please keep showing the Hiragana and hide the Romaji.
If you still don't remember Hiragana perfectly, you can keep showing Romaji.

*While listening,
 please read the sentences in Romaji or Hiragana.*
And after getting used to reading,
 please say the sentences out loud to remember the sentences.

Maybe remembering all the sentences is too difficult.
But remembering a few sentences will be extremely helpful.
*If you already remember some Japanese sentences,
 it will make it much easier to learn Japanese grammar.*

If you continue studying in this way, you will learn natural Japanese rapidly.
I learned English by doing this using English movies.

You can learn Japanese step by step using this application.

I am glad that you are interested in my country, Japan.
I hope this application helps you to study Japanese!
`}
                    />
                    <AnchorLink targetHash={`#${this.ref?.current?.id}`}>
                        <Button color="primary">
                            Study Japanese from folktales!
                        </Button>
                    </AnchorLink>
                    <br />
                    <br />
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
                </main>
                <FB />
                <br />
                {/* <GoogleAd /> */}
                <PleaseScrollDown
                    criteriaRef={this.ref}
                    screenWidth={screenWidth}
                />
                <SeasonAnimation frequencySec={2} screenWidth={screenWidth} />
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.storiesTop,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StoriesTop);
