import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import { getImgNumber } from ".";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import { FolktaleMenu } from "../parts/FolktaleMenu";
import Head from "../parts/Helmet";
import { ScrollBox } from "../parts/ScrollBox";
import { Page } from "./Edit";
import "./style.css";

const imgNumber = getImgNumber();

const ArticlesTop = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [articles, setArticles] = useState<Page[]>([]);
    const [newUrl, setNewUrl] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const getArticles = async () => {
        const response: Response = await fetch(
            "api/Articles/GetAllArticlesForEdit"
        );
        const pages: Page[] = await response.json();
        setArticles(pages);
    };

    useEffect(() => {
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

        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        setToken(objSaveData?.token || "");
    }, []);

    const title = "Lingual Ninja Articles";
    const description =
        "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";

    return (
        <div style={{ width: "100%" }} className="center">
            <Head title={title} desc={description} noindex />
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
                {articles.some(page => page.url === newUrl) && (
                    <p style={{ color: "red" }}>
                        The url has already been registerd!
                    </p>
                )}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <span style={{ fontSize: "x-large" }}>{"New URL:"}</span>
                    <input
                        type="text"
                        value={newUrl}
                        onChange={e =>
                            setNewUrl(e.target.value.split(" ").join("-"))
                        }
                        style={{ width: "100%" }}
                    />
                    <Button
                        color="primary"
                        onClick={() => {
                            const confirmationResult = window.confirm(
                                "Do you really want to add?"
                            );
                            if (!confirmationResult) {
                                return;
                            }

                            localStorage.setItem(
                                "folktales-register-token",
                                JSON.stringify({ token })
                            );

                            const formData = new FormData();
                            formData.append("url", newUrl);
                            formData.append("token", token);

                            fetch("/api/Articles/AddNewUrl", {
                                method: "POST",
                                body: formData,
                            })
                                .then(async response => {
                                    const result: string = await response.text();
                                    alert(result);
                                    void getArticles();
                                })
                                .catch(() => {
                                    alert("Failed to add...");
                                });
                        }}
                    >
                        Add
                    </Button>
                </div>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <span style={{ fontSize: "x-large" }}>{"Token:"}</span>
                    <input
                        type="text"
                        defaultValue={token}
                        onChange={e => setToken(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ margin: "20px 0" }}>
                    {articles.length > 0 ? (
                        articles.map((page, i) => (
                            <article
                                key={page.title}
                                style={{ marginBottom: 45 }}
                            >
                                <ScrollBox>
                                    <Link to={`/articlesEdit/${page.url}`}>
                                        <h2>
                                            {page.title || "Add contents >>"}
                                        </h2>
                                    </Link>
                                    <p style={{ margin: "0 0 20px" }}>
                                        {page.description}
                                    </p>
                                    {page.released && (
                                        <span
                                            style={{
                                                backgroundColor: "pink",
                                                margin: 10,
                                                padding: 10,
                                            }}
                                        >
                                            {"released"}
                                        </span>
                                    )}
                                    {page.isAboutFolktale && (
                                        <span
                                            style={{
                                                backgroundColor: "yellow",
                                                margin: 10,
                                                padding: 10,
                                            }}
                                        >
                                            {"folktale"}
                                        </span>
                                    )}
                                </ScrollBox>
                            </article>
                        ))
                    ) : (
                        <ShurikenProgress size="20%" />
                    )}
                    <FolktaleMenu screenWidth={width} />
                </div>
                <FB style={{ marginTop: 20 }} />
            </main>
            {/* <Momiji frequencySec={2} screenWidth={width} /> */}
        </div>
    );
};
export default ArticlesTop;
