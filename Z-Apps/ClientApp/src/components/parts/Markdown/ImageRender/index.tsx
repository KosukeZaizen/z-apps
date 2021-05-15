import React from "react";
import { YouTubeVideo } from "../../YouTubeVideo";
import { Speaker } from "./Speaker";

const imgExtensions = [".png", ".jpg"];
const soundExtensions = [".m4a"];

export function checkImgExtension(str: string) {
    if (!str) {
        return false;
    }
    return imgExtensions.some(e => str.toLowerCase().includes(e));
}

function checkSoundExtension(str: string) {
    if (!str) {
        return false;
    }
    return soundExtensions.some(e => str.toLowerCase().includes(e));
}

export const ImageRender = ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src || !alt) {
        return null;
    }

    if (src.startsWith("youtube")) {
        return (
            <YouTubeVideo
                screenWidth={window.innerWidth}
                pageNameForLog={"markDown embedded"}
                videoId={alt}
                buttonLabel={
                    src.includes("-")
                        ? src.split("-")[1].split("_").join(" ")
                        : ""
                }
            />
        );
    }
    if (checkSoundExtension(src)) {
        return <Speaker src={src} alt={alt} />;
    }
    return <img src={src} alt={alt} title={alt} className="renderedImg" />;
};
