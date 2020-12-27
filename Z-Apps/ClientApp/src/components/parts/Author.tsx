import { CSSProperties } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Link } from "react-router-dom";
import { appsPublicImg } from "../../common/consts";
import "./CharacterComment/CharacterComment.css";
import { Markdown } from "./Markdown";
import { ScrollBox } from "./ScrollBox";

const image = appsPublicImg + "KosukeZaizen.jpg";

type AuthorProps = {
    screenWidth: number;
    style?: CSSProperties;
};
export const Author = ({ style, screenWidth }: AuthorProps) => {
    const isCommentUsed = screenWidth > 767;
    const isVeryNarrow = screenWidth < 500;
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
                            <div style={{ margin: 10 }}>
                                <CommentMarkDown />
                            </div>
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
                            margin: isVeryNarrow ? "10px 0" : 10,
                            fontSize: "large",
                            textAlign: "left",
                            padding: isVeryNarrow ? 0 : 10,
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "x-large",
                                margin: isVeryNarrow
                                    ? "0 0 25px"
                                    : "0 5px 25px",
                            }}
                        >
                            I'm Kosuke Zaizen!
                        </div>
                        <CommentMarkDown
                            style={{
                                margin: isVeryNarrow ? "5px 0" : 5,
                                fontSize: isVeryNarrow ? "medium" : undefined,
                            }}
                        />
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
    const { comment, style, commentStyle } = props;
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
                        maxWidth: 300,
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

const CommentMarkDown = ({ style }: { style?: CSSProperties }) => (
    <Markdown
        style={{ margin: 5, textAlign: "left", fontSize: "large", ...style }}
        source={`
Thank you for visiting my website!

I am a Japanese programmer named Kosuke Zaizen.
I like to make free web applications for Japanese learners.
I know that learning Japanese can be difficult.
I think the most important thing in learning a new language 
is to **have fun** and to **continue**.
I would like you to enjoy studying Japanese by using my web application.

I hope this website helps you to study Japanese!
`}
    />
);
