import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImgNumber, Page } from ".";
import CharacterComment from "../parts/CharacterComment";
import Head from "../parts/Helmet";
import { ScrollBox } from "../parts/ScrollBox";
import "./style.css";

export const pageNames = [
    "japanese-romaji-story",
    "japanese-folktales-in-japanese",
];

const imgNumber = getImgNumber();

const ArticlesTop = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [articles, setArticles] = useState<Page[]>([]);

    useEffect(() => {
        const promises = pageNames.map(
            pageName => import(`./Contents/${pageName}`)
        );

        Promise.all(promises).then((result: { default: Page }[]) => {
            const pages = result.map(({ default: page }) => page);
            setArticles(pages);
        });

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

    const title = "Lingual Ninja Articles";
    const description =
        "Articles about studying Japan and Japanese culture! I hope these articles helps you to study Japanese!";

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
                            Articles
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
                    {articles.map((page, i) => (
                        <article key={page.title} style={{ marginTop: 45 }}>
                            <ScrollBox>
                                <Link to={`/articles/${pageNames[i]}`}>
                                    <h2>{page.title}</h2>
                                </Link>
                                <p style={{ margin: 0 }}>{page.description}</p>
                            </ScrollBox>
                        </article>
                    ))}
                </div>
            </main>
            {/* <GoogleAd /> */}
        </div>
    );
};
export default ArticlesTop;
