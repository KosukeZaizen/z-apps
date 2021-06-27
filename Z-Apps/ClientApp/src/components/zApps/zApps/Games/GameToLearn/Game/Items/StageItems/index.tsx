import React from "react";
import { BackgroundSrc, ImgSrc } from "../../Stages";
import { Ninja } from "../Ninja";

export const itemTypes = {
    block: "block",
    floor: "floor",
    stageChanger: "stageChanger",
    backgroundImg: "backgroundImg",
    speakingCharacter: "speakingCharacter",
    enemy: "enemy",
} as const;
export type ItemType = typeof itemTypes[keyof typeof itemTypes];

export class Renderable {
    renderItem(UL: number) {
        throw new Error(
            "getItemが子クラスに実装されていません。オーバーライドしてください。"
        );
    }
}

export const Direction = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

type StageItemProps = {
    key: string;
    type: ItemType;
    x: number;
    y: number;
    width: number;
    zIndex?: number;
    isUntouchable?: boolean;
    imgSrc?: ImgSrc | BackgroundSrc;
};
export class StageItem extends Renderable {
    key: string;
    type: ItemType;
    x: number;
    y: number;
    width: number;
    zIndex?: number;
    isUntouchable: boolean; // 巻物など、当たり判定常にfalseのもの
    imgSrc?: ImgSrc | BackgroundSrc;

    constructor(props: StageItemProps) {
        super();

        this.key = props.key;
        this.type = props.type;
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.zIndex = props.zIndex;
        this.isUntouchable = !!props.isUntouchable;
        this.imgSrc = props.imgSrc;
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
        const ninja_center = [
            target.x + target.width / 2,
            target.y + target.width / 2,
        ];
        const item_center = [this.x + this.width / 2, this.y + this.width / 2];

        //2オブジェクトの中心間の差を計算
        const dX = item_center[0] - ninja_center[0];
        const dY = item_center[1] - ninja_center[1];

        //0除算除外
        if (dX === 0) {
            //2つの物体のx座標が一致
            return dY > 0 ? Direction.top : Direction.bottom;
        }

        //傾き
        const a = dY / dX;

        //傾きから相対位置判定
        if (1 > a && a > -1) {
            return dX > 0 ? Direction.left : Direction.right;
        } else {
            return dY > 0 ? Direction.top : Direction.bottom;
        }
    }

    onTouchNinja(ninja: Ninja) {
        throw new Error(
            "onTouchNinjaが子クラスに実装されていません。オーバーライドしてください。"
        );
    }

    onEachTime(ninja: Ninja) {
        throw new Error(
            "onEachTimeが子クラスに実装されていません。オーバーライドしてください。"
        );
    }

    renderItem(UL: number) {
        return this.imgSrc ? (
            <img
                alt={this.key}
                key={this.key}
                src={this.imgSrc}
                style={{
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    width: this.width * UL,
                    zIndex: this.zIndex || 10,
                }}
            />
        ) : (
            <div
                key={this.key}
                style={{
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    width: this.width * UL,
                    zIndex: this.zIndex || 10,
                }}
            />
        );
    }
}

export function Items({ items, UL }: { items: Renderable[]; UL: number }) {
    return <>{items.map(item => item.renderItem(UL))}</>;
}
