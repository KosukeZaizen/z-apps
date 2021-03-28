import React, { useEffect, useState } from "react";
import { Item, Items } from "./Items";
import { getInitialNinja, Ninja } from "./Ninja";
import { stages } from "./Stages";

export const timeStep = 100;

export function Game({ UL }: { UL: number }) {
    const [stageItems, setStageItems] = useState<Item[]>(stages.firstStage1);
    const [ninja, setNinja] = useState<Ninja>(getInitialNinja());

    useEffect(() => {
        setTimeout(() => {
            let tmpNinja: Ninja = { ...ninja };
            // 各オブジェクトのタイムステップ毎の処理

            // 重力
            tmpNinja = { ...ninja, y: ninja.y + 2 };

            // 忍者に触れているItemの取得
            tmpNinja = stageItems.reduce((n, item) => {
                if (item.checkIfTouched(n)) {
                    return item.onTouchNinja(n);
                }
                return n;
            }, tmpNinja);

            // 新しいninjaをセットしてタイムステップを進める
            setNinja(tmpNinja);
        }, timeStep);
    }, [ninja]);

    return (
        <>
            <Ninja ninja={ninja} UL={UL} />
            <Items items={stageItems} UL={UL} />
        </>
    );
}
