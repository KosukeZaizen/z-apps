import * as React from "react";
import { Link } from "react-router-dom";
import { Z_APPS_TOP_URL } from "../../../common/consts";
import { ColorChangeButton } from "../Animations/ColorChangeButton";
import { ATargetBlank } from "../ATargetBlank";
import { ScrollBox } from "../ScrollBox";

interface FolktaleMenuProps {
    screenWidth: number;
    style?: React.CSSProperties;
    targetBlank?: boolean;
}
export const FolktaleMenu = ({
    screenWidth,
    style,
    targetBlank,
}: FolktaleMenuProps) => {
    const isWide = screenWidth > 991;
    const styleImgContainer = isWide
        ? { display: "flex", justifyContent: "center" }
        : { margin: "10px 0" };

    const title = <h2>Learn Japanese from Folktales</h2>;
    const image = (
        <img
            style={{ width: "100%", objectFit: "contain" }}
            src={
                "https://lingualninja.blob.core.windows.net/lingual-storage/folktalesImg/Momotaro.png"
            }
            alt="Japanese Folktale Momotaro"
        />
    );
    const btn = (
        <ColorChangeButton
            size="lg"
            style={{
                width: 100,
            }}
            label="Try!"
        />
    );

    let titleLink,
        imageLink,
        btnLink = null;
    if (targetBlank) {
        const folktaleUrl = `${Z_APPS_TOP_URL}/folktales`;
        titleLink = <ATargetBlank href={folktaleUrl}>{title}</ATargetBlank>;
        imageLink = (
            <ATargetBlank href={folktaleUrl} style={styleImgContainer}>
                {image}
            </ATargetBlank>
        );
        btnLink = (
            <ATargetBlank
                href={folktaleUrl}
                style={{
                    fontWeight: "bold",
                }}
            >
                {btn}
            </ATargetBlank>
        );
    } else {
        titleLink = <Link to="/folktales">{title}</Link>;
        imageLink = (
            <Link to="/folktales" style={styleImgContainer}>
                {image}
            </Link>
        );
        btnLink = (
            <Link
                to="/folktales"
                style={{
                    fontWeight: "bold",
                }}
            >
                {btn}
            </Link>
        );
    }

    return (
        <ScrollBox style={{ textAlign: "center", ...style }}>
            {titleLink}
            <div
                style={{
                    display: "flex",
                    flexDirection: isWide ? "row" : "column",
                }}
            >
                <div style={styleImgContainer}>{imageLink}</div>
                <div>
                    <div
                        style={{
                            fontSize: "large",
                            textAlign: "left",
                            padding: isWide ? 25 : "10px 0 20px",
                        }}
                    >
                        A web app to learn Japanese from folktales. You can read
                        traditional Japanese folktales in English, Hiragana,
                        Kanji, and Romaji!
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {btnLink}
                    </div>
                </div>
            </div>
        </ScrollBox>
    );
};
