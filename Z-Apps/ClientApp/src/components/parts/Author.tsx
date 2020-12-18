import { CSSProperties } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Link } from "react-router-dom";
import "./CharacterComment/CharacterComment.css";
import { Markdown } from "./Markdown";
import { ScrollBox } from "./ScrollBox";
const image = require("../../img/KosukeZaizen.jpg");

const commentMarkDown = (
    <Markdown
        style={{ margin: 5, textAlign: "left", fontSize: "large" }}
        source={`
Thank you for visiting my website!

I am a Japanese web programmer named Kosuke Zaizen.
I like to make free web applications for Japanese learners.
I know learning Japanese is hard.
I think the most important thing to learn new language is **having fun** and **continuing**.
I would like you to enjoy studying Japanese by using my web application.

I hope this website helps you to study Japanese!
`}
    />
);

type AuthorProps = {
    screenWidth: number;
    style?: CSSProperties;
};
export const Author = ({ style, screenWidth }: AuthorProps) => {
    const isCommentUsed = screenWidth > 767;
    return (
        <ScrollBox style={{ textAlign: "center", ...style }}>
            <h2 style={{ marginBottom: 25 }}>
                <Link to="/developer">Author</Link>
            </h2>
            {isCommentUsed ? (
                <PersonComment
                    screenWidth={screenWidth}
                    comment={
                        <div>
                            <div
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "x-large",
                                    margin: "15px 5px 25px",
                                }}
                            >
                                I'm Kosuke Zaizen!
                            </div>
                            <div style={{ margin: 10 }}>{commentMarkDown}</div>
                        </div>
                    }
                />
            ) : (
                <div>
                    <div style={{ margin: "0 auto 20px" }}>
                        <img
                            src={image}
                            alt="Kosuke Zaizen"
                            title="Kosuke Zaizen"
                            style={{
                                width: "100%",
                                maxWidth: 300,
                                objectFit: "contain",
                                margin: "auto",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            margin: 10,
                            fontSize: "large",
                            textAlign: "left",
                            padding: 10,
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "x-large",
                                margin: "0 5px 25px",
                            }}
                        >
                            I'm Kosuke Zaizen!
                        </div>
                        {commentMarkDown}
                    </div>
                </div>
            )}
        </ScrollBox>
    );
};

type CommentProps = {
    screenWidth: number;
    comment: string | React.ReactNode;
    style?: React.CSSProperties;
    commentStyle?: React.CSSProperties;
};
export function PersonComment(props: CommentProps) {
    const { screenWidth, comment, style, commentStyle } = props;
    return (
        <div
            style={{
                display: "flex",
                ...style,
            }}
        >
            <div style={{ flex: 1, marginTop: 6, marginRight: 10 }}>
                <img
                    src={image}
                    alt="Kosuke Zaizen"
                    title="Kosuke Zaizen"
                    style={{
                        maxWidth: 250,
                        height: "auto",
                        verticalAlign: "top",
                    }}
                    className="ninjaPic"
                />
            </div>
            <div
                className="chatting"
                style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    flex: 2,
                }}
            >
                <div
                    className="says"
                    style={{
                        width: "100%",
                        ...commentStyle,
                    }}
                >
                    {comment}
                </div>
            </div>
        </div>
    );
}
