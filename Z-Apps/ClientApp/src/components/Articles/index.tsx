import * as React from "react";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { FolktaleMenu } from "../Home";
import { Momiji } from "../parts/Animations/Momiji";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import GoogleAd from "../parts/GoogleAd";
import Head from "../parts/Helmet";
import { Markdown } from "../parts/Markdown";
import { ScrollBox } from "../parts/ScrollBox";
import "./style.css";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
}

export const getImgNumber = (num: number = 0) => {
    const today = new Date();
    const todayNumber = today.getMonth() + today.getDate() + num;
    const mod = todayNumber % 30;
    if (mod > 22) return 2;
    if (mod > 14) return 3;
    return 1;
};

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
    const [indexLi, setIndexLi] = useState<JSX.Element[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [imgNumber, setImgNumber] = useState(getImgNumber(pageName.length));

    useEffect(() => {
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
                const { title, description, articleContent } = page;
                setTitle(title);
                setDescription(description);
                setContent(articleContent);
            } catch (e) {
                history.push(`/not-found?p=/articles/${pageName}`);
            }
        };
        void getArticle();

        const onChangeScreenSize = () => {
            if (width !== window.innerWidth) {
                setWidth(window.innerWidth);
            }
        };

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                onChangeScreenSize();
            }, 100);
        };

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                onChangeScreenSize();
            }, i * 1000);
        }

        setImgNumber(getImgNumber(pageName.length));
    }, [pageName]);

    useEffect(() => {
        if (!content) return;
        setIndexLi(getIndex(content));
    }, [content]);

    return (
        <div style={{ width: "100%" }} className="center">
            <Head title={title} desc={description} />
            <ArticleContent
                title={title}
                description={description}
                imgNumber={imgNumber}
                width={width}
                indexLi={indexLi}
                content={content}
                adsense={true}
            />
            <Momiji frequencySec={2} screenWidth={width} />
        </div>
    );
};

interface ArticleContentProps {
    title: string;
    description: string;
    imgNumber: number;
    width: number;
    indexLi: JSX.Element[];
    content: string;
    adsense: boolean;
}
export function ArticleContent({
    title,
    description,
    imgNumber,
    width,
    indexLi,
    content,
    adsense,
}: ArticleContentProps) {
    const isWide = width > 991;

    return (
        <main style={{ maxWidth: 900 }}>
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
                        to="/articles"
                        itemProp="item"
                        style={{
                            marginRight: "5px",
                            marginLeft: "5px",
                        }}
                    >
                        <span itemProp="name">{"Articles"}</span>
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
            <article style={{ textAlign: "left" }}>
                {title ? (
                    <h1
                        style={{
                            margin: "25px 0 30px",
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
                    style={{ marginBottom: 15 }}
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
            <hr />
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
                    <AnchorLink
                        href={"#" + linkText.split(" ").join("-").toLowerCase()}
                    >
                        {linkText}
                    </AnchorLink>
                </li>
            );
        });
}

export default Articles;
