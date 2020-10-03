let animationObjects: AnimationObject<any>[] = [];

export interface AnimationObject<StateToAnimate> {
    state: StateToAnimate;
    fncForEachTime: (state: StateToAnimate) => StateToAnimate; //単位時間あたりの変更を加えたステートを返す関数
    setState: React.Dispatch<React.SetStateAction<StateToAnimate>>;
    expirationTime: number;
}

//各コンポーネントRFCのuseEffect内でこのクラスをnewし、returnでcleanUpAnimationを返す
export class AnimationEngine<StateToAnimate> {
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

    cleanUpAnimation() {
        animationObjects = animationObjects.filter(
            obj => obj !== this.animationObject
        );
    }
}

//アプリケーションの初期化時に一度呼び出す関数
export function startAnimation(timeStep: number) {
    setInterval(() => {
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
