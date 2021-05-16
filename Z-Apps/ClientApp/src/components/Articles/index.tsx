import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cFetch } from "../../common/util/cFetch";
import { storyDesc } from "../../types/stories";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import { Author } from "../parts/Author";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import { HashScroll } from "../parts/HashScroll";
import Head from "../parts/Helmet";
import { Markdown } from "../parts/Markdown";
import { ScrollBox } from "../parts/ScrollBox";
import { FBShareBtn, TwitterShareBtn } from "../parts/SnsShareButton";
import { YouTubeAd } from "../parts/YouTubeAd";
import { StoriesList } from "../Stories/StoriesTop/StoriesList";
import "./style.css";
import { ArticlesList } from "./Top";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    imgPath?: string;
    isAboutFolktale?: boolean;
}

export function getImgNumber(num: number = 0) {
    const today = new Date();
    const todayNumber = today.getMonth() + today.getDate() + num;
    const mod = todayNumber % 30;
    if (mod > 22) return 2;
    if (mod > 14) return 3;
    return 1;
}

interface Props {
    match: { params: { pageName: string } };
    history: { push: (url: string) => void };
    location: Location;
}
const Articles = (props: Props) => {
    const {
        match: {
            params: { pageName },
        },
        history,
        location,
    } = props;

    const [title, setTitle] = useState<Page["title"]>("");
    const [description, setDescription] = useState<Page["description"]>("");
    const [content, setContent] = useState<Page["articleContent"]>("");
    const [isAboutFolktale, setIsAboutFolktale] = useState<
        Page["isAboutFolktale"]
    >(false);
    const [indexLi, setIndexLi] = useState<JSX.Element[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [imgNumber, setImgNumber] = useState(getImgNumber(pageName.length));

    useEffect(() => {
        setTitle("");
        setDescription("");
        setContent("");
        setIsAboutFolktale(false);

        const getArticle = async () => {
            try {
                const lowerPageName = pageName.toLowerCase();
                if (pageName !== lowerPageName) {
                    history.push(`/articles/${lowerPageName}`);
                    return;
                }

                const response: Response = await cFetch(
                    `api/Articles/GetArticle?p=${pageName}`
                );
                const page: Page = await response.json();
                const {
                    title,
                    description,
                    articleContent,
                    isAboutFolktale,
                } = page;
                setTitle(title);
                setDescription(description);
                setContent(articleContent);
                setIsAboutFolktale(isAboutFolktale);
            } catch (e) {
                history.push(`/not-found?p=/articles/${pageName}`);
            }
        };
        void getArticle();

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                setWidth(window.innerWidth);
            }, 100);
        };

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setWidth(window.innerWidth);
            }, i * 1000);
        }

        setImgNumber(getImgNumber(pageName.length));

        return () => {
            window.onresize = null;
        };
    }, [pageName]);

    useEffect(() => {
        setIndexLi(getIndex(content, pageName));
    }, [content, pageName]);

    return (
        <div style={{ width: "100%" }} className="center">
            <Head title={title} desc={description} />
            <ArticleContent
                pageName={pageName}
                title={title}
                description={description}
                imgNumber={imgNumber}
                width={width}
                indexLi={indexLi}
                content={content}
                adsense={true}
                isAboutFolktale={isAboutFolktale}
            />
            {/* <GoogleAd /> */}
            <SeasonAnimation frequencySec={2} screenWidth={width} />
            <HashScroll
                allLoadFinished={indexLi.length > 0}
                location={location}
            />
        </div>
    );
};

// export const excludedArticleTitles = ["Kamikaze"];
export const excludedArticleTitles = [];

interface ArticleContentProps {
    pageName: string;
    title: string;
    description: string;
    isAboutFolktale?: boolean;
    imgNumber: number;
    width: number;
    indexLi: JSX.Element[];
    content: string;
    adsense: boolean;
}
export function ArticleContent({
    pageName,
    title,
    description,
    imgNumber,
    width,
    indexLi,
    content,
    //adsense,
    isAboutFolktale,
}: ArticleContentProps) {
    const [otherArticles, setOtherArticles] = useState<Page[]>([]);
    const [folktales, setFolktales] = useState<storyDesc[]>([]);

    useEffect(() => {
        if (title) {
            const getArticles = async () => {
                const url = "api/Articles/GetRandomArticles";

                const titlesToExclude = [title, ...excludedArticleTitles];
                const param = `?num=10&${titlesToExclude
                    .map(t => `wordsToExclude=${t}`)
                    .join("&")}${
                    isAboutFolktale ? "&isAboutFolktale=true" : ""
                }`;

                const response: Response = await cFetch(url + param);
                const pages: Page[] = await response.json();
                setOtherArticles(pages);
            };
            getArticles();
        }
    }, [title, isAboutFolktale]);

    useEffect(() => {
        if (content) {
            const getFolktales = async () => {
                const url = `api/Stories/GetOtherStories/${content.length}`;
                const response = await cFetch(url);
                setFolktales(await response.json());
            };
            getFolktales();
        }
    }, [content]);

    const isWide = width > 991;

    return (
        <main style={{ maxWidth: 800 }}>
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
                    {isAboutFolktale ? (
                        <Link
                            to="/folktales"
                            itemProp="item"
                            style={{
                                marginRight: "5px",
                                marginLeft: "5px",
                            }}
                        >
                            <span itemProp="name">{"Japanese Folktales"}</span>
                            <meta itemProp="position" content="2" />
                        </Link>
                    ) : (
                        <Link
                            to="/articles"
                            itemProp="item"
                            style={{
                                marginRight: "5px",
                                marginLeft: "5px",
                            }}
                        >
                            <span itemProp="name">
                                {"Articles about Japan"}
                            </span>
                            <meta itemProp="position" content="2" />
                        </Link>
                    )}
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
            <article style={{ textAlign: "left" }}>
                {title ? (
                    <h1
                        style={{
                            margin: "25px auto 30px",
                            textAlign: "center",
                        }}
                        className="whiteShadow"
                    >
                        {title}
                    </h1>
                ) : (
                    <ShurikenProgress size="10%" />
                )}
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={width}
                    comment={description || <ShurikenProgress size="20%" />}
                    style={{
                        marginBottom: 15,
                    }}
                    commentStyle={{ paddingLeft: 25, paddingRight: 20 }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: isWide ? "row" : "column",
                    }}
                >
                    <ScrollBox
                        style={{
                            display: "inline-block",
                            flex: 1,
                            marginRight: isWide ? 30 : undefined,
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
                                        margin: 0,
                                    }}
                                >
                                    {indexLi}
                                </ol>
                            ) : (
                                <ShurikenProgress size="20%" />
                            )}
                        </div>
                    </ScrollBox>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            marginTop: isWide ? undefined : 25,
                        }}
                    >
                        <YouTubeAd width={isWide ? "90%" : undefined} />
                    </div>
                </div>
                {content ? (
                    <Markdown
                        source={content}
                        style={{ margin: "25px 0 40px" }}
                    />
                ) : (
                    <ShurikenProgress size="20%" />
                )}
            </article>
            <CharacterComment
                comment={[
                    <p key="commentContent">
                        {"If you like this article, please share!"}
                    </p>,
                    <FBShareBtn
                        key="fbShareButton"
                        urlToShare={
                            "https://www.lingual-ninja.com/articles/" + pageName
                        }
                        style={{
                            width: "200px",
                            marginTop: "10px",
                        }}
                    />,
                    <TwitterShareBtn
                        key="twitterShareButton"
                        urlToShare={
                            "https://www.lingual-ninja.com/articles/" + pageName
                        }
                        textToShare={title}
                        style={{
                            width: "200px",
                            marginTop: "5px",
                        }}
                    />,
                ]}
                imgNumber={(imgNumber - 1 || 3) - 1 || 3}
                screenWidth={width}
            />
            <hr />
            <Author style={{ marginTop: 45 }} screenWidth={width} />
            <hr />
            <section>
                <h2 className="markdownH2" style={{ marginBottom: 55 }}>
                    More Articles
                </h2>
                <ArticlesList
                    titleH={"h3"}
                    articles={otherArticles}
                    screenWidth={width}
                />
            </section>
            <hr />
            <section>
                <h2 className="markdownH2">
                    {"Learn Japanese from folktales"}
                </h2>
                <CharacterComment
                    screenWidth={width}
                    imgNumber={imgNumber - 1 || 3}
                    commentStyle={{
                        textAlign: "center",
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                    style={isWide ? { margin: "20px auto 0" } : {}}
                    comment={
                        <p
                            style={{
                                textAlign: "left",
                                display: "inline-block",
                            }}
                        >
                            Reading a lot of sample sentences are the best way
                            to learn new languages!
                            <br />
                            Let's learn Japanese by reading popular Japanese
                            folktales in English, Hiragana, Kanji, and Romaji!
                        </p>
                    }
                />
                <StoriesList
                    headLevel="h3"
                    stories={folktales}
                    screenWidth={width}
                />
                <FolktaleMenu screenWidth={width} style={{ marginTop: 45 }} />
            </section>
            <FB />
        </main>
    );
}

export function getIndex(content: string, pageName: string) {
    return content
        .split("\n")
        .filter(c => c.includes("##") && !c.includes("###"))
        .map(c => {
            const linkText = c.split("#").join("").trim();
            const encodedUrl = encodeURIComponent(linkText);
            return (
                <li key={linkText} style={{ marginTop: 10, marginBottom: 5 }}>
                    <Link to={`/articles/${pageName}#${encodedUrl}`}>
                        {linkText}
                    </Link>
                </li>
            );
        });
}

export default Articles;
