import * as React from "react";
import { Link } from "react-router-dom";
import { ColorChangeButton } from "../Animations/ColorChangeButton";
import { ScrollBox } from "../ScrollBox";

interface FolktaleMenuProps {
    screenWidth: number;
    style?: React.CSSProperties;
}
export const FolktaleMenu = ({ screenWidth, style }: FolktaleMenuProps) => {
    const isWide = screenWidth > 991;
    const styleImgContainer = isWide
        ? { display: "flex", justifyContent: "center" }
        : { margin: "10px 0" };
    return (
        <ScrollBox style={{ textAlign: "center", ...style }}>
            <Link to="/folktales">
                <h2>Learn Japanese from Folktales</h2>
            </Link>
            <div
                style={{
                    display: "flex",
                    flexDirection: isWide ? "row" : "column",
                }}
            >
                <div style={styleImgContainer}>
                    <Link to="/folktales" style={styleImgContainer}>
                        <img
                            style={{ width: "100%", objectFit: "contain" }}
                            src={
                                "https://lingualninja.blob.core.windows.net/lingual-storage/folktalesImg/Momotaro.png"
                            }
                            alt="Japanese Folktale Momotaro"
                        />
                    </Link>
                </div>
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
                        <Link
                            to="/folktales"
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            <ColorChangeButton
                                size="lg"
                                style={{
                                    width: 100,
                                }}
                                label="Try!"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </ScrollBox>
    );
};
