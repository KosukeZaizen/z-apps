import React, { useEffect, useState } from "react";
import { BlackFrame } from "./Items/BasicItems/BlackFrame";
import { Ninja } from "./Items/Ninja";
import { Items, Renderable, StageItem } from "./Items/StageItems";
import { stages } from "./Stages";

export const timeStep = 100;

export function Game({ UL }: { UL: number }) {
    const [stageItems, setStageItems] = useState<StageItem[]>(
        stages.firstStage1
    );
    const [ninja, setNinja] = useState<Ninja>(
        new Ninja({
            x: 140,
            y: 0,
            width: 10,
        })
    );

    const [fixedItems, setFixedItems] = useState<Renderable[]>([]);

    useEffect(() => {
        //-----------------------
        // 初回のみの処理
        //-----------------------
        setFixedItems([new BlackFrame()]);
    }, []);

    useEffect(() => {
        //-----------------------
        // タイムステップ毎の処理
        //-----------------------

        let tmpNinja: Ninja = new Ninja(ninja);

        // 各オブジェクトのタイムステップ毎の処理

        // 重力
        tmpNinja.updateNinjaData({ ...tmpNinja, y: tmpNinja.y + 2 });

        stageItems.forEach(item => {
            if (item.checkIfTouched(tmpNinja)) {
                // 要素が忍者に触れていた場合
                item.onTouchNinja(tmpNinja);
            }
        });

        setTimeout(() => {
            // 新しいninjaをセットしてタイムステップを進める
            setNinja(tmpNinja);
        }, timeStep);
    }, [ninja]);

    return (
        <>
            <Items items={[ninja, ...fixedItems, ...stageItems]} UL={UL} />
        </>
    );
}
