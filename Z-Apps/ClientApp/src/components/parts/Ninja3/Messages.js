//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------

export function setLang(lang) {

    const jpMessages = {

        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD: "PCでは、キーボードの「←」「↑」「→」キーで操作をしてください。",

        //屋根の上でポチに触った時のメッセージ
        POCHI_SCROLL_TITLE: "拙者の屋敷に参るがよい",
        POCHI_SCROLL_MESSAGE:
            "この村に、こんな時期に雪が降るとは妙じゃのう…\n" +
            "お主に調査してもらいたいことがある。。\n" +
            "[＜] ボタンを押し続けて、拙者の屋敷まで参るがよい。",

        //家でのポチ
        POCHI2_SCROLL_TITLE: "氷の里の様子を見てくるのじゃ",
        POCHI2_SCROLL_MESSAGE:
            "この時期にこの地に雪が降るとは珍しい…\n" +
            "遥か北にある氷の里に、何かあったのかもしれん。\n" +
            "そこの仏壇の巻物を呼んで、様子を見てきてくれんか。",

        //飛び石の術
        TOBIISHI_SCROLL_TITLE: "飛び石の書",
        TOBIISHI_SCROLL_MESSAGE:
            "秘技、飛び石の術が使えるようになる巻物。\n" +
            "岩を見つけたら、上に乗ってみるがよい。\n" +
            "目的の地にたどり着くことができるであろう。",
    };

    const enMessages = {

        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD: "Please use [←], [↑], and [→] keys to play!",

        //屋根の上でポチに触った時のメッセージ
        POCHI_SCROLL_TITLE: "Sneak into the enemy's castle!",
        POCHI_SCROLL_MESSAGE:
            "Can you see the enemy's castle!?\n" +
            "Your mission is to sneak into the castle, and steal the secret scroll!\n" +
            "Don't touch the enemy! Good luck!",

        //火遁の巻物
        FIRE_SCROLL_TITLE: "火遁",
        FIRE_SCROLL_MESSAGE:
            "This is the scroll to learn 'Fire Ball'.\n" +
            "Push [<] button and [>] button at the same time.\n" +
            "You can defeat the enemy using Fire Ball.",

        //階段のシノに触った時のメッセージ
        SHINO_SCROLL_TITLE: "Hello!",
        SHINO_SCROLL_MESSAGE:
            "Now, you can use Fire Ball.\n" +
            "When you find a wooden box, you should use fire.\n" +
            "It will burn the box, and you can see what's inside.",
    };

    if (lang === "Japanese") {
        messages = jpMessages;
    } else {
        messages = enMessages;
    }
}

export let messages;
