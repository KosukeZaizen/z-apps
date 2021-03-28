import React from "react";
import { timeStep } from ".";
import { appsPublicImg } from "../../../../common/consts";
import { Renderable } from "./Items";

const ninjaUrl = `${appsPublicImg}ninja_hashiru.png`;

type NinjaProps = Omit<Ninja, "renderItem" | "updateNinjaData">;

export class Ninja extends Renderable {
    x: number;
    y: number;
    width: number;

    constructor({ x, y, width }: NinjaProps) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
    }

    updateNinjaData({ x, y, width }: NinjaProps) {
        this.x = x;
        this.y = y;
        this.width = width;
    }

    renderItem(UL: number) {
        return (
            <img
                src={ninjaUrl}
                style={{
                    width: 15 * UL,
                    position: "absolute",
                    top: this.y * UL,
                    left: this.x * UL,
                    transition: `${timeStep}ms`,
                    transitionProperty: "top left",
                    transitionTimingFunction: "linear",
                }}
            />
        );
    }
}
