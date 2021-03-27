import React, { useEffect, useState } from "react";
import { Item, Items } from "./Items";
import { getInitialNinja, Ninja } from "./Ninja";
import { stages } from "./Stages";

export const timeStep = 100;

export function Game({ UL }: { UL: number }) {
    const [time, setTime] = useState(0);
    const [stageItems, setStageItems] = useState<Item[]>(stages.firstStage1);
    const [ninja, setNinja] = useState<Ninja>(getInitialNinja());

    useEffect(() => {
        setTimeout(() => {
            setNinja({ ...ninja, y: ninja.y + 2 });
            setTime(time + 1);
        }, timeStep);
    }, [time]);

    return (
        <>
            <Ninja ninja={ninja} UL={UL} />
            <Items items={stageItems} UL={UL} />
        </>
    );
}
