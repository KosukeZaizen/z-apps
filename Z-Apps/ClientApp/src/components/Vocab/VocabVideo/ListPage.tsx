import React, { useEffect } from "react";
import { ChangePage, Page } from ".";
import { vocab } from "../../../types/vocab";

export function ListPage({
    titleToShowUpper,
    screenWidth,
    changePage,
    vocabList,
    vocabSounds,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    changePage: ChangePage;
    vocabList: vocab[];
    vocabSounds: HTMLAudioElement[];
}) {
    useEffect(() => {
        setTimeout(() => {
            changePage(Page.list);
        }, 4000);
    }, []);

    console.log("vocabList", vocabList);
    console.log("vocabSounds", vocabSounds);

    return <div>list</div>;
}
