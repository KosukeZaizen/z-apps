//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------

export function setLang(lang) {

    const jpMessages = {

        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD: "PCでは、キーボードの「←」「↑」「→」キーで操作をしてください。",

        POCHI_SCROLL_TITLE: "Come to my house!",
        POCHI_SCROLL_MESSAGE:
            "There is one thing I need to give you!\n" +
            "Come to my house!\n",

        POCHI2_SCROLL_TITLE: "Happy birthday!",
        POCHI2_SCROLL_MESSAGE:
            "This big cake is my present for you!\n" +
            "You can eat all!\n",

        MAN_SCROLL_TITLE: "How are you?",
        MAN_SCROLL_MESSAGE:
            "I heard they will hold some event today.\n" +
            "I can't go because I am just a snowman.",

        SHINO_SCROLL_TITLE: "Happy birthday!!",
        SHINO_SCROLL_MESSAGE:
            "I heard today is your birthday!\n" +
            "I hope you will have a nice year!\n" +
            "Don't eat too much food in America!",
    };

    const enMessages = {

        PC_KEYBOARD: "Please use [←], [↑], and [→] keys to play!",

        POCHI_SCROLL_TITLE: "Come to my house!",
        POCHI_SCROLL_MESSAGE:
            "There is one thing I need to give you!\n" +
            "Come to my house!\n",

        POCHI2_SCROLL_TITLE: "Happy birthday!",
        POCHI2_SCROLL_MESSAGE:
            "This big cake is my present for you!\n" +
            "You can eat all!\n",

        MAN_SCROLL_TITLE: "How are you?",
        MAN_SCROLL_MESSAGE:
            "I heard they will hold some event today.\n" +
            "I can't go because I am just a snowman.",

        SHINO_SCROLL_TITLE: "Happy birthday!!",
        SHINO_SCROLL_MESSAGE:
            "I heard today is your birthday!\n" +
            "I hope you will have a nice year!\n" +
            "Don't eat too much food in America!",
    };

    if (lang === "Japanese") {
        messages = jpMessages;
    } else {
        messages = enMessages;
    }
}

export let messages;
