import { useEffect } from "react";

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
            const scroll = (count: number) => {
                if (count > 30) {
                    return;
                }
                void target.scrollIntoView(true);
                setTimeout(() => {
                    const { top } = target.getBoundingClientRect();
                    if (top > 10 || top < -10) {
                        scroll(count + 1);
                    }
                }, 300);
            };
            scroll(0);
        }
    }, [replacedHash, allLoadFinished]);

    return null;
}
