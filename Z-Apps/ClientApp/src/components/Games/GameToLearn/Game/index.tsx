import React, { useEffect, useMemo, useState } from "react";
import { BlackFrame } from "./Items/BasicItems/BlackFrame";
import { GameController } from "./Items/BasicItems/GameController";
import { Menu } from "./Items/BasicItems/Menu";
import { Ninja } from "./Items/Ninja";
import { Items, Renderable, StageItem } from "./Items/StageItems";
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
            currentStage: "firstStage1",
            cssAnimation: true,
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menu = useMemo(
        () =>
            new Menu({
                open: false,
                setOpen: setIsMenuOpen,
            }),
        []
    );

    useEffect(() => {
        // 初回のみの処理

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
        // タイムステップ毎の処理

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

        // メニュー開閉状態のセット
        menu.open = isMenuOpen;

        // ステージ用のItemを描画対象にセット
        setStageItems(stages[nextNinja.currentStage]);

        if (!isMenuOpen) {
            // メニューが開かれているとき以外はアニメーション続行
            setTimeout(() => {
                setNinja(nextNinja);
            }, timeStep);
        }
    }, [ninja, isMenuOpen]);

    return (
        <>
            <Items
                items={[ninja, menu, ...fixedItems, ...stageItems]}
                UL={UL}
            />
        </>
    );
}
