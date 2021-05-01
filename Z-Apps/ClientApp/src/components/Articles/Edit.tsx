import * as React from "react";
import { useEffect, useState } from "react";
import Button from "reactstrap/lib/Button";
import { ArticleContent, getIndex } from ".";
import Head from "../parts/Helmet";
import { checkImgExtension } from "../parts/Markdown/ImageRender";
import "./style.css";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    released?: boolean;
    isAboutFolktale?: boolean;
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
    const [released, setReleased] = useState<Page["released"]>(false);
    const [isAboutFolktale, setIsAboutFolktale] = useState<
        Page["isAboutFolktale"]
    >(false);

    const [indexLi, setIndexLi] = useState<JSX.Element[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [imgNumber, setImgNumber] = useState(getImgNumber(pageName.length));
    const [token, setToken] = useState("");

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
                const {
                    title,
                    description,
                    articleContent,
                    released,
                    isAboutFolktale,
                } = page;
                setTitle(title);
                setDescription(description);
                setContent(articleContent);
                setReleased(released);
                setIsAboutFolktale(isAboutFolktale);
            } catch (e) {
                history.push(`/not-found?p=/articlesEdit/${pageName}`);
            }
        };
        void getArticle();

        const onChangeScreenSize = () => {
            if (width !== window.innerWidth) {
                setWidth(window.innerWidth);
            }
            if (height !== window.innerHeight) {
                setHeight(window.innerHeight);
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

        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        setToken(objSaveData?.token || "");
    }, [pageName]);

    useEffect(() => {
        if (!content) return;
        setIndexLi(getIndex(content, pageName));
    }, [content]);

    const save = async () => {
        try {
            const imgLine = content
                ?.split("\n")
                ?.find(c => c.includes("![") && checkImgExtension(c));
            const imgPath = imgLine
                ? imgLine.split("](")[1].replace(")", "")
                : "";

            const formData = new FormData();
            formData.append("url", pageName);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("articleContent", content);
            formData.append("imgPath", imgPath);
            formData.append(
                "isAboutFolktale",
                isAboutFolktale ? "true" : "false"
            );
            formData.append("token", token);

            const response = await fetch("/api/Articles/UpdateContents", {
                method: "POST",
                body: formData,
            });
            const result: string = await response.text();
            return result;
        } catch (e) {
            return "Failed to save...";
        }
    };

    return (
        <div>
            <div
                style={{ width: "100%", height: height - 130, display: "flex" }}
            >
                <Head title={title} desc={description} noindex />
                <div
                    style={{
                        flex: 1,
                        padding: 30,
                        height: height - 130,
                        overflowY: "scroll",
                        marginRight: 15,
                    }}
                    className="center"
                >
                    <ArticleContent
                        pageName={pageName}
                        title={title}
                        description={description}
                        imgNumber={imgNumber}
                        width={width / 3}
                        indexLi={indexLi}
                        content={content}
                        adsense={false}
                        isAboutFolktale={isAboutFolktale}
                    />
                </div>
                <div
                    style={{
                        flex: 2,
                        width: "100%",
                        overflowY: "scroll",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        <button
                            onClick={() => {
                                setTitle("folktale");
                                setDescription(pageName);
                            }}
                        >
                            folktale
                        </button>
                    </div>
                    {title != "folktale" && (
                        <textarea
                            style={{ width: "100%", height: 90 }}
                            defaultValue={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    )}
                    <textarea
                        style={{
                            width: "100%",
                            height:
                                title != "folktale"
                                    ? height - 270
                                    : height - 170,
                            padding: 10,
                        }}
                        defaultValue={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
            </div>
            <input
                type="text"
                style={{ width: "100%" }}
                onChange={e => setToken(e.target.value)}
                defaultValue={token}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
                {released && (
                    <span style={{ color: "red", margin: "0 15px" }}>
                        {"released"}
                    </span>
                )}
                {"isAboutFolktale:"}
                <input
                    type="checkbox"
                    checked={isAboutFolktale}
                    onChange={ev => setIsAboutFolktale(ev.target.checked)}
                />
                <Button
                    color="primary"
                    style={{ margin: 15 }}
                    onClick={async () => {
                        const confirmationResult = window.confirm(
                            "Do you really want to save?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        localStorage.setItem(
                            "folktales-register-token",
                            JSON.stringify({ token })
                        );

                        alert(await save());
                    }}
                >
                    Save
                </Button>
                <Button
                    color="primary"
                    style={{ margin: 15 }}
                    onClick={async () => {
                        const confirmationResult = window.confirm(
                            "Do you really want to release?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        const resultSave = await save();
                        if (resultSave !== "success") {
                            alert(resultSave);
                            return;
                        }

                        const formData = new FormData();
                        formData.append("url", pageName);
                        formData.append("token", token);

                        fetch("/api/Articles/Register", {
                            method: "POST",
                            body: formData,
                        })
                            .then(async response => {
                                const result: string = await response.text();
                                alert(result);
                            })
                            .catch(() => {
                                alert("Failed to release...");
                            });
                    }}
                >
                    Release
                </Button>
                <Button
                    color="primary"
                    style={{ margin: 15 }}
                    onClick={() => {
                        const confirmationResult = window.confirm(
                            "Do you really want to hide?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        localStorage.setItem(
                            "folktales-register-token",
                            JSON.stringify({ token })
                        );

                        const formData = new FormData();
                        formData.append("url", pageName);
                        formData.append("token", token);

                        fetch("/api/Articles/Hide", {
                            method: "POST",
                            body: formData,
                        })
                            .then(async response => {
                                const result: string = await response.text();
                                alert(result);
                            })
                            .catch(() => {
                                alert("Failed to hide...");
                            });
                    }}
                >
                    Hide
                </Button>
                <Button
                    color="primary"
                    style={{ margin: 15 }}
                    onClick={() => {
                        history.push("/articlesEdit");
                    }}
                >
                    Go to Edit Top
                </Button>
            </div>
        </div>
    );
};
export default Articles;
