import { useEffect } from "react";
import { sleepAsync } from "../../../common/functions";

/**
 * ページ内遷移を実現する
 * @param {boolean} allLoadFinished - スクロールターゲットが画面上に存在していることが保証される時点でtrueにする
 * @param {Location} location - 同じターゲットに対して再度遷移する場合にも作動するように、locationオブジェクト自体の変更を検知する
 */
export function HashScroll({
    allLoadFinished,
    location,
}: {
    allLoadFinished: boolean;
    location: Location;
}) {
    const replacedHash = location.hash.replace("#", "");

    useEffect(() => {
        if (allLoadFinished && replacedHash) {
            const target = document.getElementById(replacedHash);
            if (!target) {
                return;
            }
            const scrollToTarget = async () => {
                void target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                let count = 0;
                let top = 100;
                while (count < 30 && (top > 10 || top < -10)) {
                    await sleepAsync(300);

                    const newTop = target.getBoundingClientRect().top;

                    if (top === newTop) {
                        void target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                    top = newTop;
                    count++;
                }
            };
            scrollToTarget();
        }
    }, [replacedHash, allLoadFinished, location]);

    return null;
}
