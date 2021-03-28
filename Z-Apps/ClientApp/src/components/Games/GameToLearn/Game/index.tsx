import React, { useEffect, useState } from "react";
import { BlackFrame } from "./Items/BasicItems/BlackFrame";
import { GameController } from "./Items/BasicItems/GameController";
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
            speedY: 0,
            width: 10,
            jumpable: false,
        })
    );
    const [fixedItems, setFixedItems] = useState<Renderable[]>([]);

    const [isLeftButtonClicked, setIsLeftButtonClicked] = useState<boolean>(
        false
    );
    const [isRightButtonClicked, setIsRightButtonClicked] = useState<boolean>(
        false
    );
    const [isJumpButtonClicked, setIsJumpButtonClicked] = useState<boolean>(
        false
    );

    useEffect(() => {
        //-----------------------
        // 初回のみの処理
        //-----------------------
        setFixedItems([
            new BlackFrame(),
            new GameController({
                right: setIsRightButtonClicked,
                left: setIsLeftButtonClicked,
                jump: setIsJumpButtonClicked,
            }),
        ]);
    }, []);

    useEffect(() => {
        //-----------------------
        // タイムステップ毎の処理
        //-----------------------

        // 次のタイムステップ用の忍者のインスタンス生成
        const nextNinja: Ninja = new Ninja(ninja);

        // 各オブジェクトのタイムステップ毎の処理

        // ボタン押下と重力による忍者の位置更新
        nextNinja.calcNextNinjaPosition({
            isJumpButtonClicked,
            isLeftButtonClicked,
            isRightButtonClicked,
        });

        // 忍者が触れている要素からの影響
        stageItems.forEach(item => {
            if (item.checkIfTouched(nextNinja)) {
                // 要素が忍者に触れていた場合
                item.onTouchNinja(nextNinja);
            }
        });

        setTimeout(() => {
            // 新しいninjaをセットしてタイムステップを進める
            setNinja(nextNinja);
        }, timeStep);
    }, [ninja]);

    return (
        <>
            <Items items={[ninja, ...fixedItems, ...stageItems]} UL={UL} />
        </>
    );
}
