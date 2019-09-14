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
        POCHI2_SCROLL_TITLE: "この地に雪が降るとは珍しい…",
        POCHI2_SCROLL_MESSAGE:
            "北の山奥にある「キノコ村」に、天気を操る仙人が住んでおる。\n" +
            "彼らに何かあったのかもしれぬ…\n" +
            "そこの仏壇の巻物を読んで、キノコ村の様子を見てきてくれんか。",

        //飛び石の術
        TOBIISHI_SCROLL_TITLE: "飛び石の書",
        TOBIISHI_SCROLL_MESSAGE:
            "秘技、飛び石の術が使えるようになる巻物。\n" +
            "岩を見つけたら、上に乗ってみるがよい。\n" +
            "目的の地にたどり着くことができるであろう。",

        //シノ
        SHINO_SCROLL_TITLE: "キノコ村はすぐそこよ",
        SHINO_SCROLL_MESSAGE:
            "しばらく右に進むと、仙人に会えるはずよ。\n" +
            "天狗みたいな格好をしているから、すぐにわかるはず…\n" +
            "彼がこの雪を降らしているのかしら…",

        //崖の看板
        SIGN_SCROLL_TITLE: "この先、崖",
        SIGN_SCROLL_MESSAGE:
            "この先、崖があるため進むべからず。\n" +
            "特に風が強い日は落下者多数。",

        //崖の看板
        SIGN2_SCROLL_TITLE: "ようこそ、キノコ村へ",
        SIGN2_SCROLL_MESSAGE:
            "この先、キノコ村。\n" +
            "村の奥には、英雄墓地があります。",

        //修行僧
        MONK_SCROLL_TITLE: "私はキノコ村の修行僧です",
        MONK_SCROLL_MESSAGE:
            "先日、魔物の大群が急に村を襲いました…\n" +
            "その時、仙人が天候を操り、魔物達を氷漬けにしてくれたのです。\n" +
            "もう少し進むと、氷漬けになった魔物の大群がいます…",

        //シノ2
        SHINO2_SCROLL_TITLE: "これは、氷漬けになった魔物達？",
        SHINO2_SCROLL_MESSAGE:
            "この魔物たちを氷漬けにするために、仙人は雪を降らせたのね。\n" +
            "でも魔物は、凍らせたぐらいじゃ死なないわ…\n" +
            "きっと雪がやめば、またこの魔物の大群が村を襲うわ…",
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
