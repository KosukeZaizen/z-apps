import React, { useEffect, useState } from "react";
import { gameState } from "./GameState";
import { fixedItems } from "./Items/FixedItems";
import { initialNinja, Ninja } from "./Items/Ninja";
import { Items } from "./Items/StageItems";
import { stages } from "./Stages";

export const timeStep = 50;

export function Game({ UL }: { UL: number }) {
    const [ninja, setNinja] = useState<Ninja>(initialNinja);

    useEffect(() => {
        // タイムステップ毎の処理
        const {
            menu: { isMenuOpen },
        } = gameState;

        if (!isMenuOpen) {
            // アニメーションがストップされていない時

            // 忍者のタイムステップ毎の処理
            ninja.onEachTime();

            stageItems.forEach(item => {
                // 各要素のタイムステップ毎の処理
                item.onEachTime(ninja);

                if (item.checkIfTouched(ninja)) {
                    // 要素が忍者に触れていた場合
                    item.onTouchNinja(ninja);
                }
            });
        }

        // メニューが開かれているとき以外はアニメーション続行
        setTimeout(() => {
            setNinja(new Ninja(ninja));
        }, timeStep);
    }, [ninja]);

    const stageItems = stages[gameState.currentStage];

    return (
        <>
            <Items UL={UL} items={[ninja, ...fixedItems, ...stageItems]} />
        </>
    );
}
