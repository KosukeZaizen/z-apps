import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ColorChangeButton } from "../Animations/ColorChangeButton";
import { ScrollBox } from "../ScrollBox";

interface FolktaleMenuProps {
    screenWidth: number;
}
const buttonColor = { 1: "secondary", 2: "success", 3: "primary" };
type ButtonKey = keyof typeof buttonColor;
export const FolktaleMenu = ({ screenWidth }: FolktaleMenuProps) => {
    const isWide = screenWidth > 991;
    const [buttonKey, setButtonKey] = useState<ButtonKey>(1);

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const nextKey = (buttonKey - 1 || 3) as ButtonKey;
            setButtonKey(nextKey);
        }, 3000);
        return () => clearTimeout(timerId);
    }, [buttonKey]);

    return (
        <ScrollBox style={{ textAlign: "center" }}>
            <Link to="/folktales">
                <h2>Japanese Folktales</h2>
            </Link>
            <div
                style={{
                    display: "flex",
                    flexDirection: isWide ? "row" : "column",
                }}
            >
                <div>
                    <Link to="/folktales">
                        <img
                            style={{ width: "100%" }}
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
                            padding: isWide ? 25 : "10px 10px 20px",
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
                            <ColorChangeButton label="Try!" />
                        </Link>
                    </div>
                </div>
            </div>
        </ScrollBox>
    );
};
