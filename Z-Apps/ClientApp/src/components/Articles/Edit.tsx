import * as React from "react";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ArticleContent } from ".";
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
                    history.push(`/articlesEdit/${lowerPageName}`);
                    return;
                }

                const response: Response = await fetch(
                    `api/Articles/GetArticleForEdit?p=${pageName}`
                );
                const page: Page = await response.json();
                const { title, description, articleContent } = page;
                setTitle(title);
                setDescription(description);
                setContent(articleContent);
            } catch (e) {
                history.push(`/not-found?p=/articlesEdit/${pageName}`);
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

        setIndexLi(
            content
                .split("\n")
                .filter(c => c.includes("##") && !c.includes("###"))
                .map(c => {
                    const linkText = c.split("#").join("").trim();
                    return (
                        <li key={linkText}>
                            <AnchorLink
                                href={
                                    "#" +
                                    linkText.split(" ").join("-").toLowerCase()
                                }
                            >
                                {linkText}
                            </AnchorLink>
                        </li>
                    );
                })
        );
    }, [content]);

    return (
        <div style={{ width: "100%", display: "flex" }}>
            <div
                style={{
                    flex: 1,
                    padding: 30,
                }}
            >
                <ArticleContent
                    title={title}
                    description={description}
                    imgNumber={imgNumber}
                    width={width / 3}
                    indexLi={indexLi}
                    content={content}
                />
            </div>
            <div
                style={{
                    flex: 2,
                    width: "100%",
                }}
            >
                <textarea
                    style={{ width: "100%", height: "100%" }}
                    defaultValue={content}
                    onChange={e => setContent(e.target.value)}
                />
            </div>
        </div>
    );
};
export default Articles;
