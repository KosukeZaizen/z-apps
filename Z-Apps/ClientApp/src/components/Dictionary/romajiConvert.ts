export function getRomaji(hiragana: string): string {
    let textVal_r: string;

    textVal_r = convertChars(hiragana, objConst.objTwoChars);

    textVal_r = convertChars(textVal_r, objConst.objOneChar);

    textVal_r = convertChars(textVal_r, objConst.objM);

    textVal_r = convertChars(textVal_r, objConst.objN);

    textVal_r = convertSmallTsu(textVal_r);

    textVal_r = convertChars(textVal_r, objConst.objLongSound);

    return textVal_r;
}

function convertChars(text: string, obj: { [key: string]: string }) {
    for (let key in obj) {
        let arrText = text.split(key);
        text = arrText.join(obj[key]);
    }
    return text;
}

function convertSmallTsu(text: string) {
    text = convertChars(text, { っch: "tch", ッch: "tch" });

    let arrText = text.split("");
    for (let index in arrText) {
        if (arrText[index] === "っ" || arrText[index] === "ッ") {
            arrText[index] = arrText[Number(index) + 1] || "";
        }
    }
    return arrText.join("");
}

const objConst = {
    objTwoChars: {
        きゃ: "kya",
        きゅ: "kyu",
        きょ: "kyo",
        しゃ: "sha",
        しゅ: "shu",
        しょ: "sho",
        ちゃ: "cha",
        ちゅ: "chu",
        ちょ: "cho",
        にゃ: "nya",
        にゅ: "nyu",
        にょ: "nyo",
        ひゃ: "hya",
        ひゅ: "hyu",
        ひょ: "hyo",
        みゃ: "mya",
        みゅ: "myu",
        みょ: "myo",
        りゃ: "rya",
        りゅ: "ryu",
        りょ: "ryo",
        ぎゃ: "gya",
        ぎゅ: "gyu",
        ぎょ: "gyo",
        じゃ: "ja",
        じゅ: "ju",
        じょ: "jo",
        びゃ: "bya",
        びゅ: "byu",
        びょ: "byo",
        ぴゃ: "pya",
        ぴゅ: "pyu",
        ぴょ: "pyo",
        じぇ: "je",
        ちぇ: "che",
        てぃ: "ti",
        でぃ: "di",
        でゅ: "dyu",
        ぢゃ: "ja",
        ぢゅ: "ju",
        ぢょ: "jo",
        ふぁ: "fa",
        ふぃ: "fi",
        ふぇ: "fe",
        ふぉ: "fo",
        ぶぁ: "ba",
        ぶぃ: "bi",
        ぶぇ: "be",
        ぶぉ: "bo",
        ゔぁ: "va",
        ゔぃ: "vi",
        ゔぇ: "ve",
        ゔぉ: "vo",
        うぁ: "ua",
        うぃ: "wi",
        うぇ: "we",
        うぉ: "wo",
    },
    objOneChar: {
        あ: "a",
        い: "i",
        う: "u",
        え: "e",
        お: "o",
        か: "ka",
        き: "ki",
        く: "ku",
        け: "ke",
        こ: "ko",
        さ: "sa",
        し: "shi",
        す: "su",
        せ: "se",
        そ: "so",
        た: "ta",
        ち: "chi",
        つ: "tsu",
        て: "te",
        と: "to",
        な: "na",
        に: "ni",
        ぬ: "nu",
        ね: "ne",
        の: "no",
        は: "ha",
        ひ: "hi",
        ふ: "fu",
        へ: "he",
        ほ: "ho",
        ま: "ma",
        み: "mi",
        む: "mu",
        め: "me",
        も: "mo",
        や: "ya",
        ゆ: "yu",
        よ: "yo",
        ら: "ra",
        り: "ri",
        る: "ru",
        れ: "re",
        ろ: "ro",
        わ: "wa",
        "ゐ ": "i",
        ゑ: "e",
        を: "o",
        が: "ga",
        ぎ: "gi",
        ぐ: "gu",
        げ: "ge",
        ご: "go",
        ざ: "za",
        じ: "ji",
        ず: "zu",
        ぜ: "ze",
        ぞ: "zo",
        だ: "da",
        ぢ: "ji",
        づ: "zu",
        で: "de",
        ど: "do",
        ば: "ba",
        び: "bi",
        ぶ: "bu",
        べ: "be",
        ぼ: "bo",
        ぱ: "pa",
        ぴ: "pi",
        ぷ: "pu",
        ぺ: "pe",
        ぽ: "po",
        ゔ: "u",
        ー: "",
    },
    objM: { んb: "mb", んm: "mm", んp: "mp" },
    objN: { ん: "n" },
    objLongSound: { oo: "o", ou: "o", uu: "u" },
};
