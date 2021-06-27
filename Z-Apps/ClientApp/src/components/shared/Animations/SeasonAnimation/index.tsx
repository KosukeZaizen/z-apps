import * as React from "react";
import { useEffect, useState } from "react";
import { appsPublicImg } from "../../../../common/consts";
import { cFetch } from "../../../../common/util/cFetch";
import "./animation.css";
import { fallingImage } from "./type";

let count = 0;
let ls: Leaf[] = [];

interface Leaf {
    id: number;
    ageCount: number;
    initialX: number;
}

interface Props {
    frequencySec: number;
    screenWidth: number;
    season?: string;
    isFestivalHidden?: boolean;
}
export const SeasonAnimation = ({
    frequencySec,
    screenWidth,
    season: pSeason,
    isFestivalHidden,
}: Props) => {
    const [scale, setScale] = useState(
        (screenWidth + window.innerHeight) / 1000
    );
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const [season, setSeason] = useState<string>("none");
    const [seasonItems, setSeasonItems] = useState<fallingImage[]>([]);

    useEffect(() => {
        const load = async () => {
            if (pSeason === "none") {
                return;
            }
            const fallingImages = await getFallingImages();
            setSeasonItems(fallingImages);

            if (pSeason) {
                if (fallingImages.some(im => im.name === pSeason)) {
                    setSeason(pSeason);
                } else {
                    setSeason("none");
                }
            } else {
                const month = new Date().getMonth() + 1;
                if (9 <= month && month <= 11) {
                    //秋
                    setSeason("autumn");
                } else if (12 === month || month <= 2) {
                    //冬
                    setSeason("winter");
                } else if (3 <= month && month <= 4) {
                    //春
                    setSeason("spring");
                } else {
                    //夏
                    setSeason("summer");
                }
            }
        };
        load();
    }, [pSeason]);

    useEffect(() => {
        setScale((screenWidth + window.innerHeight) / 1000);

        const intervalId = window.setInterval(() => {
            //各葉っぱは20秒で消える
            const newLeaves = ls
                .map(l => ({ ...l, ageCount: l.ageCount + 1 }))
                .filter(l => l.ageCount <= 20);

            count++;
            if (count % frequencySec === 0) {
                newLeaves.push({
                    id: count,
                    ageCount: 0,
                    initialX: (screenWidth / 6) * (Math.random() * 11),
                });
            }

            setLeaves(newLeaves);
            ls = newLeaves;
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [screenWidth]);

    useEffect(() => {
        return () => {
            ls = [];
        };
    }, []);

    let getImg;
    const seasonItem = seasonItems?.find(item => item.name === season);
    if (!season || season === "none" || !seasonItem) {
        getImg = () => null;
    } else {
        getImg = (l: Leaf) => (
            <img
                key={`falling item ${l.id}`}
                src={appsPublicImg + seasonItem.fileName}
                alt={`${seasonItem.alt} ${l.id}`}
                title={`${seasonItem.alt} ${l.id}`}
                style={{
                    maxWidth: 50 * scale,
                    maxHeight: 50 * scale,
                    position: "fixed",
                    top: -1.5 * 90 * scale,
                    left: l.initialX,
                    zIndex: -100,
                }}
                className="falling"
            />
        );
    }

    return (
        <div>
            {!isFestivalHidden && (
                <img
                    alt="japanese festival"
                    title="japanese festival"
                    src={appsPublicImg + "japanese-festival.png"}
                    style={{
                        position: "absolute",
                        width: "128%",
                        top: 80 - screenWidth * 0.34,
                        left: -(screenWidth * 0.28),
                        zIndex: -110,
                    }}
                />
            )}
            {leaves.map(getImg)}
        </div>
    );
};

export async function getFallingImages() {
    const response = await cFetch("api/FallingImage/GetFallingImages");
    const fallingImages: fallingImage[] = await response.json();
    return fallingImages;
}
