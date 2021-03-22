import { useEffect } from "react";
import { sleepAsync } from "../../../common/functions";

/**
 * ページ内遷移を実現する
 * @param {string} hash - ルーターからコンポーネントに渡されてくる「location.hash」そのまま
 * @param {boolean} allLoadFinished - スクロールターゲットが画面上に存在していることが保証される時点でtrueにする
 */
export function HashScroll({
    hash,
    allLoadFinished,
}: {
    hash: string;
    allLoadFinished: boolean;
}) {
    const replacedHash = hash.replace("#", "");

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
    }, [replacedHash, allLoadFinished]);

    return null;
}
