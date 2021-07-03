import * as React from "react";
import { useEffect, useState } from "react";
import { getImgNumber, Page } from ".";
import { cFetch } from "../../../common/util/cFetch";
import { SeasonAnimation } from "../../shared/Animations/SeasonAnimation";
import ShurikenProgress from "../../shared/Animations/ShurikenProgress";
import { Author } from "../../shared/Author";
import CharacterComment from "../../shared/CharacterComment";
import FB from "../../shared/FaceBook";
import { FolktaleMenu } from "../../shared/FolktaleMenu";
import Head from "../../shared/Helmet";
import { LinkOrA } from "../../shared/Link/LinkOrA";
import { ScrollBox } from "../../shared/ScrollBox";
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
                    <FolktaleMenu targetBlank screenWidth={width} />
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
    isTargetBlank?: boolean;
}
export function ArticlesList({
    articles,
    screenWidth,
    titleH,
    isTargetBlank,
}: ArticlesListProps) {
    const isWide = screenWidth > 767;

    const url = isTargetBlank
        ? "https://articles.lingual-ninja.com/articles"
        : "/articles";

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
                            <LinkOrA href={`${url}/${page.url}`}>
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
                            </LinkOrA>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: isWide ? "row" : "column",
                                    marginTop: 25,
                                }}
                            >
                                {page.imgPath && (
                                    <LinkOrA
                                        href={`${url}/${page.url}`}
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
                                    </LinkOrA>
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
