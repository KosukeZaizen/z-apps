//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------


let jpMessages = {

    //屋根の上でポチに触った時のメッセージ
    POCHI_SCROLL_TITLE: "あれが敵の城じゃ！",
    POCHI_SCROLL_MESSAGE:
        "今回のお主の任務は、敵の城に忍び込み、\n" +
        "敵の忍者の長を倒すことである。\n" +
        "敵の手下捕まるでないぞ！検討を祈る！",

    //火遁の巻物
    FIRE_SCROLL_TITLE: "火遁",
    FIRE_SCROLL_MESSAGE:
        "火遁の術を学ぶための巻物。\n" +
        "[<]ボタン と [>]ボタン を同時に押すことで、火の玉を飛ばせるぞ。\n" +
        "敵に当てることで、敵を倒すことができる！",

    //階段のシノに触った時のメッセージ
    SHINO_SCROLL_TITLE: "調子はどう？",
    SHINO_SCROLL_MESSAGE:
        "貴方も火遁が使えるようになったのね。\n" +
        "木の箱を見付けたら、炎をぶつけてみると良いわ。\n" +
        "箱を壊して、中身を確認することができるわ。",
};


let enMessages = {

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

let language;
export function setLang(lang) {
    language = lang;
}

export function getMessage(name) {
    if (language === "Japanese") {
        return jpMessages[name];
    } else {
        return enMessages[name];
    }
}
