import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImgNumber, Page } from ".";
import { cFetch } from "../../common/util/cFetch";
import { SeasonAnimation } from "../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import { Author } from "../parts/Author";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import Head from "../parts/Helmet";
import { ScrollBox } from "../parts/ScrollBox";
import "./style.css";

const imgNumber = getImgNumber();

const ArticlesTop = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [articles, setArticles] = useState<Page[]>([]);

    useEffect(() => {
        const getArticles = async () => {
            const response: Response = await cFetch(
                "api/Articles/GetAllArticles"
            );
            const pages: Page[] = await response.json();
            setArticles(pages);
        };
        void getArticles();

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
    }, []);

    const title = "Articles about Japan";
    const description =
        "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";

    return (
        <div style={{ width: "100%" }} className="center">
            <Head title={title} desc={description} />
            <main style={{ maxWidth: 900, textAlign: "left" }}>
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
                            {title}
                        </span>
                        <meta itemProp="position" content="2" />
                    </span>
                </div>
                <h1
                    style={{
                        margin: "25px 0 40px",
                        fontWeight: "bolder",
                        textAlign: "center",
                    }}
                    className="whiteShadow"
                >
                    {title}
                </h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={width}
                    comment={description.split("! ").map((d, i, arr) => (
                        <span key={i}>
                            {d + (i < arr.length - 1 ? "! " : "")}
                        </span>
                    ))}
                />
                <div style={{ margin: "20px 0" }}>
                    <ArticlesList
                        titleH={"h2"}
                        articles={articles}
                        screenWidth={width}
                    />
                    <FolktaleMenu screenWidth={width} />
                    <Author style={{ marginTop: 45 }} screenWidth={width} />
                </div>
                <FB style={{ marginTop: 20 }} />
            </main>
            <SeasonAnimation frequencySec={2} screenWidth={width} />
        </div>
    );
};

interface ArticlesListProps {
    articles: Page[];
    screenWidth: number;
    titleH: "h2" | "h3";
}
export function ArticlesList({
    articles,
    screenWidth,
    titleH,
}: ArticlesListProps) {
    const isWide = screenWidth > 767;

    return (
        <>
            {articles.length > 0 ? (
                articles.map(page => (
                    <article
                        key={page.title}
                        style={{
                            marginBottom: 45,
                            textAlign: "left",
                            maxWidth: 900,
                        }}
                    >
                        <ScrollBox>
                            <Link to={`/articles/${page.url}`}>
                                {titleH === "h3" ? (
                                    <h3
                                        style={{
                                            fontSize: isWide
                                                ? "xx-large"
                                                : "x-large",
                                            textAlign: "center",
                                            width: "100%",
                                        }}
                                    >
                                        {page.title}
                                    </h3>
                                ) : (
                                    <h2
                                        style={{
                                            fontSize: isWide
                                                ? "xx-large"
                                                : "x-large",
                                            textAlign: "center",
                                        }}
                                    >
                                        {page.title}
                                    </h2>
                                )}
                            </Link>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: isWide ? "row" : "column",
                                    marginTop: 25,
                                }}
                            >
                                {page.imgPath && (
                                    <Link
                                        to={`/articles/${page.url}`}
                                        style={{ display: "block", flex: 1 }}
                                    >
                                        <img
                                            alt={page.title}
                                            src={page.imgPath}
                                            style={{
                                                width: "100%",
                                                maxHeight: 150,
                                                objectFit: "cover",
                                                margin: "0",
                                            }}
                                        />
                                    </Link>
                                )}
                                <div
                                    style={{
                                        margin: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        flex: 2,
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: isWide
                                                ? "0 20px 10px 20px"
                                                : "10px 0 0",
                                            fontSize: isWide
                                                ? undefined
                                                : "medium",
                                        }}
                                    >
                                        {page.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollBox>
                    </article>
                ))
            ) : (
                <ShurikenProgress size="20%" />
            )}
        </>
    );
}

export default ArticlesTop;
