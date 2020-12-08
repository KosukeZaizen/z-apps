import * as React from "react";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { FolktaleMenu } from "../Home";
import { Momiji } from "../parts/Animations/Momiji";
import CharacterComment from "../parts/CharacterComment";
import FB from "../parts/FaceBook";
import GoogleAd from "../parts/GoogleAd";
import Head from "../parts/Helmet";
import { Markdown } from "../parts/Markdown";
import { ScrollBox } from "../parts/ScrollBox";
import "./style.css";

export interface Page {
    title: string;
    description: string;
    content: string;
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
}
const Articles = (props: Props) => {
    const {
        match: {
            params: { pageName },
        },
    } = props;

    const [title, setTitle] = useState<Page["title"]>("");
    const [description, setDescription] = useState<Page["description"]>("");
    const [content, setContent] = useState<Page["content"]>("");
    const [indexLi, setIndexLi] = useState<JSX.Element[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [imgNumber, setImgNumber] = useState(getImgNumber(pageName.length));

    useEffect(() => {
        import(`./Contents/${pageName}`)
            .then(
                ({
                    default: { title, description, content },
                }: {
                    default: Page;
                }) => {
                    setTitle(title);
                    setDescription(description);
                    setContent(content);
                }
            )
            .catch(e => {
                console.log("e", e);
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

        setImgNumber(getImgNumber(pageName.length));
    }, [pageName]);

    useEffect(() => {
        if (!content) return;

        setIndexLi(
            content
                .split("\n")
                .filter(c => c.includes("##") && !c.includes("###"))
                .map(c => {
                    const linkText = c.split("#").join("").trim();
                    return (
                        <li key={linkText}>
                            <AnchorLink
                                href={"#" + linkText.split(" ").join("-")}
                            >
                                {linkText}
                            </AnchorLink>
                        </li>
                    );
                })
        );
    }, [content]);

    const isWide = width > 991;

    return (
        <div style={{ width: "100%" }} className="center">
            <Head title={title} desc={description} />
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
                    <h1
                        style={{
                            margin: "25px 0 30px",
                        }}
                    >
                        {title}
                    </h1>
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={width}
                        comment={description}
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
                                        marginBottom: 10,
                                    }}
                                >
                                    Index
                                </span>
                                <ol style={{ display: "inline-block" }}>
                                    {indexLi}
                                </ol>
                            </div>
                        </ScrollBox>
                        <GoogleAd
                            style={{ flex: 1, backgroundColor: "gray" }}
                        />
                    </div>
                    <Markdown source={content} style={{ margin: "25px 0" }} />
                </article>
                <hr />
                <FolktaleMenu screenWidth={width} />
                <FB />
            </main>
            <Momiji frequencySec={2} screenWidth={width} />
            {/* <GoogleAd /> */}
        </div>
    );
};
export default Articles;
