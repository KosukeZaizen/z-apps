import * as React from "react";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import { Author } from "../parts/Author";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import GoogleAd from "../parts/GoogleAd";
import Head from "../parts/Helmet";
import { Markdown } from "../parts/Markdown";
import { ScrollBox } from "../parts/ScrollBox";
import { FBShareBtn, TwitterShareBtn } from "../parts/SnsShareButton";
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
}
const Articles = (props: Props) => {
    const {
        match: {
            params: { pageName },
        },
        history,
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

                const response: Response = await fetch(
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
        setIndexLi(getIndex(content));
    }, [content]);

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
            <SeasonAnimation frequencySec={2} screenWidth={width} />
        </div>
    );
};

export const excludedArticleTitles = ["Kamikaze"];

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
    adsense,
    isAboutFolktale,
}: ArticleContentProps) {
    const [otherArticles, setOtherArticles] = useState<Page[]>([]);

    useEffect(() => {
        if (title) {
            const getArticles = async () => {
                const url = "api/Articles/GetRandomArticles";

                const titlesToExclude = [title, ...excludedArticleTitles];
                const param = `?${titlesToExclude
                    .map(t => `wordsToExclude=${t}`)
                    .join("&")}${
                    isAboutFolktale ? "&isAboutFolktale=true" : ""
                }`;

                const response: Response = await fetch(url + param);
                const pages: Page[] = await response.json();
                const copy = pages
                    .slice()
                    .filter(p =>
                        titlesToExclude.every(
                            titleToExclude => !p.title.includes(titleToExclude)
                        )
                    );
                // ランダムに５件取得
                const selected = [...Array(5)].map(
                    () =>
                        copy.splice(
                            Math.floor(Math.random() * copy.length),
                            1
                        )[0]
                );
                setOtherArticles(selected);
            };
            void getArticles();
        }
    }, [title, isAboutFolktale]);

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
                    {adsense ? (
                        <GoogleAd style={{ flex: 1 }} />
                    ) : (
                        <aside
                            style={{ flex: 1, backgroundColor: "gray" }}
                        ></aside>
                    )}
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
                            "https://z-apps.lingual-ninja.com/articles/" +
                            pageName
                        }
                        style={{
                            width: "200px",
                            marginTop: "10px",
                        }}
                    />,
                    <TwitterShareBtn
                        key="twitterShareButton"
                        urlToShare={
                            "https://z-apps.lingual-ninja.com/articles/" +
                            pageName
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
            <h2 className="markdownH2" style={{ marginBottom: 55 }}>
                More Articles
            </h2>
            <ArticlesList
                titleH={"h3"}
                articles={otherArticles}
                screenWidth={width}
            />
            <FolktaleMenu screenWidth={width} />
            <FB />
        </main>
    );
}

export function getIndex(content: string) {
    return content
        .split("\n")
        .filter(c => c.includes("##") && !c.includes("###"))
        .map((c, i) => {
            const linkText = c.split("#").join("").trim();
            return (
                <li key={linkText} style={{ marginTop: 10, marginBottom: 5 }}>
                    <AnchorLink href={"#" + encodeURIComponent(linkText)}>
                        {linkText}
                    </AnchorLink>
                </li>
            );
        });
}

export default Articles;
