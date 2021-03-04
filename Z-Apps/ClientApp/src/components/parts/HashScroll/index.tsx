import { useEffect } from "react";

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
            void document.getElementById(replacedHash)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [replacedHash, allLoadFinished]);

    return null;
}
