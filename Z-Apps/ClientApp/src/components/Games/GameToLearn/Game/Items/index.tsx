import React, { CSSProperties } from "react";
import { gameStorage } from "../../../../../common/consts";

export type Item = {
    type: "rock";
    x: number;
    y: number;
    width: 30;
    key: string;
};

export function Items({ items, UL }: { items: Item[]; UL: number }) {
    return <>{items.map(item => getItem(item, UL))}</>;
}

function getItem(item: Item, UL: number) {
    const style: CSSProperties = {
        position: "absolute",
        top: item.y * UL,
        left: item.x * UL,
        width: item.width * UL,
    };
    switch (item.type) {
        case "rock": {
            return (
                <img
                    key={item.key}
                    src={`${gameStorage}ninja1/objs/rock.png`}
                    style={style}
                />
            );
        }
        default: {
            return null;
        }
    }
}
