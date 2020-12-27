import * as React from "react";
import { useEffect, useState } from "react";
import { appsPublicImg } from "../../../../common/consts";
import "./animation.css";

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
}
export const Momiji = ({ frequencySec, screenWidth }: Props) => {
    const [scale, setScale] = useState(
        (screenWidth + window.innerHeight) / 1000
    );
    const [leaves, setLeaves] = useState<Leaf[]>([]);

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
            {leaves.map(l => (
                <img
                    key={`Japanese red leaf ${l.id}`}
                    src={appsPublicImg + "momiji.png"}
                    alt={`Japanese red leaf ${l.id}`}
                    title={`Japanese red leaf ${l.id}`}
                    style={{
                        width: 50 * scale,
                        position: "fixed",
                        top: -1.5 * 90 * scale,
                        left: l.initialX,
                        zIndex: -100,
                    }}
                    className="japanese_leaf"
                />
            ))}
        </div>
    );
};
