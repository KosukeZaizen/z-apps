import React from "react";
import { Ninja } from "../Ninja";

export const itemTypes = {
    rock: "rock",
    floor: "floor",
    stageChanger: "stageChanger",
} as const;
export type ItemType = typeof itemTypes[keyof typeof itemTypes];

export class Renderable {
    renderItem(UL: number) {
        throw new Error(
            "getItemが子クラスに実装されていません。オーバーライドしてください。"
        );
    }
}
interface StageItemProps {
    type: ItemType;
    x: number;
    y: number;
    width: number;
    zIndex: number;
    isUntouchable?: boolean;
}

export const Direction = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

export class StageItem extends Renderable {
    type: ItemType;
    x: number;
    y: number;
    width: number;
    zIndex: number;
    isUntouchable: boolean; // 巻物など、当たり判定常にfalseのもの

    constructor({ type, x, y, width, zIndex, isUntouchable }: StageItemProps) {
        super();

        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.zIndex = zIndex;
        this.isUntouchable = !!isUntouchable;
    }

    checkIfTouched(target: { x: number; y: number; width: number }): boolean {
        if (this.isUntouchable) {
            return false;
        }

        //かすっていたらtrue
        if (target.x + target.width > this.x) {
            if (target.x < this.x + this.width) {
                if (target.y + target.width > this.y) {
                    if (target.y < this.y + this.width) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    protected getTargetDirection(target: {
        x: number;
        y: number;
        width: number;
    }): Direction {
        //Itemから見た忍者の位置を返す関数

        //中心座標計算
        let ninja_center = [
            target.x + target.width / 2,
            target.y + target.width / 2,
        ];
        let item_center = [this.x + this.width / 2, this.y + this.width / 2];

        //2オブジェクトの中心間の差を計算
        let dX = item_center[0] - ninja_center[0];
        let dY = item_center[1] - ninja_center[1];

        //0除算除外
        if (dX === 0) {
            //2つの物体のx座標が一致
            return dY > 0 ? Direction.top : Direction.bottom;
        }

        //傾き
        let a = dY / dX;

        //傾きから相対位置判定
        if (1 > a && a > -1) {
            return dX > 0 ? Direction.left : Direction.right;
        } else {
            return dY > 0 ? Direction.top : Direction.bottom;
        }
    }

    onTouchNinja(ninja: Ninja) {
        throw new Error(
            "getItemが子クラスに実装されていません。オーバーライドしてください。"
        );
    }

    onEachTime(
        ninja: Ninja,
        setNinja: (value: React.SetStateAction<Ninja>) => void
    ) {
        throw new Error(
            "onEachTimeが子クラスに実装されていません。オーバーライドしてください。"
        );
    }
}

export function Items({ items, UL }: { items: Renderable[]; UL: number }) {
    return <>{items.map(item => item.renderItem(UL))}</>;
}
