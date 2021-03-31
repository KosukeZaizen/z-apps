import { useEffect } from "react";
import {
    finishFooterAnimation,
    restartFooterAnimation,
} from "../components/parts/Animations/FooterAnimation";

export const timeStep = 1000; //ms

export const smoothCSSProperty = {
    transitionDuration: `${timeStep / 1000}s`,
    transitionTimingFunction: "linear",
};

let animationObjects: AnimationObject<any>[] = [];

interface MinimumAnimationState {
    time: number;
    [key: string]: any;
}

export interface AnimationObject<StateToAnimate extends MinimumAnimationState> {
    state: StateToAnimate;
    fncForEachTime: (state: StateToAnimate) => StateToAnimate; //単位時間あたりの変更を加えたステートを返す関数
    setState: React.Dispatch<React.SetStateAction<StateToAnimate>>;
    expirationTime: number;
}

//各コンポーネントRFCのuseEffect内でこのクラスをnewし、returnでcleanUpAnimationを返す
export class AnimationEngine<StateToAnimate extends MinimumAnimationState> {
    animationObject: AnimationObject<StateToAnimate>;

    constructor(
        state: StateToAnimate,
        fncForEachTime: (state: StateToAnimate) => StateToAnimate,
        setState: React.Dispatch<React.SetStateAction<StateToAnimate>>,
        expirationTime: number = 0
    ) {
        this.animationObject = {
            state,
            fncForEachTime,
            setState,
            expirationTime,
        };
        if (expirationTime > 0) {
            setTimeout(() => {
                this.cleanUpAnimation();
            }, expirationTime);
        }
        animationObjects.push(this.animationObject);
    }

    cleanUpAnimation = () => {
        animationObjects = animationObjects.filter(
            obj => obj !== this.animationObject
        );
    };
}

let intervalId = 0;

//アプリケーションの初期化時に一度呼び出す関数
export function startAnimation() {
    intervalId = window.setInterval(() => {
        //タイムステップごとのオブジェクト状態更新
        animationObjects.forEach(obj => {
            //各オブジェクト毎の処理
            const { state, fncForEachTime, setState } = obj;
            const newState = fncForEachTime(state);
            obj.state = newState;
            setState(newState);
        });
    }, timeStep);
}

//アニメーションの初期化（登録済みのアニメーションの除去）
export function StopAnimation() {
    useEffect(() => {
        const previousAnimationObjects = [...animationObjects];

        animationObjects = [];
        //finishWelcomeAnimation();
        finishFooterAnimation();
        clearInterval(intervalId);

        return () => {
            animationObjects = previousAnimationObjects;
            startAnimation();
            restartFooterAnimation();
        };
    }, []);
    return null;
}
