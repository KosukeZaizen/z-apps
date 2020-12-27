import * as React from "react";
import { useEffect, useState } from "react";
import { appsPublicImg } from "../../../../common/consts";
import "./animation.css";

let count = 0;
let ls: Leaf[] = [];

export type Season = "spring" | "summer" | "autumn" | "winter" | "none";
type SeasonItem = { alt: string; src: string };
const seasonItems: { [key in Exclude<Season, "none">]: SeasonItem } = {
    spring: { alt: "Japanese sakura", src: "sakura.png" },
    summer: { alt: "Japanese fan", src: "japanese-fan.png" },
    autumn: { alt: "Japanese red leaf", src: "momiji.png" },
    winter: { alt: "snow", src: "snow.png" },
};

interface Leaf {
    id: number;
    ageCount: number;
    initialX: number;
}

interface Props {
    frequencySec: number;
    screenWidth: number;
    season?: Season;
}
export const Momiji = ({
    frequencySec,
    screenWidth,
    season: pSeason,
}: Props) => {
    const [scale, setScale] = useState(
        (screenWidth + window.innerHeight) / 1000
    );
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const [season, setSeason] = useState<Season>("none");

    useEffect(() => {
        if (pSeason) {
            setSeason(pSeason);
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
    if (!season || season === "none") {
        getImg = () => null;
    } else {
        const seasonItem = seasonItems[season];
        getImg = (l: Leaf) => (
            <img
                key={`${seasonItem.alt} ${l.id}`}
                src={appsPublicImg + seasonItem.src}
                alt={`${seasonItem.alt} ${l.id}`}
                title={`${seasonItem.alt} ${l.id}`}
                style={{
                    width: 50 * scale,
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
            <img
                alt="japanese festival"
                title="japanese festival"
                src={appsPublicImg + "japanese-festival.png"}
                style={{
                    position: "absolute",
                    width: "130%",
                    top: 80 - screenWidth * 0.34,
                    left: -(screenWidth * 0.28),
                    zIndex: -110,
                }}
            />
            {leaves.map(getImg)}
        </div>
    );
};
