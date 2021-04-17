import { useEffect } from "react";

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
            document.getElementById(replacedHash)?.scrollIntoView(true);
        }
    }, [replacedHash, allLoadFinished, location]);

    return null;
}
