import React, { useEffect, useState } from "react";
import { gameState } from "./GameState";
import { fixedItems } from "./Items/FixedItems";
import { Ninja } from "./Items/Ninja";
import { Items, StageItem } from "./Items/StageItems";
import { stages } from "./Stages";

export const timeStep = 50;

export function Game({ UL }: { UL: number }) {
    const [stageItems, setStageItems] = useState<StageItem[]>(
        stages.emptyStage
    );
    const [ninja, setNinja] = useState<Ninja>(
        new Ninja({
            x: 140,
            y: 0,
            speedX: 0,
            speedY: 0,
            width: 10,
            isGoingRight: false,
            jumpable: false,
            cssAnimation: true,
        })
    );

    useEffect(() => {
        // タイムステップ毎の処理

        // 各オブジェクトのタイムステップ毎の処理

        // ボタン押下と重力による忍者の位置更新
        ninja.calcNextNinjaPosition();

        // 忍者が触れている要素からの影響
        stageItems.forEach(item => {
            if (item.checkIfTouched(ninja)) {
                // 要素が忍者に触れていた場合
                item.onTouchNinja(ninja);
            }
        });

        // ステージ用のItemを描画対象にセット
        setStageItems(stages[gameState.currentStage]);

        // メニューが開かれているとき以外はアニメーション続行
        setTimeout(() => {
            setNinja(new Ninja(ninja));
        }, timeStep);
    }, [ninja]);

    return (
        <>
            <Items UL={UL} items={[ninja, ...fixedItems, ...stageItems]} />
        </>
    );
}
